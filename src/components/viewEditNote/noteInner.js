import { supabase } from "../../db/supabase";

export default class NoteInner extends HTMLElement {
	constructor() {
		super();
		this.isEdit = this.noteId !== "";
		this.buildHTML();
	}

	connectedCallback() {
		console.log("is edit?", this.isEdit)
	}

	get noteId() {
		return this.getAttribute("note-id") || "";
	}

	async buildHTML() {
		if (this.isEdit) {
			const { data, error } = await supabase.from("notes").select().eq("id", this.noteId).single();
			this.innerHTML = /*html*/`
				<div class="zap-tab-content new-note-content hidden" id="layout">
					<fridge-note-layouts selected="${data.style}"></fridge-note-layouts>
				</div>
				<div class="zap-tab-content p-6 new-note-content" id="write">
					<fridge-note-editor note-style="${data.style}" heading="${data.heading || ""}" body="${data.text || ""}"></fridge-note-editor>
				</div>
				<div class="zap-tab-content hidden p-4 new-note-content" id="preview">
					<fridge-note-preview note-style="${data.style}" heading="${data.heading || ""}" body="${data.text || ""}" note-id="${this.noteId}"></fridge-note-preview>
				</div>`
		} else {
			this.innerHTML = /*html*/`
			<div class="zap-tab-content new-note-content" id="layout">
				<fridge-note-layouts selected="style-1"></fridge-note-layouts>
			</div>
			<div class="zap-tab-content p-6 new-note-content hidden" id="write">
				<fridge-note-editor note-style="style-1" heading="" body=""></fridge-note-editor>
			</div>
			<div class="zap-tab-content hidden p-4 new-note-content" id="preview">
				<fridge-note-preview note-style="style-1" heading="" body=""></fridge-note-preview>
			</div>`
		}

	}
}

if (!customElements.get("fridge-note-inner")) {
	customElements.define("fridge-note-inner", NoteInner);
}

