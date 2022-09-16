import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllCountries = async () => {
	const reply = await client.get('countries')

	if (reply) return JSON.parse(reply)

	const countries = await prisma.country.findMany({
		include: {
			state: {
				include: {
					country: true,
					city: true,
				},
			},
		},
	})

	await client.set('countries', JSON.stringify(countries), {
		EX: 240,
	})

	return countries
}

const getOneCountry = async id => {
	const reply = await client.get(`countries/${id}`)

	if (reply) return JSON.parse(reply)

	const country = await prisma.country.findUnique({
		where: {
			id,
		},
		include: {
			state: {
				include: {
					country: true,
					city: true,
				},
			},
		},
	})

	await client.set(`countries/${id}`, JSON.stringify(country), {
		EX: 240,
	})

	return country
}

const createCountry = async newCountry => {
	const createdCountry = await prisma.country.create({
		data: newCountry,
		include: {
			state: {
				include: {
					country: true,
					city: true,
				},
			},
		},
	})

	await client.del('countries')

	return createdCountry
}

const updateCountry = async (id, change) => {
	const updatedCountry = await prisma.country.update({
		where: {
			id,
		},
		data: change,
		include: {
			state: {
				include: {
					country: true,
					city: true,
				},
			},
		},
	})

	await client.del('countries')
	await client.del(`countries/${id}`)

	return updatedCountry
}

const deleteCountry = async id => {
	const deletedCountry = await prisma.country.delete({
		where: {
			id,
		},
		include: {
			state: {
				include: {
					country: true,
					city: true,
				},
			},
		},
	})

	await client.del('countries')
	await client.del(`countries/${id}`)

	return deletedCountry
}

export default {
	getAllCountries,
	getOneCountry,
	createCountry,
	updateCountry,
	deleteCountry,
}
