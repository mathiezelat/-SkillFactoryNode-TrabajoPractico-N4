import State from '../../models/State.js'

const getAllStates = () => {
	const states = State.getAllStates()
	return states
}

const getOneState = id => {
	const state = State.getOneState(id)
	return state
}

const createState = newState => {
	const state = State.createState(newState)
	return state
}

const updateState = (id, change) => {
	const state = State.updateState(id, change)
	return state
}

const deleteState = id => {
	const state = State.deleteState(id)
	return state
}

export default {
	getAllStates,
	getOneState,
	createState,
	updateState,
	deleteState,
}
