import { Router } from 'express'
import passport from 'passport'

const router = Router()

router
	.get('/', (req, res) => {
		res.render('login')
	})
	.get('/error', (req, res) => {
		const { error } = req.flash()

		if (error) {
			res.render('error', {
				message: 'Al iniciar sesión',
				error: error[0],
			})
		} else {
			res.render('error', {
				message: 'Al iniciar sesión',
				error: 'Error inesperado',
			})
		}
	})
	.post(
		'/',
		passport.authenticate('local-login', {
			successRedirect: '/profile',
			failureRedirect: '/api/auth/login/error',
			failureFlash: true,
			passReqToCallback: true,
		})
	)

export default router
