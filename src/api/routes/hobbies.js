import { Router } from 'express'
import controller from '../../controllers/hobbies/index.js'

const router = Router()

router
	.get('/', controller.getAllHobbies)
	.get('/:id', controller.getOneHobby)
	.post('/', controller.createHobby)
	.put('/:id', controller.updateHobby)
	.delete('/:id', controller.deleteHobby)

export default router
