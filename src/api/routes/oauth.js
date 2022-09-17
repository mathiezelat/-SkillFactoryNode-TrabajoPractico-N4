import { Router } from 'express'
import passport from 'passport'

const router = Router()

router
	.get('/google', passport.authenticate('google'))
	.get('/google/error', (req, res) => {
		const { error } = req.flash()

		if (error) {
			res.render('error', {
				message: 'Al iniciar sesión con Google',
				error: error[0],
			})
		} else {
			res.render('error', {
				message: 'Al iniciar sesión con Google',
				error: 'Error inesperado',
			})
		}
	})
	.get(
		'/google/redirect',
		passport.authenticate('google', {
			successRedirect: '/profile',
			failureRedirect: '/api/oauth/google/error',
			passReqToCallback: true,
		})
	)
	.get('/google/logout', (req, res) => {
		if (req.user) {
			req.logout(error => {
				if (error) console.log(error)
				res.redirect('/api/oauth/google')
			})
		}
	})

export default router
