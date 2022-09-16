import { Router } from 'express'
import controller from './../../controllers/states/index.js'

const router = Router()

router
	.get('/', controller.getAllStates)
	.get('/:id', controller.getOneState)
	.post('/', controller.createState)
	.put('/:id', controller.updateState)
	.delete('/:id', controller.deleteState)

export default router
