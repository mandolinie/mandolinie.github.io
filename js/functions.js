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
    const cookies = document.querySelectorAll('.cookies');
    const cookiesAcceptButton = document.querySelectorAll('.cookiesAcceptButton');
    const cookieAccepted = sessionStorage.getItem('Manuel Blex Cookies');
  
    if (!cookieAccepted) {
      cookies.forEach(function (banner) {
        banner.style.display = 'block';
      });
    }
  
    cookiesAcceptButton.forEach(function (button) {
      button.addEventListener('click', function () {
        sessionStorage.setItem('Manuel Blex Cookies', 'accepted');
        cookies.forEach(function (modal) {
            modal.style.display = 'none';
        });
      });
    });
  });  