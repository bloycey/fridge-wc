import { setListItemToChecked, setListItemName, setListItemOrder } from "../../helpers/data";
import { debounce } from "../../helpers/debounce";

export default class CheckboxListItem extends HTMLElement {
	static observedAttributes = ["value", "order"];

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "order") {
			setListItemOrder(this.id, newValue)
		}
		if (name === "value") {
			this.buildHTML()
		}
	}

	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const checkbox = this.querySelector('ion-checkbox');
		const textInput = this.querySelector('ion-input');
		checkbox.addEventListener('ionChange', (event) => {
			if (event.detail.checked) {
				setListItemToChecked(this.id)
				setTimeout(() => {
					this.remove()
				}, 300)
			}
		});
		textInput.addEventListener('ionInput', debounce((event) => {
			setListItemName(this.id, event.detail.value)
			this.value = event.detail.value
		}, 500));
	}

	get id() {
		return this.getAttribute("id") || "";
	}

	get text() {
		return this.getAttribute("text") || "";
	}

	get order() {
		return this.getAttribute("order") || "";
	}

	set order(value) {
		this.setAttribute("order", value);
	}

	buildHTML() {
		this.innerHTML = /*html*/`
			<ion-item>
				<ion-checkbox justify="start" label-placement="end"></ion-checkbox>
				<ion-input value="${this.text}" class="ml-3 list-text"></ion-input>
				<ion-reorder slot="end"></ion-reorder>
			</ion-item>
		`
	}
}

if (!customElements.get("fridge-checkbox-list-item")) {
	customElements.define("fridge-checkbox-list-item", CheckboxListItem);
}
