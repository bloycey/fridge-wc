import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";

export default class FridgeSelectorCard extends HTMLElement {
	static observedAttributes = ["household-id", "active"];

	constructor() {
		super();
		this.userData = getUserData();
	}

	connectedCallback() {
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML()
	}

	get householdId() {
		return this.getAttribute("household-id");
	}

	get isActive() {
		return this.getAttribute("active") === "true";
	}

	async buildHTML() {
		const { data: fridgeData, error: fridgeError } = await supabase.from("households").select().eq('id', this.householdId).single();
		const ownerMessage = fridgeData.id === this.userData.id ? "You are the admin." : `${fridgeData.ownerName} is admin.`;

		this.innerHTML = /*html*/ `
			<li class="bg-light-green rounded-md p-4 cursor-pointer" role="button">
				<div class="flex items-center">
					<div class="flex-1">
						<h2 class="font-lexend">${fridgeData.name}</h2>
						<p class="text-sm opacity-70">
							${ownerMessage}
						</p>
					</div>
					<div>
						${this.isActive ? /*html*/ `<heroicon-check-circle icon-style="solid" class="block active-circle w-8 h-8 text-green"></heroicon-check-circle>` : ""}
					</div>
				</div>
			</li>
		`
		this.classList.add("block")
		const button = this.querySelector("li");
		const allFridges = document.querySelectorAll("fridge-active-fridge-selector-card");
		button.addEventListener("click", async () => {
			allFridges.forEach(fridge => fridge.removeAttribute("active"));
			this.setAttribute("active", "true");
			const { data: newUserData, error } = await supabase.from("users").update({ activeHousehold: this.householdId }).eq("user_id", this.userData.user_id).select().single();
			const { data: newHouseholdData, error: newHouseholdError } = await supabase.from("households").select().eq('id', this.householdId).single();
			localStorage.setItem("FRIDGE_USER", JSON.stringify(newUserData))
			localStorage.setItem("FRIDGE_HOUSEHOLD", JSON.stringify(newHouseholdData))
		})
	}
}

if (!customElements.get("fridge-active-fridge-selector-card")) {
	customElements.define("fridge-active-fridge-selector-card", FridgeSelectorCard);
}
