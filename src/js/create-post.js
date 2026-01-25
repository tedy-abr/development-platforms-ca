import { supabase } from "./supabase.js";
import { requireAuth, showErrorMessage } from "./utils.js";

const form = document.getElementById("create-post-form");
const messageContainer = document.getElementById("message-container");

async function onLoad() {
  await requireAuth();
}
onLoad();

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-body").value;
    const imageUrl = document.getElementById("post-media").value;

    messageContainer.innerHTML = "";
    messageContainer.classList.add("hidden");

    const session = await requireAuth();
    if (!session) return;

    const { error } = await supabase.from("posts").insert({
      title: title,
      content: content,
      image_url: imageUrl,
      user_id: session.user.id,
    });

    if (error) {
      showErrorMessage(messageContainer, error.message);
    } else {
      window.location.href = "/feed.html";
    }
  });
}
