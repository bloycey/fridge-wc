import scribble from "../../images/fridge-scribble.svg"

export default class NoteStyle1 extends HTMLElement {
	static observedAttributes = ["heading", "body"];

	constructor() {
		super();
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	get heading() {
		return this.getAttribute("heading") || false;
	}

	get body() {
		return this.getAttribute("body") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<article class="p-4 space-y-2">
				${this.heading ? `<h1 class="text-2xl">${this.heading}</h1>` : ""}
				${this.body ? `<p>${this.body}</p>` : ""}
			</article>`
	}
}

if (!customElements.get("fridge-note-style-1")) {
	customElements.define("fridge-note-style-1", NoteStyle1);
}

{/* <img src="${scribble}" alt="Decorative scribble" class="w-full" /> */ }
