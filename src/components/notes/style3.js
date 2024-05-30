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
			<article class="shadow-sm relative text-white">
				<div class="bg-green rounded-sm px-4 py-3">
					${this.heading ? `<h1 class="text-xl">${this.heading}</h1>` : ""}
					<p class="text-sm">${this.body}</p>
				</div>
			</article>`
	}
}

if (!customElements.get("fridge-note-style-3")) {
	customElements.define("fridge-note-style-3", NoteStyle3);
}
