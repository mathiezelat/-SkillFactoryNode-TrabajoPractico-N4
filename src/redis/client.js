import { createClient } from 'redis'

import { REDIS_CLIENT_HOST, REDIS_CLIENT_POST } from './../config.js'

export const client = createClient({
	host: REDIS_CLIENT_HOST,
	post: REDIS_CLIENT_POST,
})
