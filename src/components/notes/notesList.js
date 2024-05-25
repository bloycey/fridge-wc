import { supabase } from "../../db/supabase";

export default class Notes extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	async buildHTML() {
		const { data: notes, error } = await supabase.from("notes").select();
		if (error) {
			console.error(error);
		}

		this.innerHTML = /*html*/`
			<div id="notes">
				${notes.map((note) => /*html*/`
					<fridge-note-${note.style} heading="${note.heading}" body="${note.text}"></fridge-note-${note.style}>
				`).join("")}
			</div>`;
	}
}

if (!customElements.get("fridge-notes-list")) {
	customElements.define("fridge-notes-list", Notes);
}
