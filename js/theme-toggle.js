(function () {
  const root = document.documentElement;
  const toggleId = 'theme-toggle';
  const storageKey = 'theme-preference';
  const toggle = document.getElementById(toggleId);

  const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
  `;

  const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  `;

  function setTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
      if (toggle) {
        toggle.innerHTML = sunIcon;
        toggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    } else {
      root.classList.remove('light');
      if (toggle) {
        toggle.innerHTML = moonIcon;
        toggle.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  }

  // read saved preference or system preference
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  } catch (e) {
    setTheme('dark');
  }

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isLight = root.classList.contains('light');
    const next = isLight ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch (e) {}
  });
})();
