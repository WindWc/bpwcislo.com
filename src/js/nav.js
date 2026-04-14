// ─── NAV ──────────────────────────────────────────────────
(function() {
  // Sticky nav scroll state + active link tracking
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  // Mobile hamburger menu
  const hamburger = document.getElementById('navHamburger');
  const navList = document.getElementById('navLinks');
  if (hamburger && navList) {
    hamburger.addEventListener('click', function() {
      var isOpen = navList.classList.toggle('mobile-open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navList.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navList.classList.contains('mobile-open')) {
        navList.classList.remove('mobile-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const navSections = Array.from(navLinks).map(link =>
    document.querySelector(link.getAttribute('href'))
  ).filter(Boolean);

  function updateNav() {
    siteNav.classList.toggle('scrolled', window.scrollY > 20);

    let currentId = '';
    for (const section of navSections) {
      if (section.getBoundingClientRect().top <= 100) {
        currentId = section.id;
      }
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();
