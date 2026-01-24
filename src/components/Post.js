export function createPostElement(post, onDelete = null, onEdit = null) {
  const template = document.querySelector("#post-template");
  if (!template) return document.createElement("div");

  const clone = template.content.cloneNode(true);

  const title = clone.querySelector(".post-title");
  const body = clone.querySelector(".post-body");
  const date = clone.querySelector(".post-date");
  const author = clone.querySelector(".post-author");
  const avatar = clone.querySelector(".post-avatar");
  const imgContainer = clone.querySelector(".post-image-container");
  const image = clone.querySelector(".post-image");
  const deleteBtn = clone.querySelector(".delete-btn");
  const editBtn = clone.querySelector(".edit-btn");

  title.textContent = post.title;
  body.textContent = post.content;
  date.textContent = new Date(post.created_at).toLocaleString();

  const username = post.profiles?.username || "Unknown User";
  author.textContent = username;
  avatar.textContent = username.charAt(0).toUpperCase();

  if (post.image_url) {
    image.src = post.image_url;
    imgContainer.classList.remove("hidden");
  } else {
    imgContainer.classList.add("hidden");
  }

  if (onDelete && deleteBtn) {
    deleteBtn.classList.remove("hidden");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this post?")) {
        onDelete(post.id);
      }
    });
  }

  if (onEdit && editBtn) {
    editBtn.classList.remove("hidden");
    editBtn.addEventListener("click", () => {
      onEdit(post.id);
    });
  }

  return clone;
}
