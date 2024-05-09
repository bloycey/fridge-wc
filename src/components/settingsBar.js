export default class SettingsBar extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	get userName() {
		return JSON.parse(localStorage.getItem("FRIDGE_USER")).name;
	}

	get userImage() {
		return JSON.parse(localStorage.getItem("FRIDGE_USER")).avatar_url;
	}

	buildHTML() {
		return /*html*/`
			<a href="/settings" class="text-darkest-green flex block bg-light-green rounded-full p-1.5 space-between items-center">
				<div class="flex-1 flex items-center">
					<img src="${this.userImage}" alt="${this.userName}" referrerpolicy="no-referrer" class="rounded-full w-10 h-10"/>
					<p class="ml-3">House name here</p>
				</div>
				<heroicon-cog class-names="w-6 h-6 mr-2 text-darkest-green"></heroicon-cog>
			</a>
		`
	}
	// <CogOutline classes="w-6 h-6 mr-2 text-darkest-green"/> */} */}
}

if (!customElements.get("fridge-settings-bar")) {
	customElements.define("fridge-settings-bar", SettingsBar);
}
