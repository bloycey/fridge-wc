export default class BackBar extends HTMLElement {
	static observedAttributes = ["link", "text"];

	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	attributeChangedCallback() {
		this.innerHTML = this.buildHTML();
	}

	get link() {
		return this.getAttribute("link") || "";
	}

	get text() {
		return this.getAttribute("text") || "";

	}

	buildHTML() {
		return /*html*/ `
			<a href="${this.link}" class="bg-green block flex space-x-4 p-4 text-white">
				<heroicon-back class-names="w-5 h-5"></heroicon-back>
				<p>${this.text}</p>
			</a>`
	}
}

if (!customElements.get("fridge-back-bar")) {
	customElements.define("fridge-back-bar", BackBar);
}
