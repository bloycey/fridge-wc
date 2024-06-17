export default class MainNav extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.buildHTML();
	}

	isActive(path) {
		return window.location.pathname === path
	}

	async buildHTML() {
		this.innerHTML = /*html*/ `
			<nav class="main-nav h-16 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.60)] fixed bottom-0 left-0 right-0">
				<div class="flex main-nav">
					<fridge-main-nav-item url="/home/" text="Home" icon-name="home" active=${this.isActive("/home/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/list/" id="list-nav-item" text="List" icon-name="shopping-cart" active=${this.isActive("/list/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/tasks/" text="Tasks" icon-name="list" active=${this.isActive("/tasks/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/events/" text="Events" icon-name="calendar" active=${this.isActive("/events/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/photos/" text="Photos" icon-name="photo" active=${this.isActive("/photos/")}></fridge-main-nav-item>
				</div>
			</nav>
		`
	}
}

if (!customElements.get("fridge-main-nav")) {
	customElements.define("fridge-main-nav", MainNav);
}
