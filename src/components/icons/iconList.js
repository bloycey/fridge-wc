export default class HeroIconList extends HTMLElement {
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
		this.innerHTML = /*html*/`
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="${this.strokeWidth}" stroke="currentColor" class="${this.classNames}">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
		</svg>`
	}
}

if (!customElements.get("heroicon-list")) {
	customElements.define("heroicon-list", HeroIconList);
}
