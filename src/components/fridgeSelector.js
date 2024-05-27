import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";
import { addToCache, loadFromCache } from "../helpers/cache";

export default class FridgeSelector extends HTMLElement {
	constructor() {
		super();
		this.userData = getUserData();

		// TODO: This kinds sucks, maybe a regular loading instead of the skeleton?
		this.innerHTML = /*html*/ `
			<div class="space-y-2">
				<div class="block bg-light-green animate-pulse h-16 rounded-md"></div>
				<div class="block bg-light-green animate-pulse h-16 rounded-md"></div>
			</div>
		`
	}

	connectedCallback() {
		this.buildHTML();
	}

	async buildHTML() {
		const { data: myData, error: myError } = await supabase.from("users").select().eq('email', this.userData.email).single();
		const { data: availableFridges, error: fridgesError } = await supabase.from("invitations").select().eq('invited', this.userData.email);
		const isActive = id => {
			return myData.activeHousehold === id;
		}

		this.innerHTML = /*html*/ `
			<ul class="list-none space-y-2">
				<fridge-active-fridge-selector-card household-id="${this.userData.id}" active="${myData.activeHousehold === this.userData.id}"></fridge-active-fridge-selector-card>
				${availableFridges.map(fridge => /*html*/ `<fridge-active-fridge-selector-card household-id="${fridge.invited_by}" active="${isActive(fridge.invited_by)}"></fridge-active-fridge-selector-card>`).join("")}
			</ul>
		`
	}
}

if (!customElements.get("fridge-active-fridge-selector")) {
	customElements.define("fridge-active-fridge-selector", FridgeSelector);
}
