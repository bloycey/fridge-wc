import { getHouseholdMembers, getUserData, addTask } from "../../helpers/data";

export default class TaskForm extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	async buildHTML() {
		const householdMembers = await getHouseholdMembers();
		const userData = await getUserData();
		const otherHouseholdMembers = householdMembers.filter(member => member.user_id !== userData.user_id)
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
							<ion-radio-group value="${userData.user_id}" name="assigned_to">
								<ion-radio label-placement="end" value="${userData.user_id}">${userData.name}</ion-radio><br>
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
		const form = this.querySelector("#task-form");
		form.addEventListener("submit", async (e) => {
			e.preventDefault();
			const formData = new FormData(form);
			const data = Object.fromEntries(formData.entries());
			const completeData = {
				name: data.name,
				assigned_to: data.assigned_to === "household" ? null : data.assigned_to,
				household: userData.activeHousehold,
				shared: data.assigned_to === "household"
			}
			const newlyAddedItem = await addTask(completeData);
			form.reset();
		})
	}
}

if (!customElements.get("fridge-task-form")) {
	customElements.define("fridge-task-form", TaskForm);
}
