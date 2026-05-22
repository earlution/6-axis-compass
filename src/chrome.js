const THEME_KEY = 'six-axis-compass-theme';

export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (_) {}
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
  updateThemeToggleIcon(theme);
}

function updateThemeToggleIcon(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    btn.textContent = theme === 'dark' ? '☀' : '☾';
  });
}

function navLinkClass(page, current) {
  return `site-nav__link${page === current ? ' is-active' : ''}`;
}

function mobileNavLinkClass(page, current) {
  return `mobile-nav__link${page === current ? ' is-active' : ''}`;
}

const LOGO_SVG = `<svg class="site-brand__icon" viewBox="0 0 36 36" aria-hidden="true"><polygon points="18,2 34,18 18,34 2,18" stroke-linejoin="round"/></svg>`;

export function renderSiteHeader(currentPage = 'compass') {
  const existing = document.getElementById('site-header');
  if (existing) existing.remove();

  const header = document.createElement('header');
  header.id = 'site-header';
  header.className = 'site-header';
  header.innerHTML = `
    <div class="site-header__inner">
      <a class="site-brand" href="index.html">
        ${LOGO_SVG}
        <span class="site-brand__text">Six-Axis Compass</span>
      </a>
      <nav class="site-nav" aria-label="Main">
        <a class="${navLinkClass('compass', currentPage)}" href="index.html">Compass</a>
        <a class="${navLinkClass('shop', currentPage)}" href="shop.html">Shop</a>
        <a class="${navLinkClass('dataset', currentPage)}" href="data.html">Dataset</a>
      </nav>
      <div class="site-header__actions">
        <button type="button" class="theme-toggle" data-theme-toggle aria-label="Toggle theme">☀</button>
        <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
      <a class="${mobileNavLinkClass('compass', currentPage)}" href="index.html">Compass</a>
      <a class="${mobileNavLinkClass('shop', currentPage)}" href="shop.html">Shop</a>
      <a class="${mobileNavLinkClass('dataset', currentPage)}" href="data.html">Dataset</a>
    </nav>
  `;

  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.after(header);
  } else {
    document.body.prepend(header);
  }

  const theme = getStoredTheme();
  applyTheme(theme);

  header.querySelector('[data-theme-toggle]').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
  });

  const toggle = header.querySelector('#nav-toggle');
  const mobileNav = header.querySelector('#mobile-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    mobileNav.classList.toggle('is-open', !open);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      mobileNav.classList.remove('is-open');
    });
  });
}

export function renderSiteFooter(version) {
  const footers = document.querySelectorAll('.site-footer');
  footers.forEach(f => f.remove());

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="site-footer__inner">
      <span class="footer-copy">© 2026 Ruari Mears</span>
      <span class="footer-sep">·</span>
      <a class="footer-link" href="https://github.com/earlution/6-axis-compass/blob/main/LICENCE" target="_blank" rel="noopener">MIT Licence</a>
      <span class="footer-sep">·</span>
      <a class="footer-link" href="data.html">Dataset</a>
      <span class="footer-sep">·</span>
      <span class="footer-ver">v${version || '1.0.0'}</span>
    </div>
  `;
  document.body.appendChild(footer);
}

export function initResponsiveAccordions(root = document) {
  const mq = window.matchMedia('(min-width: 768px)');
  function sync() {
    root.querySelectorAll('.config-accordion').forEach(el => {
      if (mq.matches) {
        el.setAttribute('open', '');
      }
    });
  }
  sync();
  if (mq.addEventListener) mq.addEventListener('change', sync);
  else mq.addListener(sync);
}

export function initChrome({ page = 'compass', version = '1.0.0' } = {}) {
  const app = document.getElementById('app');
  if (app && !app.classList.contains('page-main')) {
    app.classList.add('page-main');
  }
  renderSiteHeader(page);
  renderSiteFooter(version);
}
