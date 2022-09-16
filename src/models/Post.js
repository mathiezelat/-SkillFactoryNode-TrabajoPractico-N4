import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { client } from './../redis/client.js'

const getAllPosts = async () => {
	const reply = await client.get('posts')

	if (reply) return JSON.parse(reply)

	const posts = await prisma.post.findMany({
		include: {
			comment: true,
			user: true,
		},
	})

	await client.set('posts', JSON.stringify(posts), {
		EX: 240,
	})

	return posts
}

const getOnePost = async id => {
	const reply = await client.get(`posts/${id}`)

	if (reply) return JSON.parse(reply)

	const post = await prisma.post.findUnique({
		where: {
			id,
		},
		include: {
			comment: true,
			user: true,
		},
	})

	await client.set(`posts/${id}`, JSON.stringify(post), {
		EX: 240,
	})

	return post
}

const createPost = async newPost => {
	const createdPost = await prisma.post.create({
		data: newPost,
		include: {
			comment: true,
			user: true,
		},
	})

	await client.del('posts')

	return createdPost
}

const updatePost = async (id, change) => {
	const updatedPost = await prisma.post.update({
		where: {
			id,
		},
		data: change,
		include: {
			comment: true,
			user: true,
		},
	})

	await client.del('posts')
	await client.del(`posts/${id}`)

	return updatedPost
}

const deletePost = async id => {
	const deletedPost = await prisma.post.delete({
		where: {
			id,
		},
		include: {
			comment: true,
			user: true,
		},
	})

	await client.del('posts')
	await client.del(`posts/${id}`)

	return deletedPost
}

export default {
	getAllPosts,
	getOnePost,
	createPost,
	updatePost,
	deletePost,
}
