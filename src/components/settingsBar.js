import { supabase } from "../db/supabase";
import { loadFromCache, addToCache } from "../helpers/cache";

export default class SettingsBar extends HTMLElement {
	constructor() {
		super();
		loadFromCache(this);
	}

	connectedCallback() {
		this.buildHTML();
	}

	get userName() {
		return JSON.parse(localStorage.getItem("FRIDGE_USER")).name;
	}

	get userImage() {
		return JSON.parse(localStorage.getItem("FRIDGE_USER")).avatar_url;
	}

	buildHTML() {
		const HTML = () => /*html*/`
			<a href="/settings" class="text-darkest-green flex block bg-light-green rounded-full p-1.5 space-between items-center m-2">
				<div class="flex-1 flex items-center">
					<img src="${this.userImage}" alt="${this.userName}" referrerpolicy="no-referrer" class="rounded-full w-10 h-10"/>
					<p class="ml-3">${this.householdData.name}</p>
				</div>
				<heroicon-cog class-names="w-6 h-6 mr-2 text-darkest-green"></heroicon-cog>
			</a>
		`

		const localHouseholdData = JSON.parse(localStorage.getItem("FRIDGE_HOUSEHOLD"));
		if (localHouseholdData) {
			this.householdData = localHouseholdData;
			this.innerHTML = HTML();
		} else {
			supabase.from("households").select().then(results => {
				this.householdData = results.data[0];
				localStorage.setItem("FRIDGE_HOUSEHOLD", JSON.stringify(results.data[0]))
				this.innerHTML = HTML();
			})
		}
		addToCache(this);
	}
}

if (!customElements.get("fridge-settings-bar")) {
	customElements.define("fridge-settings-bar", SettingsBar);
}
