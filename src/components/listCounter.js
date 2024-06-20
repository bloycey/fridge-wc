import { getCurrentListItemsCount } from "../helpers/data";

export default class ListCounter extends HTMLElement {
	static observedAttributes = ["count"];

	constructor() {
		super();
		if (localStorage.getItem("FRIDGE_LIST_ITEMS_COUNT")) {
			this.count = localStorage.getItem("FRIDGE_LIST_ITEMS_COUNT")
			this.buildHTML()
		}
	}

	attributeChangedCallback() {
		localStorage.setItem("FRIDGE_LIST_ITEMS_COUNT", this.count)
		this.buildHTML();
	}

	connectedCallback() {
		this.getData()
	}

	increment() {
		this.count = parseInt(this.count) + 1
	}

	decrement() {
		this.count = parseInt(this.count) - 1
	}

	get count() {
		return this.getAttribute("count") || 0;
	}

	set count(value) {
		this.setAttribute("count", value);
	}

	async getData() {
		const listItemsCount = await getCurrentListItemsCount()
		localStorage.setItem("FRIDGE_LIST_ITEMS_COUNT", listItemsCount)
		this.count = listItemsCount
		this.buildHTML(listItemsCount)
	}

	buildHTML() {
		this.innerHTML =  /*html*/ this.count > 0 ? `<span class="size-4 flex items-center justify-center bg-bright-pink text-white rounded-full text-xs absolute z-50 top-1 right-4">${this.count}</span>` : ""
	}
}

if (!customElements.get("fridge-list-counter")) {
	customElements.define("fridge-list-counter", ListCounter);
}
