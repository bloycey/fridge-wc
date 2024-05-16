import { supabase } from "../db/supabase";
import { debounce } from "../helpers/debounce";
import { getHouseholdData, getUserData } from "../helpers/data";

export default class FridgeName extends HTMLElement {
	constructor() {
		super();
		this.householdData = getHouseholdData();
		this.userData = getUserData();
	}

	connectedCallback() {
		this.buildHTML();
		const input = this.querySelector("input");
		input.addEventListener("input", debounce((e) => {
			supabase.from("households").update({ name: e.target.value }).eq('id', this.userData.id).select().then(result => {
				if (!result.error) {
					// TODO: Some feedback that it's worked
					localStorage.setItem("FRIDGE_HOUSEHOLD", JSON.stringify(result.data[0]))
				}
			})
		}, 500))
	}

	buildHTML() {
		this.innerHTML = /*html*/ `
			<label for="house-name">Your Fridge Name</label>
			<input type="text" id="house-name" class="green w-full" value="${this.householdData.name}">
		`
	}
}

if (!customElements.get("fridge-name-updater")) {
	customElements.define("fridge-name-updater", FridgeName);
}
