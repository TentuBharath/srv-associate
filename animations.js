// Classic reveal animations across pages
// Classic reveal animations across pages (group-aware, subtle)
(function () {
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Helper: set reveal type + delay if not already set
  function setReveal(el, type, delayMs) {
    if (!el || el.hasAttribute("data-reveal")) return;
    el.setAttribute("data-reveal", type || "up");
    if (typeof delayMs === "number") {
      el.style.setProperty("--reveal-delay", `${delayMs}ms`);
    }
  }

  // Apply reveals to hero text explicitly for consistency
  function tagHero() {
    const h1 = document.querySelector(".about-hero-content h1");
    const p = document.querySelector(".about-hero-content p");
    setReveal(h1, "fade", 0);
    setReveal(p, "fade", 120);
  }

  // Group-based staggering inside common containers
  function tagGroups() {
    const groups = [
      {
        container: ".highlights-grid",
        children: ".highlight-card",
        type: "up",
      },
      {
        container: ".services-grid-about",
        children: ".service-item-about",
        type: "up",
      },
      { container: ".offerings-grid", children: ".offering-card", type: "up" },
      {
        container: ".specialties-grid",
        children: ".specialty-item",
        type: "up",
      },
      { container: ".process-timeline", children: ".process-step", type: "up" },
      {
        container: ".expertise-cards",
        children: ".expertise-card",
        type: "up",
      },
      { container: ".stat-grid", children: ".stat-card", type: "scale" },
      { container: ".why-right", children: ".why-feature-item", type: "up" },
      {
        container: ".contact-grid",
        children: ".contact-info-card",
        type: "up",
      },
      { container: ".locations-grid", children: ".location-card", type: "up" },
    ];

    groups.forEach(({ container, children, type }) => {
      document.querySelectorAll(container).forEach((groupEl) => {
        const items = groupEl.querySelectorAll(children);
        items.forEach((el, i) => setReveal(el, type, i * 80));
      });
    });
  }

  // Single elements to fade in (titles, cards, CTAs)
  function tagSingles() {
    const singles = [
      { selector: ".highlights-header", type: "fade", delay: 0 },
      { selector: ".section-title-center", type: "fade", delay: 0 },
      { selector: ".profile-bio-card", type: "up", delay: 0 },
    ];
    singles.forEach(({ selector, type, delay }) => {
      document
        .querySelectorAll(selector)
        .forEach((el) => setReveal(el, type, delay));
    });

    // CTA buttons: light stagger
    document
      .querySelectorAll(
        ".cta-btn, .btn-primary-cta, .btn-secondary-cta, .cta-btn.primary, .cta-btn.secondary"
      )
      .forEach((el, i) => setReveal(el, "up", 160 + i * 80));
  }

  function initObserver() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (prefersReduced) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-visible");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    items.forEach((el) => obs.observe(el));
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    tagHero();
    tagGroups();
    tagSingles();
    initObserver();
  });
})();
