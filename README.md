# Skill Factory Node - Trabajo Práctico 4 - Mathías Ezequiel Latrónico

## Tareas

En base al repositorio provisto por el profe, finalizar el desarrollo de tal API. 
Requerimientos: 
- Implementar Redis
- Integrar autorizacion local y OAuth
- Implementar vistas con EJS

## Commands

### Install dependencies
```sh
npm install
```

### Start in development mode
```sh
npm run dev
```

### Start in production mode
```sh
npm start
```

### PRISMA

```sh
npx prisma db push
```

```sh
npx prisma generate
```

## Dependencies

### Production

- @prisma/cliente
- bcrypt
- corss
- dotenv
- ejs
- express
- express-session
- https
- passport
- passport-google-oauth20
- passport-local
- redis

### Development 

- morgan
- nodemon
- prisma

# REST Api

## Auth

### Auth Login

`POST /api/auth/login`

```json
{
	"email": "example@mail.com",
	"password": "password"
}
```

### Auth Register

`POST /api/auth/register`

```json
{
	"name": "Example",
	"surname": "Example",
	"email": "example@mail.com",
	"password": "password",
	"avatar": "https://i.imgur.com/TfpCCOA.jpg",
}
```

### OAuth Google

`GET /api/oauth/google`

## Profile (Views)

## Home

`GET /`

### Profile

`GET /profile`

### Timeline

`GET /timeline`

### Settings

`GET /settings`

## Cities (CRUD)

`GET POST /api/cities`

`GET PUT DELETE /api/cities/1`

```json
{
	"name": "Ciudad Autónoma de Buenos Aires",
	"code": "CABA",
	"state_id": 1
}
```

## Comments (CRUD)

`GET POST /api/comments`

`GET PUT DELETE /api/comments/1`

```json
{
	"body": "Example comment",
	"post_id": 1,
	"written_by": "l7nujqhl-il01emnzsb-g8jfuo10e2"
}
```

## Countries (CRUD)

`GET POST /api/countries`

`GET PUT DELETE /api/countries/1`

```json
{
	"name": "Argentina",
	"code": "AR"
}
```

## Fields (CRUD)

`GET POST /api/fields`

`GET PUT DELETE /api/fields/1`

```json
{
	"name": "Technology",
	"type": "Programming"
}
```

## Hobbies (CRUD)

`GET POST /api/hobbies`

`GET PUT DELETE /api/hobbies/1`

```json
{
	"name": "Programming",
	"user_id": "l7nujqhl-il01emnzsb-g8jfuo10e2"
}
```

## Languages (CRUD)

`GET POST /api/languages`

`GET PUT DELETE /api/languages/1`

```json
{
	"name": "English",
	"level": "Native"
}
```

## Organizations (CRUD)

`GET POST /api/organizations`

`GET PUT DELETE /api/organizations/1`

```json
{
	"name": "EXAMPLE COMPANY",
	"website": "https://example.com",
	"type": "PRIVATE",
	"dateOfFounding": "06/11/22",
	"field_id": 1,
	"founder_id": "l7nujqhl-il01emnzsb-g8jfuo10e2"
}
```

## Posts (CRUD)

`GET POST /api/posts`

`GET PUT DELETE /api/posts/1`

```json
{
	"body": "Post example",
	"multimedia": "https://i.imgur.com/TfpCCOA.jpg",
	"author_id": "l7nujqhl-il01emnzsb-g8jfuo10e2"
}
```

## Skills (CRUD)

`GET POST /api/skills`

`GET PUT DELETE /api/skills/1`

```json
{
	"name": "JavaScript",
	"level": "Profesional",
	"type": "Hard Skill",
	"field_id": 1
}
```

## States (CRUD)

`GET POST /api/states`

`GET PUT DELETE /api/states/1`

```json
{
	"name": "Buenos Aires",
	"code": "BA",
	"country_id": 1
}
```

## Users (CRUD)

`GET POST /api/users`

`GET PUT /api/users/l7nujqhl-il01emnzsb-g8jfuo10e2`

`DELETE /api/users/l7nujqhl-il01emnzsb-g8jfuo10e2/active`

`DELETE /api/users/l7nujqhl-il01emnzsb-g8jfuo10e2/desactive`

### Body Required

```json
{
		"name": "Example",
		"surname": "Example",
		"email": "example@mail.com",
		"password": "password",
		"avatar": "https://i.imgur.com/BbXVJI8.png",
}
```

### Body All

```json
{
		"name": "Example",
		"surname": "Example",
		"email": "example@mail.com",
		"password": "password",
		"avatar": "https://i.imgur.com/BbXVJI8.png",
		"birthdate": "1999-11-06",
		"pronouns": "He",
		"nationality": "Argentino",
		"residence": "Argentina",
		"phone": "1140506070",
		"description": "Full Stack Developer",
		"actualJob": "Full Stack",
		"status": "Working",
		"language_id": 1,
		"organization_id": 1,
		"country_id": 1,
		"state_id": 1,
		"city_id": 1
}
```
