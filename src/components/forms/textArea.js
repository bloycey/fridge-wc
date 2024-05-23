export default class TextArea extends HTMLElement {
	static observedAttributes = ["id", "label", "name", "rows"];

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

	get rows() {
		return this.getAttribute("rows") || "8";
	}

	get value() {
		return this.getAttribute("value") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div>
				<label for="${this.id}" class="block mb-1">${this.label}</label>
				<textarea rows="${this.rows}" name="${this.name}" id="${this.id}" class="bg-light-green rounded-md w-full px-5 py-4 focus-visible:outline-none focus-visible:ring-green focus-visible:ring-2">${this.value}</textarea>
			</div>`
		this.classList.add("block")
	}
}

if (!customElements.get("fridge-textarea")) {
	customElements.define("fridge-textarea", TextArea);
}
