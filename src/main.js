import "./style.css";
import { Navbar } from "./components/navbar.js";
import { supabase } from "./js/supabase.js";

async function setUpNavbar() {
  const header = document.getElementById("header");
  if (!header) return;

  // Ask for the current user
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // Render the Navbar
  header.innerHTML = Navbar(user);

  const logoutBtn = document.getElementById("logout-button");
  const logoutBtnMobile = document.getElementById("logout-button-mobile");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login.html";
  };

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }
  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener("click", handleLogout);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setUpNavbar();
});
