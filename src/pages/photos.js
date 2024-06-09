import { withNav } from "../layouts/withNav";

export default class Photos extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return withNav(/*html*/`
				<h1>photos</h1>
			`)
	}
}

if (!customElements.get("fridge-page-photos")) {
	customElements.define("fridge-page-photos", Photos);
}
