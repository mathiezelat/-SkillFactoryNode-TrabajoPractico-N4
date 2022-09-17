import service from './../../services/posts/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllPosts = async (req, res) => {
	const posts = await service.getAllPosts()

	res.status(200).json(posts)
}

const getOnePost = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const post = await service.getOnePost(Number(id))

	res.status(200).json(post)
}

const createPost = async (req, res) => {
	const { body, multimedia, author_id } = req.body

	if (!body || !author_id) {
		return res.status(400).send('Required fields: body and author_id')
	}

	const newPost = {
		body,
		multimedia,
		author_id,
	}

	const createdPost = await service.createPost(newPost)

	res.status(201).json(createdPost)
}

const updatePost = async (req, res) => {
	const { id } = req.params
	const { body, multimedia, author_id } = req.body

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		body,
		multimedia,
		author_id,
	}

	const updatedPost = await service.updatePost(Number(id), change)

	res.status(200).json(updatedPost)
}

const deletePost = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedPost = await service.deletePost(Number(id))

	res.stauts(200).json(deletedPost)
}

export default {
	getAllPosts,
	getOnePost,
	createPost,
	updatePost,
	deletePost,
}
