document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile nav toggle ───
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  // ─── Scroll-triggered fade-in animations ───
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

  // ─── Progress bar animation ───
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

  // ─── Metric counter animation ───
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

      element.textContent = current + '%';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── Navbar background on scroll ───
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 10) {
      navbar.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = scrollY;
  }, { passive: true });

  // ─── Smooth scroll for anchor links ───
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
