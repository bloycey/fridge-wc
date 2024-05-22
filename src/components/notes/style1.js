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
			<article class="p-6">
				${this.heading ? `<h1 class="text-3xl mb-2">${this.heading}</h1>` : ""}
				<p class="mb-4">${this.body}</p>
				<img src="${scribble}" alt="Decorative scribble" class="w-full" />
			</article>`
	}
}

if (!customElements.get("fridge-note-style-1")) {
	customElements.define("fridge-note-style-1", NoteStyle1);
}
