import morphdom from "morphdom";

export default class HeroIconShoppingCart extends HTMLElement {
	static observedAttributes = ["icon-style", "class-names", "stroke-width"];

	attributeChangedCallback() {
		morphdom(this.querySelector("svg"), this.buildHTML())
	}

	constructor() {
		super();
		this.innerHTML = this.buildHTML();
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
			return /*html*/`
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=${this.strokeWidth} stroke="currentColor" class="${this.classNames}">
				<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
			</svg>`
		} else {
			return /*html*/`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${this.classNames}">
				<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
			</svg>
			`
		}
	}
}

if (!customElements.get("heroicon-shopping-cart")) {
	customElements.define("heroicon-shopping-cart", HeroIconShoppingCart);
}
