// Cookies
document.addEventListener('DOMContentLoaded', function () {
  const cookiesBanner = document.getElementById('cookies');
  const acceptButton = document.getElementById('cookiesAcceptButton');
  const declineButton = document.getElementById('cookiesDeclineButton');

  // Always check localStorage
  const cookieDecision = localStorage.getItem('Mandolinie Cookies');

  if (!cookieDecision) {
    cookiesBanner.style.display = 'block';
  } else {
    cookiesBanner.style.display = 'none';
    if (cookieDecision === 'accepted') {
      loadGoogleAnalytics();
    }
  }

  // Accept button
  acceptButton.addEventListener('click', function () {
    localStorage.setItem('Mandolinie Cookies', 'accepted');
    cookiesBanner.style.display = 'none';
    loadGoogleAnalytics();
  });

  // Decline button
  declineButton.addEventListener('click', function () {
    localStorage.setItem('Mandolinie Cookies', 'declined');
    cookiesBanner.style.display = 'none';
  });

  function loadGoogleAnalytics() {
    if (window.gtagLoaded) return; // prevent double-loading
    window.gtagLoaded = true;

    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-TVSZZ0L8KV";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-TVSZZ0L8KV', { anonymize_ip: true });
  }
});

// --- Navigation ---
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  const menuItems = menu.querySelectorAll(".menu-item");

  function closeAll({ returnFocus = false } = {}) {
    menuItems.forEach(item => {
      const button = item.querySelector(".menu-button");
      const dropdown = item.querySelector(".dropdown");

      if (!button || !dropdown) return;

      button.setAttribute("aria-expanded", "false");
      dropdown.classList.remove("show");

      if (returnFocus) {
        button.focus();
      }
    });
  }

  menuItems.forEach(item => {
    const button = item.querySelector(".menu-button");
    const dropdown = item.querySelector(".dropdown");

    if (!button || !dropdown) return;

    // --- Mouse / click ---
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      closeAll();

      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        dropdown.classList.add("show");
      }
    });

    // --- Keyboard on button ---
    button.addEventListener("keydown", e => {
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          button.click();
          break;

        case "ArrowDown":
          e.preventDefault();
          closeAll();
          button.setAttribute("aria-expanded", "true");
          dropdown.classList.add("show");
          dropdown.querySelector("a")?.focus();
          break;

        case "Escape":
          e.preventDefault();
          closeAll({ returnFocus: true });
          break;
      }
    });

    // --- Keyboard inside dropdown ---
    dropdown.addEventListener("keydown", e => {
      const items = Array.from(dropdown.querySelectorAll("a"));
      const index = items.indexOf(document.activeElement);

      if (index === -1) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          items[(index + 1) % items.length]?.focus();
          break;

        case "ArrowUp":
          e.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
          break;

        case "Home":
          e.preventDefault();
          items[0]?.focus();
          break;

        case "End":
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;

        case "Escape":
          e.preventDefault();
          closeAll({ returnFocus: true });
          break;
      }
    });
  });

  // --- Close when clicking outside ---
  document.addEventListener("click", e => {
    if (!menu.contains(e.target)) {
      closeAll();
    }
  });

  // --- Close on window resize ---
  window.addEventListener("resize", () => closeAll());
});

// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();