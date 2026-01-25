import { supabase } from "./supabase.js";
import { requireAuth, showErrorMessage } from "./utils.js";

const form = document.getElementById("edit-post-form");
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const mediaInput = document.getElementById("post-media");
const messageContainer = document.getElementById("message-container");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
  window.location.href = "/profile.html";
} else {
  loadPostData();
}

async function loadPostData() {
  const session = await requireAuth();
  if (!session) return;

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    window.location.href = "/profile.html";
    return;
  }

  // Check if the logged-in user is the owner
  if (post.user_id !== session.user.id) {
    window.location.href = "/feed.html";
    return;
  }

  // Fill form
  titleInput.value = post.title;
  bodyInput.value = post.content;
  mediaInput.value = post.image_url || "";
}

// Handle Update
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    messageContainer.classList.add("hidden");

    const updates = {
      title: titleInput.value,
      content: bodyInput.value,
      image_url: mediaInput.value || null,
    };

    const { error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", postId);

    if (error) {
      showErrorMessage(messageContainer, error.message);
    } else {
      window.location.href = "/profile.html";
    }
  });
}
