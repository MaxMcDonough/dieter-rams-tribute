/* ================================================================
   DIETER RAMS — A DESIGNER'S TRIBUTE
   ================================================================
   Single script shared across all 6 pages.

   Author      Max McDonough
   Course      INTD-215 · Designing for Screens · Spring 2026
   Mantra      Weniger, aber besser. (Less, but better.)

   No frameworks. No build step. Vanilla JS only.
   Every interaction respects prefers-reduced-motion.

   MODULES (in order of appearance below) —

     v1 base
       Page loader (typographic count-up)
       Hero grid parallax
       Nav scroll state
       Mobile menu
       Scroll-reveal IntersectionObserver
       Auto-reveal section helper
       Work modal (legacy single-page version)
       Filter buttons (legacy)
       Smooth-scroll for in-page anchors

     v2 enhancements
       Scroll-progress bar
       Chapter rail (was section rail in single-page version)
       Cursor dot
       Index counters
       Process card reveal
       Keyboard shortcuts (now multi-page chapter navigation)
       Logo Easter egg

     v3 — Section component drivers
       Parallax feature scroll (in-view trigger)
       Influence rotator (sticky text + scroll-synced cards)

     v4 — Skeuomorphic Braun-instrument drivers
       ET 66 Calculator (key activation, display fade-swap)
       Studio meter rack / purpose-built instruments
       Persistent HUD (chapter indicator + scroll progress)
       Hero device LED
       T 1000 dial (horizontal scroll-driven rotor)

     v5 — Multi-page chapter layer
       The Eleventh Principle (input + counter + clipboard)

   Each module is self-contained in an IIFE, returns early if its
   target element isn't present, so the same script runs cleanly
   on every chapter page even though each page only uses some of
   the modules.
   ================================================================ */

// PAGE LOADER — typographic count-up
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  const countEl = loader.querySelector('.loader-count-num');
  const start = performance.now();
  const duration = 1100;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    if (countEl) {
      const value = Math.round(eased * 100);
      countEl.textContent = String(value).padStart(3, '0');
    }
    if (t < 1) requestAnimationFrame(tick);
    else {
      setTimeout(() => {
        document.body.classList.remove('loading');
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 600);
      }, 200);
    }
  }
  if (reduce) {
    if (countEl) countEl.textContent = '100';
    document.body.classList.remove('loading');
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 300);
  } else {
    requestAnimationFrame(tick);
  }
});

// HERO: subtle pointer parallax on modular grid (respects reduced motion)
(function initHeroGridParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const apply = () => {
    if (mq.matches) {
      hero.style.setProperty('--hero-mx', '0px');
      hero.style.setProperty('--hero-my', '0px');
    }
  };
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', apply);
  } else if (typeof mq.addListener === 'function') {
    mq.addListener(apply);
  }
  apply();
  if (mq.matches) return;

  hero.addEventListener(
    'mousemove',
    (e) => {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      hero.style.setProperty('--hero-mx', `${(x * 16).toFixed(2)}px`);
      hero.style.setProperty('--hero-my', `${(y * 11).toFixed(2)}px`);
    },
    { passive: true }
  );

  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--hero-mx', '0px');
    hero.style.setProperty('--hero-my', '0px');
  });
})();

// NAV: scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// NAV: mobile menu
const toggle = document.querySelector('.nav-toggle');
let mobileMenu = null;

function buildMobileMenu() {
  const menu = document.createElement('div');
  menu.className = 'mobile-menu';
  const links = [
    { href: '#about', text: 'About' },
    { href: '#principles', text: 'Principles' },
    { href: '#work', text: 'Work' },
    { href: '#legacy', text: 'Legacy' },
    { href: '#contact', text: 'Contact' },
  ];
  links.forEach(({ href, text }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    a.addEventListener('click', () => {
      closeMobileMenu();
    });
    menu.appendChild(a);
  });
  document.body.appendChild(menu);
  return menu;
}

function openMobileMenu() {
  if (!mobileMenu) mobileMenu = buildMobileMenu();
  // Force a reflow so transition triggers
  void mobileMenu.offsetWidth;
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  animateToggle(true);
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  animateToggle(false);
  menuOpen = false;
}

function animateToggle(open) {
  const spans = toggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

let menuOpen = false;
toggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) openMobileMenu();
  else closeMobileMenu();
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(el => observer.observe(el));

// AUTO-REVEAL: add reveal classes to sections
function initReveal() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const label = section.querySelector('.section-label');
    const heading = section.querySelector('h2');
    if (label && !label.classList.contains('reveal')) {
      label.classList.add('reveal');
      observer.observe(label);
    }
    if (heading && !heading.classList.contains('reveal')) {
      heading.classList.add('reveal', 'reveal-delay-1');
      observer.observe(heading);
    }

    // About grid columns
    const aboutCols = section.querySelectorAll('.about-portrait, .about-text > p, .about-text .body-lg');
    aboutCols.forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 5)}`);
        observer.observe(el);
      }
    });

    // Principle cards
    const cards = section.querySelectorAll('.principle-card');
    cards.forEach((card, i) => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal', `reveal-delay-${Math.min((i % 4) + 1, 5)}`);
        observer.observe(card);
      }
    });

    // Work cards
    const workCards = section.querySelectorAll('.work-card');
    workCards.forEach((card, i) => {
      if (!card.classList.contains('reveal')) {
        card.classList.add('reveal', `reveal-delay-${Math.min((i % 3) + 1, 5)}`);
        observer.observe(card);
      }
    });

    // Legacy items
    const legacyItems = section.querySelectorAll('.legacy-item');
    legacyItems.forEach((item, i) => {
      if (!item.classList.contains('reveal')) {
        item.classList.add('reveal', `reveal-delay-${Math.min((i % 3) + 1, 5)}`);
        observer.observe(item);
      }
    });

    // Timeline items
    const timelineItems = section.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, i) => {
      if (!item.classList.contains('reveal')) {
        item.classList.add('reveal', `reveal-delay-${Math.min((i % 3) + 1, 3)}`);
        observer.observe(item);
      }
    });
  });

  // Blockquote
  const blockquote = document.querySelector('.quote-break blockquote');
  if (blockquote && !blockquote.classList.contains('reveal')) {
    blockquote.classList.add('reveal');
    observer.observe(blockquote);
  }
}

initReveal();

// WORK MODAL
const workModal = document.getElementById('work-modal');
const workModalImg = document.getElementById('work-modal-img');
const workModalBrand = document.getElementById('work-modal-brand');
const workModalTitle = document.getElementById('work-modal-title');
const workModalYear = document.getElementById('work-modal-year');
const workModalBody = document.getElementById('work-modal-body');
const workModalNote = document.getElementById('work-modal-note');
let workModalLastFocus = null;

function openWorkModal(card) {
  if (!workModal || !card) return;
  const img = card.querySelector('.work-card-photo');
  const desc = card.querySelector('.work-card-desc');
  if (!img || !desc) return;

  workModalLastFocus = document.activeElement;
  workModalImg.src = img.currentSrc || img.src;
  workModalImg.alt = img.alt || '';
  workModalBrand.textContent = card.querySelector('.work-card-brand')?.textContent || '';
  workModalTitle.textContent = card.querySelector('h3')?.textContent || '';
  workModalYear.textContent = card.querySelector('.work-card-year')?.textContent || '';
  workModalBody.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = desc.textContent;
  workModalBody.appendChild(p);

  const note = card.dataset.photoNote;
  if (note) {
    workModalNote.textContent = note;
    workModalNote.hidden = false;
  } else {
    workModalNote.textContent = '';
    workModalNote.hidden = true;
  }

  workModal.classList.add('is-open');
  workModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    document.querySelector('.work-modal-close')?.focus();
  });
}

function closeWorkModal() {
  if (!workModal || !workModal.classList.contains('is-open')) return;
  workModal.classList.remove('is-open');
  workModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (workModalLastFocus && typeof workModalLastFocus.focus === 'function') {
    workModalLastFocus.focus();
  }
}

document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('click', () => openWorkModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWorkModal(card);
    }
  });
});

document.querySelectorAll('[data-modal-close]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    closeWorkModal();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && workModal?.classList.contains('is-open')) {
    e.preventDefault();
    closeWorkModal();
  }
});

// WORK FILTER — with animation
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.dataset.filter;

    workCards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      if (show) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${i * 0.05}s`;
        // Re-trigger animation
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// CONTACT FORM
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const originalText = btn.textContent;

  btn.textContent = 'Sending\u2026';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Enquiry Sent';
    btn.style.background = 'rgba(255,255,255,0.5)';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1200);
}

// SMOOTH ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// PRINCIPLE CARD: subtle hover number highlight
document.querySelectorAll('.principle-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.principle-number').style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.principle-number').style.opacity = '';
  });
});

// BACK TO TOP
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// SMOOTH SCROLL for in-page anchor links (offset handled via CSS scroll-margin on sections)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   ENHANCEMENTS — v2
   ============================================================ */

// SCROLL PROGRESS BAR
(function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress-bar');
  if (!bar) return;
  let ticking = false;
  function update() {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrollTop / max) * 100 : 0;
    bar.style.width = pct.toFixed(2) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

// CHAPTER RAIL — show after hero, dark-section auto-invert
(function initChapterRail() {
  const rail = document.querySelector('.chapter-rail') || document.querySelector('.section-rail');
  if (!rail) return;

  function checkVisibility() {
    rail.classList.toggle('visible', window.scrollY > 220);
  }
  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility();

  const darkSelectors = '.principles, .hero, .ticker, .footer, .footer--minimal, .footer--pro, .index-section--meters, .legacy--rack, .feature-scroll, .dial-section, .chapter-intro, .mantra, .act';
  function detectDark() {
    const railRect = rail.getBoundingClientRect();
    const probeY = railRect.top + railRect.height / 2;
    let onDark = false;
    document.querySelectorAll(darkSelectors).forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top <= probeY && r.bottom >= probeY) onDark = true;
    });
    rail.classList.toggle('on-dark', onDark);
  }
  window.addEventListener('scroll', detectDark, { passive: true });
  window.addEventListener('resize', detectDark);
  detectDark();
})();

// CURSOR DOT — accent dot follower on dark sections; expands over interactive
(function initCursorDot() {
  const dot = document.querySelector('.cursor-dot');
  if (!dot) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
  let isOnDark = false;
  let animating = false;

  const darkSelectors = '.hero, .principles, .contact, .ticker, .footer, .work-modal-backdrop';

  function loop() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%) scale(${dot.classList.contains('expanded') ? 3.4 : (dot.classList.contains('active') ? 1 : 0)})`;
    animating = true;
    requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Are we over a dark section?
    const el = document.elementFromPoint(e.clientX, e.clientY);
    isOnDark = !!(el && el.closest(darkSelectors));
    dot.classList.toggle('active', isOnDark);

    // Expand over interactive
    const interactive = !!(el && el.closest('a, button, .work-card, .principle-card, .process-card, .index-item, [role="button"], input, textarea, select'));
    dot.classList.toggle('expanded', interactive && isOnDark);

    if (!animating) requestAnimationFrame(loop);
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('active', 'expanded');
  });
})();

// INDEX COUNTERS — animate numbers when section enters viewport
(function initIndexCounters() {
  const numbers = document.querySelectorAll('.index-number[data-count]');
  if (!numbers.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      if (reduce) {
        el.textContent = `${prefix}${target}${suffix}`;
        return;
      }
      const start = performance.now();
      const duration = Math.min(1800, 800 + target * 0.4);
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(eased * target);
        el.textContent = `${prefix}${value}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  numbers.forEach(n => observer.observe(n));
})();

// PROCESS CARDS — reveal on scroll
(function initProcessReveal() {
  const cards = document.querySelectorAll('.process-card');
  if (!cards.length) return;
  cards.forEach((c, i) => {
    c.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`);
    observer.observe(c);
  });

  // Index items
  document.querySelectorAll('.index-item').forEach((c, i) => {
    c.classList.add('reveal', `reveal-delay-${(i % 3) + 1}`);
    observer.observe(c);
  });
})();

// KEYBOARD SHORTCUTS — multi-page chapter navigation
(function initKeys() {
  const panel = document.querySelector('.keys-panel');
  const opener = document.querySelector('[data-key-hint]');
  const closer = panel ? panel.querySelector('.keys-panel-close') : null;

  // Map digits to chapter pages
  const chapterPages = {
    '0': 'index.html',
    '1': 'about.html',
    '2': 'principles.html',
    '3': 'work.html',
    '4': 'impact.html',
    '5': 'invitation.html',
  };
  const chapterOrder = ['index.html', 'about.html', 'principles.html', 'work.html', 'impact.html', 'invitation.html'];
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const currentIdx = chapterOrder.indexOf(currentPage);

  let lastG = 0;

  function openPanel() {
    if (!panel) return;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
  }
  function closePanel() {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }

  if (opener && panel) opener.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  if (closer) closer.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    const tag = (e.target && e.target.tagName) || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable)) return;

    if (e.key === '?') {
      e.preventDefault();
      panel && (panel.classList.contains('is-open') ? closePanel() : openPanel());
      return;
    }
    if (e.key === 'Escape') { closePanel(); return; }

    if (e.key === 'g') {
      const now = Date.now();
      if (now - lastG < 500) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lastG = 0;
      } else { lastG = now; }
      return;
    }

    // j/k for next/prev chapter
    if (e.key === 'j' && currentIdx >= 0 && currentIdx < chapterOrder.length - 1) {
      e.preventDefault();
      location.href = chapterOrder[currentIdx + 1];
      return;
    }
    if (e.key === 'k' && currentIdx > 0) {
      e.preventDefault();
      location.href = chapterOrder[currentIdx - 1];
      return;
    }

    // 0-5 jump to chapter pages
    if (chapterPages[e.key]) {
      e.preventDefault();
      location.href = chapterPages[e.key];
    }
  });
})();

// LOGO EASTER EGG — click DR mark 3x to flash the Braun-orange grid
(function initLogoEgg() {
  const mark = document.querySelector('.nav-logo-mark');
  if (!mark) return;
  let clicks = 0, timer;
  mark.addEventListener('click', (e) => {
    e.preventDefault();
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => clicks = 0, 600);
    if (clicks >= 3) {
      clicks = 0;
      const flash = document.createElement('div');
      Object.assign(flash.style, {
        position: 'fixed', inset: '0', zIndex: '9998',
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent 0, transparent 47px, rgba(199,61,40,0.18) 47px, rgba(199,61,40,0.18) 48px), repeating-linear-gradient(90deg, transparent 0, transparent 47px, rgba(199,61,40,0.18) 47px, rgba(199,61,40,0.18) 48px)',
        opacity: '0',
        transition: 'opacity 0.4s ease'
      });
      document.body.appendChild(flash);
      requestAnimationFrame(() => flash.style.opacity = '1');
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
      }, 700);
    }
  });
})();

// FOCUS WORK CARDS BY KEYBOARD when filter changes
(function refineFilter() {
  // already exists; nothing more needed
})();

/* ============================================================
   v3 — Parallax features · Wave path · Influence rotator
   ============================================================ */

// PARALLAX FEATURE — toggle in-view to trigger image clip + copy slide
(function initFeatureScroll() {
  const rows = document.querySelectorAll('.feature-row');
  if (!rows.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
  rows.forEach(r => obs.observe(r));
})();

// WAVE PATH — superseded by Discipline Test (initDisciplineTest below)

// INFLUENCE — rotate left-side text when right-side cards scroll into focus
(function initInfluence() {
  const cards = document.querySelectorAll('.influence-card');
  if (!cards.length) return;
  const dots = document.querySelectorAll('.influence-dot');
  const nameEl = document.querySelector('[data-influence-name]');
  const knownforEl = document.querySelector('[data-influence-knownfor]');
  const bioEl = document.querySelector('[data-influence-bio]');
  const counterEl = document.querySelector('[data-influence-current]');
  const bornEl = document.querySelector('[data-influence-born]');
  const discEl = document.querySelector('[data-influence-discipline]');
  const studioEl = document.querySelector('[data-influence-studio]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentIdx = 0;

  function animateNameSwap(newName) {
    if (!nameEl) return;
    if (reduce) {
      nameEl.innerHTML = `<span class="influence-name-inner">${escapeHTML(newName)}</span>`;
      return;
    }
    // Rotate out, then swap, then rotate in
    nameEl.classList.add('is-rotating');
    setTimeout(() => {
      nameEl.innerHTML = `<span class="influence-name-inner">${splitForChars(newName)}</span>`;
      // force reflow
      void nameEl.offsetWidth;
      nameEl.classList.remove('is-rotating');
    }, 280);
  }

  function splitForChars(text) {
    // Split into words, wrap each word in an unbreakable inline-block.
    // Within each word, render characters in their own spans for staggered animation.
    // This keeps words intact (no orphans) while preserving the per-char reveal.
    const words = text.split(' ');
    let charIdx = 0;
    return words.map((word, wi) => {
      const inner = Array.from(word).map((c) => {
        const ch = escapeHTML(c);
        const html = `<span class="influence-name-char" style="transition-delay:${charIdx * 22}ms">${ch}</span>`;
        charIdx++;
        return html;
      }).join('');
      const spaceAfter = wi < words.length - 1 ? '<span class="influence-name-space"> </span>' : '';
      return `<span class="influence-name-word">${inner}</span>${spaceAfter}`;
    }).join('');
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function setActive(idx) {
    if (idx === currentIdx) return;
    const card = cards[idx];
    if (!card) return;
    currentIdx = idx;

    // Toggle active states
    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));

    // Read data
    const name = card.dataset.name || '';
    const knownfor = card.dataset.knownfor || '';
    const bio = card.dataset.bio || '';
    const born = card.dataset.born || '';
    const discipline = card.dataset.discipline || '';
    const studio = card.dataset.studio || '';

    // Animate text rotations
    animateNameSwap(name);

    if (knownforEl) {
      knownforEl.classList.add('fade');
      setTimeout(() => {
        knownforEl.innerHTML = knownfor;
        knownforEl.classList.remove('fade');
      }, 220);
    }

    if (bioEl) {
      bioEl.classList.add('fade');
      setTimeout(() => {
        bioEl.innerHTML = bio;
        bioEl.classList.remove('fade');
      }, 260);
    }

    if (counterEl) counterEl.textContent = String(idx + 1).padStart(2, '0');
    if (bornEl) bornEl.textContent = born;
    if (discEl) discEl.textContent = discipline;
    if (studioEl) studioEl.textContent = studio;
  }

  // Convert initial name to char spans on first run for clean entrance later
  if (nameEl) {
    const initial = nameEl.textContent.trim();
    nameEl.innerHTML = `<span class="influence-name-inner">${splitForChars(initial)}</span>`;
  }

  // Use IntersectionObserver to detect which card is centered
  const obs = new IntersectionObserver((entries) => {
    // Pick the entry with greatest intersectionRatio
    let best = null;
    entries.forEach(e => {
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    });
    if (best && best.isIntersecting) {
      const idx = parseInt(best.target.dataset.influenceIndex, 10);
      if (!isNaN(idx)) setActive(idx);
    }
  }, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });

  cards.forEach(c => obs.observe(c));

  // Allow clicking dots to jump
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      cards[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    dot.style.cursor = 'pointer';
  });

  // Update the Selected Works list in the left panel when card changes
  const worksList = document.querySelector('[data-influence-works-list]');
  function updateWorksList(card) {
    if (!worksList || !card) return;
    const works = (card.dataset.works || '').split('|').filter(Boolean);
    if (!works.length) return;
    worksList.style.opacity = '0';
    setTimeout(() => {
      worksList.innerHTML = works.map((w, i) => {
        // Try to extract year in parens at end, e.g. "iPhone (2007)"
        const m = w.match(/^(.*?)(?:\s*\((\d{4})\))?\s*$/);
        const name = m ? m[1].trim() : w;
        const year = m && m[2] ? m[2] : '';
        return `<li><span class="iw-num">${String(i+1).padStart(2,'0')}</span><span class="iw-name">${name}</span><span class="iw-year">${year}</span></li>`;
      }).join('');
      worksList.style.opacity = '';
    }, 220);
  }

  // Hook into the existing setActive by observing class changes
  const cardObserver = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        if (m.target.classList.contains('active')) {
          updateWorksList(m.target);
        }
      }
    });
  });
  cards.forEach(c => cardObserver.observe(c, { attributes: true }));
})();

// PRINCIPLES — ET 66 CALCULATOR
(function initCalculator() {
  const calc = document.querySelector('[data-calc]');
  if (!calc) return;
  const display = calc.querySelector('[data-calc-display]');
  const numEl = calc.querySelector('[data-calc-num]');
  const titleEl = calc.querySelector('[data-calc-title]');
  const bodyEl = calc.querySelector('[data-calc-body]');
  const stepEl = calc.querySelector('[data-calc-step]');
  const progressEl = calc.querySelector('[data-calc-progress]');
  const led = calc.querySelector('[data-calc-led]');
  const keys = calc.querySelectorAll('.calc-key');

  let activeIdx = 0;

  function activate(idx) {
    if (idx < 0 || idx >= keys.length) return;
    activeIdx = idx;
    const key = keys[idx];

    keys.forEach((k, i) => {
      k.classList.toggle('is-active', i === idx);
      k.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });

    // Fade-update the display
    display.classList.add('is-changing');
    if (led) { led.style.opacity = '1'; setTimeout(() => led.style.opacity = '0.6', 280); }

    setTimeout(() => {
      const num = key.dataset.key;
      if (numEl) numEl.textContent = String(num).padStart(2, '0');
      if (titleEl) titleEl.textContent = key.dataset.title || '';
      if (bodyEl) bodyEl.textContent = key.dataset.body || '';
      if (stepEl) stepEl.textContent = String(num).padStart(2, '0');
      if (progressEl) progressEl.style.width = `${(parseInt(num, 10) / 10) * 100}%`;
      display.classList.remove('is-changing');
    }, 180);
  }

  keys.forEach((key, i) => {
    key.addEventListener('click', () => activate(i));
  });

  // Keyboard: when calculator is in viewport, 1-9 + 0 select keys; arrows move
  let inView = false;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => inView = e.isIntersecting);
  }, { threshold: 0.3 });
  obs.observe(calc);

  document.addEventListener('keydown', (e) => {
    if (!inView) return;
    const tag = (e.target && e.target.tagName) || '';
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag) || (e.target && e.target.isContentEditable)) return;

    if (e.key >= '1' && e.key <= '9') {
      // 1-9 → indices 0-8
      const i = parseInt(e.key, 10) - 1;
      if (i >= 0 && i < 9) {
        e.preventDefault();
        activate(i);
      }
    } else if (e.key === '0') {
      e.preventDefault();
      activate(9); // 0 → principle 10 (the orange equals)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      activate((activeIdx + 1) % keys.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      activate((activeIdx - 1 + keys.length) % keys.length);
    }
  });
})();

// INDEX — PURPOSE-BUILT INSTRUMENTS (each animates appropriately when in view)
(function initInstruments() {
  const instrs = document.querySelectorAll('[data-instr]');
  if (!instrs.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el, target, dur = 1600) {
    if (!el) return;
    if (reduce) { el.textContent = String(target); return; }
    const start = performance.now();
    const startVal = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(startVal + (target - startVal) * eased);
      // preserve 4-digit padding for years
      const original = el.textContent;
      if (original.length === 4 && original.match(/^\d+$/)) {
        el.textContent = String(v).padStart(4, '0');
      } else {
        el.textContent = String(v);
      }
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function activate(instr) {
    // Generic counter target for [data-instr-count]
    instr.querySelectorAll('[data-instr-count]').forEach(el => {
      const target = parseInt(el.dataset.instrCount, 10);
      countUp(el, target);
    });

    // CH·02 — Tenure bar fill (42 / 70 max → 60%)
    const tenureFill = instr.querySelector('[data-tenure-fill]');
    if (tenureFill) {
      // 1955 - 1997 = 42 years, span 1947-2000 = 53 → marker at (42/53 of range)
      // visually: fill the full span between markers
      setTimeout(() => { tenureFill.style.width = '100%'; }, 200);
    }

    // CH·03 — LED row light up sequentially
    const leds = instr.querySelectorAll('.led');
    if (leds.length) {
      leds.forEach((led, i) => {
        setTimeout(() => led.classList.add('on'), 120 + i * 90);
      });
    }

    // CH·05 — Odometer roll to 500
    const odo = instr.querySelector('[data-odo]');
    if (odo) {
      const digits = odo.querySelectorAll('.odo-digit span');
      const targets = ['5', '0', '0'];
      digits.forEach((dg, i) => {
        if (reduce) { dg.textContent = targets[i]; return; }
        // simple roll by replacing text after staggered delay
        let n = 0;
        const final = parseInt(targets[i], 10);
        const interval = setInterval(() => {
          dg.textContent = n;
          n++;
          if (n > 9) n = 0;
        }, 60);
        setTimeout(() => {
          clearInterval(interval);
          dg.textContent = final;
        }, 800 + i * 250);
      });
    }

    // CH·06 — Histogram bars grow
    const histBars = instr.querySelectorAll('.hist-bar');
    histBars.forEach((bar, i) => {
      setTimeout(() => bar.classList.add('is-grown'), 120 + i * 60);
    });
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      activate(entry.target);
    });
  }, { threshold: 0.35 });

  instrs.forEach(i => obs.observe(i));
})();

// THE ELEVENTH PRINCIPLE — visitor adds their own one-word principle
(function initEleventh() {
  const form = document.querySelector('[data-eleventh]');
  if (!form) return;
  const input = form.querySelector('[data-eleventh-input]');
  const counter = form.querySelector('[data-eleventh-counter]');
  const submit = form.querySelector('[data-eleventh-submit]');
  const result = document.querySelector('[data-eleventh-result]');
  const wordEl = result && result.querySelector('[data-eleventh-word]');
  const stampEl = result && result.querySelector('[data-eleventh-stamp]');
  const reset = result && result.querySelector('[data-eleventh-reset]');
  const max = parseInt(input.getAttribute('maxlength') || '14', 10);

  function updateCounter() {
    const len = input.value.length;
    counter.textContent = `${String(len).padStart(2, '0')} / ${max}`;
    counter.classList.remove('is-warning', 'is-bad');
    if (len > max - 3) counter.classList.add('is-warning');
    if (len >= max) counter.classList.add('is-bad');
    submit.disabled = !input.value.trim();
  }

  input.addEventListener('input', updateCounter);

  function submitWord() {
    const raw = input.value.trim();
    if (!raw) return;
    // capitalize first letter only — keep their typing
    const word = raw.charAt(0).toLowerCase() + raw.slice(1);
    if (wordEl) wordEl.textContent = word;
    if (stampEl) {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yy = now.getFullYear();
      stampEl.textContent = `Filed ${dd}.${mm}.${yy} · DR Framework v1.1 · #${Math.floor(Math.random() * 9000 + 1000)}`;
    }
    if (result) {
      result.removeAttribute('hidden');
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // copy to clipboard (best-effort)
    const phrase = `Good design is ${word}.`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phrase).catch(() => {});
    }
  }

  submit.addEventListener('click', (e) => { e.preventDefault(); submitWord(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); submitWord(); }
  });

  if (reset) {
    reset.addEventListener('click', () => {
      input.value = '';
      updateCounter();
      result.setAttribute('hidden', '');
      input.focus();
    });
  }

  updateCounter();
})();

// WAVE — THE DISCIPLINE TEST: live form-integrity scoring (still present on legacy single-page snapshot, harmless if not in DOM)
(function initDisciplineTest() {
  const canvas = document.querySelector('[data-wave]');
  if (!canvas) return;
  const path = canvas.querySelector('.wave-path');
  if (!path) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const integrityEl = document.querySelector('[data-wave-integrity]');
  const excessEl = document.querySelector('[data-wave-excess]');
  const principleEl = document.querySelector('[data-wave-principle]');
  const bestEl = document.querySelector('[data-wave-best]');
  const verdictEl = document.querySelector('[data-wave-verdict]');
  const segments = document.querySelectorAll('.wave-segment');
  const cells = document.querySelectorAll('.wave-readout-cell');

  // 10 principles for the segment indicator
  const principles = [
    'Innovative', 'Useful', 'Aesthetic', 'Understandable',
    'Unobtrusive', 'Honest', 'Long-lasting', 'Thorough',
    'Environmental', 'Less, but better'
  ];

  let target = { x: 600, y: 110 };
  let current = { x: 600, y: 110 };
  let inside = false;
  let raf;
  let cumulativeExcess = 0;
  let lastTimestamp = performance.now();
  let bestRun = 100;
  let lastSegment = -1;

  const baseY = 110;
  const baseX = 600;
  const stiffness = 0.12;
  const damping = 0.78;
  let velocity = { x: 0, y: 0 };

  function setReadoutClass(cls) {
    cells.forEach(c => {
      c.classList.remove('is-warning', 'is-bad');
      if (cls) c.classList.add(cls);
    });
  }

  function updateScores() {
    // Distance of current from baseline = the bend
    const bend = Math.abs(current.y - baseY);
    // Map 0-110 (max possible deflection) to 0-100% excess
    const instantExcess = Math.min(100, (bend / 110) * 100);
    // Form integrity = 100 - instant excess
    const integrity = Math.max(0, 100 - instantExcess);

    // Update readouts
    if (integrityEl) integrityEl.firstChild.nodeValue = String(Math.round(integrity));
    if (excessEl) excessEl.firstChild.nodeValue = cumulativeExcess.toFixed(3);

    // Color states
    const canvasEl = canvas;
    canvasEl.classList.remove('warning', 'bad');
    if (integrity < 40) {
      canvasEl.classList.add('bad');
      setReadoutClass('is-bad');
    } else if (integrity < 75) {
      canvasEl.classList.add('warning');
      setReadoutClass('is-warning');
    } else {
      setReadoutClass(null);
    }

    // Best run = lowest integrity recorded (most-violated state) — actually let's track HIGHEST integrity over interaction
    // Inversion: best run = least excess introduced over a 'session' (until release)
    if (integrity > bestRun || bestRun === 100 && integrity < 100) {
      // skip — we update bestRun on release
    }

    // Update verdict text
    if (verdictEl) {
      let v;
      if (!inside && cumulativeExcess < 0.05) {
        v = 'Untested. Move your cursor across the line — the design is yours to disturb.';
      } else if (integrity > 95) {
        v = 'Verdict: Restrained. The design holds. (Less, but better.)';
      } else if (integrity > 70) {
        v = 'Verdict: Reasonable. A small concession to expression.';
      } else if (integrity > 40) {
        v = 'Verdict: Decorative. The line begins to show off rather than serve.';
      } else {
        v = 'Verdict: Indulgent. The design is now louder than what it carries. (Principle five: unobtrusive.)';
      }
      verdictEl.textContent = v;
      verdictEl.classList.remove('is-good', 'is-bad');
      if (integrity > 90) verdictEl.classList.add('is-good');
      else if (integrity < 50) verdictEl.classList.add('is-bad');
    }

    // Segment indicator — which principle is the cursor over (x position 0..1200 → 1..10)
    if (inside) {
      const seg = Math.min(9, Math.max(0, Math.floor((current.x / 1200) * 10)));
      if (seg !== lastSegment) {
        segments.forEach((s, i) => s.classList.toggle('is-active', i === seg));
        if (principleEl) principleEl.textContent = `${String(seg + 1).padStart(2, '0')} · ${principles[seg]}`;
        lastSegment = seg;
      }
    } else {
      segments.forEach(s => s.classList.remove('is-active'));
      if (principleEl) principleEl.textContent = '—';
      lastSegment = -1;
    }
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - lastTimestamp) / 1000);
    lastTimestamp = now;

    const tx = inside ? target.x : baseX;
    const ty = inside ? target.y : baseY;
    const ax = (tx - current.x) * stiffness;
    const ay = (ty - current.y) * stiffness;
    velocity.x = (velocity.x + ax) * damping;
    velocity.y = (velocity.y + ay) * damping;
    current.x += velocity.x;
    current.y += velocity.y;

    // accumulate excess (only when actively perturbed)
    const bend = Math.abs(current.y - baseY);
    if (inside) cumulativeExcess += (bend / 110) * dt * 0.5;

    const cx = current.x;
    const cy = current.y;
    path.setAttribute('d', `M 0 ${baseY} C ${cx * 0.4} ${baseY}, ${cx * 0.6 + 240} ${cy}, 1200 ${baseY}`);

    updateScores();

    if (Math.abs(velocity.x) > 0.05 || Math.abs(velocity.y) > 0.05 || inside) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = null;
      // On full release, record best run if better
      const finalIntegrity = Math.max(0, 100 - (Math.abs(current.y - baseY) / 110) * 100);
      // best-run = highest minimum integrity reached during session
      // We track best as the MAXIMUM integrity at point of release that was <100
      // Actually let's track best as lowest cumulative excess achieved between releases
      // For now, best = highest integrity ever held while inside (already updated on release)
    }
  }

  function setTargetFromEvent(e) {
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1200;
    const y = ((e.clientY - rect.top) / rect.height) * 220;
    target.x = Math.max(0, Math.min(1200, x));
    target.y = Math.max(0, Math.min(220, y));
  }

  if (reduce) {
    path.setAttribute('d', `M 0 ${baseY} Q 600 ${baseY} 1200 ${baseY}`);
    return;
  }

  // Track best as max integrity ever reached during a held interaction
  let sessionMin = 100;
  function recordSession() {
    if (sessionMin < bestRun) {
      bestRun = sessionMin;
      if (bestEl) bestEl.firstChild.nodeValue = String(Math.round(bestRun));
    }
    sessionMin = 100;
  }

  canvas.addEventListener('mouseenter', (e) => {
    inside = true;
    setTargetFromEvent(e);
    if (!raf) { lastTimestamp = performance.now(); raf = requestAnimationFrame(loop); }
  });

  canvas.addEventListener('mousemove', (e) => {
    setTargetFromEvent(e);
    const bend = Math.abs(current.y - baseY);
    const integrity = Math.max(0, 100 - (bend / 110) * 100);
    if (integrity < sessionMin) sessionMin = integrity;
    if (!raf) { lastTimestamp = performance.now(); raf = requestAnimationFrame(loop); }
  });

  canvas.addEventListener('mouseleave', () => {
    inside = false;
    recordSession();
    if (!raf) { lastTimestamp = performance.now(); raf = requestAnimationFrame(loop); }
  });

  // touch
  canvas.addEventListener('touchstart', (e) => {
    inside = true;
    if (e.touches[0]) setTargetFromEvent(e.touches[0]);
    if (!raf) { lastTimestamp = performance.now(); raf = requestAnimationFrame(loop); }
  }, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches[0]) setTargetFromEvent(e.touches[0]);
    if (!raf) { lastTimestamp = performance.now(); raf = requestAnimationFrame(loop); }
  }, { passive: true });
  canvas.addEventListener('touchend', () => {
    inside = false;
    recordSession();
    if (!raf) { lastTimestamp = performance.now(); raf = requestAnimationFrame(loop); }
  });

  updateScores();
})();

// PERSISTENT HUD — chapter indicator + scroll progress (multi-page)
(function initHud() {
  const hud = document.querySelector('[data-hud]');
  if (!hud) return;
  const progressBar = hud.querySelector('[data-hud-progress]');
  const pctEl = hud.querySelector('[data-hud-pct]');

  // The chapter info is rendered server-side in each page's HUD markup.
  // We just need to: (a) show the HUD after a small delay, (b) update progress on scroll.

  setTimeout(() => hud.classList.add('visible'), 1200);

  function updateScroll() {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (scrollTop / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct.toFixed(1) + '%';
    if (pctEl) pctEl.textContent = String(Math.round(pct)).padStart(2, '0') + '%';
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  updateScroll();
})();

// HERO DEVICE LED pulse synchronised with the loader sweep
(function initHeroLed() {
  const led = document.querySelector('[data-hero-led]');
  if (!led) return;
  // CSS-driven; nothing to do
})();

// BRAUN-DIAL TIMELINE — horizontal scroll-driven dial
(function initDial() {
  const shell = document.querySelector('[data-dial-shell]');
  if (!shell) return;
  const rotor = shell.querySelector('[data-dial-rotor]');
  const ticks = shell.querySelectorAll('.dial-tick');
  const knob = shell.querySelector('[data-dial-knob]');
  const led = shell.querySelector('[data-dial-led]');
  const yearOut = shell.querySelector('[data-dial-year]');
  const eventOut = shell.querySelector('[data-dial-event]');
  const bodyOut = shell.querySelector('[data-dial-body]');
  const stepOut = shell.querySelector('[data-dial-step]');
  const progressBar = shell.querySelector('[data-dial-progress]');
  const dataItems = shell.querySelectorAll('.dial-data li');
  if (!rotor || !ticks.length || !dataItems.length) return;

  const total = ticks.length;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build readout map by year
  const dataByYear = new Map();
  dataItems.forEach(li => {
    dataByYear.set(li.dataset.year, {
      year: li.dataset.year,
      event: li.dataset.event,
      body: li.innerHTML
    });
  });

  let lastIdx = -1;

  function updateReadout(idx) {
    if (idx === lastIdx) return;
    lastIdx = idx;

    const tick = ticks[idx];
    const yearKey = tick?.dataset.year;
    const data = dataByYear.get(yearKey);
    if (!data) return;

    // Activate ticks
    ticks.forEach((t, i) => {
      t.classList.remove('is-active', 'is-near');
      if (i === idx) t.classList.add('is-active');
      else if (Math.abs(i - idx) === 1) t.classList.add('is-near');
    });

    // Fade-update the readout
    const readout = shell.querySelector('.dial-readout');
    if (readout) {
      readout.classList.add('fading');
      setTimeout(() => {
        if (yearOut) yearOut.textContent = data.year === 'now' ? 'Now' : data.year;
        if (eventOut) eventOut.textContent = data.event;
        if (bodyOut) bodyOut.innerHTML = data.body;
        readout.classList.remove('fading');
      }, 200);
    }

    if (stepOut) stepOut.textContent = String(idx + 1).padStart(2, '0');
    if (progressBar) progressBar.style.width = `${((idx + 1) / total) * 100}%`;

    // LED pulse
    if (led) {
      led.style.opacity = '1';
      setTimeout(() => { if (led) led.style.opacity = '0.6'; }, 250);
    }
  }

  function update() {
    const rect = shell.getBoundingClientRect();
    const viewportH = window.innerHeight;
    // progress 0..1 over the scroll range of the shell
    const scrollableHeight = rect.height - viewportH;
    const scrolled = Math.min(scrollableHeight, Math.max(0, -rect.top));
    const t = scrollableHeight > 0 ? scrolled / scrollableHeight : 0;

    // Map t [0..1] to idx [0..total-1]
    const idxFloat = t * (total - 1);
    const idx = Math.round(idxFloat);

    // Compute rotor offset: each tick is its own width
    if (ticks[0]) {
      const tickWidth = ticks[0].offsetWidth;
      const offset = -idxFloat * tickWidth + (rotor.parentElement.offsetWidth / 2 - tickWidth / 2);
      rotor.style.transform = `translateX(${offset}px)`;
    }

    // Knob rotation — full rotation across the scroll
    if (knob) {
      const rotation = idxFloat * 36; // 36° per step
      knob.style.transform = `rotate(${rotation}deg)`;
    }

    updateReadout(idx);
  }

  if (reduce) {
    // No scroll-driven rotation; show first state
    rotor.style.transform = 'translateX(0)';
    updateReadout(0);
    return;
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
})();



