import Language from '../../models/Language.js'

const getAllLanguages = () => {
	const languages = Language.getAllLanguages()
	return languages
}

const getOneLanguage = id => {
	const language = Language.getOneLanguage(id)
	return language
}

const createLanguage = newLanguage => {
	const language = Language.createLanguage(newLanguage)
	return language
}

const updateLanguage = (id, change) => {
	const language = Language.updateLanguage(id, change)
	return language
}

const deleteLanguage = id => {
	const language = Language.deleteLanguage(id)
	return language
}

export default {
	getAllLanguages,
	getOneLanguage,
	createLanguage,
	updateLanguage,
	deleteLanguage,
}
