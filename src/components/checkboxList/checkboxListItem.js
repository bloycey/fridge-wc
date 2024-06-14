import { setListItemCheckedStatus, setListItemName, setListItemOrder, deleteListItem } from "../../helpers/data";
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
		const currentList = document.querySelector("#shopping-list")
		const recentList = document.querySelector("#shopping-list-recent")
		checkbox.addEventListener('ionChange', (event) => {
			if (event.detail.checked) {
				setListItemCheckedStatus(this.id, true)
				this.checked = true
				recentList.addItem(this)
				this.remove()
				const checkedItems = [...recentList.querySelectorAll("fridge-checkbox-list-item")]
				if (checkedItems.length > 3) {
					const lastItem = checkedItems[checkedItems.length - 1]
					lastItem.delete()
				}
			} else {
				setListItemCheckedStatus(this.id, false)
				this.checked = false
				currentList.addItem(this)
				this.remove()
			}
		});
		textInput.addEventListener('ionInput', debounce((event) => {
			setListItemName(this.id, event.detail.value)
			this.value = event.detail.value
		}, 500));
	}

	delete() {
		this.classList.add("hidden")
		deleteListItem(this.id)
		this.remove()
	}

	get checked() {
		return this.getAttribute("checked") || false;
	}

	set checked(value) {
		this.setAttribute("checked", value);
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
			<ion-item class="checkbox-list-item">
				<ion-checkbox justify="start" label-placement="end" class="ml-4" checked="${this.checked}"></ion-checkbox>
				<ion-input value="${this.text}" class="ml-3 list-text header-font text-2xl text-darkest-green ${this.checked === "true" ? "line-through opacity-60" : ""}"></ion-input>
				<ion-reorder slot="end"></ion-reorder>
			</ion-item>
		`
	}
}

if (!customElements.get("fridge-checkbox-list-item")) {
	customElements.define("fridge-checkbox-list-item", CheckboxListItem);
}
