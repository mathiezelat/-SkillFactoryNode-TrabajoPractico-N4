import service from '../../services/countries/index.js'
import { integerRegex } from '../../utils/regex.js'

const getAllCountries = async (req, res) => {
	const countries = await service.getAllCountries()

	res.status(200).json(countries)
}

const getOneCountry = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const country = await service.getOneCountry(Number(id))

	res.status(200).json(country)
}

const createCountry = async (req, res) => {
	const { name, code } = req.body

	if (!name || !code) {
		return res.status(400).send('Please provide all required fields')
	}

	const newCountry = {
		name,
		code,
	}

	const createdCountry = await service.createCountry(newCountry)

	res.status(201).json(createdCountry)
}

const updateCountry = async (req, res) => {
	const { id } = req.params
	const { name, code } = req.body

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		code,
	}

	const updatedCountry = await service.updateCountry(Number(id), change)

	res.status(200).json(updatedCountry)
}

const deleteCountry = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedCountry = await service.deleteCountry(Number(id))

	res.stauts(200).json(deletedCountry)
}

export default {
	getAllCountries,
	getOneCountry,
	createCountry,
	updateCountry,
	deleteCountry,
}
