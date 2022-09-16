import dotenv from 'dotenv'

dotenv.config()

export const {
	PORT = 3000,
	SESSION_SECRET = 'secreto',
	REDIS_CLIENT_HOST = 'localhost',
	REDIS_CLIENT_POST = 6379,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_CLIENT_REDIRECT,
} = process.env
