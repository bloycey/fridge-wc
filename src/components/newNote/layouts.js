import { withRadioCard } from "../../layouts/withRadioCard"

export default class Layouts extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	get selected() {
		return this.getAttribute("selected") || "style-1";
	}

	connectedCallback() {
		const newNoteWrapper = document.querySelector("fridge-page-create-edit-note");
		const styleRadios = this.querySelectorAll("input[name='style']");
		styleRadios.forEach(radio => {
			radio.addEventListener("change", (e) => {
				newNoteWrapper.setAttribute("note-style", e.target.value);
			})
		})
	}

	buildHTML() {
		this.innerHTML = /*html*/`
		<ul class="list-none space-y-6 p-6">
			<li>
				${withRadioCard({
			contents: '<fridge-note-style-1 heading="Light Note" body="A light style note with an accent stripe."></fridge-note-1>',
			id: 'style-1',
			isChecked: this.selected === "style-1",
			name: "style"
		})}
			</li>
			<li>
				${withRadioCard({
			contents: '<fridge-note-style-2 heading="A short, punchy note!"></fridge-note-2>',
			id: 'style-2',
			isChecked: this.selected === "style-2",
			name: "style"
		})}
			</li>
			<li>

				${withRadioCard({
			contents: '<fridge-note-style-3 heading="Green note" body="Inverted colours for extra emphasis."></fridge-note-3>',
			id: 'style-3',
			isChecked: this.selected === "style-3",
			name: "style"
		})}
			</li>
		</ul>
			`
	}
}

if (!customElements.get("fridge-note-layouts")) {
	customElements.define("fridge-note-layouts", Layouts);
}
