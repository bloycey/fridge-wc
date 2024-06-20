import { supabase } from "../db/supabase";
import { debounce } from "../helpers/debounce";
import { getHouseholdData, getUserData } from "../helpers/data";

export default class FridgeName extends HTMLElement {
	constructor() {
		super();
		this.householdData = getHouseholdData();
	}

	connectedCallback() {
		this.buildHTML();
	}

	async buildHTML() {
		this.userData = await getUserData();
		this.innerHTML = /*html*/ `
		<label for="house-name">Your Fridge Name</label>
		<input type="text" id="house-name" class="bg-light-green rounded-md w-full px-5 py-4 focus-visible:outline-none focus-visible:ring-green focus-visible:ring-2" value="${this.householdData.name}">
		`
		const input = this.querySelector("input");
		input.addEventListener("input", debounce((e) => {
			supabase.from("households").update({ name: e.target.value }).eq('id', this.userData.user_id).select().then(result => {
				if (!result.error) {
					// TODO: Some feedback that it's worked
					localStorage.setItem("FRIDGE_HOUSEHOLD", JSON.stringify(result.data[0]))
				}
			})
		}, 500))
	}
}

if (!customElements.get("fridge-name-updater")) {
	customElements.define("fridge-name-updater", FridgeName);
}
