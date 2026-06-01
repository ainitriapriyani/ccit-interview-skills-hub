/* ============================================================
   CCIT Interview Skills Hub — Main JavaScript
   ============================================================ */

(function () {
  "use strict";

  /* ── Dark Mode ─────────────────────────────────────────────── */
  const THEME_KEY = "ccit-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    applyTheme(saved || preferred);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* ── Navbar scroll effect ──────────────────────────────────── */
  function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ───────────────────────────────────────── */
  function setActiveNavLink() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (
        href === current ||
        (current === "" && href === "index.html") ||
        (current === "index.html" && href === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  /* ── Mobile nav ─────────────────────────────────────────────── */
  function initMobileNav() {
    const btn = document.querySelector(".mobile-menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");
    if (!btn || !mobileNav) return;

    btn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      const spans = btn.querySelectorAll("span");
      const isOpen = mobileNav.classList.contains("open");
      if (spans.length >= 3) {
        spans[0].style.transform = isOpen
          ? "rotate(45deg) translate(5px, 5px)"
          : "";
        spans[1].style.opacity = isOpen ? "0" : "1";
        spans[2].style.transform = isOpen
          ? "rotate(-45deg) translate(5px, -5px)"
          : "";
      }
    });

    document.addEventListener("click", (e) => {
      if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove("open");
      }
    });
  }

  /* ── Back to top ────────────────────────────────────────────── */
  function initBackTop() {
    const btn = document.querySelector(".back-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 400);
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
  }

/* ── Sidebar active link (learning page) ───────────────────── */
function initSidebarHighlight() {
  const sections = document.querySelectorAll(".learning-section");
  const links = document.querySelectorAll(".sidebar-link");

  if (!sections.length || !links.length) return;

  function setActiveLink(id) {
    links.forEach((link) => {
      link.classList.remove("active");

      if (link.dataset.target === id) {
        link.classList.add("active");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
          updateProgress();
        }
      });
    },
    {
      threshold: 0.4,
      rootMargin: "-100px 0px -50% 0px"
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.dataset.target;
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      setActiveLink(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

  function updateProgress() {
  const sections = document.querySelectorAll(".learning-section");
  const fill = document.querySelector(".progress-fill");
  const label = document.querySelector(".progress-label");

  if (!sections.length || !fill) return;

  let currentIndex = 0;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (
      rect.top <= window.innerHeight * 0.35 &&
      rect.bottom >= window.innerHeight * 0.35
    ) {
      currentIndex = index + 1;
    }
  });

  const percentage = Math.round(
    (currentIndex / sections.length) * 100
  );

  fill.style.width = percentage + "%";

  if (label) {
    label.textContent = percentage + "% Complete";
  }
}

  /* ── Search ─────────────────────────────────────────────────── */
  const SEARCH_DATA = [
    {
      title: "The Importance of Interviewing Skills",
      section: "Topic 1",
      url: "learning-materials.html#topic-1",
      keywords: ["interviewing", "skills", "communication", "importance", "first impression"],
      snippet:
        "Interviewing skills are essential competencies that determine how effectively you present yourself to potential employers...",
    },
    {
      title: "The Importance of Job Interviews",
      section: "Topic 2",
      url: "learning-materials.html#topic-2",
      keywords: ["job interview", "employer", "hiring", "assessment", "evaluation"],
      snippet:
        "Job interviews serve as the critical gateway between being a candidate on paper and becoming a valued team member...",
    },
    {
      title: "Types of Job Interviews",
      section: "Topic 3",
      url: "learning-materials.html#topic-3",
      keywords: [
        "behavioral",
        "panel",
        "technical",
        "phone",
        "video",
        "group",
        "types",
        "structured",
      ],
      snippet:
        "Understanding the different formats of interviews helps you prepare more strategically for each unique challenge...",
    },
    {
      title: "Stages in an Interview",
      section: "Topic 4",
      url: "learning-materials.html#topic-4",
      keywords: ["stages", "phases", "opening", "body", "closing", "rapport", "questions"],
      snippet:
        "Every interview follows a recognizable structure. Mastering each stage gives you control over your performance...",
    },
    {
      title: "Strengths and Weaknesses",
      section: "Topic 5",
      url: "learning-materials.html#topic-5",
      keywords: [
        "strengths",
        "weaknesses",
        "SWOT",
        "self-awareness",
        "honest",
        "improvement",
      ],
      snippet:
        "The classic 'strengths and weaknesses' question reveals your level of self-awareness and authenticity...",
    },
    {
      title: "Communication Skills in Interviews",
      section: "Topic 1",
      url: "learning-materials.html#topic-1",
      keywords: ["verbal", "non-verbal", "body language", "active listening", "tone"],
      snippet:
        "Effective communication goes beyond what you say — it encompasses how you carry yourself, your tone, and active listening...",
    },
    {
      title: "Behavioral Interview Questions (STAR Method)",
      section: "Topic 4",
      url: "learning-materials.html#topic-4",
      keywords: ["STAR", "situation", "task", "action", "result", "behavioral", "method"],
      snippet:
        "The STAR method (Situation, Task, Action, Result) is the gold standard for answering behavioral interview questions...",
    },
  ];

  function initSearch() {
    const input = document.getElementById("search-input");
    const btn = document.getElementById("search-btn");
    const results = document.getElementById("search-results");
    if (!input) return;

    function doSearch() {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        results.innerHTML = "";
        return;
      }

      const matches = SEARCH_DATA.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.snippet.toLowerCase().includes(query) ||
          item.keywords.some((k) => k.toLowerCase().includes(query))
      );

      if (!matches.length) {
        results.innerHTML = `<div class="search-result-item"><p class="result-snippet" style="color:rgba(148,163,184,0.7);">No results found for "<strong>${escapeHtml(query)}</strong>". Try different keywords.</p></div>`;
        return;
      }

      results.innerHTML = matches
        .map(
          (m) => `
        <a href="${m.url}" class="search-result-item" style="text-decoration:none;display:block;">
          <div class="result-tag">${m.section}</div>
          <div class="result-title">${highlight(m.title, query)}</div>
          <div class="result-snippet">${highlight(m.snippet, query)}</div>
        </a>`
        )
        .join("");
    }

    input.addEventListener("input", doSearch);
    if (btn) btn.addEventListener("click", doSearch);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSearch();
    });
  }

  function highlight(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    return text.replace(
      regex,
      '<mark style="background:rgba(245,158,11,0.25);color:inherit;border-radius:2px;padding:0 2px;">$1</mark>'
    );
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ── Counter animation ──────────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 1800;
          const start = performance.now();

          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = target * ease;
            el.textContent =
              (Number.isInteger(target)
                ? Math.round(val)
                : val.toFixed(1)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  /* ── Init ───────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    setActiveNavLink();
    initMobileNav();
    initBackTop();
    initReveal();
    initSidebarHighlight();

window.addEventListener(
  "scroll",
  updateProgress,
  { passive: true }
);

updateProgress();
    initSearch();
    initCounters();

    // Dark toggle buttons
    document.querySelectorAll(".dark-toggle").forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });
  });
})();
