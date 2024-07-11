import { setListItem, setListItemCheckedStatus, setListItemName, setListItemOrder, deleteListItem, getUserData } from "../../helpers/data";
import { fireShoppingListEmojis } from "../../helpers/delight"

export default class CheckboxListItem extends HTMLElement {
	static observedAttributes = ["text", "order"];

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "text") {
			this.buildHTML()
		}
	}

	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const deleteBtn = this.querySelector(".remove-item")
		if (deleteBtn) {
			deleteBtn.addEventListener("click", (e) => {
				const event = new CustomEvent("delete-list-item", {
					detail: {
						id: this.list_id
					}
				})
				document.dispatchEvent(event)
			})
		}
	}

	get readOnly() {
		return this.getAttribute("read-only") || false;
	}

	set readOnly(value) {
		return this.setAttribute("read-only", value);
	}

	get checked() {
		return this.getAttribute("checked") || false;
	}

	set checked(value) {
		this.setAttribute("checked", value);
	}

	get list_id() {
		return this.getAttribute("list_id") || false;
	}

	set list_id(value) {
		this.setAttribute("list_id", value);
	}

	get text() {
		return this.getAttribute("text") || "";
	}

	set text(value) {
		this.setAttribute("text", value);
	}

	get order() {
		return this.getAttribute("order") || "";
	}

	set order(value) {
		this.setAttribute("order", value);
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<ion-item class="checkbox-list-item">
				<ion-checkbox justify="start" label-placement="end" class="ml-4" checked="${this.checked}" id="${this.list_id}"></ion-checkbox>
				<ion-input value="${this.text}" debounce="500" class="ml-3 list-text header-font text-2xl text-darkest-green ${this.checked === "true" ? "line-through opacity-60" : ""}" disabled="${this.readOnly}"></ion-input>
				<ion-reorder slot="end"></ion-reorder>
				${this.readOnly === "true" ?
					/*html*/`<button slot="end" class="remove-item"><heroicon-trash class-names="size-5 text-darkest-green"></heroicon-trash></button>`
				: ""}
			</ion-item>
		`
	}
}

if (!customElements.get("fridge-checkbox-list-item")) {
	customElements.define("fridge-checkbox-list-item", CheckboxListItem);
}
