export default class Base extends HTMLElement {
	constructor() {
		super();
	}
	fireFlash(text) {
		const flash = document.createElement("fridge-flash");
		flash.setAttribute("text", text);
		document.body.appendChild(flash);
	}
}
