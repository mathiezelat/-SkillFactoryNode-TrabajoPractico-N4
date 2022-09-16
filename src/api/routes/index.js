import { Router } from 'express'

import loginRoute from './login.js'
import oauthRoute from './oauth.js'
import registerRoute from './register.js'
import logoutRoute from './logout.js'

import citiesRoute from './cities.js'
import commentsRoute from './comments.js'
import countriesRoute from './countries.js'
import fieldsRoute from './fields.js'
import hobbiesRoute from './hobbies.js'
import languagesRoute from './languages.js'
import organizationsRoute from './organizations.js'
import postsRoute from './posts.js'
import skillsRoute from './skills.js'
import statesRoute from './states.js'
import usersRoute from './users.js'

const router = Router()

router
	.use('/auth/login', loginRoute)
	.use('/oauth', oauthRoute)
	.use('/auth/register', registerRoute)
	.use('/auth/logout', logoutRoute)
	.use('/cities', citiesRoute)
	.use('/comments', commentsRoute)
	.use('/countries', countriesRoute)
	.use('/fields', fieldsRoute)
	.use('/hobbies', hobbiesRoute)
	.use('/languages', languagesRoute)
	.use('/organizations', organizationsRoute)
	.use('/posts', postsRoute)
	.use('/skills', skillsRoute)
	.use('/states', statesRoute)
	.use('/users', usersRoute)

export default router
