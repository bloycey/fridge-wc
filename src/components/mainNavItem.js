export default class MainNavItem extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
		this.classList.add("flex-1")
	}

	get active() {
		return this.getAttribute("active") === "true" || false;
	}

	get url() {
		return this.getAttribute("url") || "";
	}

	get text() {
		return this.getAttribute("text") || "";
	}

	get iconName() {
		return this.getAttribute("icon-name") || "";

	}

	buildHTML() {
		return /*html*/`
			<a href=${this.url} class="nav-item inline-block h-16 flex-1 flex flex-col items-center justify-center uppercase text-sm text-darkest-green active:bg-light-green focus:bg-light-green ${this.active ? 'bg-light-green' : ''}">
				<heroicon-${this.iconName} class-names="w-6 h-6" icon-style=${this.active ? "solid" : "outline"}></heroicon-${this.iconName}>
				<span>${this.text}</p>
			</a>
		`
	}
}

if (!customElements.get("fridge-main-nav-item")) {
	customElements.define("fridge-main-nav-item", MainNavItem);
}
