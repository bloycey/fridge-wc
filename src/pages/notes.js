import { withNav } from "../layouts/withNav";
import { getNotesData } from "../helpers/data";

export default class Notes extends HTMLElement {
	constructor() {
		super();
		this.buildHTML();
	}

	async buildHTML() {
		const notes = await getNotesData();
		this.innerHTML = /*html*/`
			<div class="grid-bg screen-content">
				${withNav(/*html*/ `
					<h1>Notes</h1>
					<p>${JSON.stringify(notes)}</p>
				`)}
				<a href="/new-note" class="btn-primary !rounded-full fixed right-2 bottom-[72px] new-note-trigger">
					<heroicon-add class-names="w-6 h-6"></heroicon-add>
					<span>
						New Note
					</span>
				</a>
			</div>`
	}
}

if (!customElements.get("fridge-page-notes")) {
	customElements.define("fridge-page-notes", Notes);
}

{/* <zap-modal class="new-note-modal" displayCloseIcon="false" hideFooter="true" fullScreen="true">
<div slot="content">
	<zap-tabs activeTabClasses="border-green" inactiveTabClasses="border-light-green" activeContentClasses="block" inactiveContentClasses="hidden">
		<nav class="text-darkest-green">
			<ul class="list-none flex items-center">
				<li class="zap-tab pb-2 pt-3 pl-5 pr-4 flex flex-col items-center justify-center border-green border-b-2" data-tab-target="write" role="button">
					<NotesOutline classes="w-5 h-5" />
					<p class="text-xs uppercase mt-1">Write</p>
				</li>
				<li class="zap-tab pb-2 pt-3 px-4 flex flex-col items-center justify-center border-b-2 border-light-green" data-tab-target="style" role="button">
					<StyleOutline classes="w-5 h-5" />
					<p class="text-xs uppercase mt-1">Style</p>
				</li>
				<li class="zap-tab pb-2 pt-3 px-4 flex flex-col items-center justify-center border-b-2 border-light-green" data-tab-target="image" role="button">
					<ImageOutline classes="w-5 h-5" />
					<p class="text-xs uppercase mt-1">Image</p>
				</li>
				<!-- <li class="h-16 w-16 flex flex-col items-center justify-center">
					<NotesOutline classes="w-8 h-8" />
					<p class="text-sm uppercase">Layout</p>
				</li> -->
				<li class="zap-tab pb-2 pt-3 px-4 flex flex-col items-center justify-center border-b-2 border-light-green" data-tab-target="share" role="button">
					<SharingOutline classes="w-5 h-5" />
					<p class="text-xs uppercase mt-1">Share</p>
				</li>
				<li class="flex-1 border-b-2 flex flex-col items-center justify-center border-light-green pb-2 pt-3 w-20" aria-hidden="true">
					<SharingOutline classes="w-5 h-5 invisible" />
					<p class="text-xs uppercase invisible mt-1">Spacer</p>
				</li>
			</ul>
		</nav>
		<div class="zap-tab-content" id="write">
			<fridge-note-editor></fridge-note-editor>
		</div>
		<div class="zap-tab-content hidden p-6" id="style">
			<p>Style content here</p>
		</div>
		<div class="zap-tab-content hidden p-6" id="image">
			<p>Image content here</p>
		</div>
		<div class="zap-tab-content hidden p-6" id="share">
			<p>Share content here</p>
		</div>
	</zap-tabs>
</div>
</zap-modal> */}
