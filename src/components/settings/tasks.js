import { getUserData } from "../../helpers/data";

export default class TaskSettings extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	async buildHTML() {
		const userData = await getUserData();
		this.innerHTML =  /*html*/ `
			<zap-modal class="w-full" id="invite-family-modal" displayCloseIcon="false" hideFooter="true">
				<button class="absolute top-6 right-6" slot="trigger">
					<heroicon-cog class-names="w-6 h-6 text-darkest-green"></heroicon-cog>
				</button>
				<div slot="content" class="text-darkest-green">
					<p class="text-bright-pink uppercase text-sm font-bold mt-2">Settings</p>
					<h2 class="text-3xl mb-4">Tasks</h1>
					<ion-list>
  						<ion-item class="settings">
							<ion-toggle checked="true" id="emoji">Collaborative Mode</ion-toggle>
						</ion-item>
					</ion-list>
				</div>
			</zap-modal>`
	}
}

if (!customElements.get("fridge-task-settings")) {
	customElements.define("fridge-task-settings", TaskSettings);
}
