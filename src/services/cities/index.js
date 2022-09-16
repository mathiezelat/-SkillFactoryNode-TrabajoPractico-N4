import City from '../../models/City.js'

const getAllCities = () => {
	const cities = City.getAllCities()
	return cities
}

const getOneCity = id => {
	const city = City.getOneCity(id)
	return city
}

const createCity = newCity => {
	const city = City.createCity(newCity)
	return city
}

const updateCity = (id, change) => {
	const city = City.updateCity(id, change)
	return city
}

const deleteCity = id => {
	const city = City.deleteCity(id)
	return city
}

export default {
	getAllCities,
	getOneCity,
	createCity,
	updateCity,
	deleteCity,
}
