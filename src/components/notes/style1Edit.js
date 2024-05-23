export default class NoteStyle1Edit extends HTMLElement {
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
		const contentInput = this.querySelector("textarea");
		const newNoteWrapper = document.querySelector("fridge-page-new-note");

		titleInput.addEventListener("input", (e) => {
			newNoteWrapper.setAttribute("heading", e.target.value);
		})

		contentInput.addEventListener("input", (e) => {
			newNoteWrapper.setAttribute("body", e.target.value);
		})
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	get body() {
		return this.getAttribute("body") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div class="space-y-6">
				<fridge-text-input label="Note Title" id="note-title" name="heading" required="false" value="${this.heading}"></fridge-text-input>
				<fridge-textarea label="Note Content" id="note-content" name="text" value="${this.body}"></fridge-textarea>
			</div>`
	}
}

if (!customElements.get("fridge-note-style-1-edit")) {
	customElements.define("fridge-note-style-1-edit", NoteStyle1Edit);
}
