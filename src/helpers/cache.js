
const cacheKey = (id) => `FRIDGE_COMPONENT_CACHE_${id}`;

export const addToCache = (component) => {
	const id = component.getAttribute("id");
	localStorage.setItem(cacheKey(id), component.innerHTML);
}

export const loadFromCache = (component) => {
	const id = component.getAttribute("id");
	if (localStorage.getItem(cacheKey(id))) {
		component.innerHTML = localStorage.getItem(cacheKey(id));
	}
}
