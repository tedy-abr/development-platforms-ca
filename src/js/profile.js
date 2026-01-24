import { supabase } from "./supabase.js";
import { createPostElement } from "../components/Post.js";

// Select elements securely
const profileNameEl = document.getElementById("profile-name");
const profileEmailEl = document.getElementById("profile-email");
const profileAvatarEl = document.getElementById("profile-avatar");
const postsContainer = document.getElementById("profile-posts-container");

async function loadProfile() {
  // Check Login
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/login.html";
    return;
  }

  const userId = session.user.id;

  // Fetch User Profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Error loading profile:", profileError);
    return;
  }

  const username = profile?.username || "Unknown User";
  profileNameEl.textContent = username;
  profileEmailEl.textContent = session.user.email;
  profileAvatarEl.textContent = username.charAt(0).toUpperCase();

  await loadPosts(userId);
}

// Load post helper
async function loadPosts(userId) {
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(
      `
      id,
      title, 
      content, 
      image_url, 
      created_at,
      profiles ( username )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Error loading posts:", postsError);
    return;
  }

  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.textContent = "You haven't posted anything yet.";
    return;
  }

  posts.forEach((post) => {
    const postElement = createPostElement(
      post,
      async (postId) => {
        await deletePost(postId);
      },
      (postId) => {
        window.location.href = `/edit-post.html?id=${postId}`;
      },
    );

    postsContainer.appendChild(postElement);
  });
}

async function deletePost(postId) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    alert("Error deleting post: " + error.message);
    console.error("Delete error:", error);
  } else {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      await loadPosts(session.user.id);
    }
  }
}

loadProfile();
