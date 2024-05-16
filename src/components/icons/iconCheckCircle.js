export default class HeroIconCheckCircle extends HTMLElement {
	static observedAttributes = ["icon-style", "class-names", "stroke-width"];

	attributeChangedCallback() {
		this.buildHTML()
	}

	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	get iconStyle() {
		return this.getAttribute("icon-style") || "outline";
	}

	get classNames() {
		return this.getAttribute("class-names") || "";
	}

	get strokeWidth() {
		return this.getAttribute("stroke-width") || "1.5";
	}


	buildHTML() {
		if (this.iconStyle === "outline") {
			this.innerHTML = /*html*/`
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="${this.strokeWidth}" stroke="currentColor" class="${this.classNames}">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
			</svg>
`
		} else {
			this.innerHTML = /*html*/`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${this.classNames}">
				<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
			</svg>`
		}
	}
}

if (!customElements.get("heroicon-check-circle")) {
	customElements.define("heroicon-check-circle", HeroIconCheckCircle);
}
