import { getCurrentListItemsCount } from "../helpers/data";

export default class ListCounter extends HTMLElement {
	static observedAttributes = ["count"];

	constructor() {
		super();
		if (localStorage.getItem("fridge-listItemsCount")) {
			this.buildHTML(localStorage.getItem("fridge-listItemsCount"))
		}
	}

	connectedCallback() {
		this.getData()
	}

	async getData() {
		const listItemsCount = await getCurrentListItemsCount()
		console.log("getData listItemsCount: ", listItemsCount)
		localStorage.setItem("fridge-listItemsCount", listItemsCount)
		this.buildHTML(listItemsCount)
	}

	buildHTML(count = 0) {
		this.innerHTML =  /*html*/ `<span class="size-4 flex items-center justify-center bg-bright-pink text-white rounded-full text-xs absolute z-50 top-1 right-4">${count}</span>`
	}
}

if (!customElements.get("fridge-list-counter")) {
	customElements.define("fridge-list-counter", ListCounter);
}
