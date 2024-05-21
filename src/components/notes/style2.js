export default class NoteStyle2 extends HTMLElement {
	static observedAttributes = ["heading"];

	constructor() {
		super();
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<article class="p-6">
				<div class="relative">
					<h1 class="before:content-[''] before:size-8 before:inline-block before:absolute before:top-0 before:-left-3 before:bg-bright-pink before:rounded-full before:z-[-1] text-[40px] z-50">${this.heading}</h1>
				</div>
			</article>`
	}
}

if (!customElements.get("fridge-note-2")) {
	customElements.define("fridge-note-2", NoteStyle2);
}
