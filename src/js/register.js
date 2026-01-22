import { supabase } from "./supabase.js";

const form = document.getElementById("register-form");
const messageContainer = document.getElementById("message-container");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get data from inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    // Clear old messages
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      messageContainer.textContent = error.message;
      messageContainer.className =
        "rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700";
      messageContainer.classList.remove("hidden");
    } else {
      messageContainer.textContent =
        "Success! Please check your email to confirm your account.";
      messageContainer.className =
        "rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-700";
      messageContainer.classList.remove("hidden");

      form.reset();
    }
  });
}
