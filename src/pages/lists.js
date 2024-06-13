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
					<section class="mt-2">
						<fridge-checkbox-list id="shopping-list"></fridge-checkbox-list>
					</section>
				</div>
		`)
		const items = await getListItems()
		const sortedItems = items.sort((a, b) => a.order - b.order)
		const shoppingLIst = this.querySelector("#shopping-list")
		sortedItems.forEach(item => {
			shoppingLIst.addItem(item)
		})
	}
}

if (!customElements.get("fridge-page-lists")) {
	customElements.define("fridge-page-lists", Lists);
}
