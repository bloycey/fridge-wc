// TODO: Should these have fallbacks to select from supabase??

import { supabase } from "../db/supabase";

export const getHouseholdData = async () => {
	const localStorageValue = localStorage.getItem("FRIDGE_HOUSEHOLD");
	if (localStorageValue) {
		return JSON.parse(localStorageValue);
	} else {
		const userData = await getUserData();
		const { data: householdData, error: householdError } = await supabase.from("households").select().eq("id", userData.activeHousehold).single()
		if (householdData) {
			localStorage.setItem("FRIDGE_HOUSEHOLD", JSON.stringify(householdData))
			return householdData;
		}
		if (householdError) {
			console.error(householdError)
		}
	}
}

export const getHouseholdMembers = async () => {
	const householdData = await getHouseholdData();
	const { data: members, error: membersError } = await supabase.from("users").select().eq("activeHousehold", householdData.id)
	return members;
}

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
	const householdData = await getHouseholdData();
	if (!householdData) {
		return 0;
	}
	const { data: listItems, error: listError } = await supabase.from("list_items").select().eq("household", householdData.id).eq("checked", false)
	if (listItems) {
		return listItems.length;
	}

	return 0
}

export const getListItems = async () => {
	const householdData = await getHouseholdData();
	const { data: listItems, error: listError } = await supabase.from("list_items").select().eq("household", householdData.id)
	return listItems;
}

export const getCheckedListItems = async () => {
	const householdData = await getHouseholdData();
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
	const householdData = await getHouseholdData();
	const dataToSubmit = {
		...listItem,
		household: householdData.id
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

export const getTasks = async () => {
	const householdData = await getHouseholdData();
	const { data: tasks, error: tasksError } = await supabase.from("tasks").select().eq("household", householdData.id)
	return tasks;
}

export const addTask = async (task) => {
	const { data: createdTask, error: taskError } = await supabase.from("tasks").insert({ ...task }).select().single()
	return createdTask;
}
