import service from '../../services/states/index.js'
import { integerRegex } from '../../utils/regex.js'

const getAllStates = async (req, res) => {
	const states = await service.getAllStates()

	res.status(200).json(states)
}

const getOneState = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}
	const state = await service.getOneState(Number(id))

	res.status(200).json(state)
}

const createState = async (req, res) => {
	const { name, code, country_id } = req.body

	if (!name || !code || !country_id) {
		return res.status(400).send('Please provide all required fields')
	}

	if (!integerRegex.test(country_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const newState = {
		name,
		code,
		country_id: Number(country_id),
	}

	const createdState = await service.createState(newState)

	res.status(201).json(createdState)
}

const updateState = async (req, res) => {
	const { id } = req.params
	const { name, code, country_id } = req.body

	if (!integerRegex.test(id) || !integerRegex.test(country_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		code,
		country_id: Number(country_id),
	}

	const updatedState = await service.updateState(Number(id), change)

	res.status(200).json(updatedState)
}

const deleteState = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedState = await service.deleteState(Number(id))

	res.stauts(200).json(deletedState)
}

export default {
	getAllStates,
	getOneState,
	createState,
	updateState,
	deleteState,
}
