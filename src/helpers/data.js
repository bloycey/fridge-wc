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