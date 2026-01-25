import { supabase } from "./supabase.js";
import { createPostElement } from "../components/Post.js";
import { requireAuth } from "./utils.js";

const profileNameEl = document.getElementById("profile-name");
const profileEmailEl = document.getElementById("profile-email");
const profileAvatarEl = document.getElementById("profile-avatar");
const postsContainer = document.getElementById("profile-posts-container");

async function loadProfile() {
  const session = await requireAuth();
  if (!session) return;

  const userId = session.user.id;

  // Get the profile username
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (error) {
    console.warn("Could not load profile", error);
  }

  const displayName = profile?.username || session.user.email;

  profileNameEl.textContent = displayName;
  profileEmailEl.textContent = session.user.email;
  profileAvatarEl.textContent = displayName.charAt(0).toUpperCase();

  loadPosts(userId);
}

async function loadPosts(userId) {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`*, profiles(username)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    postsContainer.textContent = "Error loading posts.";
    return;
  }

  postsContainer.innerHTML = "";

  if (!posts || posts.length === 0) {
    postsContainer.textContent = "You haven't posted anything yet.";
    return;
  }

  posts.forEach((post) => {
    const postElement = createPostElement(
      post,
      async (postId) => {
        const confirmDelete = confirm("Are you sure you want to delete this?");
        if (!confirmDelete) return;

        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId);
        if (error) {
          alert("Could not delete post.");
        } else {
          loadProfile();
        }
      },
      (postId) => {
        window.location.href = `/edit-post.html?id=${postId}`;
      },
    );
    postsContainer.appendChild(postElement);
  });
}

loadProfile();
