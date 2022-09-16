import { Router } from 'express'
import controller from '../../controllers/languages/index.js'

const router = Router()

router
	.get('/', controller.getAllLanguages)
	.get('/:id', controller.getOneLanguage)
	.post('/', controller.createLanguage)
	.put('/:id', controller.updateLanguage)
	.delete('/:id', controller.deleteLanguage)

export default router
