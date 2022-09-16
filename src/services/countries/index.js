import Country from './../../models/Country.js'

const getAllCountries = () => {
	const contries = Country.getAllCountries()
	return contries
}

const getOneCountry = id => {
	const country = Country.getOneCountry(id)
	return country
}

const createCountry = newCountry => {
	const country = Country.createCountry(newCountry)
	return country
}

const updateCountry = (id, change) => {
	const country = Country.updateCountry(id, change)
	return country
}

const deleteCountry = id => {
	const country = Country.deleteCountry(id)
	return country
}

export default {
	getAllCountries,
	getOneCountry,
	createCountry,
	updateCountry,
	deleteCountry,
}
