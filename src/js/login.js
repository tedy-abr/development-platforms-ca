import { supabase } from "./supabase.js";

const form = document.getElementById("login-form");
const messageContainer = document.getElementById("message-container");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Clear old messages
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      messageContainer.textContent = "Invalid email or password.";
      messageContainer.className =
        "rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700";
      messageContainer.classList.remove("hidden");
    } else {
      // Success: Redirect to feed page
      window.location.href = "/feed.html";
    }
  });
}
