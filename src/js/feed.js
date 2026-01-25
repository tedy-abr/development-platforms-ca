import { supabase } from "./supabase.js";
import { createPostElement } from "../components/Post.js";
import { requireAuth } from "./utils.js";

const postsContainer = document.getElementById("posts-container");

async function loadFeed() {
  // Check Login using the helper
  const session = await requireAuth();
  if (!session) return;

  // Fetch posts
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

  // Render posts
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

loadFeed();
