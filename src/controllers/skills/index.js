import service from './../../services/skills/index.js'
import { integerRegex } from './../../utils/regex.js'

const getAllSkills = async (req, res) => {
	const skills = await service.getAllSkills()

	res.status(200).json(skills)
}

const getOneSkill = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const skill = await service.getOneSkill(Number(id))

	res.status(200).json(skill)
}

const createSkill = async (req, res) => {
	const { name, level, type, field_id } = req.body

	if (!name || !level || !type || !field_id) {
		return res
			.status(400)
			.send('Required fields: name, level, type and field_id')
	}

	if (!integerRegex.test(field_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const newSkill = {
		name,
		level,
		type,
		field_id: Number(field_id),
	}

	const createdSkill = await service.createSkill(newSkill)

	res.status(201).json(createdSkill)
}

const updateSkill = async (req, res) => {
	const { id } = req.params
	const { name, level, type, field_id } = req.body

	if (!integerRegex.test(id) || !integerRegex.test(field_id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		level,
		type,
		field_id: Number(field_id),
	}

	const updatedSkill = await service.updateSkill(Number(id), change)

	res.status(200).json(updatedSkill)
}

const deleteSkill = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedSkill = await service.deleteSkill(Number(id))

	res.stauts(200).json(deletedSkill)
}

export default {
	getAllSkills,
	getOneSkill,
	createSkill,
	updateSkill,
	deleteSkill,
}
