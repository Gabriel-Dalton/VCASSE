document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navClose = document.getElementById('navClose');

  document.querySelectorAll('.nav-dropdown-trigger').forEach((trigger) => {
    let label = trigger.querySelector('.menu-label');

    if (!label) {
      label = document.createElement('span');
      label.className = 'menu-label';
      trigger.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) node.textContent = '';
      });
      trigger.insertBefore(label, trigger.firstChild);
    }

    label.textContent = 'Research';
  });

  function closeNavDropdowns() {
    document.querySelectorAll('.nav-dropdown.is-open').forEach((dd) => {
      dd.classList.remove('is-open');
      const btn = dd.querySelector('.nav-dropdown-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  const MOBILE_NAV_BREAKPOINT = 768;
  const MOBILE_MENU_CLOSE_MS = 650;
  let mobileMenuCloseTimer = null;
  let lastTouchY = 0;

  function isMobileMenuActive() {
    return Boolean(navLinks && navLinks.classList.contains('open') && window.innerWidth <= MOBILE_NAV_BREAKPOINT);
  }

  function canScrollMenu(deltaY) {
    if (!navLinks) return false;
    const maxScroll = navLinks.scrollHeight - navLinks.clientHeight;

    if (maxScroll <= 0) return false;
    if (deltaY < 0) return navLinks.scrollTop > 0;
    if (deltaY > 0) return navLinks.scrollTop < maxScroll;
    return false;
  }

  function preventBackgroundScroll(e, deltaY) {
    if (!isMobileMenuActive()) return;
    if (navLinks && navLinks.contains(e.target) && canScrollMenu(deltaY)) return;
    e.preventDefault();
  }

  function finalizeMobileMenuClose() {
    if (mobileMenuCloseTimer) {
      clearTimeout(mobileMenuCloseTimer);
      mobileMenuCloseTimer = null;
    }
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open', 'is-dismissing');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    if (navClose) {
      navClose.setAttribute('tabindex', '-1');
    }
    document.body.classList.remove('menu-open');
    closeNavDropdowns();
  }

  function closeMobileMenu(options = {}) {
    if (!navLinks || !navToggle) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const immediate = options.immediate === true || reduceMotion;

    if (!navLinks.classList.contains('open')) {
      navLinks.classList.remove('is-dismissing');
      return;
    }

    if (immediate) {
      finalizeMobileMenuClose();
      return;
    }

    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navLinks.classList.add('is-dismissing');
    if (mobileMenuCloseTimer) clearTimeout(mobileMenuCloseTimer);
    mobileMenuCloseTimer = setTimeout(finalizeMobileMenuClose, MOBILE_MENU_CLOSE_MS);
  }

  function setMenuRevealOrigin() {
    if (!navToggle || !navLinks) return;
    const rect = navToggle.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    navLinks.style.setProperty('--menu-origin-x', originX + 'px');
    navLinks.style.setProperty('--menu-origin-y', originY + 'px');
  }

  function openMobileMenuFromToggle() {
    setMenuRevealOrigin();
    if (mobileMenuCloseTimer) {
      clearTimeout(mobileMenuCloseTimer);
      mobileMenuCloseTimer = null;
    }
    navLinks.classList.remove('is-dismissing');
    navLinks.classList.add('open');
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
    closeNavDropdowns();
    if (navClose) navClose.setAttribute('tabindex', '0');
  }

  if (navToggle && navLinks) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navLinks');
    navToggle.setAttribute('aria-label', 'Open menu');

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen =
        navLinks.classList.contains('open') && !navLinks.classList.contains('is-dismissing');
      if (isOpen) {
        closeMobileMenu();
        return;
      }
      openMobileMenuFromToggle();
    });

    if (navClose) {
      navClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
      });
    }

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMobileMenu({ immediate: true }));
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth > MOBILE_NAV_BREAKPOINT) return;
      if (navToggle.contains(e.target) || navLinks.contains(e.target) || (navClose && navClose.contains(e.target))) return;
      closeMobileMenu();
    });

    document.addEventListener('wheel', (e) => {
      preventBackgroundScroll(e, e.deltaY);
    }, { passive: false });

    document.addEventListener('touchstart', (e) => {
      if (!isMobileMenuActive() || e.touches.length === 0) return;
      lastTouchY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isMobileMenuActive() || e.touches.length === 0) return;
      const currentTouchY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentTouchY;
      lastTouchY = currentTouchY;
      preventBackgroundScroll(e, deltaY);
    }, { passive: false });

    window.addEventListener('resize', () => {
      if (navLinks.classList.contains('open')) setMenuRevealOrigin();
      if (window.innerWidth <= MOBILE_NAV_BREAKPOINT) return;
      if (!navLinks.classList.contains('open')) return;
      closeMobileMenu();
    });
  }

  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const willOpen = !dropdown.classList.contains('is-open');
      document.querySelectorAll('.nav-dropdown.is-open').forEach((dd) => {
        if (dd !== dropdown) {
          dd.classList.remove('is-open');
          const t = dd.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
      dropdown.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) closeNavDropdowns();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeNavDropdowns();
    closeMobileMenu();
  });

  const fadeElements = document.querySelectorAll('.fade-in');

  function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 40 && rect.bottom > 0;
  }

  fadeElements.forEach(el => {
    if (isElementInView(el)) {
      el.style.transition = 'none';
      el.classList.add('visible');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = '';
        });
      });
    }
  });

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    fadeElements.forEach(el => {
      if (!el.classList.contains('visible')) {
        fadeObserver.observe(el);
      }
    });
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  const progressBars = document.querySelectorAll('.progress-bar .fill');

  if (progressBars.length > 0) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.fill');
          bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
              setTimeout(() => {
                bar.style.width = targetWidth + '%';
              }, 200);
            }
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const progressContainer = document.querySelector('.progress-bars');
    if (progressContainer) {
      barObserver.observe(progressContainer);
    }
  }

  const metricValue = document.querySelector('.metric-value');

  if (metricValue) {
    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateMetric(metricValue);
          metricObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    metricObserver.observe(metricValue);
  }

  function animateMetric(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const navbar = document.querySelector('.navbar');

  function updateNavbarScrollState() {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 10);
  }

  updateNavbarScrollState();
  window.addEventListener('scroll', updateNavbarScrollState, { passive: true });

  document.querySelectorAll('.footer-year').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
