import { getCurrentListItemsCount } from "../helpers/data";

export default class ListCounter extends HTMLElement {
	static observedAttributes = ["count"];

	constructor() {
		super();
		if (localStorage.getItem("fridge-listItemsCount")) {
			this.count = localStorage.getItem("fridge-listItemsCount")
			this.buildHTML()
		}
	}

	attributeChangedCallback() {
		localStorage.setItem("fridge-listItemsCount", this.count)
		this.buildHTML();
	}

	connectedCallback() {
		this.getData()
	}

	increment() {
		this.count = parseInt(this.count) + 1
	}

	decrement() {
		console.log("decrementing the component", this.count)
		this.count = parseInt(this.count) - 1
		console.log("decremented the component", this.count)
	}

	get count() {
		return this.getAttribute("count") || 0;
	}

	set count(value) {
		this.setAttribute("count", value);
	}

	async getData() {
		const listItemsCount = await getCurrentListItemsCount()
		localStorage.setItem("fridge-listItemsCount", listItemsCount)
		this.count = listItemsCount
		this.buildHTML(listItemsCount)
	}

	buildHTML() {
		this.innerHTML =  /*html*/ `<span class="size-4 flex items-center justify-center bg-bright-pink text-white rounded-full text-xs absolute z-50 top-1 right-4">${this.count}</span>`
	}
}

if (!customElements.get("fridge-list-counter")) {
	customElements.define("fridge-list-counter", ListCounter);
}
