// TODO: Should these have fallbacks to select from supabase??

import { supabase } from "../db/supabase";

export const getHouseholdData = () => localStorage.getItem("FRIDGE_HOUSEHOLD") ? JSON.parse(localStorage.getItem("FRIDGE_HOUSEHOLD")) : "";

export const getUserData = async () => {
	const localStorageValue = localStorage.getItem("FRIDGE_USER");
	if (localStorageValue) {
		return JSON.parse(localStorageValue);
	} else {
		const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
		const email = sessionData.session.user.email;
		const { data: userData, error: userError } = await supabase.from("users").select().eq("email", email).single()
		if (userData) {
			localStorage.setItem("FRIDGE_USER", JSON.stringify(userData))
			return userData;
		}
	}
}

export const getCurrentListItemsCount = async () => {
	const householdData = getHouseholdData();
	const { data: listItems, error: listError } = await supabase.from("list_items").select().eq("household", householdData.id).eq("checked", false)
	return listItems.length;
}

export const getListItems = async () => {
	const householdData = getHouseholdData();
	const { data: listItems, error: listError } = await supabase.from("list_items").select().eq("household", householdData.id)
	return listItems;
}

export const getCheckedListItems = async () => {
	const householdData = getHouseholdData();
	const { data: listItems, error: listError } = await supabase.from("list_items").select().eq("household", householdData.id).eq("checked", true)
	return listItems;
}

export const setListItemCheckedStatus = async (id, checkedStatus) => {
	const { data: updatedListItem, error: listItemError } = await supabase.from("list_items").update({ checked: checkedStatus }).eq("list_id", id)
}

export const setListItemName = async (id, text) => {
	const { data: updatedListItem, error: listItemError } = await supabase.from("list_items").update({ text }).eq("list_id", id)
}

export const setListItemOrder = async (id, order) => {
	const { data: updatedListItem, error: listItemError } = await supabase.from("list_items").update({ order }).eq("list_id", id)
}

export const setListItem = async (listItem) => {
	const dataToSubmit = {
		...listItem,
		household: getHouseholdData().id
	}
	const { data: createdListItem, error: listItemError } = await supabase.from("list_items").insert(dataToSubmit).select().single()
	return createdListItem;
}

export const deleteListItem = async (id) => {
	const { data: deletedListItem, error: listItemError } = await supabase.from("list_items").delete().eq("list_id", id)
}

export const deleteListItems = async (ids) => {
	const { data: deletedListItems, error: listItemError } = await supabase.from("list_items").delete().in("list_id", ids)
}

export const setListEmojiUsage = async (value) => {
	const userData = await getUserData();
	const { data: emojiUsage, error: emojiError } = await supabase.from("users").update({ list_emojis: value }).eq("user_id", userData.user_id).select().single()
	localStorage.setItem("FRIDGE_USER", JSON.stringify(emojiUsage))
}
