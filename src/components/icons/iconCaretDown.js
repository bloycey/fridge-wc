export default class HeroIconCaretDown extends HTMLElement {
	static observedAttributes = ["class-names", "stroke-width"];

	attributeChangedCallback() {
		this.buildHTML()
	}

	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
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
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>`
	}
}

if (!customElements.get("heroicon-caret-down")) {
	customElements.define("heroicon-caret-down", HeroIconCaretDown);
}
