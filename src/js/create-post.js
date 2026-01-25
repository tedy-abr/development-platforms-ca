import { supabase } from "./supabase.js";
import { requireAuth, showErrorMessage } from "./utils.js";

// Check if user is logged in
requireAuth();

const form = document.getElementById("create-post-form");
const messageContainer = document.getElementById("message-container");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-body").value;
    const imageUrl = document.getElementById("post-media").value;

    // Clear old messages
    messageContainer.innerHTML = "";
    messageContainer.classList.add("hidden");

    // Send data to Supabase
    const { error } = await supabase.from("posts").insert({
      title: title,
      content: content,
      image_url: imageUrl,
    });

    if (error) {
      showErrorMessage(messageContainer, error.message);
    } else {
      window.location.href = "/feed.html";
    }
  });
}
