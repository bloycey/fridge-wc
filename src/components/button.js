export default class Button extends HTMLButtonElement {
	constructor() {
		super();
		this.originalButton = this.innerHTML;

		this.addEventListener("click", () => {
			if (this.busyText) {
				this.innerHTML = this.busyText;
			}
			this.disabled = true;
			this.setAttribute("data-busy", true);
			if (this.busyDuration) {
				setTimeout(() => {
					this.reset();
				}, parseInt(this.busyDuration));
			}
		})
	}

	get busyDuration() {
		return this.getAttribute("busyDuration") || null
	}

	get busyText() {
		return this.getAttribute("busyText") || false
	}

	reset() {
		this.innerHTML = this.originalButton;
		this.disabled = false;
		this.removeAttribute("data-busy");
	}
}

if (!customElements.get("zap-button")) {
	customElements.define("zap-button", Button, { extends: 'button' });
}
