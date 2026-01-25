import { supabase } from "./supabase.js";
import { createPostElement } from "../components/Post.js";
import { requireAuth } from "./utils.js";

const profileNameEl = document.getElementById("profile-name");
const profileEmailEl = document.getElementById("profile-email");
const profileAvatarEl = document.getElementById("profile-avatar");
const postsContainer = document.getElementById("profile-posts-container");
const postsHeader = document.getElementById("posts-header");

async function loadProfile() {
  const session = await requireAuth();
  if (!session) return;

  // Check if there is an ID in the URL
  const params = new URLSearchParams(window.location.search);
  const paramId = params.get("id");

  // Determine whose profile to load
  const targetUserId = paramId || session.user.id;

  // Check if the logged-in user is the owner of the profile
  const isOwner = session.user.id === targetUserId;

  // Get profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", targetUserId)
    .single();

  if (error) {
    profileNameEl.textContent = "User not found";
    return;
  }

  const displayName = profile?.username || "Unknown User";

  profileNameEl.textContent = displayName;
  profileAvatarEl.textContent = displayName.charAt(0).toUpperCase();

  // Update posts header
  if (postsHeader) {
    if (isOwner) {
      postsHeader.textContent = "My Posts";
    } else {
      postsHeader.textContent = `${displayName}'s Posts`;
    }
  }

  // Only show email if it is the owner's profile
  if (isOwner) {
    profileEmailEl.textContent = session.user.email;
    profileEmailEl.classList.remove("hidden");
  } else {
    profileEmailEl.classList.add("hidden");
  }

  // Load posts
  loadPosts(targetUserId, isOwner);
}

async function loadPosts(userId, isOwner) {
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
    postsContainer.textContent = "No posts yet.";
    return;
  }

  posts.forEach((post) => {
    let deleteHandler = null;
    let editHandler = null;

    if (isOwner) {
      deleteHandler = async (postId) => {
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
      };

      editHandler = (postId) => {
        window.location.href = `/edit-post.html?id=${postId}`;
      };
    }

    const postElement = createPostElement(post, deleteHandler, editHandler);
    postsContainer.appendChild(postElement);
  });
}

loadProfile();
