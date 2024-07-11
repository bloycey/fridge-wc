import { v4 as uuidv4 } from 'uuid';
import { setListItem, setListItemOrder, getCurrentListItemsCount } from "../../helpers/data";
import Base from "../../components/base"

export default class AddToList extends Base {
	constructor() {
		super();
		this.buildHTML();
	}


	buildHTML() {
		this.innerHTML = /*html*/`
				<form class="flex space-x-2 items-end" id="add-item">
					<div class="flex-1">
						<fridge-text-input label="Add to shopping list" name="text" id="add-to-list"></fridge-text-input>
					</div>
					<button type="submit" class="btn-primary h-14 !pl-4 !pr-4">
						<heroicon-add class-names="w-6 h-6"></heroicon-add>
					</button>
				</form>
			`
	}
}

if (!customElements.get("fridge-add-to-list")) {
	customElements.define("fridge-add-to-list", AddToList);
}
