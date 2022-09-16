import { PrismaClient } from '@prisma/client'
import exclude from './../utils/exclude.js'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllUsers = async () => {
	const reply = await client.get('users')

	if (reply) return JSON.parse(reply)

	const users = await prisma.user.findMany({
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	const usersWithoutPassword = users.map(user => exclude(user, 'password'))

	await client.set('users', JSON.stringify(usersWithoutPassword), {
		EX: 240,
	})

	return usersWithoutPassword
}

const getOneUser = async id => {
	const reply = await client.get(`users/${id}`)

	if (reply) return JSON.parse(reply)

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	const userWithoutPassword = exclude(user, 'password')

	await client.set(`users/${id}`, JSON.stringify(userWithoutPassword), {
		EX: 240,
	})

	return userWithoutPassword
}

const getOneUserByEmail = async email => {
	const reply = await client.get(`users/${email}`)

	if (reply) return JSON.parse(reply)

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	await client.set(`users/${email}`, JSON.stringify(user), {
		EX: 240,
	})

	return user
}

const getOneUserByGoogleId = async id => {
	const reply = await client.get(`users/${id}`)

	if (reply) return JSON.parse(reply)

	const user = await prisma.user.findFirst({
		where: {
			google_id: id,
		},
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	await client.set(`users/${id}`, JSON.stringify(user), {
		EX: 240,
	})

	return user
}

const createUser = async newUser => {
	const createdUser = await prisma.user.create({
		data: newUser,
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	const createdUserWithoutPassword = exclude(createdUser, 'password')

	await client.del('users')

	return createdUserWithoutPassword
}

const updateUser = async (id, change) => {
	const updatedUser = await prisma.user.update({
		where: {
			id,
		},
		data: change,
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	const updatedUserWithoutPassword = exclude(updatedUser, 'password')

	await client.del('users')
	await client.del(`users/${id}`)
	await client.del(`users/${updatedUserWithoutPassword.email}`)

	return updatedUserWithoutPassword
}

const activeUser = async id => {
	const activedUser = await prisma.user.update({
		where: {
			id,
		},
		data: {
			active: true,
		},
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	const activedUserWithoutPassword = exclude(activedUser, 'password')

	await client.del('users')
	await client.del(`users/${id}`)
	await client.del(`users/${activedUserWithoutPassword.email}`)

	return activedUserWithoutPassword
}

const desactiveUser = async id => {
	const desactivedUser = await prisma.user.update({
		where: {
			id,
		},
		data: {
			active: false,
		},
		include: {
			city: true,
			comment: true,
			hobby: true,
			language: true,
			country: true,
			post: true,
			state: true,
		},
	})

	const desactivedUserWithoutPassword = exclude(desactivedUser, 'password')

	await client.del('users')
	await client.del(`users/${id}`)
	await client.del(`users/${desactivedUserWithoutPassword.email}`)

	return desactivedUserWithoutPassword
}

export default {
	getAllUsers,
	getOneUser,
	getOneUserByEmail,
	getOneUserByGoogleId,
	createUser,
	updateUser,
	activeUser,
	desactiveUser,
}
