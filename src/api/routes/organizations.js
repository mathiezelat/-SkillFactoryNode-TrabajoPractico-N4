import { Router } from 'express'
import controller from '../../controllers/organizations/index.js'

const router = Router()

router
	.get('/', controller.getAllOrganizations)
	.get('/:id', controller.getOneOrganization)
	.post('/', controller.createOrganization)
	.put('/:id', controller.updateOrganization)
	.delete('/:id', controller.deleteOrganization)

export default router
