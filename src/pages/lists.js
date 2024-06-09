import { withNav } from "../layouts/withNav";

export default class Lists extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML = withNav(/*html*/`
				<div>
					<fridge-header top-text="Family" heading="Shopping List"></fridge-header>
					<div class="mt-8 px-4">
						<fridge-add-to-list></fridge-add-to-list>
					</div>
				</div>
			`)
	}
}

if (!customElements.get("fridge-page-lists")) {
	customElements.define("fridge-page-lists", Lists);
}
