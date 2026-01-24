import { supabase } from "./supabase.js";

const form = document.getElementById("edit-post-form");
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const mediaInput = document.getElementById("post-media");
const messageContainer = document.getElementById("message-container");

// Get the Post ID from the URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
  window.location.href = "/profile.html";
}

async function loadPostData() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/login.html";
    return;
  }

  // Fetch the specific post
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    alert("Could not load post.");
    window.location.href = "/profile.html";
    return;
  }

  // Security Check if the user owns the post
  if (post.user_id !== session.user.id) {
    alert("You are not authorized to edit this post.");
    window.location.href = "/feed.html";
    return;
  }

  // Fill the form
  titleInput.value = post.title;
  bodyInput.value = post.content;
  mediaInput.value = post.image_url || "";
}

// Handle the Update
form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
    messageContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
  } else {
    window.location.href = "/profile.html";
  }
});

loadPostData();
