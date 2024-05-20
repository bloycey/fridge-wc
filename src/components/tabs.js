export default class ZapTabs extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.tabs.forEach(tab => {
			tab.addEventListener("click", this.changeTab.bind(this));
		});
	}

	changeTab(e) {
		const currentTab = e.currentTarget;
		const tabTarget = this.querySelector(`#${currentTab.dataset.tabTarget}`);

		this.tabs.forEach(tab => {
			tab.classList.remove(this.activeTabClasses);
			tab.classList.add(this.inactiveTabClasses);
		});

		this.content.forEach(content => {
			content.classList.remove(this.activeContentClasses);
			content.classList.add(this.inactiveContentClasses);
		})

		currentTab.classList.add(this.activeTabClasses);
		currentTab.classList.remove(this.inactiveTabClasses);
		tabTarget.classList.add(this.activeContentClasses);
		tabTarget.classList.remove(this.inactiveContentClasses);
	}

	get tabs() {
		return [...this.querySelectorAll(".zap-tab")]
	}

	get content() {
		return [...this.querySelectorAll(".zap-tab-content")]
	}

	get activeTabClasses() {
		return this.getAttribute("activeTabClasses") || ""
	}

	get inactiveTabClasses() {
		return this.getAttribute("inactiveTabClasses") || ""
	}

	get activeContentClasses() {
		return this.getAttribute("activeContentClasses") || ""
	}

	get inactiveContentClasses() {
		return this.getAttribute("inactiveContentClasses") || ""
	}
}

if (!customElements.get("zap-tabs")) {
	customElements.define("zap-tabs", ZapTabs);
}