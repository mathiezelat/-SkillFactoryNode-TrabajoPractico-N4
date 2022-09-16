import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllLanguages = async () => {
	const reply = await client.get('languages')

	if (reply) return JSON.parse(reply)

	const languages = await prisma.language.findMany()

	await client.set('languages', JSON.stringify(languages), {
		EX: 240,
	})

	return languages
}

const getOneLanguage = async id => {
	const reply = await client.get(`languages/${id}`)

	if (reply) return JSON.parse(reply)

	const language = await prisma.language.findUnique({
		where: {
			id,
		},
	})

	await client.set(`languages/${id}`, JSON.stringify(language), {
		EX: 240,
	})

	return language
}

const createLanguage = async newLanguage => {
	const createdLanguage = await prisma.language.create({
		data: newLanguage,
	})

	await client.del('languages')

	return createdLanguage
}

const updateLanguage = async (id, change) => {
	const updatedLanguage = await prisma.language.update({
		where: {
			id,
		},
		data: change,
	})

	await client.del('languages')
	await client.del(`languages/${id}`)

	return updatedLanguage
}

const deleteLanguage = async id => {
	const deletedLanguage = await prisma.language.delete({
		where: {
			id,
		},
	})

	await client.del('languages')
	await client.del(`languages/${id}`)

	return deletedLanguage
}

export default {
	getAllLanguages,
	getOneLanguage,
	createLanguage,
	updateLanguage,
	deleteLanguage,
}
