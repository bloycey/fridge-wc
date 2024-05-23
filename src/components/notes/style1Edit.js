export default class NoteStyle1Edit extends HTMLElement {
	constructor() {
		super();
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

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div class="space-y-6">
				<fridge-text-input label="Note Title" id="note-title" name="note-title" required="false"></fridge-text-input>
				<fridge-textarea label="Note Content" id="note-content" name="note-content"></fridge-textarea>
			</div>`
	}
}

if (!customElements.get("fridge-note-style-1-edit")) {
	customElements.define("fridge-note-style-1-edit", NoteStyle1Edit);
}
