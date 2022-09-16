import Organization from '../../models/Organization.js'

const getAllOrganizations = () => {
	const organizations = Organization.getAllOrganizations()
	return organizations
}

const getOneOrganization = id => {
	const organization = Organization.getOneOrganization(id)
	return organization
}

const createOrganization = newOrganization => {
	const organization = Organization.createOrganization(newOrganization)
	return organization
}

const updateOrganization = (id, change) => {
	const organization = Organization.updateOrganization(id, change)
	return organization
}

const deleteOrganization = id => {
	const organization = Organization.deleteOrganization(id)
	return organization
}

export default {
	getAllOrganizations,
	getOneOrganization,
	createOrganization,
	updateOrganization,
	deleteOrganization,
}
