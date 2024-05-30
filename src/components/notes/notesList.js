import { supabase } from "../../db/supabase";
import { loadFromCache, addToCache } from "../../helpers/cache";

export default class Notes extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	async buildHTML() {
		loadFromCache(this);
		const { data: notes, error } = await supabase.from("notes").select();
		if (error) {
			console.error(error);
		}

		this.innerHTML = /*html*/`
			<div id="notes" class="space-y-2 py-4">
				${notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((note) => /*html*/`
					<a href="/note/${note.id}" class="block ${note.style === "style-1" || note.style === "style-3" ? "mx-4" : ""}">
						<fridge-note-${note.style} heading="${note.heading}" body="${note.text}"></fridge-note-${note.style}>
					</a>`).join("")}
			</div>`;

		addToCache(this)
	}
}

if (!customElements.get("fridge-notes-list")) {
	customElements.define("fridge-notes-list", Notes);
}
