export const debounce = (callback, waitTime) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(...args);
		}, waitTime);
	};
}
