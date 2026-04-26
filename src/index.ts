/**
 * THEME CHECKER
 * Executed before the body renders to prevent the "white flash" (flicker).
 *
 * Priority order:
 * 1. User's saved preference from a previous visit (localStorage)
 * 2. First visit: read [color-mode-override] attribute on <body>
 *    - "user"  → respect OS/browser preference
 *    - "dark"  → force dark
 *    - "light" → force light
 */
(function () {
  const savedTheme = localStorage.getItem('theme');

  // Priority 1: Returning visitor with a saved preference
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
    return;
  }
  if (savedTheme === 'light') {
    return;
  }

  // Priority 2: First visit — read the body attribute
  // Note: <body> may not be parsed yet when this runs in <head>,
  // so we parse it from the raw HTML as a fallback.
  function getBodyOverride() {
    const bodyMatch = document.documentElement.innerHTML.match(
      /<body[^>]*color-mode-override=["']([^"']*)["']/i
    );
    return bodyMatch ? bodyMatch[1].toLowerCase() : null;
  }

  const override =
    (document.body && document.body.getAttribute('color-mode-override')) || getBodyOverride();

  if (override === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else if (override === 'light') {
    // Force light — do nothing
  } else {
    // "user" or unset — fall back to OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark-mode');
    }
  }
})();
