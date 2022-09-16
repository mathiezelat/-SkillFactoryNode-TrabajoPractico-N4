import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllStates = async () => {
	const reply = await client.get('states')

	if (reply) return JSON.parse(reply)

	const states = await prisma.state.findMany({
		include: {
			city: true,
			country: true,
		},
	})

	await client.set('states', JSON.stringify(states), {
		EX: 240,
	})

	return states
}

const getOneState = async id => {
	const reply = await client.get(`states/${id}`)

	if (reply) return JSON.parse(reply)

	const state = await prisma.state.findUnique({
		where: {
			id,
		},
		include: {
			city: true,
			country: true,
		},
	})

	await client.set(`states/${id}`, JSON.stringify(state), {
		EX: 240,
	})

	return state
}

const createState = async newState => {
	const createdState = await prisma.state.create({ data: newState })

	await client.del('states')

	return createdState
}

const updateState = async (id, change) => {
	const updatedState = await prisma.state.update({
		where: {
			id,
		},
		data: change,
		include: {
			city: true,
			country: true,
		},
	})

	await client.del('states')
	await client.del(`states/${id}`)

	return updatedState
}

const deleteState = async id => {
	const deletedState = await prisma.state.delete({
		where: {
			id,
		},
		include: {
			city: true,
			country: true,
		},
	})

	await client.del('states')
	await client.del(`states/${id}`)

	return deletedState
}

export default {
	getAllStates,
	getOneState,
	createState,
	updateState,
	deleteState,
}
