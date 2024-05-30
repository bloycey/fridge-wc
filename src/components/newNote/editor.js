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
		const noteStyle = this.getAttribute("note-style") || "";
		if (noteStyle !== "") {
			return {
				"style-1": "style-1",
				"style-2": "style-2",
				"style-3": "style-1",
			}[noteStyle]
		}
		return ""
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<fridge-note-${this.noteStyle}-edit heading="${this.heading}" body="${this.body}"></fridge-note-${this.noteStyle}-edit>
		`
	}
}

if (!customElements.get("fridge-note-editor")) {
	customElements.define("fridge-note-editor", Editor);
}
