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

		// Maybe get their full data too?
		// https://www.reddit.com/r/Supabase/comments/16nqje4/rls_based_on_if_a_user_has_a_entry_in_a_table/
		const emails = invitationData.map(invitation => invitation.invited);
		this.innerHTML = /*html*/ `
			<ul class="rounded-md overflow-hidden list-none bg-light-green py-3">
				${emails.map(email => `<li>${email}</li>`).join("")}
			</ul>
		`
	}
}

if (!customElements.get("fridge-members")) {
	customElements.define("fridge-members", FridgeMembers);
}
