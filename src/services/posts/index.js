import Post from './../../models/Post.js'

const getAllPosts = () => {
	const posts = Post.getAllPosts()
	return posts
}

const getOnePost = id => {
	const post = Post.getOnePost(id)
	return post
}

const createPost = newPost => {
	const post = Post.createPost(newPost)
	return post
}

const updatePost = (id, change) => {
	const post = Post.updatePost(id, change)
	return post
}

const deletePost = id => {
	const post = Post.deletePost(id)
	return post
}

export default {
	getAllPosts,
	getOnePost,
	createPost,
	updatePost,
	deletePost,
}
