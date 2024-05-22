export default class TextInput extends HTMLElement {
	static observedAttributes = ["id", "label", "name"];

	constructor() {
		super();
		this.buildHTML();
	}

	attributeChangedCallback() {
		this.buildHTML();
	}

	get id() {
		return this.getAttribute("id") || "";
	}

	get label() {
		return this.getAttribute("label") || "";
	}

	get name() {
		return this.getAttribute("name") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div>
				<label for="${this.id}" class="block mb-1">${this.label}</label>
				<input type="text" name="${this.name}" id="${this.id}" class="bg-light-green rounded-md w-full px-5 py-4 focus-visible:outline-none focus-visible:ring-green focus-visible:ring-2">
			</div>`
		this.classList.add("block")
	}
}

if (!customElements.get("fridge-text-input")) {
	customElements.define("fridge-text-input", TextInput);
}
