import { v4 as uuidv4 } from 'uuid';
import { getHouseholdMembers, getUserData, addTask, getCurrentTaskItemsCount } from "../../helpers/data";
// import { setListItem, setListItemOrder, getCurrentListItemsCount } from "../../helpers/data";
import Base from "../../components/base"

export default class TaskForm extends Base {
	constructor() {
		super();
		this.buildHTML();
	}

	connectedCallback() {
	}

	setUpListeners() {
		const form = this.querySelector("#task-form");
		form.addEventListener("submit", async (e) => {
			e.preventDefault();
			const data = Object.fromEntries(new FormData(form));
			const completeData = {
				name: data.name,
				assigned_to: data.assigned_to === "household" ? null : data.assigned_to,
				household: this.userData.activeHousehold,
				shared: data.assigned_to === "household"
			}
			form.reset();
			this.setListItemAndSetId(completeData);
		})
	}

	async setListItemAndSetId(itemData) {
		const uuid = uuidv4()
		const myTaskList = document.querySelector("#my-tasks")
		const sharedTaskList = document.querySelector("#shared-tasks")
		const isOnTasksScreen = myTaskList || sharedTaskList

		const isMyTask = itemData.assigned_to === this.userData.user_id
		const isSharedTask = itemData.shared === true

		const getTaskList = () => {
			if (isMyTask) {
				return myTaskList
			} else if (isSharedTask) {
				return sharedTaskList
			} else {
				return null
			}
		}

		const taskList = getTaskList()

		const container = taskList ? taskList.querySelector('ion-reorder-group') : null;
		const numberOfItems = container ? container.children.length : await getCurrentTaskItemsCount()
		const data = { ...itemData, checked: false, order: numberOfItems, task_id: uuid }


		if (!isOnTasksScreen) {
			super.fireFlash(`Added ${data.text} to your shopping list`)
		} else {
			taskList.addTask(data)
		}
		const newTask = await addTask(data)
	}

	async buildHTML() {
		const householdMembers = await getHouseholdMembers();
		this.userData = await getUserData();
		const otherHouseholdMembers = householdMembers.filter(member => member.user_id !== this.userData.user_id)
		this.innerHTML =  /*html*/ `
			<zap-modal class="w-full" id="invite-family-modal" displayCloseIcon="false" hideFooter="true">
				<button class="fixed bottom-20 right-4 z-50 btn-primary !rounded-full" slot="trigger">
					<heroicon-add class-names="w-6 h-6 text-darkest-green"></heroicon-add>
					Add Task
				</button>
				<div slot="content" class="text-darkest-green">
					<h2 class="text-3xl mb-4">Add Task</h1>
					<form id="task-form">
						<fridge-text-input label="Task Name" name="name" id="task-name" class="flex-1 block"></fridge-text-input>
						<div class="space-y-1 mt-4">
							<label class="block mb-2">Assign to:</label>
							<ion-radio-group value="${this.userData.user_id}" name="assigned_to">
								<ion-radio label-placement="end" value="${this.userData.user_id}">${this.userData.name}</ion-radio><br>
								${otherHouseholdMembers.map(member => /*html*/`<ion-radio label-placement="end" value="${member.user_id}">${member.name}</ion-radio><br />`).join('')}
								<ion-radio label-placement="end" value="household">Shared Task</ion-radio><br />
							</ion-radio-group>
						</div>
						<div class="flex justify-end mt-2">
							<input type="submit" class="btn-primary" value="Add Task"/>
						</div>
					</form>
				</div>
			</zap-modal>
		`
		this.setUpListeners();
	}
}

if (!customElements.get("fridge-task-form")) {
	customElements.define("fridge-task-form", TaskForm);
}
