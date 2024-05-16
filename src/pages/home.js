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
			`)
	}
}

if (!customElements.get("fridge-page-home")) {
	customElements.define("fridge-page-home", Home);
}
