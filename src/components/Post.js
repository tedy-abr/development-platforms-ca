export function createPostElement(post) {
  const template = document.querySelector("#post-template");
  const clone = template.content.cloneNode(true);

  // Get all the HTML elements
  const title = clone.querySelector(".post-title");
  const body = clone.querySelector(".post-body");
  const date = clone.querySelector(".post-date");
  const author = clone.querySelector(".post-author");
  const avatar = clone.querySelector(".post-avatar");
  const imgContainer = clone.querySelector(".post-image-container");
  const image = clone.querySelector(".post-image");

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

  return clone;
}
