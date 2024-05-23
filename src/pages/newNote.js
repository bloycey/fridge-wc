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
			// Get all notes and add to localStorage
			// heading, text, household, author (name), style
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
		const noteEditor = this.querySelector("fridge-new-note-editor");
		const preview = document.querySelector("fridge-new-note-preview");

		if (name === "note-style" && newValue === "style-3") {
			noteEditor.setAttribute("note-style", "style-1");
		} else {
			noteEditor.setAttribute(name, newValue);
		}

		preview.setAttribute(name, newValue);
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<fridge-back-bar link="/notes/" text="Back to notes"></fridge-back-bar>
			<form id="new-note-form">
				<zap-tabs activeTabClasses="border-green" inactiveTabClasses="border-light-green" activeContentClasses="block" inactiveContentClasses="hidden">
					<nav class="text-darkest-green">
						<ul class="list-none flex items-center">
							<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-green border-b-2" data-tab-target="layout" role="button">
								<heroicon-layout class-names="w-5 h-5"></heroicon-layout>
								<p class="text-xs uppercase mt-1">Layout</p>
							</li>
							<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-light-green border-b-2" data-tab-target="write" role="button">
								<heroicon-note class-names="w-5 h-5"></heroicon-note>
								<p class="text-xs uppercase mt-1">Write</p>
							</li>
							<li class="zap-tab pb-2 pt-3 px-4 flex flex-col items-center justify-center border-b-2 border-light-green" data-tab-target="preview" role="button">
								<heroicon-eye class-names="w-5 h-5"></heroicon-eye>
								<p class="text-xs uppercase mt-1">Preview</p>
							</li>
							<li class="flex-1 border-b-2 flex flex-col items-center justify-center border-light-green pb-2 pt-3 w-20" aria-hidden="true">
								<div class="w-5 h-5 invisible"></div>
								<p class="text-xs uppercase invisible mt-1">Spacer</p>
							</li>
						</ul>
					</nav>
					<div class="zap-tab-content new-note-content" id="layout">
						<fridge-new-note-layouts></fridge-new-note-layouts>
					</div>
					<div class="zap-tab-content hidden p-6 new-note-content" id="write">
						<fridge-new-note-editor note-style="style-1"></fridge-new-note-editor>
					</div>
					<div class="zap-tab-content hidden p-4 new-note-content" id="preview">
						<fridge-new-note-preview note-style="style-1"></fridge-new-note-preview>
					</div>
				</zap-tabs>
			</form>`
	}
}

if (!customElements.get("fridge-page-new-note")) {
	customElements.define("fridge-page-new-note", NewNote);
}

{/* <div class="h-20 flex p-6 space-x-2 items-center">
<a href="/notes/" class="btn-tertiary flex-1 close-btn" type="button">
Cancel
</a>
<button is="zap-button" class="btn-green flex-1" type="submit" id="new-note-btn">
	Save Note
</button>
</div> */}

{/* <button is="zap-button" busyText="${this.data.id ? "Updating Note" : "Saving Note"}" class="btn-green flex-1" type="submit" id="new-note-btn">
${this.data.id ? "Update Note" : "Save Note"}
</button> */}
