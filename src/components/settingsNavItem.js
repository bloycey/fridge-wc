export default class SettingsNavItem extends HTMLElement {
	static observedAttributes = ["link", "heading", "subtitle"];

	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML()
	}

	get link() {
		return this.getAttribute("link") || "";
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	get subtitle() {
		return this.getAttribute("subtitle") || "";
	}

	get icon() {
		return this.getAttribute("icon") || "";
	}

	buildHTML() {
		this.classList.add("block")
		this.innerHTML = /*html*/`
			<li>
				<a href="${this.link}" class="flex space-x-5 items-center">
					<div class="flex items-center">
						<div class="rounded-full bg-light-green w-14 h-14 flex items-center justify-center">
							<${this.icon} class-names="w-7 h-7"></${this.icon}>
						</div>
					</div>
					<div>
						<p class="text-2xl">${this.heading}</p>
						<p class="uppercase text-xs font-bold text-green opacity-70">${this.subtitle}</p>
					</div>
				</a>
			</li>
		`
	}
}

if (!customElements.get("fridge-settings-nav-item")) {
	customElements.define("fridge-settings-nav-item", SettingsNavItem);
}
