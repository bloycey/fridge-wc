export default class Accordion extends HTMLElement {
	constructor() {
		super();
		const accordionTemplate = this.querySelector("template")
		this.accordionContent = accordionTemplate.innerHTML
		accordionTemplate.remove()
		this.buildHTML();
	}

	connectedCallback() {
		const btn = this.querySelector(".accordion-btn")
		const content = this.querySelector(".content")
		const icon = this.querySelector(".accordion-icon")
		btn.addEventListener("click", () => {
			if (btn.ariaExpanded === "false") {
				btn.ariaExpanded = "true"
				content.classList.remove("grid-rows-[0fr]")
				content.classList.add("grid-rows-[1fr]")
				icon.classList.add("rotate-180")
			} else {
				btn.ariaExpanded = "false"
				content.classList.remove("grid-rows-[1fr]")
				content.classList.add("grid-rows-[0fr]")
				icon.classList.remove("rotate-180")
			}
		})
	}

	get isOpen() {
		return this.getAttribute("open") || false;
	}

	get heading() {
		return this.getAttribute("heading") || "";
	}

	get id() {
		return this.getAttribute("id") || "";
	}

	buildHTML() {
		this.innerHTML = /*html*/`
		<button type="button" aria-expanded="${this.isOpen ? "true" : "false"}" aria-controls="${this.id}" class="w-full accordion-btn flex gap-2 items-center text-darkest-green opacity-60 py-4 px-4">
			<heroicon-caret-down class-names="size-4 transition-all duration-300 accordion-icon ${this.isOpen ? "rotate-180" : ""}"></heroicon-caret-down>
			<p class="uppercase text-xs font-bold">${this.heading}</span>
		</button>
		<div class="content grid transition-all duration-300 ${this.isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}" id="${this.id}">
			<div class="overflow-hidden">
				${this.accordionContent}
			</div>
		</div>
		`
	}
}

if (!customElements.get("fridge-accordion")) {
	customElements.define("fridge-accordion", Accordion);
}
