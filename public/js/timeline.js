const $form = document.querySelector('#form')
const $posts = document.querySelector('#posts')

const renderPosts = async () => {
	const response = await fetch('/api/posts')

	const posts = await response.json()

	let body = ''

	posts.reverse().forEach(post => {
		body += `<article>
            <h3>${post.user.name} ${post.user.surname} (${post.user.email})</h3>
            <p>${post.body}</p>
			${
				post.multimedia
					? `<img
			src="${post.multimedia}"
			alt="${post.body}"
			width="150px"
			height="150px"
		/>`
					: ''
			}
        </article>`
	})

	$posts.innerHTML = body
}

renderPosts()

$form.addEventListener('submit', event => {
	event.preventDefault()

	const formData = new FormData(event.target)

	const payload = new URLSearchParams(formData)

	fetch(event.target.action, {
		method: 'post',
		body: payload,
	})
		.then(response => response.json())
		.then(() => {
			renderPosts()
			event.target.reset()
		})
		.catch(error => {
			console.error(error)
		})
})
