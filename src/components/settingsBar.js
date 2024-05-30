import { supabase } from "../db/supabase";
import { getUserData, getHouseholdData } from "../helpers/data";
import { loadFromCache, addToCache } from "../helpers/cache";

export default class SettingsBar extends HTMLElement {
	constructor() {
		super();
		this.userData = getUserData();
		this.householdData = getHouseholdData();
	}

	connectedCallback() {
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<a href="/settings" class="text-darkest-green flex block bg-light-green rounded-full p-1.5 space-between items-center m-2">
				<div class="flex-1 flex items-center">
					<img src="${this.userData.image}" alt="${this.userData.name}" referrerpolicy="no-referrer" class="rounded-full w-10 h-10"/>
					<p class="ml-3">${this.householdData.name}</p>
				</div>
				<heroicon-cog class-names="w-6 h-6 mr-2 text-darkest-green"></heroicon-cog>
			</a>
		`
	}
}

if (!customElements.get("fridge-settings-bar")) {
	customElements.define("fridge-settings-bar", SettingsBar);
}
