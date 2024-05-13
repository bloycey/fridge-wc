export default class HeroIconSignOut extends HTMLElement {
	static observedAttributes = ["class-names", "stroke-width"];

	attributeChangedCallback() {
		this.buildHTML()
	}

	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	get classNames() {
		return this.getAttribute("class-names") || "";
	}

	get strokeWidth() {
		return this.getAttribute("stroke-width") || "1.5";
	}

	buildHTML() {
		this.innerHTML = /*html*/`
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="${this.strokeWidth}" stroke="currentColor" class="${this.classNames}">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
		</svg>
		`
	}
}

if (!customElements.get("heroicon-sign-out")) {
	customElements.define("heroicon-sign-out", HeroIconSignOut);
}
