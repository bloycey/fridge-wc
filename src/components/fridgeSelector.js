import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";

export default class FridgeSelector extends HTMLElement {
	constructor() {
		super();
		this.userData = getUserData();
	}

	connectedCallback() {
		this.buildHTML();
	}

	async buildHTML() {
		const { data: myData, error: myError } = await supabase.from("users").select().eq('email', this.userData.email).single();
		const { data: availableFridges, error: fridgesError } = await supabase.from("invitations").select().eq('invited', this.userData.email);

		this.innerHTML = /*html*/ `
			<ul class="list-none space-y-2">
				${availableFridges.map(fridge => /*html*/ `<fridge-active-fridge-selector-card household-id="${fridge.invited_by}"></fridge-active-fridge-selector-card>`).join("")}
			</ul>
		`
	}
}

if (!customElements.get("fridge-active-fridge-selector")) {
	customElements.define("fridge-active-fridge-selector", FridgeSelector);
}
