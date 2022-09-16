import { Router } from 'express'
import passport from 'passport'

const router = Router()

router
	.get('/', (req, res) => {
		res.render('register')
	})
	.get('/error', (req, res) => {
		res.status(400).send('error auth')
	})
	.post(
		'/',
		passport.authenticate('local-register', {
			successRedirect: '/profile',
			failureRedirect: '/api/auth/register/error',
			passReqToCallback: true,
		})
	)

export default router
