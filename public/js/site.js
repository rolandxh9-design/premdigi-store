// Shared header/footer behavior for every storefront page (index, product,
// cart): search icon + live product search, mobile nav toggle, nav
// scrollspy, and revealing the footer's Best Sellers link when real sales
// data exists. Requires products.js, icons.js, and config.js to already be
// loaded. Safe to include on any page — scrollspy and search simply have
// nothing to do on pages without the corresponding elements/sections.

document.addEventListener("DOMContentLoaded", () => {
  const searchIconEl = document.getElementById("search-icon");
  const menuIconEl = document.getElementById("mobile-menu-icon");
  if (searchIconEl) searchIconEl.innerHTML = ICONS.search;
  if (menuIconEl) menuIconEl.innerHTML = ICONS.menu;

  // ---------------- Header search (real, client-side, no fake results) ----------------
  const searchToggle = document.getElementById("search-toggle");
  const searchPanel = document.getElementById("search-panel");
  const searchInput = document.getElementById("site-search-input");
  const searchResults = document.getElementById("search-results");

  if (searchToggle && searchPanel && searchInput && searchResults) {
    searchToggle.addEventListener("click", () => {
      const isHidden = searchPanel.hidden;
      searchPanel.hidden = !isHidden;
      searchToggle.setAttribute("aria-expanded", String(isHidden));
      if (isHidden) searchInput.focus();
    });

    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        searchResults.hidden = true;
        searchResults.innerHTML = "";
        return;
      }
      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (CATEGORY_LABELS[p.category] || "").toLowerCase().includes(q) ||
        (p.tagline || "").toLowerCase().includes(q)
      ).slice(0, 6);

      searchResults.hidden = false;
      if (matches.length === 0) {
        searchResults.innerHTML = `<div class="search-empty">No products found.</div>`;
        return;
      }
      searchResults.innerHTML = matches.map(p => `
        <a class="search-result-item" href="product.html?id=${encodeURIComponent(p.id)}">
          <span class="search-result-icon cat-${p.category}">${ICONS[p.icon] || ""}</span>
          <span class="search-result-name">${p.name}</span>
          <span class="search-result-price">$${p.price.toFixed(2)}</span>
        </a>
      `).join("");
    });

    document.addEventListener("click", (e) => {
      if (!searchPanel.contains(e.target) && e.target !== searchToggle && !searchToggle.contains(e.target)) {
        searchPanel.hidden = true;
      }
    });
  }

  // ---------------- Mobile nav ----------------
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileNavToggle && mobileNav) {
    mobileNavToggle.addEventListener("click", () => {
      const isHidden = mobileNav.hidden;
      mobileNav.hidden = !isHidden;
      mobileNavToggle.setAttribute("aria-expanded", String(isHidden));
    });
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => { mobileNav.hidden = true; });
    });
  }

  // ---------------- Scrollspy: highlight active nav link (index.html only —
  // a harmless no-op on pages without these section ids) ----------------
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const sections = ["top", "products", "categories", "faq"].map(id => document.getElementById(id)).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.dataset.section === entry.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => observer.observe(s));
  }
});

// Fetches real aggregated sales data and reveals the footer's Best Sellers
// link when any exists. Returns the sales array so index.html can also use
// it to render the actual Best Sellers product grid. Each page calls this
// itself (once) — product.html/cart.html just for the footer-link reveal,
// index.html also uses the returned data to render the product grid.
function loadBestSellerData() {
  return fetch(`${API_BASE_URL}/api/bestsellers`)
    .then(res => (res.ok ? res.json() : []))
    .then(sales => {
      if (Array.isArray(sales) && sales.length > 0) {
        const footerLink = document.getElementById("footer-bestsellers-link");
        if (footerLink) footerLink.hidden = false;
      }
      return Array.isArray(sales) ? sales : [];
    })
    .catch(() => []);
}
