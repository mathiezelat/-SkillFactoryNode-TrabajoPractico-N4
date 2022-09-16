export const uniqueID = () => {
	const now = new Date().getTime()

	const random = () => Math.random().toString(36).slice(2)

	const firstRandomNumber = random()
	const secondRandomNumber = random()

	const nowToString = now.toString(36)

	const hash = `${nowToString}-${firstRandomNumber}-${secondRandomNumber}`

	return hash
}
