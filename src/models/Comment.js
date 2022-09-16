import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllComments = async () => {
	const reply = await client.get('comments')

	if (reply) return JSON.parse(reply)

	const comments = await prisma.comment.findMany({
		include: {
			post: true,
		},
	})

	await client.set('comments', JSON.stringify(comments), {
		EX: 240,
	})

	return comments
}

const getOneComment = async id => {
	const reply = await client.get(`comments/${id}`)

	if (reply) return JSON.parse(reply)

	const comment = await prisma.comment.findUnique({
		where: {
			id,
		},
		include: {
			post: true,
		},
	})

	await client.set(`comments/${id}`, JSON.stringify(comment), {
		EX: 240,
	})

	return comment
}

const createComment = async newComment => {
	const createdComment = await prisma.comment.create({
		data: newComment,
		include: {
			post: true,
		},
	})

	await client.del('comments')

	return createdComment
}

const updateComment = async (id, change) => {
	const updatedComment = await prisma.comment.update({
		where: {
			id,
		},
		data: change,
		include: {
			post: true,
		},
	})

	await client.del('comments')
	await client.del(`comments/${id}`)

	return updatedComment
}

const deleteComment = async id => {
	const deletedComment = await prisma.comment.delete({
		where: {
			id,
		},
		include: {
			post: true,
		},
	})

	await client.del('comments')
	await client.del(`comments/${id}`)

	return deletedComment
}

export default {
	getAllComments,
	getOneComment,
	createComment,
	updateComment,
	deleteComment,
}
