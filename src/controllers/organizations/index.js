import service from './../../services/organizations/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllOrganizations = async (req, res) => {
	const organizations = await service.getAllOrganizations()

	res.status(200).json(organizations)
}

const getOneOrganization = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const organization = await service.getOneOrganization(Number(id))

	res.status(200).json(organization)
}

const createOrganization = async (req, res) => {
	const { name, website, type, dateOfFounding, field_id, founder_id } =
		req.body

	if (!name || !website || !type || !dateOfFounding || !field_id) {
		return res.status(400).send('Please provide all required fields')
	}

	if (!integerRegex.test(field_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const newOrganization = {
		name,
		website,
		type,
		dateOfFounding,
		field_id: Number(field_id),
		founder_id: founder_id,
	}

	const createdOrganization = await service.createOrganization(
		newOrganization
	)

	res.status(201).json(createdOrganization)
}

const updateOrganization = async (req, res) => {
	const { id } = req.params
	const { name, website, type, dateOfFounding, field_id, founder_id } =
		req.body

	if (!integerRegex.test(id) || !integerRegex.test(field_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		website,
		type,
		dateOfFounding,
		field_id: Number(field_id),
		founder_id: founder_id,
	}

	const updatedOrganization = await service.updateOrganization(
		Number(id),
		change
	)

	res.status(200).json(updatedOrganization)
}

const deleteOrganization = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedOrganization = await service.deleteOrganization(Number(id))

	res.stauts(200).json(deletedOrganization)
}

export default {
	getAllOrganizations,
	getOneOrganization,
	createOrganization,
	updateOrganization,
	deleteOrganization,
}
