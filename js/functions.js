// @prepros-prepend 10_cookies.js
// @prepros-prepend 20_nav.js

document.addEventListener('DOMContentLoaded', () => {
  initCookies();
  initNavigation();
});

// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();