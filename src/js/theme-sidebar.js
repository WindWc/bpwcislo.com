// ─── THEME SIDEBAR ──────────────────────────────────────
(function() {
  var THEMES   = ['jungle', 'miami', 'ocean', 'ember'];
  var COLORS   = { jungle: '#65a30d', miami: '#f472b6', ocean: '#0ea5e9', ember: '#f59e0b' };
  var STORAGE  = 'wind-theme';

  var sidebar   = document.getElementById('themeSidebar');
  var pill      = document.getElementById('themePillToggle');
  var options   = document.getElementById('themeOptions');
  var dots      = sidebar.querySelectorAll('.theme-dot');
  var heroHeadline = document.querySelector('.hero-headline');
  var heroImg   = document.querySelector('.hero-image-container');

  var isMobile  = function() { return window.innerWidth <= 768; };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyTheme(theme) {
    if (THEMES.indexOf(theme) === -1) theme = 'jungle';
    document.documentElement.setAttribute('data-theme', theme);
    dots.forEach(function(d) {
      d.classList.toggle('active', d.dataset.theme === theme);
    });
    try { localStorage.setItem(STORAGE, theme); } catch(e) {}
  }

  var saved;
  try { saved = localStorage.getItem(STORAGE); } catch(e) {}
  applyTheme(saved || 'jungle');

  // ── Toggle expand / collapse ─────────────────────────
  function openSidebar() {
    sidebar.classList.add('open');
    pill.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    pill.setAttribute('aria-expanded', 'false');
  }

  pill.addEventListener('click', function(e) {
    e.stopPropagation();
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  sidebar.addEventListener('mouseenter', function() {
    openSidebar();
  });

  sidebar.addEventListener('mouseleave', function() {
    closeSidebar();
  });

  document.addEventListener('click', function(e) {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
      closeSidebar();
    }
  });

  // ── Theme selection ──────────────────────────────────
  var themeFirstSwitch = true;
  dots.forEach(function(dot) {
    dot.addEventListener('click', function(e) {
      e.stopPropagation();
      var prev = document.documentElement.getAttribute('data-theme');
      applyTheme(dot.dataset.theme);
      if (dot.dataset.theme !== prev) {
        if (themeFirstSwitch) {
          SiteScore.award(72, 'theme-first');
          themeFirstSwitch = false;
        } else {
          SiteScore.award(27, 'theme-switch', 3000);
        }
      }
    });
  });

  // ── Desktop: set fixed position once, aligned with headline ──
  if (!isMobile() && heroHeadline) {
    var rect = heroHeadline.getBoundingClientRect();
    sidebar.style.top = rect.top + 'px';
  }

  // ── Eye blink every 7 seconds ──────────────────────────
  if (!reducedMotion) {
    setInterval(function() {
      if (sidebar.classList.contains('open') || isMobile()) return;
      pill.classList.add('blink');
      pill.addEventListener('animationend', function handler() {
        pill.classList.remove('blink');
        pill.removeEventListener('animationend', handler);
      });
    }, 7000);
  }
})();
// ─── END THEME SIDEBAR ────────────────────────────────────
