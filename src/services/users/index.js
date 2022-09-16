import User from './../../models/User.js'

const getAllUsers = () => {
	const users = User.getAllUsers()
	return users
}

const getOneUser = id => {
	const user = User.getOneUser(id)
	return user
}

const createUser = newUser => {
	const user = User.createUser(newUser)
	return user
}

const updateUser = (id, change) => {
	const user = User.updateUser(id, change)
	return user
}

const desactiveUser = id => {
	const user = User.desactiveUser(id)
	return user
}

const activeUser = id => {
	const user = User.activeUser(id)
	return user
}

export default {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	desactiveUser,
	activeUser,
}
