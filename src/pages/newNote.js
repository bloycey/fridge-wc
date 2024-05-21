import { withNav } from "../layouts/withNav";
import { withRadioCard } from "../layouts/withRadioCard";
import scribble from "../images/fridge-scribble.svg"

export default class NewNote extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	connectedCallback() {
		const styleRadios = this.querySelectorAll("input[name='note-style']");
		const noteEditor = this.querySelector("fridge-new-note-editor");
		styleRadios.forEach(radio => {
			radio.addEventListener("change", (e) => {
				this.selectedStyle = e.target.value;
				noteEditor.setAttribute("note-style", this.selectedStyle);
			})
		})
	}

	buildHTML() {
		return /*html*/`
			<div class="">
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
					<div class="zap-tab-content hidden p-6 new-note-content" id="preview">
						<p>Preview content here</p>
					</div>
				</zap-tabs>
			</div>
			<div class="h-20 flex p-6 space-x-2 items-center">
				<a href="/notes/" class="btn-tertiary flex-1 close-btn" type="button">
				Cancel
				</a>
				<button is="zap-button" class="btn-green flex-1" type="submit" id="new-note-btn">
					Save Note
				</button>
			</div>

			`
	}
}

if (!customElements.get("fridge-page-new-note")) {
	customElements.define("fridge-page-new-note", NewNote);
}

{/* <button is="zap-button" busyText="${this.data.id ? "Updating Note" : "Saving Note"}" class="btn-green flex-1" type="submit" id="new-note-btn">
${this.data.id ? "Update Note" : "Save Note"}
</button> */}
