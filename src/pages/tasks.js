import { withNav } from "../layouts/withNav";
import { getTasks, getUserData } from "../helpers/data";
export default class Tasks extends HTMLElement {
	constructor() {
		super();
		const itemsFromCache = localStorage.getItem("FRIDGE_TASKS")
		this.buildHTML(itemsFromCache);
	}

	connectedCallback() {
		this.buildHTML();
	}

	async buildHTML(itemsFromCache) {
		const userData = this.userData || await getUserData();
		this.userData = userData
		const tasks = itemsFromCache ? JSON.parse(itemsFromCache) : await getTasks()
		const myTasks = tasks.filter(task => task.assigned_to === userData.user_id)
		localStorage.setItem("FRIDGE_TASKS", JSON.stringify(tasks))
		this.innerHTML = withNav(/*html*/`
				<div>
					<fridge-header top-text="Family" heading="Tasks"></fridge-header>
					<fridge-task-form></fridge-task-form>
					<fridge-accordion heading="My Tasks" open="true" class="block pb-8">
						<template>
							<fridge-task-list id="my-tasks"></fridge-task-list>
						</template>
					</fridge-accordion>
				</div>
			`)
		const undefinedElements = this.querySelectorAll(":not(:defined)")
		await Promise.all([...undefinedElements].map(el => customElements.whenDefined(el.localName)))

		const myTasksList = this.querySelector("#my-tasks")
		console.log(myTasksList)
		myTasks.forEach(task => {
			myTasksList.addTask(task, false)
		})
	}
}

if (!customElements.get("fridge-page-tasks")) {
	customElements.define("fridge-page-tasks", Tasks);
}

{/* <fridge-task-settings></fridge-task-settings> */ }

