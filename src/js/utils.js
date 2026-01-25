import { supabase } from "./supabase.js";

/**
 * Check if the user is logged in.
 * Redirects to login if there is no session.
 */
export async function requireAuth() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    window.location.href = "/login.html";
    return null;
  }

  return session;
}

/**
 * Show an error message in an element.
 * @param element - The HTML element to put the message in
 * @param message - The text to show
 */
export function showErrorMessage(element, message) {
  if (!element) return;

  element.textContent = message;
  element.className =
    "rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 mb-4 block";
  element.classList.remove("hidden");
}
