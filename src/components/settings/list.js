import { getUserData, setListEmojiUsage } from "../../helpers/data";

export default class ListSettings extends HTMLElement {
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
					<h2 class="text-3xl mb-4">Shopping List</h1>
					<ion-list>
  						<ion-item class="settings">
							<ion-toggle checked="${userData.list_emojis}" id="emoji">Emoji Mode 😮</ion-toggle>
						</ion-item>
						<ion-item class="settings">
							<ion-toggle id="notifications-toggle">Receive Notifications</ion-toggle>
						</ion-item>
					</ion-list>
				</div>
			</zap-modal>`
		const emojiToggle = this.querySelector("#emoji");
		emojiToggle.addEventListener("ionChange", async (event) => {
			setListEmojiUsage(event.detail.checked)
		})
		const notificationsToggle = this.querySelector("#notifications-toggle");
		notificationsToggle.addEventListener("ionChange", async (event) => {
			if (event.detail.checked) {
				const noficationRequest = await Notification.requestPermission();
				if (noficationRequest === "granted") {
					console.log("Notifications enabled")
				}
			}
		})
	}
}

if (!customElements.get("fridge-list-settings")) {
	customElements.define("fridge-list-settings", ListSettings);
}
