export default class Preview extends HTMLElement {
	static observedAttributes = ["note-style", "heading", "body"];

	constructor() {
		super();
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	get noteStyle() {
		return this.getAttribute("note-style") || "style-1";
	}

	get heading() {
		return this.getAttribute("heading") || false;
	}

	get body() {
		return this.getAttribute("body") || false;
	}

	buildHTML() {
		if (!this.heading && !this.body) {
			this.innerHTML = /*html*/`
				<p>Write your post first, and then come back here to preview!</p>
			`
		} else {
			this.innerHTML = /*html*/`
				<fridge-note-${this.noteStyle} ${this.heading ? `heading="${this.heading}"` : ""} ${this.body ? `body="${this.body}"` : ""}></fridge-note-${this.noteStyle}>
			`
		}
	}
}

if (!customElements.get("fridge-new-note-preview")) {
	customElements.define("fridge-new-note-preview", Preview);
}
