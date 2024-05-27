import { supabase } from "../../db/supabase"
import { navigate } from "../../../main"

export default class Preview extends HTMLElement {
	static observedAttributes = ["note-style", "heading", "body"];

	constructor() {
		super();
		this.isEdit = this.noteId;
		this.buildHTML();
	}

	connectedCallback() {
		if (this.isEdit) {
			this.querySelector("#delete-note").addEventListener("click", this.deleteNote.bind(this));
		}
	}

	disconnectedCallback() {
		if (this.isEdit) {
			this.querySelector("#delete-note").removeEventListener("click", this.deleteNote);
		}
	}

	async deleteNote() {
		const { error } = await supabase.from("notes").delete().eq("id", this.noteId);
		navigate("/notes/");
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	get noteId() {
		return this.getAttribute("note-id") || false;
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
		return (this.requiresHeadingOrBody() && (!this.hasHeading() && !this.hasBody())) || (this.requiresHeadingOnly() && !this.hasHeading());
	}

	buildHTML() {
		if (this.hasMissingRequiredFields()) {
			this.innerHTML = /*html*/`<p class="p-2">Write your post first, and then come back here to preview!</p>`
		} else {
			this.innerHTML = /*html*/`
				<fridge-note-${this.noteStyle} ${this.hasHeading() ? `heading="${this.heading}"` : ""} ${this.hasBody() ? `body="${this.body}"` : ""}></fridge-note-${this.noteStyle}>
				<div class="flex justify-end mt-4 space-x-2 px-4">
					${this.isEdit ? `<button class="btn-tertiary flex-1" id="delete-note">Delete</button>` : ""}
					<input type="submit" value="${this.isEdit ? "Update Note" : "Save Note"}" class="${this.isEdit ? "btn-green" : "btn-primary"} flex-1">
				</div>
			`
		}
	}
}

if (!customElements.get("fridge-note-preview")) {
	customElements.define("fridge-note-preview", Preview);
}
