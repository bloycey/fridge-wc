export default class NoteStyle3 extends HTMLElement {
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
			<article class="bg-darkest-green text-white">
				<div class="px-6 py-8">
					${this.heading ? `<h1 class="text-2xl mb-3">${this.heading}</h1>` : ""}
					<p>${this.body}</p>
				</div>
			</article>`
	}
}

if (!customElements.get("fridge-note-style-3")) {
	customElements.define("fridge-note-style-3", NoteStyle3);
}
