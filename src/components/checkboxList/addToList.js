import { setListItem, getListItemsCount } from "../../helpers/data";

export default class AddToList extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const addItemForm = this.querySelector("#add-item")
		addItemForm.addEventListener("submit", async (e) => {
			e.preventDefault()
			const shoppingList = document.querySelector("#shopping-list")
			const formData = Object.fromEntries(new FormData(addItemForm))
			addItemForm.reset()
			const count = await getListItemsCount()
			const listItemWithCount = { ...formData, order: count || 0 }
			const newListItem = await setListItem(listItemWithCount)
			shoppingList.addItem(newListItem)
		})
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
