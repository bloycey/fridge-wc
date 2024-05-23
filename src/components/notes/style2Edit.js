export default class NoteStyle2Edit extends HTMLElement {
	static observedAttributes = ["heading"];

	constructor() {
		super();
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	connectedCallback() {
		const titleInput = this.querySelector("input");
		const newNoteWrapper = document.querySelector("fridge-page-new-note");

		titleInput.addEventListener("input", (e) => {
			newNoteWrapper.setAttribute("heading", e.target.value);
		})
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div class="space-y-6">
				<fridge-text-input label="Note Title" id="note-title" name="note-title" value="${this.heading}"></fridge-text-input>
			</div>`
	}
}

if (!customElements.get("fridge-note-style-2-edit")) {
	customElements.define("fridge-note-style-2-edit", NoteStyle2Edit);
}
