import "./src/webComponents"
import UniversalRouter from 'universal-router'
import { createBrowserHistory } from 'history';
import { supabase } from "./src/db/supabase";

supabase.auth.onAuthStateChange((event, session) => {
	console.log("event", event)
	console.log("session", session)
})

const history = createBrowserHistory();
const location = history.location;
const app = document.querySelector('#app')

const checkSessionForAuth = async () => {
	const { data, error } = await supabase.auth.getSession()
	if (!data.session) {
		// TODO: Refresh the session??
		window.location.href = "/"
	}
}

const routes = [
	{
		path: '',
		action: () => /*html*/`<fridge-page-index></fridge-page-index>`
	},
	{
		path: '/home',
		async action() {
			await checkSessionForAuth()
			return /*html*/`<fridge-page-home></fridge-page-home>`
		}
	},
	{
		path: '/lists',
		async action() {
			await checkSessionForAuth()
			return /*html*/`<fridge-page-lists></fridge-page-lists>`
		}
	},
	{
		path: '/notes',
		async action() {
			await checkSessionForAuth()
			return /*html*/`<fridge-page-notes></fridge-page-notes>`
		}
	},
	{
		path: '/bills',
		async action() {
			await checkSessionForAuth()
			return /*html*/`<fridge-page-bills></fridge-page-bills>`
		}
	},
	{
		path: '/tasks',
		async action() {
			await checkSessionForAuth()
			return /*html*/`<fridge-page-tasks></fridge-page-tasks>`
		}
	},
	{
		path: '(.*)',
		action: () => '<h1>Not Found</h1>'
	}
]

const router = new UniversalRouter(routes)

console.log("state??", router)

export const render = (pathname) => {
	router.resolve(pathname).then(html => {
		app.innerHTML = html
	})
}

let unlisten = history.listen(({ location, action }) => {
	render(location.pathname);
});

render(location.pathname);

const isExternalPath = path => /^https?:\/\//.test(path);

app.addEventListener('click', event => {
	const target = event.composedPath()[0];
	const getLink = target => {
		if (target.tagName === "A") {
			return target.getAttribute('href')
		}
		if (target.closest('a')) {
			return target.closest('a').getAttribute('href')
		}
		return null;
	}
	const link = getLink(target);
	if (!link || isExternalPath(link)) {
		return;
	}
	event.preventDefault()
	history.push(link);
});
