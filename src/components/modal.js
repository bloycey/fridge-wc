const template = /* html */ `
	<div>
		<slot name="trigger"></slot>
		<dialog>
			<header class="title-wrapper">
				<button class="close-btn close-icon-wrapper" role="button">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="close-icon">
						<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
					</svg>
				</button>
				<div class="title-inner-wrapper">
					<h1 class="title"></h1>
				</div>
			</header>
			<div class="inner-wrapper">
				<slot name="content"></slot>
				<footer>
					<slot name="tertiary-btn"></slot>
					<div class="action-btns">
						<slot name="secondary-btn"></slot>
						<slot name="primary-btn"></slot>
					<div>
				</footer>
			</div>
		</dialog>

		<style>
			:host {
				--zap-modal-header-bg: #222222;
				--zap-modal-inner-padding: 24px;
				--zap-modal-title-padding: 20px 24px;
				--zap-modal-border-radius: 6px;
				--zap-modal-border: 0;
				--zap-modal-width: 560px;
				--zap-modal-open-animation-duration: 0.2s;
				--zap-modal-backdrop-open-animation-duration: 0.4s;
				--zap-modal-backdrop-background: rgba(0, 0, 0, 0.45);
				--zap-modal-title-color: #ffffff;
				--zap-modal-title-font-size: 24px;
				--zap-modal-title-font-family: inherit;
				--zap-modal-title-font-weight: inherit;
				--zap-modal-footer-margin-top: 24px;
				--zap-modal-footer-padding: 16px 0 0 0;
				--zap-modal-footer-border-top: 1px solid rgba(202, 210, 222, 0.4);
				--zap-modal-footer-button-gap: 4px;
				--zap-modal-close-btn-position-top: 12px;
				--zap-modal-close-btn-position-right: 12px;
				--zap-modal-close-btn-hover-border: 2px solid rgba(255, 255, 255, 0.2);
				--zap-modal-close-btn-border-radius: 4px;
				--zap-modal-close-btn-size: 40px;
				--zap-modal-close-btn-icon-size: 32px;
				--zap-modal-close-btn-icon-color: #ffffff;
				--zap-modal-close-btn-background-color: transparent;
			}
			.inner-wrapper {
				padding: var(--zap-modal-inner-padding);
			}
			.title-inner-wrapper {
				padding: var(--zap-modal-title-padding);
			}

			dialog:focus-visible {
				outline: none;
			}
			dialog {
				border-top-right-radius: var(--zap-modal-border-radius);
				border-top-left-radius: var(--zap-modal-border-radius);
				margin-bottom: 0;
				margin-left: 0;
				margin-right: 0;
				pointer-events: none;
				padding: 0;
				border: var(--zap-modal-border);
				width: 100%;
				opacity: 0;
				max-width: 100vw;
				box-shadow: 0 0 0 100vmax var(--zap-modal-backdrop-background);
			}
			@media (min-width: 768px) {
				dialog {
					border-radius: var(--zap-modal-border-radius);
					width: var(--zap-modal-width);
					margin: auto;
				}
			}

			dialog[open]{
				animation: fadeInUp var(--zap-modal-open-animation-duration) ease-out;
				pointer-events: revert;
				opacity: 1;
			}

			@media (prefers-reduced-motion: reduce) {
				dialog[open] {
					animation: none;
				}
			}

			dialog[open]::backdrop {
				backdrop-filter: blur(4px);
			}

			@keyframes fadeInUp {
				from {
					opacity: 0;
					transform: translate3d(0, 50%, 0);
				}
				to {
					opacity: 1;
					transform: translate3d(0, 0, 0);
				}
			}

			.title-wrapper {
				background: var(--zap-modal-header-bg);
				position: relative;
			}

			.close-icon-wrapper {
				position: absolute;
				top: var(--zap-modal-close-btn-position-top);
				right: var(--zap-modal-close-btn-position-right);
				width: var(--zap-modal-close-btn-size);
				height: var(--zap-modal-close-btn-size);
				background: var(--zap-modal-close-btn-background-color);
				border: 0;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.close-icon-wrapper:hover {
				outline: var(--zap-modal-close-btn-hover-border);
				border-radius: var(--zap-modal-close-btn-border-radius);
			}

			.close-icon {
				width: var(--zap-modal-close-btn-icon-size);
				height: var(--zap-modal-close-btn-icon-size);
				fill: var(--zap-modal-close-btn-icon-color);
				pointer-events: none;
			}

			.title {
				color: var(--zap-modal-title-color);
				font-size: var(--zap-modal-title-font-size);
				font-family: var(--zap-modal-title-font-family);
				font-weight: var(--zap-modal-title-font-weight);
				line-height: 100%;
				margin: 0;
			}
			footer {
				display: flex;
				justify-content: space-between;
				margin-top: var(--zap-modal-footer-margin-top);
				padding: var(--zap-modal-footer-padding);
				border-top: var(--zap-modal-footer-border-top);
			}
			.action-btns {
				gap: var(--zap-modal-footer-button-gap);
				flex: 1;
				display: flex;
				justify-content: flex-end;
			}
		</style>
	</div>
`

export default class Modal extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: "open" })
		this.shadowRoot.innerHTML = template
	}

	get type() {
		return this.getAttribute("type") || "default"
	}

	get heading() {
		return this.getAttribute("heading") || false
	}

	get backdropClose() {
		return this.getAttribute("backdropClose") || "true"
	}

	get displayCloseIcon() {
		return this.getAttribute("displayCloseIcon") || "true"
	}

	get fixedWidth() {
		return this.getAttribute("fixedWidth") || "true"
	}

	get hideFooter() {
		return this.getAttribute("hideFooter") || "false"
	}

	get contentOnly() {
		return this.getAttribute("contentOnly") || "false"
	}

	get autoLaunch() {
		return this.getAttribute("autoLaunch") || "false"
	}

	showModal() {
		this.shadowRoot.querySelector('dialog').showModal()
	}

	closeModal() {
		this.shadowRoot.querySelector('dialog').close()
	}

	connectedCallback() {
		const $ = (selector) => this.shadowRoot.querySelector(selector)

		if (this.contentOnly === "true") {
			$("header").style.display = "none";
			$("footer").style.display = "none";
			$("dialog").style.backgroundColor = "var(--zap-modal-backdrop-background)"
		}

		if (this.hideFooter === "true") {
			$("footer").style.display = "none"
		}

		if (this.heading) {
			$(".title").innerText = this.heading
			$(".title-wrapper").classList.add(this.type)
		} else {
			$(".title-inner-wrapper").style.display = "none"
		}

		if (this.fixedWidth === "false") {
			$("dialog").style.width = "max-content"
		}

		if (this.displayCloseIcon === "false") {
			$(".close-icon-wrapper").style.display = "none"
		}

		$("slot[name='trigger']").addEventListener("click", () => {
			$("dialog").showModal()
		})

		this.shadowRoot.addEventListener("click", (e) => {
			if (e.target.getAttribute("slot") === "close-btn" || e.target.classList.contains("close-btn")) {
				$("dialog").close()
			}
			if (this.backdropClose && this.backdropClose !== "false" && e.target === $("dialog")) {
				$("dialog").close()
			}
		})

		if (this.autoLaunch === "true") {
			this.showModal()
		}
	}
}

if (!customElements.get("zap-modal")) {
	customElements.define("zap-modal", Modal);
}
