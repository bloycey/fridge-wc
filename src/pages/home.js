import { supabase } from "../db/supabase";
import { withNav } from "../layouts/withNav";

export default class Home extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	connectedCallback() {
		const signOutBtn = this.querySelector(".sign-out");
		signOutBtn.addEventListener("click", async () => {
			await supabase.auth.signOut();
			window.location.href = "/";
		})
	}

	buildHTML() {
		return withNav(/*html*/`
				<fridge-settings-bar></fridge-settings-bar>
				<button class="sign-out">Sign Out</button>
			`)
	}
}

if (!customElements.get("fridge-page-home")) {
	customElements.define("fridge-page-home", Home);
}
