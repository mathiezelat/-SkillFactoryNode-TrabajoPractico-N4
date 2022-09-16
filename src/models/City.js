import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllCities = async () => {
	const reply = await client.get('cities')

	if (reply) return JSON.parse(reply)

	const cities = await prisma.city.findMany({
		include: {
			state: {
				include: {
					country: true,
				},
			},
		},
	})

	await client.set('cities', JSON.stringify(cities), {
		EX: 240,
	})

	return cities
}

const getOneCity = async id => {
	const reply = await client.get(`cities/${id}`)

	if (reply) return JSON.parse(reply)

	const city = await prisma.city.findUnique({
		where: {
			id,
		},
		include: {
			state: {
				include: {
					country: true,
				},
			},
		},
	})

	await client.set(`cities/${id}`, JSON.stringify(city), {
		EX: 240,
	})

	return city
}

const createCity = async newCity => {
	const createdCity = await prisma.city.create({
		data: newCity,
		include: {
			state: {
				include: {
					country: true,
				},
			},
		},
	})

	await client.del('cities')

	return createdCity
}

const updateCity = async (id, change) => {
	const updatedCity = await prisma.city.update({
		where: {
			id,
		},
		data: change,
		include: {
			state: {
				include: {
					country: true,
				},
			},
		},
	})

	await client.del('cities')
	await client.del(`cities/${id}`)

	return updatedCity
}

const deleteCity = async () => {
	const deletedCity = await prisma.city.delete({
		where: {
			id,
		},
		include: {
			state: {
				include: {
					country: true,
				},
			},
		},
	})

	await client.del('cities')
	await client.del(`cities/${id}`)

	return deletedCity
}

export default {
	getAllCities,
	getOneCity,
	createCity,
	updateCity,
	deleteCity,
}
