import { supabase } from "./supabase.js";
import { createPostElement } from "../components/Post.js";

const postsContainer = document.getElementById("posts-container");

async function loadFeed() {
  // Check if user is logged in
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    window.location.href = "/login.html";
    return;
  }

  // Fetch posts AND the connected profile username
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      title, 
      content, 
      image_url, 
      created_at,
      profiles ( username ) 
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error:", error);
    postsContainer.textContent = "Could not load posts.";
    return;
  }

  // Handle empty feed
  if (posts.length === 0) {
    postsContainer.textContent = "No posts yet.";
    return;
  }

  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

loadFeed();
