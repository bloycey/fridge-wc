
const cacheKey = (id) => `FRIDGE_COMPONENT_CACHE_${id}`;

export const addToCache = (component) => {
	const id = component.getAttribute("id");
	localStorage.setItem(cacheKey(id), component.innerHTML);
	console.log("Added to cache", id);
}

export const loadFromCache = (component) => {
	const id = component.getAttribute("id");
	if (localStorage.getItem(cacheKey(id))) {
		component.innerHTML = localStorage.getItem(cacheKey(id));
	}
	console.log("Loaded from cache", id);
}

export const watchForChanges = (component) => {
	component.observer = new MutationObserver((mutationList, observer) => {
		addToCache(component)
	})
	component.observer.observe(component, { attributes: true, childList: true, subtree: true })
}

export const unwatch = (component) => {
	component.observer.disconnect()
}
