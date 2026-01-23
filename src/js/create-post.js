import { supabase } from "./supabase.js";
async function checkSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // If not logged in, redirect to login page
    window.location.href = "/login.html";
  }
}
// Run checkSession on page load
checkSession();

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

    // Send data to Supabase
    const { error } = await supabase.from("posts").insert({
      title: title,
      content: content,
      image_url: imageUrl,
    });

    if (error) {
      messageContainer.innerHTML = `<div class="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">${error.message}</div>`;
    } else {
      // Success redirect to Feed
      window.location.href = "/feed.html";
    }
  });
}
