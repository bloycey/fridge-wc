export default class MainNavItem extends HTMLElement {
	static observedAttributes = ["count"];

	constructor() {
		super();
	}

	attributeChangedCallback() {
		this.buildHTML()
	}

	connectedCallback() {
		this.classList.add("flex-1")
		this.buildHTML();
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

	//TODO: can i cache the count at a granular level to prevent the FOUC?
	buildHTML() {
		this.innerHTML = /*html*/`
			<a href=${this.url} class="nav-item relative inline-block h-16 flex-1 flex flex-col items-center justify-center uppercase text-sm text-darkest-green active:bg-light-green focus:bg-light-green ${this.active ? 'bg-light-green' : ''}">
				<heroicon-${this.iconName} class-names="w-6 h-6" icon-style=${this.active ? "solid" : "outline"}></heroicon-${this.iconName}>
				<span>${this.text}</p>
				${this.url === "/list/" ? "<fridge-list-counter></fridge-list-counter>" : ""}
			</a>
		`
	}
}

if (!customElements.get("fridge-main-nav-item")) {
	customElements.define("fridge-main-nav-item", MainNavItem);
}

