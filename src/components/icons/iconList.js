export default class HeroIconList extends HTMLElement {
	static observedAttributes = ["icon-style", "class-names", "stroke-width"];

	attributeChangedCallback() {
		this.buildHTML()
	}

	constructor() {
		super();
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
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
			</svg>`
		} else {
			this.innerHTML = /*html*/`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${this.classNames}">
				<path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
			</svg>`
		}
	}
}

if (!customElements.get("heroicon-list")) {
	customElements.define("heroicon-list", HeroIconList);
}
