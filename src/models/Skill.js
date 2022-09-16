import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllSkills = async () => {
	const reply = await client.get('skills')

	if (reply) return JSON.parse(reply)

	const skills = await prisma.skill.findMany({
		include: {
			field: true,
		},
	})

	await client.set('skills', JSON.stringify(skills), {
		EX: 240,
	})

	return skills
}

const getOneSkill = async id => {
	const reply = await client.get(`skills/${id}`)

	if (reply) return JSON.parse(reply)

	const skill = await prisma.skill.findUnique({
		where: {
			id,
		},
		include: {
			field: true,
		},
	})

	await client.set(`skills/${id}`, JSON.stringify(skill), {
		EX: 240,
	})

	return skill
}

const createSkill = async newSkill => {
	const createdSkill = await prisma.skill.create({
		data: newSkill,
		include: {
			field: true,
		},
	})

	await client.del('skills')

	return createdSkill
}

const updateSkill = async (id, change) => {
	const updatedSkill = await prisma.skill.update({
		where: {
			id,
		},
		data: change,
		include: {
			field: true,
		},
	})

	await client.del('skills')
	await client.del(`skills/${id}`)

	return updatedSkill
}

const deleteSkill = async id => {
	const deletedSkill = await prisma.skill.delete({
		where: {
			id,
		},
		include: {
			field: true,
		},
	})

	await client.del('skills')
	await client.del(`skills/${id}`)

	return deletedSkill
}

export default {
	getAllSkills,
	getOneSkill,
	createSkill,
	updateSkill,
	deleteSkill,
}
