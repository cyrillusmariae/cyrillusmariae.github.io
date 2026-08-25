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
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function getAutomaticTheme() {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6 ? 'dark' : 'light';
  }

  function scheduleAutomaticTheme() {
    const now = new Date();
    const nextChange = new Date(now);
    const hour = now.getHours();
    const nextHour = hour >= 18 ? 6 : hour >= 6 ? 18 : 6;

    if (hour >= 18 || hour < 6) {
      nextChange.setDate(now.getDate() + (hour >= 18 ? 1 : 0));
    }

    nextChange.setHours(nextHour, 0, 0, 0);
    window.setTimeout(() => {
      if (!localStorage.getItem('portfolio-theme')) {
        applyTheme(getAutomaticTheme());
      }
      scheduleAutomaticTheme();
    }, Math.max(nextChange.getTime() - now.getTime(), 1000));
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

  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : getAutomaticTheme());
  scheduleAutomaticTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  if (!reducedMotionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
    const idleCursorEcho = document.createElement('span');
    idleCursorEcho.className = 'cursor-idle-echo';
    document.body.appendChild(idleCursorEcho);

    document.addEventListener('pointermove', (event) => {
      const isInteractive = Boolean(event.target.closest('a, button, [role="tab"]'));
      idleCursorEcho.style.left = `${event.clientX}px`;
      idleCursorEcho.style.top = `${event.clientY}px`;
      idleCursorEcho.classList.toggle('is-visible', !isInteractive);
    });

    document.documentElement.addEventListener('pointerleave', () => {
      idleCursorEcho.classList.remove('is-visible');
    });
  }

  function createInteractiveFirework(x, y) {
    if (reducedMotionQuery.matches) return;

    const firework = document.createElement('span');
    firework.className = 'interactive-firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;

    for (let index = 0; index < 48; index += 1) {
      const particle = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 48;
      const radius = 86 + (index % 4) * 30;
      particle.style.setProperty('--firework-x', `${Math.cos(angle) * radius}px`);
      particle.style.setProperty('--firework-y', `${Math.sin(angle) * radius}px`);
      particle.style.setProperty('--particle-delay', `${(index % 6) * 12}ms`);
      firework.appendChild(particle);
    }

    document.body.appendChild(firework);
    firework.lastElementChild.addEventListener('animationend', () => firework.remove(), { once: true });
  }

  document.addEventListener('pointerdown', (event) => {
    const interactiveElement = event.target.closest('a, button, [role="tab"]');
    if (!interactiveElement || interactiveElement.disabled) return;
    createInteractiveFirework(event.clientX, event.clientY);
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a, button, input, textarea, select, .hero .portrait-wrap, .about .profile-figure') || reducedMotionQuery.matches) return;

    const echo = document.createElement('span');
    echo.className = 'background-echo';
    echo.style.left = `${event.clientX}px`;
    echo.style.top = `${event.clientY}px`;
    document.body.appendChild(echo);
    echo.addEventListener('animationend', () => echo.remove(), { once: true });
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
    if (!selectHeader) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const isOpen = document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    mobileNavToggleBtn.setAttribute('aria-expanded', String(isOpen));
    mobileNavToggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    mobileNavToggleBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        mobileNavToogle();
      }
    });
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
   * Site search
   */
  const siteSearchToggles = Array.from(document.querySelectorAll('.site-search-toggle'));
  const siteSearch = document.querySelector('#site-search');
  const siteSearchClose = document.querySelector('#site-search-close');
  const siteSearchForm = document.querySelector('#site-search-form');
  const siteSearchInput = document.querySelector('#site-search-input');
  const siteSearchMessage = document.querySelector('#site-search-message');
  const siteSearchResults = document.querySelector('#site-search-results');

  if (siteSearchToggles.length && siteSearch && siteSearchInput && siteSearchMessage && siteSearchResults) {
    let activeSearchToggle = siteSearchToggles[0];
    const searchableSections = Array.from(document.querySelectorAll('main section[id]'));

    function closeSiteSearch() {
      document.body.classList.remove('search-open');
      siteSearch.setAttribute('aria-hidden', 'true');
      siteSearchToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
      activeSearchToggle.focus();
    }

    function renderSearchResults(query) {
      const normalizedQuery = query.trim().toLowerCase();
      siteSearchResults.replaceChildren();

      if (!normalizedQuery) {
        siteSearchMessage.textContent = 'Try “portfolio”, “services”, or “contact”.';
        return;
      }

      const matches = searchableSections.filter(section => section.textContent.toLowerCase().includes(normalizedQuery));
      siteSearchMessage.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'} found.` : 'No matching sections found. Maybe you can ask St. Anthony to help you?';

      matches.forEach(section => {
        const result = document.createElement('li');
        const link = document.createElement('a');
        const title = section.querySelector('h1, h2')?.textContent.trim() || section.id;
        const summary = section.textContent.replace(/\s+/g, ' ').trim().slice(0, 150);
        const heading = document.createElement('strong');
        const excerpt = document.createElement('span');

        link.href = `#${section.id}`;
        heading.textContent = title;
        excerpt.textContent = `${summary}${summary.length === 150 ? '…' : ''}`;
        link.append(heading, excerpt);
        link.addEventListener('click', closeSiteSearch);
        result.appendChild(link);
        siteSearchResults.appendChild(result);
      });
    }

    siteSearchToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        activeSearchToggle = toggle;
        if (document.body.classList.contains('mobile-nav-active')) mobileNavToogle();
        document.body.classList.add('search-open');
        siteSearch.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        window.setTimeout(() => siteSearchInput.focus(), 150);
      });
    });

    siteSearchClose?.addEventListener('click', closeSiteSearch);
    siteSearchForm?.addEventListener('submit', event => event.preventDefault());
    siteSearchInput.addEventListener('input', event => renderSearchResults(event.target.value));
    siteSearch.addEventListener('click', event => {
      if (event.target === siteSearch) closeSiteSearch();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && document.body.classList.contains('search-open')) closeSiteSearch();
    });
  }

  /**
  * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const loaderPercent = preloader.querySelector('#loader-percent');
    const loaderBarFill = preloader.querySelector('#loader-bar-fill');
    const loaderPageStatus = preloader.querySelector('.loader-page-status');
    const loaderScriptureText = preloader.querySelector('#loader-scripture-text');
    const loaderScriptureReference = preloader.querySelector('#loader-scripture-reference');
    const loaderDuration = 8000;
    const typingDuration = 6500;
    let progress = 1;

    if (loaderPageStatus) {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      const isReload = navigationEntry ? navigationEntry.type === 'reload' : performance.navigation?.type === 1;

      if (isReload) {
        loaderPageStatus.textContent = 'Reloading the website in progress';
      } else if (loaderPageStatus.id === 'loader-page-status' && document.referrer) {
        try {
          const referrerUrl = new URL(document.referrer);
          const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
          const referrerPath = referrerUrl.pathname.replace(/\/$/, '') || '/';

          if (referrerUrl.origin === window.location.origin && referrerPath !== currentPath) {
            loaderPageStatus.textContent = 'Redirecting you to the Mainpage';
          }
        } catch {
          // Keep the default welcome message if the browser does not provide a usable referrer.
        }
      }

      const loaderMessage = loaderPageStatus.textContent.trim();
      loaderPageStatus.setAttribute('aria-label', loaderMessage);

      if (!reducedMotionQuery.matches) {
        const messageCharacters = Array.from(loaderMessage);
        let messageIndex = 0;

        loaderPageStatus.textContent = '';
        loaderPageStatus.classList.add('is-typing');

        const typingDelay = typingDuration / messageCharacters.length;
        const messageTypingInterval = window.setInterval(() => {
          loaderPageStatus.textContent += messageCharacters[messageIndex];
          messageIndex += 1;

          if (messageIndex >= messageCharacters.length) {
            window.clearInterval(messageTypingInterval);
            loaderPageStatus.classList.remove('is-typing');
          }
        }, typingDelay);
      }
    }

    if (loaderScriptureText && loaderScriptureReference) {
      const scriptures = [
        {
          text: '“Be still, and know that I am God.”',
          reference: 'Psalm 46:10'
        },
        {
          text: '“The Lord is my shepherd; I shall not want.”',
          reference: 'Psalm 23:1'
        },
        {
          text: '“The Lord is my light and my salvation; whom shall I fear?”',
          reference: 'Psalm 27:1'
        },
        {
          text: '“Trust in the Lord with all thine heart.”',
          reference: 'Proverbs 3:5'
        },
        {
          text: '“Rejoice in hope; be patient in tribulation.”',
          reference: 'Romans 12:12'
        },
        {
          text: '“The joy of the Lord is your strength.”',
          reference: 'Nehemiah 8:10'
        }
      ];
      const scripture = scriptures[Math.floor(Math.random() * scriptures.length)];

      loaderScriptureText.textContent = scripture.text;
      loaderScriptureReference.textContent = scripture.reference;
    }

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
    }, loaderDuration / 99);

    window.setTimeout(() => {
      preloader.classList.add('is-leaving');
      document.documentElement.classList.remove('page-loading');
      document.body.classList.remove('page-loading');
      document.body.classList.add('page-loaded');

      window.setTimeout(() => {
        preloader.remove();
        document.body.classList.add('page-ready');
      }, 650);
    }, loaderDuration);
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
