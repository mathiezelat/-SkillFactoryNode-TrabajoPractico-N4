import https from 'https'
import fs from 'fs'

import { PORT } from './config.js'

import app from './app.js'
import { client } from './redis/client.js'

await client.connect()

if (process.env.NODE_ENV === 'production') {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
} else {
	https
		.createServer(
			{
				key: fs.readFileSync('./src/certs/key.pem'),
				cert: fs.readFileSync('./src/certs/cert.pem'),
			},
			app
		)
		.listen(PORT, () => {
			console.log(`Https server running on port ${PORT}`)
		})
}
