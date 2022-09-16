import service from './../../services/fields/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllFields = async (req, res) => {
	const fields = await service.getAllFields()

	res.status(200).json(fields)
}

const getOneField = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const field = await service.getOneField(Number(id))

	res.status(200).json(field)
}

const createField = async (req, res) => {
	const { name, type } = req.body

	if (!name || !type) {
		return res.status(400).send('Please provide all required fields')
	}

	const newField = {
		name,
		type,
	}

	const createdField = await service.createField(newField)

	res.status(201).json(createdField)
}

const updateField = async (req, res) => {
	const { id } = req.params
	const { name, type } = req.body

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		type,
	}

	const updatedField = await service.updateField(Number(id), change)

	res.status(200).json(updatedField)
}

const deleteField = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedField = await service.deleteField(Number(id))

	res.stauts(200).json(deletedField)
}

export default {
	getAllFields,
	getOneField,
	createField,
	updateField,
	deleteField,
}
