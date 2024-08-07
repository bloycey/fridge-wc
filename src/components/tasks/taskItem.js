import { setListItem, setListItemCheckedStatus, setListItemName, setListItemOrder, deleteListItem, getUserData } from "../../helpers/data";
import { fireShoppingListEmojis } from "../../helpers/delight"

export default class TaskItem extends HTMLElement {
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
		const checkbox = this.querySelector('ion-checkbox');
		const textInput = this.querySelector('ion-input');
		const deleteBtn = this.querySelector(".remove-item")
		checkbox.addEventListener('ionChange', (event) => {
			if (event.detail.checked) {
				this.markAsChecked()
			} else {
				this.markAsUnchecked()
			}
		});
		textInput.addEventListener('ionInput', (event) => {
			setListItemName(this.list_id, event.detail.value)
			this.value = event.detail.value
		});
		if (deleteBtn) {
			deleteBtn.addEventListener("click", (e) => {
				this.delete()
			})
		}
	}

	async markAsChecked() {
		console.log("marking as checked")
		// const counter = document.querySelector("fridge-list-counter")
		// counter.decrement()
		// const recentList = document.querySelector("#shopping-list-recent")
		// setListItemCheckedStatus(this.list_id, true)
		// this.checked = true
		// recentList.addItem(this)
		// setTimeout(() => {
		// 	this.remove()
		// }, 300)
		// const userData = await getUserData()
		// console.log(userData, userData.list_emojies, typeof userData.list_emojis)
		// if (userData.list_emojis === true) {
		// 	fireShoppingListEmojis(this.text)
		// }
	}

	markAsUnchecked() {
		console.log("marking as unchecked")
		// const counter = document.querySelector("fridge-list-counter")
		// counter.increment()
		// const currentList = document.querySelector("#shopping-list")
		// setListItemCheckedStatus(this.list_id, false)
		// this.checked = false
		// currentList.addItem(this)
		// this.remove()
	}

	delete() {
		this.classList.add("hidden")
		deleteListItem(this.list_id)
		this.remove()
	}

	get readOnly() {
		return this.getAttribute("read-only") || false;
	}

	get checked() {
		return this.getAttribute("checked") || false;
	}

	set checked(value) {
		this.setAttribute("checked", value);
	}

	get task_id() {
		return this.getAttribute("task_id") || false;
	}

	set task_id(value) {
		this.setAttribute("task_id", value);
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
				<ion-checkbox justify="start" label-placement="end" class="ml-4" checked="${this.checked}"></ion-checkbox>
				<ion-input value="${this.text}" debounce="500" class="ml-3 list-text header-font text-2xl text-darkest-green ${this.checked === "true" ? "line-through opacity-60" : ""}" disabled="${this.readOnly}"></ion-input>
				<ion-reorder slot="end"></ion-reorder>
				${this.readOnly === "true" ?
					/*html*/`<button slot="end" class="remove-item"><heroicon-trash class-names="size-5 text-darkest-green"></heroicon-trash></button>`
				: ""}
			</ion-item>
		`
	}
}

if (!customElements.get("fridge-task-item")) {
	customElements.define("fridge-task-item", TaskItem);
}
