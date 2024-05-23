export default class Editor extends HTMLElement {
	static observedAttributes = ["note-style"];

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

	get body() {
		return this.getAttribute("body") || "";
	}

	get noteStyle() {
		return this.getAttribute("note-style") || "";
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<fridge-note-${this.noteStyle}-edit heading="${this.heading}" body="${this.body}"></fridge-note-${this.noteStyle}-edit>
		`
	}
}

if (!customElements.get("fridge-new-note-editor")) {
	customElements.define("fridge-new-note-editor", Editor);
}
