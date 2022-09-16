import { createClient } from 'redis'

import { REDIS_CLIENT_URL } from './../config.js'

export const client = createClient({
	url: REDIS_CLIENT_URL,
})
