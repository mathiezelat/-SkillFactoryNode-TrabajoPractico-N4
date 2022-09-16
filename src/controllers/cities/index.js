import service from './../../services/cities/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllCities = async (req, res) => {
	const cities = await service.getAllCities()

	res.status(200).json(cities)
}

const getOneCity = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const city = await service.getOneCity(Number(id))

	res.status(200).json(city)
}

const createCity = async (req, res) => {
	const { name, code, state_id } = req.body

	if (!name || !code || !state_id) {
		return res.status(400).send('Please provide all required fields')
	}

	if (!integerRegex.test(state_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const newCity = {
		name,
		code,
		state_id: Number(state_id),
	}

	const createdCity = await service.createCity(newCity)

	res.status(201).json(createdCity)
}

const updateCity = async (req, res) => {
	const { id } = req.params
	const { name, code, state_id } = req.body

	if (!integerRegex.test(id) || !integerRegex.test(state_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		code,
		state_id: Number(state_id),
	}

	const updatedCity = await service.updateCity(Number(id), change)

	res.status(200).json(updatedCity)
}

const deleteCity = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedCity = await service.deleteCity(Number(id))

	res.stauts(200).json(deletedCity)
}

export default {
	getAllCities,
	getOneCity,
	createCity,
	updateCity,
	deleteCity,
}
