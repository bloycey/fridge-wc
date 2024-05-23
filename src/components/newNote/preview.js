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

	hasHeading() {
		return this.heading && this.heading !== "";
	}

	hasBody() {
		return this.body && this.body !== "";
	}

	requiresHeadingOrBody() {
		return this.noteStyle === "style-1" || this.noteStyle === "style-3";
	}

	requiresHeadingOnly() {
		return this.noteStyle === "style-2";
	}

	hasMissingRequiredFields() {
		return (this.requiresHeadingOrBody() && (!this.hasHeading() || !this.hasBody())) || (this.requiresHeadingOnly() && !this.hasHeading());
	}

	buildHTML() {
		if (this.hasMissingRequiredFields()) {
			this.innerHTML = /*html*/`<p>Write your post first, and then come back here to preview!</p>`
		} else {
			this.innerHTML = /*html*/`
				<fridge-note-${this.noteStyle} ${this.hasHeading() ? `heading="${this.heading}"` : ""} ${this.hasBody() ? `body="${this.body}"` : ""}></fridge-note-${this.noteStyle}>
				<div class="flex justify-end">
					<input type="submit" value="Save Note" class="btn-green">
				</div>
			`
		}
	}
}

if (!customElements.get("fridge-new-note-preview")) {
	customElements.define("fridge-new-note-preview", Preview);
}
