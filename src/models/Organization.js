import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllOrganizations = async () => {
	const reply = await client.get('organizations')

	if (reply) return JSON.parse(reply)

	const organizations = await prisma.organization.findMany({
		include: {
			field: true,
		},
	})

	await client.set('organizations', JSON.stringify(organizations), {
		EX: 240,
	})

	return organizations
}

const getOneOrganization = async id => {
	const reply = await client.get(`organizations/${id}`)

	if (reply) return JSON.parse(reply)

	const organization = await prisma.organization.findUnique({
		where: {
			id,
		},
		include: {
			field: true,
		},
	})

	await client.set(`organizations/${id}`, JSON.stringify(organization), {
		EX: 240,
	})

	return organization
}

const createOrganization = async newOrganization => {
	const createdOrganization = await prisma.organization.create({
		data: newOrganization,
		include: {
			field: true,
		},
	})

	await client.del('organizations')

	return createdOrganization
}

const updateOrganization = async (id, change) => {
	const updatedOrganization = await prisma.organization.update({
		where: {
			id,
		},
		data: change,
		include: {
			field: true,
		},
	})

	await client.del('organizations')
	await client.del(`organizations/${id}`)

	return updatedOrganization
}

const deleteOrganization = async id => {
	const deletedOrganization = await prisma.organization.delete({
		where: {
			id,
		},
		include: {
			field: true,
		},
	})

	await client.del('organizations')
	await client.del(`organizations/${id}`)

	return deletedOrganization
}

export default {
	getAllOrganizations,
	getOneOrganization,
	createOrganization,
	updateOrganization,
	deleteOrganization,
}
