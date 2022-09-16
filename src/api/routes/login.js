import { Router } from 'express'
import passport from 'passport'

const router = Router()

router
	.get('/', (req, res) => {
		res.render('login')
	})
	.get('/error', (req, res) => {
		res.status(400).send('error auth')
	})
	.post(
		'/',
		passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/api/auth/login/error',
			passReqToCallback: true,
		})
	)

export default router
