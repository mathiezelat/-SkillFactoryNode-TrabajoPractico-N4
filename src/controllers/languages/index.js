import service from '../../services/languages/index.js'
import { integerRegex } from '../../utils/regex.js'

const getAllLanguages = async (req, res) => {
	const languages = await service.getAllLanguages()

	res.status(200).json(languages)
}

const getOneLanguage = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const language = await service.getOneLanguage(Number(id))

	res.status(200).json(language)
}

const createLanguage = async (req, res) => {
	const { name, level } = req.body

	if (!name || !level) {
		return res.status(400).send('Please provide all required fields')
	}

	const newLanguage = {
		name,
		level,
	}

	const createdLanguage = await service.createLanguage(newLanguage)

	res.status(201).json(createdLanguage)
}

const updateLanguage = async (req, res) => {
	const { id } = req.params
	const { name, level } = req.body

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const change = {
		name,
		level,
	}

	const updatedLanguage = await service.updateLanguage(Number(id), change)

	res.status(200).json(updatedLanguage)
}

const deleteLanguage = async (req, res) => {
	const { id } = req.params

	if (!integerRegex.test(id)) {
		return res.status(400).send('Please provide valid id')
	}

	const deletedLanguage = await service.deleteLanguage(id)

	res.stauts(200).json(deletedLanguage)
}

export default {
	getAllLanguages,
	getOneLanguage,
	createLanguage,
	updateLanguage,
	deleteLanguage,
}
