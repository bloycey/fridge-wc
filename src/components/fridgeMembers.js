import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";

export default class FridgeMembers extends HTMLElement {
	constructor() {
		super();
		this.userData = getUserData();
		// TODO: Insert loading state here to be overridden by buildHTML
	}

	connectedCallback() {
		this.buildHTML();
	}

	async buildHTML() {
		const { data: invitationData, error: invitationError } = await supabase.from("invitations").select().eq('invited_by', this.userData.id);
		if (invitationError) {
			console.error(invitationError)
			return;
		}

		const emails = invitationData.map(invitation => invitation.invited);
		const { data: realUsers, error: realUsersError } = await supabase.from("users").select().in('email', emails);

		const renderUserCard = (email) => {
			const actualUser = realUsers.find(user => user.email === email);
			const name = actualUser ? actualUser.name : "No account yet";

			return `<li><fridge-member-card email="${email}" name="${name}"></fridge-member-card></li>`
		}

		// TODO: Include current user in here.
		this.innerHTML = /*html*/ `
			<ul class="rounded-md overflow-hidden list-none bg-light-green py-3">
				${emails.map(email => renderUserCard(email)).join("")}
			</ul>
		`
	}
}

if (!customElements.get("fridge-members")) {
	customElements.define("fridge-members", FridgeMembers);
}
