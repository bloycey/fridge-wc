import { setListItemOrder } from "../../helpers/data";

export default class TaskList extends HTMLElement {
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

	addTask(task, updatesCounter = true) {
		const container = this.querySelector('ion-reorder-group');
		const numberOfItems = container.children.length
		console.log("Adding task", task)
		container.insertAdjacentHTML('afterbegin', /*html*/`<fridge-task-item text="${task.name}" checked="${task.checked}" order="${task.order}" read-only="${this.completed}"></fridge-checkbox-list-item>`)
		// const counter = document.querySelector("fridge-list-counter")
		// if (item.checked === false && updatesCounter) {
		// 	counter.increment()
		// }
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

if (!customElements.get("fridge-task-list")) {
	customElements.define("fridge-task-list", TaskList);
}
