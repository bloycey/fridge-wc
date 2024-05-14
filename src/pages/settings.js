import { supabase } from "../db/supabase";

export default class Settings extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	connectedCallback() {
		const signOutBtn = this.querySelector(".sign-out");
		signOutBtn.addEventListener("click", async () => {
			localStorage.removeItem("FRIDGE_USER");
			localStorage.removeItem("FRIDGE_HOUSEHOLD");
			await supabase.auth.signOut();
			window.location.href = "/";
		})
	}

	buildHTML() {
		return /*html*/`
		<fridge-back-bar link="/home/" text="Back to home"></fridge-back-bar>
		<div class="p-6 text-darkest-green">
			<h1 class="text-5xl mt-2">Settings</h1>
			<div class="mt-6 mb-8">
				<fridge-settings-nav></fridge-settings-nav>
			</div>
			<button class="sign-out btn-primary !rounded-full btn-sm">
				<heroicon-sign-out class-names="w-4 h-4"></heroicon-sign-out>
				<span>Sign Out</span>
			</button>
		</div>
		`
	}
}

if (!customElements.get("fridge-page-settings")) {
	customElements.define("fridge-page-settings", Settings);
}
