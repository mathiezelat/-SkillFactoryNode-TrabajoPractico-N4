import { Router } from 'express'
import controller from '../../controllers/posts/index.js'

const router = Router()

router
	.get('/', controller.getAllPosts)
	.get('/:id', controller.getOnePost)
	.post('/', controller.createPost)
	.put('/:id', controller.updatePost)
	.delete('/:id', controller.deletePost)

export default router
