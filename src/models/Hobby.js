import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllHobbies = async () => {
	const reply = await client.get('hobbies')

	if (reply) return JSON.parse(reply)

	const hobbies = await prisma.hobby.findMany()

	await client.set('hobbies', JSON.stringify(hobbies), {
		EX: 240,
	})

	return hobbies
}

const getOneHobby = async id => {
	const reply = await client.get(`hobbies/${id}`)

	if (reply) return JSON.parse(reply)

	const hobby = await prisma.hobby.findUnique({
		where: {
			id,
		},
	})

	await client.set(`hobbies/${id}`, JSON.stringify(hobby), {
		EX: 240,
	})

	return hobby
}

const createHobby = async newHobby => {
	const createdHobby = await prisma.hobby.create({
		data: newHobby,
	})

	await client.del('hobbies')

	return createdHobby
}

const updateHobby = async (id, change) => {
	const updatedHobby = await prisma.hobby.update({
		where: {
			id,
		},
		data: change,
	})

	await client.del('hobbies')
	await client.del(`hobbies/${id}`)

	return updatedHobby
}

const deleteHobby = async id => {
	const deletedHobby = await prisma.hobby.delete({
		where: {
			id,
		},
	})

	await client.del('hobbies')
	await client.del(`hobbies/${id}`)

	return deletedHobby
}

export default {
	getAllHobbies,
	getOneHobby,
	createHobby,
	updateHobby,
	deleteHobby,
}
