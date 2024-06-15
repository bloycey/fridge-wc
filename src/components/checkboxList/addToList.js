import { v4 as uuidv4 } from 'uuid';
import { setListItem, getListItemsCount, setListItemOrder } from "../../helpers/data";

export default class AddToList extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const addItemForm = this.querySelector("#add-item")
		addItemForm.addEventListener("submit", async (e) => {
			e.preventDefault()
			const formData = Object.fromEntries(new FormData(addItemForm))
			addItemForm.reset()
			this.setListItemAndSetId(formData)
		})
	}

	async setListItemAndSetId(itemData) {
		const uuid = uuidv4()
		const shoppingList = document.querySelector("#shopping-list")
		const container = shoppingList.querySelector('ion-reorder-group');
		const numberOfItems = container.children.length
		const data = { ...itemData, checked: false, order: numberOfItems, note_id: uuid }
		shoppingList.addItem(data)
		const newItem = await setListItem(data)
	}

	buildHTML() {
		this.innerHTML = /*html*/`
				<form class="flex space-x-2 items-end" id="add-item">
					<div class="flex-1">
						<fridge-text-input label="Add to shopping list" name="text" id="add-to-list"></fridge-text-input>
					</div>
					<button type="submit" class="btn-primary h-14 !pl-4 !pr-4">
						<heroicon-add class-names="w-6 h-6"></heroicon-add>
					</button>
				</form>
			`
	}
}

if (!customElements.get("fridge-add-to-list")) {
	customElements.define("fridge-add-to-list", AddToList);
}
