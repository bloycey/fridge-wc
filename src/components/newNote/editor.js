export default class Editor extends HTMLElement {
	static observedAttributes = ["note-style"];

	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const titleInput = this.querySelector("fridge-text-input input");
		const contentInput = this.querySelector("fridge-textarea textarea");
		const preview = document.querySelector("fridge-new-note-preview");

		titleInput.addEventListener("input", (e) => {
			preview.setAttribute("heading", e.target.value);
		})

		contentInput.addEventListener("input", (e) => {
			preview.setAttribute("body", e.target.value);
		})
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	get noteStyle() {
		return this.getAttribute("note-style") || "";
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<fridge-note-${this.noteStyle}-edit></fridge-note-${this.noteStyle}-edit>
		`
	}
}

if (!customElements.get("fridge-new-note-editor")) {
	customElements.define("fridge-new-note-editor", Editor);
}
