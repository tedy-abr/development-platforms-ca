import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qmcgotpjyuswttkfngvw.supabase.co";
const supabaseKey = "sb_publishable_rvXMm6OynXBsnO7pAl1Srg_0bgQNxEG";

export const supabase = createClient(supabaseUrl, supabaseKey);
