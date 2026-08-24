/**
* Template Name: MinimalFolio
* Template URL: https://bootstrapmade.com/minimalfolio-bootstrap-portfolio-template/
* Updated: Aug 05 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Theme toggle
   */
  const themeToggle = document.querySelector('#theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const savedTheme = localStorage.getItem('portfolio-theme');
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function getSystemTheme() {
    return colorSchemeQuery.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);

    if (themeToggle && themeIcon) {
      themeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : getSystemTheme());

  colorSchemeQuery.addEventListener('change', () => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(getSystemTheme());
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  document.addEventListener('pointerdown', (event) => {
    const interactiveElement = event.target.closest('a, button');
    if (!interactiveElement || interactiveElement.disabled || reducedMotionQuery.matches) return;

    const echo = document.createElement('span');
    echo.className = 'cursor-echo';
    echo.style.left = `${event.clientX}px`;
    echo.style.top = `${event.clientY}px`;
    document.body.appendChild(echo);
    echo.addEventListener('animationend', () => echo.remove(), { once: true });
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a, button, input, textarea, select, .hero .portrait-wrap, .about .profile-figure') || reducedMotionQuery.matches) return;

    const dots = document.createElement('span');
    dots.className = 'background-dots';
    dots.style.left = `${event.clientX}px`;
    dots.style.top = `${event.clientY}px`;

    for (let index = 0; index < 24; index += 1) {
      const dot = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 24;
      dot.style.setProperty('--dot-x', `${Math.cos(angle) * 58}px`);
      dot.style.setProperty('--dot-y', `${Math.sin(angle) * 58}px`);
      dots.appendChild(dot);
    }

    document.body.appendChild(dots);
    dots.lastElementChild.addEventListener('animationend', () => dots.remove(), { once: true });
  });

  document.addEventListener('pointerdown', (event) => {
    const profileImage = event.target.closest('.hero .portrait-wrap .portrait-img, .about .profile-figure .profile-photo');
    if (!profileImage || reducedMotionQuery.matches) return;

    const firework = document.createElement('span');
    firework.className = 'profile-firework';
    firework.style.left = `${event.clientX}px`;
    firework.style.top = `${event.clientY}px`;

    for (let index = 0; index < 24; index += 1) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 24;
      const radius = 48 + (index % 3) * 18;
      particle.style.setProperty('--firework-x', `${Math.cos(angle) * radius}px`);
      particle.style.setProperty('--firework-y', `${Math.sin(angle) * radius}px`);
      firework.appendChild(particle);
    }

    document.body.appendChild(firework);
    firework.lastElementChild.addEventListener('animationend', () => firework.remove(), { once: true });
  });

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const loaderPercent = preloader.querySelector('#loader-percent');
    const loaderBarFill = preloader.querySelector('#loader-bar-fill');
    let progress = 1;

    const progressInterval = window.setInterval(() => {
      progress += 1;

      if (loaderPercent) {
        loaderPercent.textContent = `${progress}%`;
      }

      if (loaderBarFill) {
        loaderBarFill.style.width = `${progress}%`;
      }

      if (progress >= 100) {
        window.clearInterval(progressInterval);
      }
    }, 60);

    window.setTimeout(() => {
      preloader.remove();
    }, 6000);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
