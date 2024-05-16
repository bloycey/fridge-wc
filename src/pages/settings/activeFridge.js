export default class ActiveFridge extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return /*html*/`
		<fridge-back-bar link="/settings/" text="Back to settings"></fridge-back-bar>
		<div class="p-6 text-darkest-green">
			<p class="text-bright-pink uppercase text-sm font-bold mt-2">Settings</p>
			<h1 class="text-5xl">Active Fridge</h1>
			<div class="mt-6 mb-8">
				<p class="mb-1">Select your active fridge:</p>
				<fridge-active-fridge-selector id="active-fridge-selector"></fridge-active-fridge-selector>
			</div>
		</div>
			`
	}
}

if (!customElements.get("fridge-page-active-fridge")) {
	customElements.define("fridge-page-active-fridge", ActiveFridge);
}
