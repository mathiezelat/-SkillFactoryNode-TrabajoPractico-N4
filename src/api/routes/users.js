import { Router } from 'express'
import controller from '../../controllers/users/index.js'

const router = Router()

router
	.get('/', controller.getAllUsers)
	.get('/:id', controller.getOneUser)
	.post('/', controller.createUser)
	.put('/:id', controller.updateUser)
	.delete('/:id/active', controller.activeUser)
	.delete('/:id/desactive', controller.desactiveUser)

export default router
