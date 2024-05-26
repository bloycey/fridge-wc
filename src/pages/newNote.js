import { supabase } from "../db/supabase"
import { withNav } from "../layouts/withNav";
import { withRadioCard } from "../layouts/withRadioCard";
import { getUserData, getHouseholdData } from "../helpers/data";
import { navigate } from "../../main"
import scribble from "../images/fridge-scribble.svg"

export default class NewNote extends HTMLElement {
	static observedAttributes = ["heading", "body", "note-style"];

	constructor() {
		super();
		this.buildHTML();
		this.householdData = getHouseholdData();
		this.userData = getUserData();
	}

	connectedCallback() {
		const newNoteForm = this.querySelector("#new-note-form");
		newNoteForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			const formData = new FormData(newNoteForm);
			const data = Object.fromEntries(formData.entries());
			console.log(data)
			console.log(this.userData, this.householdData)
			const { error } = await supabase.from("notes").insert({ heading: data.heading, text: data.text, household: this.householdData.id, author: this.userData.name, style: data.style })
			if (error) {
				console.error(error)
			}
			navigate("/notes/")
		})
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	get body() {
		return this.getAttribute("body") || "";
	}

	get noteStyle() {
		return this.getAttribute("note-style") || "style-1";
	}

	// carefully update the bits that need to be updated
	attributeChangedCallback(name, oldValue, newValue) {
		const noteEditor = this.querySelector("fridge-note-editor");
		const preview = document.querySelector("fridge-note-preview");

		if (name === "note-style" && newValue === "style-3") {
			noteEditor.setAttribute("note-style", "style-1");
		} else {
			noteEditor.setAttribute(name, newValue);
		}

		preview.setAttribute(name, newValue);
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<fridge-page-create-edit-note></fridge-page-create-edit-note>
		`
	}
}

if (!customElements.get("fridge-page-new-note")) {
	customElements.define("fridge-page-new-note", NewNote);
}
