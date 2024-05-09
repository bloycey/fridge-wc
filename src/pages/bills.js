import { withNav } from "../layouts/withNav";

export default class Bills extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return withNav(/*html*/`
				<h1>Bills</h1>
			`)
	}
}

if (!customElements.get("fridge-page-bills")) {
	customElements.define("fridge-page-bills", Bills);
}
