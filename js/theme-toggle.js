(function () {
  const root = document.documentElement;
  const toggleId = 'theme-toggle';
  const storageKey = 'theme-preference';
  const toggle = document.getElementById(toggleId);

  function setTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
      if (toggle) {
        toggle.textContent = '🌞';
        toggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    } else {
      root.classList.remove('light');
      if (toggle) {
        toggle.textContent = '🌙';
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
