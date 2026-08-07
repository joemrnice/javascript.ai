/**
 * include.js
 * Renders the topbar + sidebar from SITE_NAV so every page shares one
 * navigation source of truth. Expects a global `window.SITE_ROOT`
 * ("./" for root-level pages, "../../" for pages two folders deep)
 * set by an inline <script> before this file loads.
 */
(function () {
  const ROOT = window.SITE_ROOT || './';
  const here = location.pathname.replace(/\/+$/, '/');

  function isActive(href) {
    const full = (ROOT + href).replace(/^\.\//, '');
    return here.endsWith(href) || here.endsWith('/' + href) || (href === 'index.html' && (here.endsWith('/') || here.endsWith('/index.html')) && ROOT === './');
  }

  // ---- topbar ----
  const topbarMount = document.getElementById('topbar-mount');
  if (topbarMount) {
    topbarMount.innerHTML = `
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
      <a class="topbar__brand" href="${ROOT}index.html">
        <span class="dot"></span> javascript<small>.ai</small>
      </a>
      <div class="topbar__search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input id="siteSearch" type="text" placeholder="Search topics, questions, projects…" autocomplete="off">
        <div class="search-results" id="searchResults"></div>
      </div>
      <a class="topbar__gh" href="https://github.com/" target="_blank" rel="noopener">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        source
      </a>
    `;
    const input = document.getElementById('siteSearch');
    const results = document.getElementById('searchResults');
    const idx = window.SITE_SEARCH_INDEX || [];

    function render(list) {
      if (!list.length) { results.innerHTML = '<div class="empty">No matches. Try “closures”, “promise”, “this”…</div>'; return; }
      results.innerHTML = list.slice(0, 8).map(item =>
        `<a href="${ROOT}${item.href}"><span class="cat">${item.group}</span>${item.title}</a>`
      ).join('');
    }

    input?.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.classList.remove('is-open'); return; }
      const matches = idx.filter(i => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q) || i.group.toLowerCase().includes(q));
      render(matches);
      results.classList.add('is-open');
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.topbar__search')) results.classList.remove('is-open');
    });
    input?.addEventListener('keydown', (e) => { if (e.key === 'Escape') results.classList.remove('is-open'); });
  }

  // ---- sidebar ----
  const sidebarMount = document.getElementById('sidebar-mount');
  if (sidebarMount) {
    sidebarMount.innerHTML = (window.SITE_NAV || []).map(group => `
      <div class="sidebar__group">
        <p class="sidebar__label">${group.label}</p>
        ${group.items.map(item => `<a class="sidebar__link${isActive(item.href) ? ' active' : ''}" href="${ROOT}${item.href}">${item.title}</a>`).join('')}
      </div>
    `).join('');
  }

  // ---- mobile menu ----
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    toggle?.addEventListener('click', () => sidebar?.classList.toggle('is-open'));
  });
})();
