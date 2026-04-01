document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function closeMobileMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  const MOBILE_NAV_BREAKPOINT = 768;

  if (navToggle && navLinks) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navLinks');

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth > MOBILE_NAV_BREAKPOINT) return;
      if (navToggle.contains(e.target) || navLinks.contains(e.target)) return;
      closeMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMobileMenu();
    });
  }

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

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

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
