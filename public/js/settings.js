const $form = document.querySelector('#form')

const $languages = document.querySelector('#languages')
const $countries = document.querySelector('#countries')
const $states = document.querySelector('#states')
const $cities = document.querySelector('#cities')
const $organizations = document.querySelector('#organizations')

$form.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const payload = new URLSearchParams(formData)

	fetch(event.target.action, {
		method: 'put',
		body: payload,
	})
		.then(response => response.json())
		.then(() => {
			window.location.replace('/profile')
		})
		.catch(error => {
			console.error(error)
		})
})

const getApi = async () => {
	const responses = await Promise.all([
		fetch('/api/languages'),
		fetch('/api/countries'),
		fetch('/api/states'),
		fetch('/api/cities'),
		fetch('/api/organizations'),
	])

	const [languages, countries, states, cities, organizations] =
		await Promise.all(responses.map(response => response.json()))

	return { languages, countries, states, cities, organizations }
}

const renderSelects = async () => {
	const { languages, countries, states, cities, organizations } =
		await getApi()

	let languagesHTML = ''
	let countriesHTML = ''
	let statesHTML = ''
	let citiesHTML = ''
	let organizationsHTML = ''

	languages.forEach(language => {
		languagesHTML += `<option value="${language.id}">${language.name} ${language.level}</option>`
	})

	countries.forEach(country => {
		countriesHTML += `<option value="${country.id}">${country.name}</option>`
	})

	states.forEach(state => {
		statesHTML += `<option value="${state.id}">${state.name}</option>`
	})

	cities.forEach(city => {
		citiesHTML += `<option value="${city.id}">${city.name}</option>`
	})

	organizations.forEach(organization => {
		organizationsHTML += `<option value="${organization.id}">${organization.name}</option>`
	})

	languagesHTML += '<option></option>'
	countriesHTML += '<option></option>'
	statesHTML += '<option></option>'
	citiesHTML += '<option></option>'
	organizationsHTML += '<option></option>'

	$languages.innerHTML = languagesHTML
	$countries.innerHTML = countriesHTML
	$states.innerHTML = statesHTML
	$cities.innerHTML = citiesHTML
	$organizations.innerHTML = organizationsHTML
}

renderSelects()
