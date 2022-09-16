import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/', (req, res) => {
	if (req.user) {
		req.logout(error => {
			if (error) console.log(error)
			res.redirect('/')
		})
	}
})

export default router
