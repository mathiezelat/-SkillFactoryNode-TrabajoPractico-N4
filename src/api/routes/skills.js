import { Router } from 'express'
import controller from './../../controllers/skills/index.js'

const router = Router()

router
	.get('/', controller.getAllSkills)
	.get('/:id', controller.getOneSkill)
	.post('/', controller.createSkill)
	.put('/:id', controller.updateSkill)
	.delete('/:id', controller.deleteSkill)

export default router
