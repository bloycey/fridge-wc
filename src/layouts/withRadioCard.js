export const withRadioCard = ({ contents, id, isChecked, name }) => /*html*/`
	<label for="${id}" class="cursor-pointer">
		<input type="radio" name="${name}" value="${id}" id="${id}" ${isChecked ? "checked" : ""} class="hidden">
		<div class="border-2 border-white rounded-md relative">
			<heroicon-check-circle class="hidden absolute top-2 right-2" class-names="w-10 h-10 text-bright-pink" icon-style="solid"></heroicon-check-circle>
			${contents}
		</div>
	</label>
	`
