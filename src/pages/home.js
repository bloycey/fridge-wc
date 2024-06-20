import { supabase } from "../db/supabase";
import { withNav } from "../layouts/withNav";

export default class Home extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return withNav(/*html*/`
				<fridge-settings-bar id="settings-bar"></fridge-settings-bar>
				<div class="px-4 mt-8">
					<fridge-add-to-list></fridge-add-to-list>
				</div>
				`)
	}
}

if (!customElements.get("fridge-page-home")) {
	customElements.define("fridge-page-home", Home);
}
