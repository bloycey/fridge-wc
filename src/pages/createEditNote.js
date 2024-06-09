import { supabase } from "../db/supabase"
import { withNav } from "../layouts/withNav";
import { withRadioCard } from "../layouts/withRadioCard";
import { getUserData, getHouseholdData } from "../helpers/data";
import { navigate } from "../../main"

export default class CreateEditNote extends HTMLElement {
	static observedAttributes = ["heading", "body", "note-style"];

	constructor() {
		super();
		this.isEdit = this.noteId !== "";
		this.buildHTML();
		this.householdData = getHouseholdData();
	}

	connectedCallback() {
		const newNoteForm = this.querySelector("#new-note-form");
		newNoteForm.addEventListener("submit", this.submitForm.bind(this));
	}

	disconnectedCallback() {
		const newNoteForm = this.querySelector("#new-note-form");
		newNoteForm.removeEventListener("submit", this.submitForm.bind(this));
	}

	async submitForm(e) {
		e.preventDefault();
		const newNoteForm = this.querySelector("#new-note-form");
		const formData = new FormData(newNoteForm);
		const data = Object.fromEntries(formData.entries());
		if (this.isEdit) {
			const { error } = await supabase.from("notes").update({ heading: data.heading, text: data.text, household: this.householdData.id, author: this.userData.name, style: data.style }).eq("id", this.noteId)
			if (error) {
				console.error(error)
			}
		} else {
			const { error } = await supabase.from("notes").insert({ heading: data.heading, text: data.text, household: this.householdData.id, author: this.userData.name, style: data.style })
			if (error) {
				console.error(error)
			}
		}
		navigate("/notes/")
	}

	get noteId() {
		return this.getAttribute("note-id") || "";
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

	async buildHTML() {
		this.userData = await getUserData();
		this.innerHTML = /*html*/`
			<fridge-back-bar link="/notes/" text="Back to notes"></fridge-back-bar>
			<form id="new-note-form">
				<zap-tabs activeTabClasses="border-green" inactiveTabClasses="border-light-green" activeContentClasses="block" inactiveContentClasses="hidden">
					<nav class="text-darkest-green">
						<ul class="list-none flex items-center">
							<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-b-2 ${this.isEdit ? "border-light-green" : "border-green"}" data-tab-target="layout" role="button">
								<heroicon-layout class-names="w-5 h-5"></heroicon-layout>
								<p class="text-xs uppercase mt-1">Layout</p>
							</li>
							<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-b-2 ${this.isEdit ? "border-green" : "border-light-green"}" data-tab-target="write" role="button">
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
					<fridge-note-inner note-id="${this.noteId}"></fridge-note-inner>
				</zap-tabs>
			</form>`
	}
}

if (!customElements.get("fridge-page-create-edit-note")) {
	customElements.define("fridge-page-create-edit-note", CreateEditNote);
}
