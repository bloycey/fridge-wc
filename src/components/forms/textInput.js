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

	get optional() {
		return this.getAttribute("required") === "false";
	}

	get value() {
		return this.getAttribute("value") || "";
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `
			<div>
				<label for="${this.id}" class="block mb-1"><span>${this.label}</span> ${this.optional ? "<span class='text-sm opacity-70'>(Optional)</span>" : ""}</label>
				<input type="text" name="${this.name}" id="${this.id}" value="${this.value}" class="bg-light-green rounded-md w-full px-5 py-4 focus-visible:outline-none focus-visible:ring-green focus-visible:ring-2" ${this.optional ? "" : "required"}>
			</div>`
		this.classList.add("block")
	}
}

if (!customElements.get("fridge-text-input")) {
	customElements.define("fridge-text-input", TextInput);
}
