import { supabase } from "../db/supabase";
import { getUserData } from "../helpers/data";
import { addToCache, loadFromCache } from "../helpers/cache";

export default class FridgeMembers extends HTMLElement {
	constructor() {
		super();
		loadFromCache(this);
	}

	connectedCallback() {
		this.buildHTML();
	}

	async buildHTML() {
		this.userData = await getUserData();
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

		this.innerHTML = /*html*/ `
			<ul class="rounded-md overflow-hidden list-none bg-light-green py-3">
				<li><fridge-member-card email="${this.userData.email}" name="${this.userData.name}" is-admin="true"></fridge-member-card></li>
				${emails.map(email => renderUserCard(email)).join("")}
			</ul>
		`

		addToCache(this);
	}
}

if (!customElements.get("fridge-members")) {
	customElements.define("fridge-members", FridgeMembers);
}
