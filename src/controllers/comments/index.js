import service from './../../services/comments/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllComments = async (req, res) => {
	const comments = await service.getAllComments()

	res.status(200).json(comments)
}

const getOneComment = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const comment = await service.getOneComment(Number(id))

	res.status(200).json(comment)
}

const createComment = async (req, res) => {
	const { body, post_id, written_by } = req.body

	if (!body || !post_id || !written_by) {
		return res.status(400).send('Please provide all required fields')
	}

	if (!integerRegex.test(post_id) || !integerRegex.test(written_by)) {
		return res.status(400).send('Please provide valid id')
	}

	const newComment = {
		body,
		post_id: Number(post_id),
		written_by: Number(written_by),
	}

	const createdComment = await service.createComment(newComment)

	res.status(201).json(createdComment)
}

const updateComment = async (req, res) => {
	const { id } = req.params
	const { body, post_id, written_by } = req.body

	if (
		!integerRegex.test(id) ||
		!integerRegex.test(post_id) ||
		!integerRegex.test(written_by)
	) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		body,
		post_id: Number(post_id),
		written_by: Number(written_by),
	}

	const updatedComment = await service.updateComment(Number(id), change)

	res.status(200).json(updatedComment)
}

const deleteComment = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedComment = await service.deleteComment(Number(id))

	res.stauts(200).json(deletedComment)
}

export default {
	getAllComments,
	getOneComment,
	createComment,
	updateComment,
	deleteComment,
}
