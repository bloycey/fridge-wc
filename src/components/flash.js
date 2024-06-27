import { animate, spring } from "motion"

export default class Flash extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	get text() {
		return this.getAttribute("text") || "";
	}

	async buildHTML() {
		this.innerHTML =  /*html*/ `
		<p class="flash opacity-0 fixed -translate-y-full -top-8 right-4 z-[9999] py-2 px-4 text-white bg-green rounded-md">${this.text}</p>`
		const flash = this.querySelector(".flash")
		flash.addEventListener("click", () => {
			this.remove();
		})
		animate(flash, { opacity: [0, 1], y: 40 }, { easing: spring({ stiffness: 250 }) })
		setTimeout(async () => {
			await animate(flash, { opacity: 0, y: 0 }, { duration: 0.5, easing: spring() }).finished
			this.remove()
		}, 2500)
	}
}

if (!customElements.get("fridge-flash")) {
	customElements.define("fridge-flash", Flash);
}
