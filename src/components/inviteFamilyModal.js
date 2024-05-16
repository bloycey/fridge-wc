import { getUserData } from "../helpers/data";
import { supabase } from "../db/supabase"

export default class InviteFamily extends HTMLElement {
	constructor() {
		super();
		this.userData = getUserData();
	}

	connectedCallback() {
		this.buildHTML();
		const form = this.querySelector("#send-invite");
		const modal = this.querySelector("#invite-family-modal");
		const emailInput = this.querySelector("#invite-link");
		const sendInviteBtn = this.querySelector("#send-invite-btn");
		const membersList = document.querySelector('fridge-members');

		// TODO: Remove event listener on disconnect
		sendInviteBtn.addEventListener("click", async (e) => {
			e.preventDefault();
			const email = emailInput.value;
			const { data, error } = await supabase.from("invitations").insert({ invited: email, invited_by: this.userData.id }).select()

			sendInviteBtn.reset();
			form.reset();
			modal.closeModal();
			membersList.buildHTML();
		})
	}

	buildHTML() {
		this.innerHTML = /*html*/ `
		<zap-modal class="w-full" id="invite-family-modal" displayCloseIcon="false" hideFooter="true">
			<button class="btn-primary block w-full mt-2" slot="trigger">Invite your family</button>
			<div slot="content" class="text-darkest-green">
				<p class="text-bright-pink uppercase text-sm font-bold mt-2">Join the fridge</p>
				<h2 class="text-3xl mb-4">Invite your family</h1>
				<label for="invite-link">Email Address</label>
				<form class="flex space-x-2 relative" id="send-invite">
					<input type="email" id="invite-link" class="green w-full">
					<button is="zap-button" id="send-invite-btn" class="btn-green !bg-green !px-4 h-full" type="submit">
						<heroicon-plane class-names="w-6 h-6 paper-plane-icon"></heroicon-plane>
					</button>
					<div class="loader"></div>
				</form>
			</div>
		</zap-modal>`
	}
}

if (!customElements.get("fridge-invite-family-modal")) {
	customElements.define("fridge-invite-family-modal", InviteFamily);
}
