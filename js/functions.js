// Menu
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");

    function closeAllDropdowns() {
        const openDropdowns = document.querySelectorAll(".dropdown.show");
        openDropdowns.forEach((dropdown) => {
            dropdown.classList.remove("show");
            
            const menuItem = dropdown.closest(".menu-item");
            if (menuItem) {
                menuItem.classList.remove("open");
            }
        });
    }

    menu.addEventListener("click", function (e) {
        const target = e.target;
        const menuItem = target.closest(".menu-item");

        if (menuItem) {
            const dropdown = menuItem.querySelector(".dropdown");

            if (dropdown.classList.contains("show")) {
                dropdown.classList.remove("show");
                menuItem.classList.remove("open");
            } else {
                closeAllDropdowns();
                dropdown.classList.add("show");
                menuItem.classList.add("open");
            }
        }
    });

    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target)) {
            closeAllDropdowns();
        }
    });

    window.addEventListener("resize", function () {
        closeAllDropdowns();
    });
});

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
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', 'G-TVSZZ0L8KV', { anonymize_ip: true });
  }
});

// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();