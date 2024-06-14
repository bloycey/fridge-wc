import { withNav } from "../layouts/withNav";
import { setListItem, getListItems } from "../helpers/data";

export default class Lists extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
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
					<fridge-accordion heading="Recently Purchased" open="true">
						<template>
							<fridge-checkbox-list id="shopping-list-recent"></fridge-checkbox-list>
						</template>
					</fridge-accordion>
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
