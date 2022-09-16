import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

import User from './../models/User.js'

import { uniqueID } from './../utils/uniqueID.js'

import {
	avatarRegex,
	dateRegex,
	phoneRegex,
	emailRegex,
} from './../utils/regex.js'

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.getOneUser(id)
	done(null, user)
})

passport.use(
	'local-register',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const {
					name,
					surname,
					avatar,
					birthdate,
					pronouns,
					nationality,
					residence,
					phone,
					description,
					actualJob,
					status,
					language_id,
					country_id,
					state_id,
					city_id,
					organization_id,
				} = req.body

				if (!name || !surname || !avatar) {
					return done(null, false, {
						message:
							'Fields are required: name, surname, email and avatar',
					})
				}

				if (!email || !passport) {
					return done(null, false, {
						message: 'Email and password are required',
					})
				}

				if (phone) {
					if (!phoneRegex.test(phone)) {
						return done(null, false, {
							message: 'Please provide a valid phone',
						})
					}
				}

				if (birthdate) {
					if (!dateRegex.test(birthdate)) {
						return done(null, false, {
							message: 'Please provide a valid birthdate',
						})
					}
				}

				if (!emailRegex.test(email) || !avatarRegex.test(avatar)) {
					return done(null, false, {
						message: 'Please provide a valid data',
					})
				}

				const user = await User.getOneUserByEmail(email)

				if (user) {
					return done(null, false, {
						message: 'Email is already exists',
					})
				}

				const newUser = {
					name,
					surname,
					email,
					avatar,
					birthdate,
					pronouns,
					nationality,
					residence,
					phone,
					description,
					actualJob,
					status,
					language_id,
					country_id,
					state_id,
					city_id,
					organization_id,
				}

				const salt = await bcrypt.genSalt(10)

				const hash = await bcrypt.hash(password, salt)

				newUser.id = uniqueID()
				newUser.password = hash

				const createdUser = await User.createUser(newUser)

				done(null, createdUser)
			} catch (error) {
				done(error)
			}
		}
	)
)

passport.use(
	'local-login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				if (!email || !password) {
					return done(null, false, {
						message: 'Email and password are required',
					})
				}

				if (!emailRegex.test(email)) {
					return done(null, false, {
						message: 'Please provide a valid email',
					})
				}

				const user = await User.getOneUserByEmail(email)

				if (!user) {
					return done(null, false, { message: 'User does not exist' })
				}

				const isPasswordValid = await bcrypt.compare(
					password,
					user.password
				)

				if (!isPasswordValid) {
					return done(null, false, {
						message: 'Password does not match',
					})
				}

				done(null, user)
			} catch (error) {
				done(error)
			}
		}
	)
)

export default passport
