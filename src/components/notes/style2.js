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
			<article class="px-4 py-2">
				<div class="relative">
					<h1 class="before:content-[''] before:size-6 before:inline-block before:absolute before:top-0 before:-left-3 before:bg-bright-pink before:rounded-full before:z-[1] text-[32px]"><span class="relative z-10">${this.heading}</span></h1>
				</div>
			</article>`
	}
}

if (!customElements.get("fridge-note-style-2")) {
	customElements.define("fridge-note-style-2", NoteStyle2);
}
