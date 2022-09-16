import Skill from './../../models/Skill.js'

const getAllSkills = () => {
	const skills = Skill.getAllSkills()
	return skills
}

const getOneSkill = id => {
	const skill = Skill.getOneSkill(id)
	return skill
}

const createSkill = newSkill => {
	const skill = Skill.createSkill(newSkill)
	return skill
}

const updateSkill = (id, change) => {
	const skill = Skill.updateSkill(id, change)
	return skill
}

const deleteSkill = id => {
	const skill = Skill.deleteSkill(id)
	return skill
}

export default {
	getAllSkills,
	getOneSkill,
	createSkill,
	updateSkill,
	deleteSkill,
}
