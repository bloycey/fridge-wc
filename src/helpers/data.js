// TODO: Should these have fallbacks to select from supabase??

import { supabase } from "../db/supabase";

export const getHouseholdData = () => localStorage.getItem("FRIDGE_HOUSEHOLD") ? JSON.parse(localStorage.getItem("FRIDGE_HOUSEHOLD")) : "";
export const getUserData = () => localStorage.getItem("FRIDGE_USER") ? JSON.parse(localStorage.getItem("FRIDGE_USER")) : "";
