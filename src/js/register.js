import { supabase } from "./supabase.js";
import { showErrorMessage } from "./utils.js";

const form = document.getElementById("register-form");
const messageContainer = document.getElementById("message-container");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    messageContainer.classList.add("hidden");

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      showErrorMessage(messageContainer, error.message);
    } else {
      messageContainer.textContent =
        "Success! Please check your email to confirm your account.";
      messageContainer.className =
        "rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-700 block";
      messageContainer.classList.remove("hidden");
      form.reset();
    }
  });
}
