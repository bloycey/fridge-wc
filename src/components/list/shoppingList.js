import { setListItemOrder } from "../../helpers/data";

export default class CheckboxList extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	get completed() {
		return this.getAttribute("completed") || false
	}

	connectedCallback() {
		const reorderGroup = this.querySelector('ion-reorder-group');
		reorderGroup.addEventListener('ionItemReorder', (event) => {
			// The `from` and `to` properties contain the index of the item
			// when the drag started and ended, respectively
			const from = event.detail.to
			const to = event.detail.from
			// console.log(event.target)
			// Finish the reorder and position the item in the DOM based on
			// where the gesture ended. This method can also be called directly
			// by the reorder group
			event.detail.complete();

			window.requestAnimationFrame(() => {
				const newOrder = [...this.querySelector('ion-reorder-group').children].reverse()
				newOrder.forEach((item, index) => {
					if (parseInt(item.order) !== index) {
						item.order = index
						setListItemOrder(item.list_id, index)
					}
				})
			})
		})
	}


	buildHTML() {
		this.innerHTML = /*html*/`
				<ion-list class="py-0">
					<ion-reorder-group disabled="${this.completed === 'true'}">
					</ion-reorder-group>
				</ion-list>
			`
	}
}

if (!customElements.get("fridge-checkbox-list")) {
	customElements.define("fridge-checkbox-list", CheckboxList);
}
