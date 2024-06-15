import { supabase } from "../db/supabase";
import { withNav } from "../layouts/withNav";
import { setListItem, getListItems, deleteListItems } from "../helpers/data";
import { loadFromCache, watchForChanges, unwatch } from "../helpers/cache";

export default class Lists extends HTMLElement {
	constructor() {
		super();
		loadFromCache(this)
		this.buildHTML();
	}

	connectedCallback() {
		watchForChanges(this)
		supabase
			.channel('shopping-list')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'list_items' }, payload => {
				console.log('Change received!', payload)
			})
			.subscribe()
		const clearCompletedBtn = this.querySelector(".clear-completed-btn")
		clearCompletedBtn.addEventListener("click", async (e) => {
			e.stopPropagation()
			const recentItemsWrapper = this.querySelector("#shopping-list-recent")
			const recentItems = [...recentItemsWrapper.querySelectorAll("fridge-checkbox-list-item")]
			const recentItemIds = recentItems.map(item => item.list_id)
			recentItems.forEach(item => item.remove())
			deleteListItems(recentItemIds)
		})
	}

	async buildHTML() {
		this.innerHTML = withNav(/*html*/`
				<div>
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
		const items = await getListItems()
		const currentItems = items.filter(item => !item.checked).sort((a, b) => a.order - b.order)
		const recentItems = items.filter(item => item.checked)
		const shoppingList = this.querySelector("#shopping-list")
		const recentList = this.querySelector("#shopping-list-recent")
		currentItems.forEach(item => {
			shoppingList.addItem(item)
		})
		recentItems.forEach(item => {
			recentList.addItem(item)
		})
	}
}

if (!customElements.get("fridge-page-lists")) {
	customElements.define("fridge-page-lists", Lists);
}
