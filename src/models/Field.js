import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllFields = async () => {
	const reply = await client.get('fields')

	if (reply) return JSON.parse(reply)

	const fields = await prisma.field.findMany()

	await client.set('fields', JSON.stringify(fields), {
		EX: 240,
	})

	return fields
}

const getOneField = async id => {
	const reply = await client.get(`fields/${id}`)

	if (reply) return JSON.parse(reply)

	const field = await prisma.field.findUnique({
		where: {
			id,
		},
	})

	await client.set(`fields/${id}`, JSON.stringify(field), {
		EX: 240,
	})

	return field
}

const createField = async newField => {
	const createdField = await prisma.field.create({
		data: newField,
	})

	await client.del('fields')

	return createdField
}

const updateField = async (id, change) => {
	const updatedField = await prisma.field.update({
		where: {
			id,
		},
		data: change,
	})

	await client.del('fields')
	await client.del(`fields/${id}`)

	return updatedField
}

const deleteField = async id => {
	const deletedField = await prisma.field.delete({
		where: {
			id,
		},
	})

	await client.del('fields')
	await client.del(`fields/${id}`)

	return deletedField
}

export default {
	getAllFields,
	getOneField,
	createField,
	updateField,
	deleteField,
}
