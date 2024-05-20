import { withNav } from "../layouts/withNav";
import scribble from "../images/fridge-scribble.svg"

export default class NewNote extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = this.buildHTML();
	}

	buildHTML() {
		return /*html*/`
			<div class="">
				<zap-tabs activeTabClasses="border-green" inactiveTabClasses="border-light-green" activeContentClasses="block" inactiveContentClasses="hidden">
					<nav class="text-darkest-green">
						<ul class="list-none flex items-center">
							<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-green border-b-2" data-tab-target="layout" role="button">
								<heroicon-layout class-names="w-5 h-5"></heroicon-layout>
								<p class="text-xs uppercase mt-1">Layout</p>
							</li>
							<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-light-green border-b-2" data-tab-target="write" role="button">
								<heroicon-note class-names="w-5 h-5"></heroicon-note>
								<p class="text-xs uppercase mt-1">Write</p>
							</li>
							<li class="zap-tab pb-2 pt-3 px-4 flex flex-col items-center justify-center border-b-2 border-light-green" data-tab-target="preview" role="button">
								<heroicon-eye class-names="w-5 h-5"></heroicon-eye>
								<p class="text-xs uppercase mt-1">Preview</p>
							</li>
							<li class="flex-1 border-b-2 flex flex-col items-center justify-center border-light-green pb-2 pt-3 w-20" aria-hidden="true">
								<div class="w-5 h-5 invisible"></div>
								<p class="text-xs uppercase invisible mt-1">Spacer</p>
							</li>
						</ul>
					</nav>
					<div class="zap-tab-content p-6 new-note-content" id="layout">
						<ul class="list-none space-y-6">
							<li>
								<article>
									<h1 class="text-3xl mb-2">This is an optional title</h1>
									<p class="mb-4">Remember, a note is just some text on a page right? It doesn’t necessarily need a  card or a divider or anything.</p>
									<img src="${scribble}" alt="Decorative scribble" />
								</article>
							</li>
							<li>
								<article>
									<div class="relative">
										<h1 class="before:content-[''] before:size-8 before:inline-block before:absolute before:top-0 before:-left-3 before:bg-bright-pink before:rounded-full before:z-[-1] text-[48px] z-50">This note is short.</h1>
									</div>
								</article>
							</li>
						</ul>
					</div>
					<div class="zap-tab-content hidden p-6 new-note-content" id="write">
						<p>Write content here</p>
						<fridge-note-editor></fridge-note-editor>
					</div>
					<div class="zap-tab-content hidden p-6 new-note-content" id="preview">
						<p>Preview content here</p>
					</div>
				</zap-tabs>
			</div>
			<div class="h-20 flex p-6 space-x-2 items-center">
				<a href="/notes/" class="btn-tertiary flex-1 close-btn" type="button">
				Cancel
				</a>
				<button is="zap-button" class="btn-green flex-1" type="submit" id="new-note-btn">
					Save Note
				</button>
			</div>

			`
	}
}

if (!customElements.get("fridge-page-new-note")) {
	customElements.define("fridge-page-new-note", NewNote);
}

{/* <button is="zap-button" busyText="${this.data.id ? "Updating Note" : "Saving Note"}" class="btn-green flex-1" type="submit" id="new-note-btn">
${this.data.id ? "Update Note" : "Save Note"}
</button> */}
