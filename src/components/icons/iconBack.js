export default class HeroIconBack extends HTMLElement {
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
		return /*html*/`
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="${this.strokeWidth}" stroke="currentColor" class="${this.classNames}">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
		</svg>
		`
	}
}

if (!customElements.get("heroicon-back")) {
	customElements.define("heroicon-back", HeroIconBack);
}
