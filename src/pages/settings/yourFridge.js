export default class YourFridge extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return /*html*/`
		<fridge-back-bar link="/settings/" text="Back to settings"></fridge-back-bar>
		<div class="p-6 text-darkest-green">
			<p class="text-bright-pink uppercase text-sm font-bold mt-2">Settings</p>
			<h1 class="text-5xl">Your Fridge</h1>
			<div class="mt-6">
				<fridge-name-updater></fridge-name-updater>
			</div>
			<section class="mt-8">
				<p>Household Members</p>
				<fridge-members id="fridge-members"></fridge-members>
				<fridge-invite-family-modal></fridge-invite-family-modal>
			</section>
		</div>`
	}
}

{/* <ul class="rounded-md overflow-hidden list-none bg-light-green py-3">
{data.members.map(memberEmail => {
	return (
		<HouseholdMemberCard email={memberEmail} />
	)
})}
</ul> */}

{/* <section>
<p>Household Members</p>
<zap-frame src="/partials/household_members" cacheId="household-members">
	<div class="bg-light-green rounded-md animate-pulse h-24"></div>
</zap-frame>
</section>

<zap-modal class="w-full" id="invite-family-modal" displayCloseIcon="false" hideFooter="true">
<button class="btn-primary block w-full mt-2" slot="trigger">Invite your family</button>
<div slot="content" class="text-darkest-green">
	<p class="text-bright-pink uppercase text-sm font-bold mt-2">Join the fridge</p>
	<h2 class="text-3xl mb-4">Invite your family</h1>
	<InviteFamilyForm />
</div>
</zap-modal> */}

if (!customElements.get("fridge-page-your-fridge")) {
	customElements.define("fridge-page-your-fridge", YourFridge);
}
