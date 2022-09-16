import Comment from '../../models/Comment.js'

const getAllComments = () => {
	const comments = Comment.getAllComments()
	return comments
}

const getOneComment = id => {
	const comment = Comment.getOneComment(id)
	return comment
}

const createComment = newComment => {
	const comment = Comment.createComment(newComment)
	return comment
}

const updateComment = (id, change) => {
	const comment = Comment.updateComment(id, change)
	return comment
}

const deleteComment = id => {
	const comment = Comment.deleteComment(id)
	return comment
}

export default {
	getAllComments,
	getOneComment,
	createComment,
	updateComment,
	deleteComment,
}
