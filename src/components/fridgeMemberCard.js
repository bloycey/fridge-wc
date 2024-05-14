import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";

export default class FridgeMemberCard extends HTMLElement {
	static observedAttributes = ["email", "name"];

	constructor() {
		super();
		this.userData = getUserData();
	}

	attributeChangedCallback() {
		this.buildHTML()
	}

	connectedCallback() {
		this.buildHTML();
	}

	get email() {
		return this.getAttribute("email");
	}

	get name() {
		return this.getAttribute("name") || "No account yet";
	}

	buildHTML() {
		this.innerHTML = /*html*/ `
			<div class="p-4 bg-light-green flex items-center">
				<div class="flex-1">
					<div class="flex space-x-2">
						<h2 class="text-lg font-lexend leading-tight">${this.name}</h2>
					</div>
					<p class="text-sm opacity-70">${this.email}</p>
				</div>
			</div>`
	}
}


if (!customElements.get("fridge-member-card")) {
	customElements.define("fridge-member-card", FridgeMemberCard);
}
