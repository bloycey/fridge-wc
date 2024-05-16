import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";

export default class FridgeSelectorCard extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	get householdId() {
		return this.getAttribute("household-id");
	}

	async buildHTML() {
		const { data: fridgeData, error: fridgeError } = await supabase.from("households").select().eq('id', this.householdId).single();
		console.log("fridgeData", fridgeData)

		this.innerHTML = /*html*/ `
			<li class="bg-light-green rounded-md p-4 cursor-pointer" role="button">
				<div class="flex items-center">
					<div class="flex-1">
						<h2 class="font-lexend">{fridge.name}</h2>
						<p class="text-sm opacity-70">
							{adminMessage(fridge)}
						</p>
					</div>
					<div>
						<p>icon here</p>
					</div>
				</div>
			</li>
		`
	}
}

if (!customElements.get("fridge-active-fridge-selector-card")) {
	customElements.define("fridge-active-fridge-selector-card", FridgeSelectorCard);
}
