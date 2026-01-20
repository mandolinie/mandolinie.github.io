// nav.js
function initNavigation() {
  const menu = document.querySelector('.menu');
  if (!menu) return;

  const menuItems = menu.querySelectorAll('.menu-item');

  // Helpers
  function closeAll({ returnFocus = false } = {}) {
    menuItems.forEach(item => {
      const button = item.querySelector('.menu-button');
      const dropdown = item.querySelector('.dropdown');

      if (!button || !dropdown) return;

      button.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('show');

      if (returnFocus) {
        button.focus();
      }
    });
  }

  // Menu item setup
  menuItems.forEach(item => {
    const button = item.querySelector('.menu-button');
    const dropdown = item.querySelector('.dropdown');

    if (!button || !dropdown) return;

    // Mouse / click
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      closeAll();

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true');
        dropdown.classList.add('show');
      }
    });

    // Keyboard on button
    button.addEventListener('keydown', e => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          button.click();
          break;

        case 'ArrowDown':
          e.preventDefault();
          closeAll();
          button.setAttribute('aria-expanded', 'true');
          dropdown.classList.add('show');
          dropdown.querySelector('a')?.focus();
          break;

        case 'Escape':
          e.preventDefault();
          closeAll({ returnFocus: true });
          break;
      }
    });

    // Keyboard inside dropdown
    dropdown.addEventListener('keydown', e => {
      const items = Array.from(dropdown.querySelectorAll('a'));
      const index = items.indexOf(document.activeElement);

      if (index === -1) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          items[(index + 1) % items.length]?.focus();
          break;

        case 'ArrowUp':
          e.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
          break;

        case 'Home':
          e.preventDefault();
          items[0]?.focus();
          break;

        case 'End':
          e.preventDefault();
          items[items.length - 1]?.focus();
          break;

        case 'Escape':
          e.preventDefault();
          closeAll({ returnFocus: true });
          break;
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!menu.contains(e.target)) {
      closeAll();
    }
  });

  // Close on resize
  window.addEventListener('resize', () => closeAll());
}