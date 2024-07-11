import { v4 as uuidv4 } from 'uuid';
import Base from "../components/base"
import { supabase } from "../db/supabase";
import { withNav } from "../layouts/withNav";
import { getCurrentListItemsCount, setListItem } from '../helpers/data';

export default class Home extends Base {
	constructor() {
		super();
		this.buildHTML();
	}

	get addToListForm() {
		return this.querySelector("#add-item")
	}

	connectedCallback() {
		this.setUpEventListeners()
	}

	setUpEventListeners() {
		this.addToListForm.addEventListener("submit", async (e) => this.addNewItem(e))
	}

	buildHTML() {
		this.innerHTML = withNav(/*html*/`
				<fridge-settings-bar id="settings-bar"></fridge-settings-bar>
				<div class="px-4 mt-8">
					<fridge-add-to-list></fridge-add-to-list>
				</div>
		`)
	}

	async addNewItem(e) {
		e.preventDefault()
		const formData = Object.fromEntries(new FormData(e.target))
		const uuid = uuidv4()
		const numberOfItems = await getCurrentListItemsCount()
		const data = { ...formData, checked: false, order: numberOfItems, list_id: uuid }
		super.fireFlash(`Added ${data.text} to your shopping list`)
		e.target.reset()
		const newItem = await setListItem(data)
	}
}

if (!customElements.get("fridge-page-home")) {
	customElements.define("fridge-page-home", Home);
}
