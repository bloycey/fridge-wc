import { withNav } from "../layouts/withNav";

export default class Notes extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return withNav(/*html*/`
				<h1>Notes</h1>
			`)
	}
}

if (!customElements.get("fridge-page-notes")) {
	customElements.define("fridge-page-notes", Notes);
}
