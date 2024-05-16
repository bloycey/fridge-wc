import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";

export default class FridgeMemberCard extends HTMLElement {
	static observedAttributes = ["email", "name"];

	constructor() {
		super();
		this.userData = getUserData();
	}

	attributeChangedCallback() {
		this.buildHTML()
	}

	connectedCallback() {
		this.buildHTML();
	}

	get email() {
		return this.getAttribute("email");
	}

	get name() {
		return this.getAttribute("name") || "No account yet";
	}

	get isAdmin() {
		return this.getAttribute("is-admin") === "true";
	}

	buildHTML() {
		this.innerHTML = /*html*/ `
			<div class="p-4 bg-light-green flex items-center">
				<div class="flex-1">
					<div class="flex space-x-2">
						<h2 class="text-lg font-lexend leading-tight">${this.name}</h2>
						${this.isAdmin ? /*html*/ `<div class="inline-block bg-green rounded-full px-2 py-1 text-xs text-white">Admin</div>` : ""}
					</div>
					<p class="text-sm opacity-70">${this.email}</p>
				</div>
				${!this.isAdmin ? /*html*/ this.removeUserModal(this.email) : ""}
			</div>`

		if (!this.isAdmin) {
			const removeUserBtn = this.querySelector("[data-remove-user-btn]");
			const removeUserModal = this.querySelector("#remove-user-modal");
			removeUserBtn.addEventListener("click", async () => {
				const { data, error } = await supabase.from("invitations").delete().eq("invited", this.email).eq("invited_by", this.userData.id).select();
				this.remove();
			})
		}
	}

	removeUserModal(email) {
		return /*html*/ `
			<zap-modal hideFooter="true" id="remove-user-modal">
				<button slot="trigger">
					<heroicon-trash class="block h-6 w-6" />
				</button>
				<div slot="content" class="text-darkest-green">
					<p class="text-bright-pink uppercase text-sm font-bold mt-2">Please Confirm</p>
					<h2 class="text-3xl mb-4">Remove from household?</h1>
					<div class="space-y-4 mt-4">
						<p>Are you sure you want to remove ${email} from your household?</p>
						<p>You can re-invite them later if you like.</p>
					</div>
					<div class="flex space-x-2 mt-8">
						<button class="flex-1 btn-tertiary close-btn w-1/2">Cancel</button>
						<button is="zap-button" busyText="Removing..." class="flex-1 btn-green" data-remove-user-btn data-email={email}>Yes, Remove</button>
					</div>
				</div>
			</zap-modal>`
	}
}


if (!customElements.get("fridge-member-card")) {
	customElements.define("fridge-member-card", FridgeMemberCard);
}
