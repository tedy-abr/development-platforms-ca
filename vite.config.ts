import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        feed: resolve(__dirname, "feed.html"),
        profile: resolve(__dirname, "profile.html"),
        "create-post": resolve(__dirname, "create-post.html"),
        "edit-post": resolve(__dirname, "edit-post.html"),
      },
    },
  },
});
