export default class NoteStyle1Edit extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div class="space-y-6">
				<fridge-text-input label="Note Title" id="note-title" name="note-title"></fridge-text-input>
				<fridge-textarea label="Note Content" id="note-content" name="note-content"></fridge-textarea>
			</div>`
	}
}

if (!customElements.get("fridge-note-style-1-edit")) {
	customElements.define("fridge-note-style-1-edit", NoteStyle1Edit);
}
