// perfil, timeline, settings
import { Router } from 'express'
import { isAuthenticated } from './../../middlewares/auth.js'

const router = Router()

router
	.get('/', (req, res) => {
		res.render('index')
	})
	.get('/profile', isAuthenticated, (req, res) => {
		const profile = req.user

		res.render('profile', profile)
	})
	.get('/timeline', isAuthenticated, (req, res) => {
		const profile = req.user

		res.render('timeline', profile)
	})
	.get('/settings', isAuthenticated, (req, res) => {
		const profile = req.user

		res.render('settings', profile)
	})

export default router
