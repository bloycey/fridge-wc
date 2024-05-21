import { withNav } from "../layouts/withNav";

export default class Lists extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML = withNav(/*html*/`
				<h1>Lists</h1>
			`)
	}
}

if (!customElements.get("fridge-page-lists")) {
	customElements.define("fridge-page-lists", Lists);
}
