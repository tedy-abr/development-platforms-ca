import { supabase } from "./supabase.js";
import { showErrorMessage } from "./utils.js";

const form = document.getElementById("login-form");
const messageContainer = document.getElementById("message-container");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    messageContainer.classList.add("hidden");

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Use the helper
      showErrorMessage(messageContainer, "Invalid email or password.");
    } else {
      window.location.href = "./feed.html";
    }
  });
}
