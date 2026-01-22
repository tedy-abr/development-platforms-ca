export function Navbar(currentUser) {
  // Determine if the user is logged in
  const loggedIn = !!currentUser;

  const loggedInLinks = `
    <li><a class="hover:text-blue-600" href="feed.html">Feed</a></li>
    <li><a class="hover:text-blue-600" href="profile.html">Profile</a></li>
    <li><button id="logout-button" class="hover:text-blue-600">Logout</button></li>
  `;

  const loggedOutLinks = `
    <li><a class="hover:text-blue-600" href="register.html">Register</a></li>
    <li><a class="hover:text-blue-600" href="login.html">Login</a></li>
  `;

  // Mobile versions
  const loggedInLinksMobile = `
    <li><a class="block rounded-md px-2 py-2 hover:bg-blue-50 hover:text-blue-600" href="feed.html">Feed</a></li>
    <li><a class="block rounded-md px-2 py-2 hover:bg-blue-50 hover:text-blue-600" href="profile.html">Profile</a></li>
    <li><button id="logout-button-mobile" class="block rounded-md px-2 py-2 hover:bg-blue-50 hover:text-blue-600 w-full text-left">Logout</button></li>
  `;
  const loggedOutLinksMobile = `
    <li><a class="block rounded-md px-2 py-2 hover:bg-blue-50 hover:text-blue-600" href="register.html">Register</a></li>
    <li><a class="block rounded-md px-2 py-2 hover:bg-blue-50 hover:text-blue-600" href="login.html">Login</a></li>
  `;

  return `
    <nav class="bg-white shadow-sm">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="index.html" class="text-2xl font-semibold text-blue-600">
          SocialHub
        </a>
        
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:hidden"
          onclick="const menu = document.getElementById('mobile-menu'); if (menu) { menu.classList.toggle('hidden'); }"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <ul class="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          ${loggedIn ? loggedInLinks : loggedOutLinks}
        </ul>
      </div>

      <div id="mobile-menu" class="hidden border-t border-slate-200 sm:hidden">
        <ul class="flex flex-col gap-3 px-4 py-4 text-sm font-medium text-slate-600">
          ${loggedIn ? loggedInLinksMobile : loggedOutLinksMobile}
        </ul>
      </div>
    </nav>
  `;
}
