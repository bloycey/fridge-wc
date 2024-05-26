import { withNav } from "../layouts/withNav";

export default class Notes extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<div class="grid-bg screen-content overflow-auto">
				${withNav(/*html*/ `
					<fridge-notes-list id="notes-list"></fridge-notes-list>
				`)}
				<a href="/new-note" class="btn-primary !rounded-full fixed right-2 bottom-[72px] new-note-trigger z-[9999]">
					<heroicon-add class-names="w-6 h-6"></heroicon-add>
					<span>
						New Note
					</span>
				</a>
			</div>`
	}
}

if (!customElements.get("fridge-page-notes")) {
	customElements.define("fridge-page-notes", Notes);
}
