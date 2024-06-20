import { setListItemOrder } from "../../helpers/data";
import { addToCache, loadFromCache, watchForChanges, unwatch } from "../../helpers/cache";

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
			// const movedItem = event.target.querySelector(`fridge-checkbox-list-item[order="${from}"]`)

			console.log('Dragged from index', from, 'to', to);

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

	addItem(item, updatesCounter = true) {
		const container = this.querySelector('ion-reorder-group');
		const numberOfItems = container.children.length
		container.insertAdjacentHTML('afterbegin', /*html*/`<fridge-checkbox-list-item text="${item.text}" list_id="${item.list_id}" id="${item.id}" checked="${item.checked}" order="${item.order}" read-only="${this.completed}"></fridge-checkbox-list-item>`)
		const counter = document.querySelector("fridge-list-counter")
		if (item.checked === false && updatesCounter) {
			counter.increment()
		}
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
