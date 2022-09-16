import bcrypt from 'bcrypt'
import service from '../../services/users/index.js'

import {
	avatarRegex,
	emailRegex,
	phoneRegex,
	dateRegex,
	integerRegex,
} from './../../utils/regex.js'

import { uniqueID } from '../../utils/uniqueId.js'

const getAllUsers = async (req, res) => {
	const users = await service.getAllUsers()
	res.status(200).json(users)
}

const getOneUser = async (req, res) => {
	const user = await service.getOneUser(req.params.id)
	res.status(200).json(user)
}

const createUser = async (req, res) => {
	const {
		name,
		surname,
		email,
		password,
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
		return res.status(400).send('Please provide all required fields')
	}

	if (!email || !password) {
		return done(null, false, {
			message: 'Email and password are required',
		})
	}

	if (phone) {
		if (!phoneRegex.test(phone)) {
			return res.status(400).send('Please provide a valid phone')
		}
	}

	if (birthdate) {
		if (!dateRegex.test(birthdate)) {
			return res.status(400).send('Please provide a valid birthdate')
		}
	}

	if (!emailRegex.test(email) || !avatarRegex.test(avatar)) {
		return res.status(400).send('Please provide a valid data')
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
	}

	if (language_id) {
		if (!integerRegex.test(language_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.language_id = Number(language_id)
	}
	if (country_id) {
		if (!integerRegex.test(country_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.country_id = Number(country_id)
	}
	if (state_id) {
		if (!integerRegex.test(state_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.state_id = Number(state_id)
	}
	if (city_id) {
		if (!integerRegex.test(city_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.city_id = Number(city_id)
	}
	if (organization_id) {
		if (!integerRegex.test(organization_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.organization_id = Number(organization_id)
	}

	const salt = await bcrypt.genSalt(10)

	const hash = await bcrypt.hash(password, salt)

	newUser.id = uniqueID()
	newUser.password = hash

	const user = await service.createUser(newUser)

	res.status(200).json(user)
}

const updateUser = async (req, res) => {
	const { id } = req.params
	const {
		name,
		surname,
		email,
		password,
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

	if (email) {
		if (!emailRegex.test(email)) {
			return res.status(400).send('Please provide a valid data')
		}
	}

	if (avatar) {
		if (!avatarRegex.test(avatar)) {
			return res.status(400).send('Please provide a valid data')
		}
	}

	if (phone) {
		if (!phoneRegex.test(phone)) {
			return res.status(400).send('Please provide a valid phone')
		}
	}

	if (birthdate) {
		if (!dateRegex.test(birthdate)) {
			return res.status(400).send('Please provide a valid birthdate')
		}
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
	}

	if (language_id) {
		if (!integerRegex.test(language_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.language_id = Number(language_id)
	}
	if (country_id) {
		if (!integerRegex.test(country_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.country_id = Number(country_id)
	}
	if (state_id) {
		if (!integerRegex.test(state_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.state_id = Number(state_id)
	}
	if (city_id) {
		if (!integerRegex.test(city_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.city_id = Number(city_id)
	}
	if (organization_id) {
		if (!integerRegex.test(organization_id)) {
			return res.status(400).send('Please provide valid id')
		}
		newUser.organization_id = Number(organization_id)
	}
	if (password) {
		const salt = await bcrypt.genSalt(10)

		const hash = await bcrypt.hash(password, salt)

		newUser.password = hash
	}

	const user = await service.updateUser(id, newUser)

	res.status(200).json(user)
}

const activeUser = async (req, res) => {
	const { id } = req.params

	const activedUser = await service.activeUser(id)

	res.status(200).json(activedUser)
}

const desactiveUser = async (req, res) => {
	const { id } = req.params

	const desactivedUser = await service.desactiveUser(id)

	res.status(200).json(desactivedUser)
}

export default {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	activeUser,
	desactiveUser,
}
