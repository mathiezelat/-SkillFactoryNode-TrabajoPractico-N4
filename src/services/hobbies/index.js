import Hobby from './../../models/Hobby.js'

const getAllHobbies = () => {
	const hobbies = Hobby.getAllHobbies()
	return hobbies
}

const getOneHobby = id => {
	const hobby = Hobby.getOneHobby(id)
	return hobby
}

const createHobby = newHobby => {
	const hobby = Hobby.createHobby(newHobby)
	return hobby
}

const updateHobby = (id, change) => {
	const hobby = Hobby.updateHobby(id, change)
	return hobby
}

const deleteHobby = id => {
	const hobby = Hobby.deleteHobby(id)
	return hobby
}

export default {
	getAllHobbies,
	getOneHobby,
	createHobby,
	updateHobby,
	deleteHobby,
}
