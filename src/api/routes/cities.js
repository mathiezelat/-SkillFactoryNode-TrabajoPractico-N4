import { Router } from 'express'
import controller from './../../controllers/cities/index.js'

const router = Router()

router
	.get('/', controller.getAllCities)
	.get('/:id', controller.getOneCity)
	.post('/', controller.createCity)
	.put('/:id', controller.updateCity)
	.delete('/:id', controller.deleteCity)

export default router
