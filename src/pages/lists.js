import Base from "../components/base"
import { supabase } from "../db/supabase";
import { withNav } from "../layouts/withNav";
import { setListItem, getListItems, deleteListItems } from "../helpers/data";

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
				console.log('Change received!', payload)
				if (payload.eventType === "INSERT") {
					const existingItem = this.querySelector("fridge-checkbox-list-item[list_id='" + payload.new.list_id + "']")
					if (!existingItem) {
						this.querySelector("#shopping-list").addItem(payload.new)
						// counter.increment()
					}
				}
				if (payload.eventType === "UPDATE") {
					const existingItem = this.querySelector("fridge-checkbox-list-item[list_id='" + payload.new.list_id + "']")
					if (existingItem) {
						const markedAsChecked = payload.old.checked === false && payload.new.checked === true
						const isNewMarkedAsChecked = existingItem.checked === "false"
						const markedAsUnchecked = payload.old.checked === true && payload.new.checked === false
						const isNewMakredAsUnchecked = existingItem.checked === "true"
						const nameChanged = payload.old.text !== payload.new.text
						if (markedAsChecked && isNewMarkedAsChecked) {
							existingItem.markAsChecked()
						} else if (markedAsUnchecked && isNewMakredAsUnchecked) {
							existingItem.markAsUnchecked()
						} else if (nameChanged) {
							existingItem.text = payload.new.text
						}
					}
					// TODO: handle order changes
					// TODO: handle delete
				}
				if (payload.eventType === "DELETE") {
					const existingItem = this.querySelector("fridge-checkbox-list-item[list_id='" + payload.old.list_id + "']")
					if (existingItem) {
						existingItem.remove()
					}
				}
			})
			.subscribe()
	}

	async buildHTML(itemsFromCache) {
		const items = itemsFromCache ? JSON.parse(itemsFromCache) : await getListItems()
		localStorage.setItem("FRIDGE_LIST_ITEMS", JSON.stringify(items))
		const currentItems = items.filter(item => !item.checked).sort((a, b) => a.order - b.order)
		const recentItems = items.filter(item => item.checked)

		this.innerHTML = withNav(/*html*/`
				<div ${itemsFromCache ? "inert" : ""}>
					<fridge-header top-text="Family" heading="Shopping List"></fridge-header>
					<div class="mt-8 px-4">
						<fridge-add-to-list></fridge-add-to-list>
					</div>
					<section class="mt-6 border-t">
						<fridge-checkbox-list id="shopping-list"></fridge-checkbox-list>
					</section>
					<section class="relative">
						<button class="absolute right-0 text-xs opacity-80 text-darkest-green top-4 right-4 underline clear-completed-btn z-50">
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
		const undefinedElements = this.querySelectorAll(":not(:defined)")
		await Promise.all([...undefinedElements].map(el => customElements.whenDefined(el.localName)))

		const shoppingList = this.querySelector("#shopping-list")
		const recentList = this.querySelector("#shopping-list-recent")

		currentItems.forEach(item => {
			shoppingList.addItem(item, false)
		})

		recentItems.forEach(item => {
			recentList.addItem(item, false)
		})

		const clearCompletedBtn = this.querySelector(".clear-completed-btn")
		clearCompletedBtn.addEventListener("click", async (e) => {
			console.log("clearing completed items")
			e.stopPropagation()
			const recentItemsWrapper = this.querySelector("#shopping-list-recent")
			const recentItems = [...recentItemsWrapper.querySelectorAll("fridge-checkbox-list-item")]
			const recentItemIds = recentItems.map(item => item.list_id)
			recentItems.forEach(item => item.remove())
			deleteListItems(recentItemIds)
			super.fireFlash(`${recentItems.length} items cleared`);
		})
	}
}

if (!customElements.get("fridge-page-lists")) {
	customElements.define("fridge-page-lists", Lists);
}
