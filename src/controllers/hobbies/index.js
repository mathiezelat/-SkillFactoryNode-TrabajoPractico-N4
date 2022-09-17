import service from './../../services/hobbies/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllHobbies = async (req, res) => {
	const hobbies = await service.getAllHobbies()

	res.status(200).json(hobbies)
}

const getOneHobby = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const hobby = await service.getOneHobby(Number(id))

	res.status(200).json(hobby)
}

const createHobby = async (req, res) => {
	const { name, user_id } = req.body

	if (!name || !user_id) {
		return res.status(400).send('Required fields: name and user_id')
	}

	if (!integerRegex.test(user_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const newHobby = {
		name,
		user_id: Number(user_id),
	}

	const createdHobby = await service.createHobby(newHobby)

	res.status(201).json(createdHobby)
}

const updateHobby = async (req, res) => {
	const { id } = req.params
	const { name, user_id } = req.body

	if (!integerRegex.test(id) || !integerRegex.test(user_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		user_id: Number(user_id),
	}

	const updatedHobby = await service.updateHobby(Number(id), change)

	res.status(200).json(updatedHobby)
}

const deleteHobby = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedHobby = await service.deleteHobby(Number(id))

	res.stauts(200).json(deletedHobby)
}

export default {
	getAllHobbies,
	getOneHobby,
	createHobby,
	updateHobby,
	deleteHobby,
}
