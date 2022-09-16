import Field from './../../models/Field.js'

const getAllFields = () => {
	const fields = Field.getAllFields()
	return fields
}

const getOneField = id => {
	const field = Field.getOneField(id)
	return field
}

const createField = newField => {
	const field = Field.createField(newField)
	return field
}

const updateField = (id, change) => {
	const field = Field.updateField(id, change)
	return field
}

const deleteField = id => {
	const field = Field.deleteField(id)
	return field
}

export default {
	getAllFields,
	getOneField,
	createField,
	updateField,
	deleteField,
}
