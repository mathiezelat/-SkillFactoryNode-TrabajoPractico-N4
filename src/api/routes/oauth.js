import { Router } from 'express'
import passport from 'passport'

const router = Router()

router
	.get('/google', passport.authenticate('google'))
	.get('/google/error', (req, res) => {
		res.send('error google')
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
