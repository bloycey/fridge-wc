import { withNav } from "../layouts/withNav";

export default class Events extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return withNav(/*html*/`
				<h1>Events</h1>
			`)
	}
}

if (!customElements.get("fridge-page-events")) {
	customElements.define("fridge-page-events", Events);
}
