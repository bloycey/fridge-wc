export default class Header extends HTMLElement {
	static observedAttributes = ["top-text", "heading"];

	attributeChangedCallback() {
		this.buildHTML()
	}

	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	get topText() {
		return this.getAttribute("top-text") || "";
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	buildHTML() {
		this.innerHTML = /*html*/`
		<div class="relative">
			<div class="pt-8 px-4">
				<p class="text-bright-pink uppercase text-sm font-bold leading-none">${this.topText}</p>
				<h1 class="text-4xl">${this.heading}</h1>
			</div>
			<a href="/settings/" class="absolute top-6 right-6">
				<heroicon-cog class-names="w-6 h-6 text-darkest-green"></heroicon-cog>
			</a>
		</div>`
	}
}

if (!customElements.get("fridge-header")) {
	customElements.define("fridge-header", Header);
}
