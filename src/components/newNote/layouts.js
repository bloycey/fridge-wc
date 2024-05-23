import { withRadioCard } from "../../layouts/withRadioCard"

export default class Layouts extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const newNoteWrapper = document.querySelector("fridge-page-new-note");
		const styleRadios = this.querySelectorAll("input[name='note-style']");
		styleRadios.forEach(radio => {
			radio.addEventListener("change", (e) => {
				newNoteWrapper.setAttribute("note-style", e.target.value);
			})
		})
	}

	buildHTML() {
		this.innerHTML = /*html*/`
		<ul class="list-none space-y-4 p-6">
			<li>
				${withRadioCard({
			contents: '<fridge-note-style-1 heading="This is an optional title" body="Remember, a note is just some text on a page right? It doesn’t necessarily need a  card or a divider or anything."></fridge-note-1>',
			id: 'style-1',
			isChecked: true,
			name: "note-style"
		})}
			</li>
			<li>
				${withRadioCard({
			contents: '<fridge-note-style-2 heading="This note is short."></fridge-note-2>',
			id: 'style-2',
			isChecked: false,
			name: "note-style"
		})}
			</li>
			<li>

				${withRadioCard({
			contents: '<fridge-note-style-3 heading="A traditional style note" body="This note has a heading, and some body text, and is a reasonably short length. Like most notes."></fridge-note-3>',
			id: 'style-3',
			isChecked: false,
			name: "note-style"
		})}
			</li>
		</ul>
			`
	}
}

if (!customElements.get("fridge-new-note-layouts")) {
	customElements.define("fridge-new-note-layouts", Layouts);
}
