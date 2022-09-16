import { Router } from 'express'
import controller from './../../controllers/comments/index.js'

const router = Router()

router
	.get('/', controller.getAllComments)
	.get('/:id', controller.getOneComment)
	.post('/', controller.createComment)
	.put('/:id', controller.updateComment)
	.delete('/:id', controller.deleteComment)

export default router
