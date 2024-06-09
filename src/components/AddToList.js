export default class AddToList extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	buildHTML() {
		this.innerHTML = /*html*/`
				<div class="flex space-x-2 items-end">
					<div class="flex-1">
						<fridge-text-input label="Add to shopping list" name="add-to-list" id="add-to-list"></fridge-text-input>
					</div>
					<button class="btn-primary h-14">
						<heroicon-add class-names="w-6 h-6"></heroicon-add>
						<span>Add</span>
					</button>
				</div>
			`
	}
}

if (!customElements.get("fridge-add-to-list")) {
	customElements.define("fridge-add-to-list", AddToList);
}
