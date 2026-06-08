// cookies.js
function initCookies() {
  const overlay = document.getElementById('cookies');
  const modal = document.getElementById('cookiesModal');
  const acceptBtn = document.getElementById('cookiesAcceptButton');
  const declineBtn = document.getElementById('cookiesDeclineButton');

  if (!overlay || !modal || !acceptBtn || !declineBtn) return;

  const STORAGE_KEY = 'cookie_consent';
  const GA_ID = 'G-TVSZZ0L8KV';

  // Google Analytics loader
  function loadGoogleAnalytics() {
    if (window.gtag) return;

    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    gtag('js', new Date());
    gtag('config', GA_ID, { cookie_domain: 'mandolinie.github.io' });
  }

  // Focus trap
  let previousFocus = null;
  let removeFocusTrap = null;

  function setupFocusTrap() {
    const selectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(modal.querySelectorAll(selectors));

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setDecision('declined');
        hideModal();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    modal.addEventListener('keydown', handleKeyDown);
    return () => modal.removeEventListener('keydown', handleKeyDown);
  }

  function showModal() {
    overlay.style.display = 'block';
    previousFocus = document.activeElement;
    acceptBtn.focus();
    removeFocusTrap = setupFocusTrap();
  }

  function hideModal() {
    overlay.style.display = 'none';
    if (removeFocusTrap) { removeFocusTrap(); removeFocusTrap = null; }
    if (previousFocus) { previousFocus.focus(); previousFocus = null; }
  }

  // Single source of truth for changing decision
  function setDecision(value) {
    localStorage.setItem(STORAGE_KEY, value);

    if (value === 'accepted') {
      loadGoogleAnalytics();
    }

    document.dispatchEvent(
      new CustomEvent('cookies:change', {
        detail: { value }
      })
    );
  }

  const decision = localStorage.getItem(STORAGE_KEY);

  if (!decision) {
    showModal();
  } else if (decision === 'accepted') {
    loadGoogleAnalytics();
  }

  // Modal actions
  acceptBtn.addEventListener('click', () => {
    setDecision('accepted');
    hideModal();
  });

  declineBtn.addEventListener('click', () => {
    setDecision('declined');
    hideModal();
  });

  // Public API
  window.cookies = {
    get() {
      return localStorage.getItem(STORAGE_KEY);
    },
    accept() {
      setDecision('accepted');
    },
    decline() {
      setDecision('declined');
    },
    reset() {
      localStorage.removeItem(STORAGE_KEY);
      showModal();
    }
  };
}
