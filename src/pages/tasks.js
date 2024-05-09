import { withNav } from "../layouts/withNav";

export default class Tasks extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return withNav(/*html*/`
				<h1>Tasks</h1>
			`)
	}
}

if (!customElements.get("fridge-page-tasks")) {
	customElements.define("fridge-page-tasks", Tasks);
}
