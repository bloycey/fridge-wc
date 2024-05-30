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
			<article class="border-l-4 border-dark-green shadow-sm relative">
				<div class="bg-light-green rounded-md rounded-tl-none rounded-bl-none px-4 py-3">
					${this.heading ? `<h1 class="text-xl">${this.heading}</h1>` : ""}
					${this.body ? `<p class="text-sm">${this.body}</p>` : ""}
				</div>
			</article>`
	}
}

if (!customElements.get("fridge-note-style-1")) {
	customElements.define("fridge-note-style-1", NoteStyle1);
}

{/* <img src="${scribble}" alt="Decorative scribble" class="w-full" /> */ }
{/* <div class="bg-white border border-dark-green shadow-lg rounded-md p-4"> */ }
