export default class MainNav extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	isActive(path) {
		return window.location.pathname === path
	}

	buildHTML() {
		return /*html*/ `
			<nav class="main-nav h-16 bg-white drop-shadow-[0_35px_35px_rgba(0,0,0,0.60)] fixed bottom-0 left-0 right-0">
				<div class="flex main-nav">
					<fridge-main-nav-item url="/home/" text="Home" icon-name="home" active=${this.isActive("/home/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/lists/" text="List" icon-name="shopping-cart" active=${this.isActive("/lists/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/notes/" text="Notes" icon-name="note" active=${this.isActive("/notes/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/bills/" text="Bills" icon-name="money" active=${this.isActive("/bills/")}></fridge-main-nav-item>
					<fridge-main-nav-item url="/tasks/" text="Tasks" icon-name="clipboard" active=${this.isActive("/tasks/")}></fridge-main-nav-item>
				</div>
			</nav>
		`
	}
}

if (!customElements.get("fridge-main-nav")) {
	customElements.define("fridge-main-nav", MainNav);
}
