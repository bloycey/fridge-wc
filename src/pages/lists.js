import { v4 as uuidv4 } from 'uuid';
import Base from "../components/base"
import { supabase } from "../db/supabase";
import { withNav } from "../layouts/withNav";
import { setListItem, setListItemName, setListItemOrder, getListItems, deleteListItems, getUserData, setListItemCheckedStatus, deleteListItem } from "../helpers/data";
import { fireShoppingListEmojis } from "../helpers/delight";

export default class Lists extends Base {
	constructor() {
		super();
		const itemsFromCache = localStorage.getItem("FRIDGE_LIST_ITEMS")
		this.buildHTML(itemsFromCache)
	}

	connectedCallback() {
		this.buildHTML();
		supabase
			.channel('shopping-list')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'list_items' }, payload => {
				if (payload.eventType === "INSERT") {
					this.onDBInsert(payload)
				}
				if (payload.eventType === "UPDATE") {
					this.onDBUpdate(payload)
				}
				if (payload.eventType === "DELETE") {
					this.onDBDelete(payload)
				}
			})
			.subscribe()
	}

	get addItemForm() {
		return this.querySelector("#add-item")
	}

	get currentItems() {
		return this.querySelector("#shopping-list")
	}

	get currentItemsCount() {
		return this.currentItems.querySelectorAll("fridge-checkbox-list-item").length + 1
	}

	get recentItems() {
		return this.querySelector("#shopping-list-recent")
	}

	get ionReorderGroup() {
		return this.querySelector('ion-reorder-group')
	}

	get clearCompletedBtn() {
		return this.querySelector("#clear-completed-btn")
	}

	get counter() {
		return document.querySelector("fridge-list-counter")
	}

	getItemById(id) {
		return this.querySelector(`fridge-checkbox-list-item[list_id="${id}"]`)
	}

	async setUpEvents() {
		this.addEventListener('ionItemReorder', (e) => this.reorderItems(e))
		document.addEventListener("delete-list-item", (e) => this.deleteItem(e.detail.id))
		this.addItemForm.addEventListener("submit", (e) => this.addNewItemFromForm(e))
		this.clearCompletedBtn.addEventListener("click", (e) => this.clearAllCompletedItems(e))
		this.addEventListener("ionChange", (e) => {
			if (e.target.localName === "ion-input") {
				// Item name has been changed
				return this.handleItemNameChange(e)
			}
			if (e.target.localName === "ion-checkbox") {
				// Checkbox has been checked
				return this.handleCheckboxChange(e)
			}
		})
	}

	onDBInsert(payload) {
		const existingItem = this.getItemById(payload.new.list_id)
		if (!existingItem) {
			this.addItem(payload.new, this.currentItems, { updatesCounter: true, newItem: false })
		}
	}

	onDBUpdate(payload) {
		const existingItem = this.getItemById(payload.new.list_id)
		if (existingItem) {
			const nameChanged = payload.old.text !== payload.new.text
			const newlyMarkedAsChecked = !payload.old.checked && payload.new.checked && existingItem.checked === "false"
			const newlyMarkedAsUnchecked = payload.old.checked && !payload.new.checked && existingItem.checked === "true"
			if (nameChanged) {
				existingItem.text = payload.new.text
			}
			if (newlyMarkedAsChecked) {
				this.markItemAsChecked(existingItem)
			}
			if (newlyMarkedAsUnchecked) {
				this.markItemAsUnchecked(existingItem)
			}
		}
	}

	onDBDelete(payload) {
		const existingItem = this.getItemById(payload.old.list_id)
		if (existingItem) {
			this.deleteItem(payload.old.list_id)
		}
	}

	reorderItems(e) {
		const from = e.detail.to
		const to = e.detail.from
		event.detail.complete();

		window.requestAnimationFrame(() => {
			const newOrder = [...this.ionReorderGroup.children].reverse()
			newOrder.forEach((item, index) => {
				if (parseInt(item.order) !== index) {
					item.order = index
					setListItemOrder(item.list_id, index)
				}
			})
		})
	}

	addNewItemFromForm(e) {
		e.preventDefault()
		const thisForm = e.target
		const formData = Object.fromEntries(new FormData(thisForm))
		const data = { ...formData, checked: false, order: this.currentItemsCount, list_id: uuidv4() }
		thisForm.reset()
		this.addItem(data, this.currentItems, { updatesCounter: true, newItem: true })
	}

	moveItemToList(itemAsDOMElement, list) {
		const clonedItem = itemAsDOMElement.cloneNode(true)
		list.insertBefore(clonedItem, list.firstChild)
		itemAsDOMElement.remove()
	}

	addItem(itemData, list, options = {}) {
		const container = list.querySelector('ion-reorder-group');
		container.insertAdjacentHTML('afterbegin', /*html*/`<fridge-checkbox-list-item text="${itemData.text}" list_id="${itemData.list_id}" id="${itemData.id}" checked="${itemData.checked}" order="${itemData.order}" read-only="${itemData.checked}"></fridge-checkbox-list-item>`)
		if (itemData.checked === false && (options.updatesCounter || options.newItem)) {
			this.counter.increment()
		}
		if (options.newItem) {
			setListItem(itemData)
		}
	}

	deleteItem(id) {
		const itemInDOM = this.getItemById(id)
		itemInDOM.remove()
		deleteListItem(id)
	}

	handleCheckboxChange(e) {
		const parentComponent = e.target.closest("fridge-checkbox-list-item")
		if (e.detail.checked) {
			this.markItemAsChecked(parentComponent)
		} else {
			this.markItemAsUnchecked(parentComponent)
		}
	}

	handleItemNameChange(e) {
		const parentComponent = e.target.closest("fridge-checkbox-list-item")
		const newName = e.detail.value
		setListItemName(parentComponent.list_id, newName)
	}

	async markItemAsChecked(item) {
		console.log("marking as checked", item)
		this.counter.decrement()
		setListItemCheckedStatus(item.list_id, true)
		item.checked = true
		item.readOnly = true
		this.moveItemToList(item, this.recentItems)
		const userData = await getUserData()
		if (userData.list_emojis === true) {
			fireShoppingListEmojis(item.text)
		}
	}

	markItemAsUnchecked(item) {
		console.log("marking as unchecked", item)
		this.counter.increment()
		setListItemCheckedStatus(item.list_id, false)
		item.checked = false
		item.readOnly = false
		this.moveItemToList(item, this.currentItems)
	}

	clearAllCompletedItems(e) {
		e.stopPropagation()
		const recentItems = [...this.recentItems.querySelectorAll("fridge-checkbox-list-item")]
		const recentItemIds = recentItems.map(item => item.list_id)
		recentItems.forEach(item => item.remove())
		deleteListItems(recentItemIds)
		super.fireFlash(`${recentItems.length} ${recentItems.length === 1 ? "item" : "items"} cleared`);
	}

	async buildHTML(itemsFromCache) {
		const items = await getListItems()
		localStorage.setItem("FRIDGE_LIST_ITEMS", JSON.stringify(items))

		const currentItems = items.filter(item => !item.checked).sort((a, b) => a.order - b.order)
		const recentItems = items.filter(item => item.checked)

		this.innerHTML = withNav(/*html*/`
					<div ${itemsFromCache ? "inert" : ""}>
						<fridge-header top-text="Family" heading="Shopping List"></fridge-header>
						<fridge-list-settings></fridge-list-settings>
						<div class="mt-8 px-4">
							<fridge-add-to-list></fridge-add-to-list>
						</div>
						<section class="mt-6 border-t">
							<fridge-checkbox-list id="shopping-list"></fridge-checkbox-list>
						</section>
						<section class="relative">
							<button class="absolute right-0 text-xs opacity-80 text-darkest-green top-4 right-4 underline clear-completed-btn z-50" id="clear-completed-btn">
								Clear All
							</button>
							<fridge-accordion heading="Recently Purchased" open="false" class="block pb-8">
								<template>
									<fridge-checkbox-list id="shopping-list-recent" completed="true"></fridge-checkbox-list>
								</template>
							</fridge-accordion>
						</section>
					</div>
			`)

		currentItems.forEach(item => {
			this.addItem(item, this.currentItems)
		})

		recentItems.forEach(item => {
			this.addItem(item, this.recentItems)
		})

		if (!itemsFromCache) {
			this.setUpEvents()
		}
	}
}

if (!customElements.get("fridge-page-lists")) {
	customElements.define("fridge-page-lists", Lists);
}
