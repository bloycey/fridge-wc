import { setListItemOrder } from "../../helpers/data";

export default class CheckboxList extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
		const reorderGroup = this.querySelector('ion-reorder-group');
		reorderGroup.addEventListener('ionItemReorder', (event) => {
			// The `from` and `to` properties contain the index of the item
			// when the drag started and ended, respectively
			console.log(event.target)
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
					item.order = index
					setListItemOrder(item.id, index)
				})
			})
		})
	}

	addItem(item) {
		const container = this.querySelector('ion-reorder-group');
		const numberOfItems = container.children.length
		container.insertAdjacentHTML('afterbegin', /*html*/`<fridge-checkbox-list-item text="${item.text}" list_id="${item.list_id}" checked="${item.checked}" order="${item.order}"></fridge-checkbox-list-item>`)
	}

	buildHTML() {
		this.innerHTML = /*html*/`
				<ion-list class="py-0">
					<ion-reorder-group disabled="false">
					</ion-reorder-group>
				</ion-list>
			`
	}
}

if (!customElements.get("fridge-checkbox-list")) {
	customElements.define("fridge-checkbox-list", CheckboxList);
}
