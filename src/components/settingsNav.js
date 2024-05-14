export default class SettingsNav extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML = /*html*/ `
		<nav>
			<ul class="list-none space-y-4">
				<fridge-settings-nav-item link="/settings/active_fridge/" heading="Active Fridge" subtitle="Join a fridge" icon="fridge-icon"></fridge-settings-nav-item>
				<fridge-settings-nav-item link="/settings/your_fridge/" heading="Your Fridge" subtitle="Members & Settings" icon="heroicon-users"></fridge-settings-nav-item>
				<fridge-settings-nav-item link="/settings/your_homescreen/" heading="Home Screen" subtitle="Choose your widgets" icon="heroicon-home"></fridge-settings-nav-item>
			</ul>
		</nav>
		`
	}
}

if (!customElements.get("fridge-settings-nav")) {
	customElements.define("fridge-settings-nav", SettingsNav);
}
