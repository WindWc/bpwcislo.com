// ─── GAMIFICATION ENGINE ──────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Site Score gamification engine (persisted to localStorage)
const SiteScore = (function() {
  const STORAGE_KEY = 'site-score';
  const AWARDED_KEY = 'site-score-awarded';
  const el = document.getElementById('siteScore');
  const valEl = el ? el.querySelector('.site-score-value') : null;
  const mobileValEl = document.getElementById('mobileScoreValue');
  const cooldowns = {};

  var score = 0;
  var awarded = {};
  try {
    score = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
    awarded = JSON.parse(localStorage.getItem(AWARDED_KEY)) || {};
  } catch(e) {}

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, score);
      localStorage.setItem(AWARDED_KEY, JSON.stringify(awarded));
    } catch(e) {}
  }

  function updateDisplay() {
    var label = score + ' pts';
    if (valEl) valEl.textContent = label;
    if (mobileValEl) mobileValEl.textContent = label;
  }

  updateDisplay();

  return {
    award: function(pts, key, cooldownMs) {
      if (key && awarded[key]) return;
      if (key && cooldownMs) {
        var now = Date.now();
        if (cooldowns[key] && now - cooldowns[key] < cooldownMs) return;
        cooldowns[key] = now;
      }
      score += pts;
      updateDisplay();
      persist();
      if (!prefersReducedMotion && el) {
        el.classList.remove('pop');
        void el.offsetWidth;
        el.classList.add('pop');
      }
    },
    once: function(pts, key) {
      if (awarded[key]) return;
      awarded[key] = 1;
      this.award(pts);
    },
    get score() { return score; }
  };
})();

// Award points if visitor came back from /uses
try {
  if (localStorage.getItem('visited-uses') === '1') {
    localStorage.removeItem('visited-uses');
    SiteScore.once(401, 'uses-page');
  }
} catch(e) {}

// Points modal
(function() {
  var overlay = document.getElementById('scoreModalOverlay');
  var closeBtn = document.getElementById('scoreModalClose');
  var scoreBtn = document.getElementById('siteScore');
  var formulaEl = document.getElementById('scoreFormula');
  if (!overlay || !scoreBtn) return;

  var formula = [
    ['Hover on a card or element', '3–11 pts'],
    ['Click a nav link', '13 pts'],
    ['Scroll to a new section', '21 pts'],
    ['Switch a color theme', '27–72 pts'],
    ['Scroll or navigate the portfolio', '8–9 pts'],
    ['Each FlowForm step', '33 pts'],
    ['Visit the blog', '108 pts'],
    ['Read a blog post', '117 pts'],
    ['Visit the /uses page', '401 pts'],
    ['Find the Easter egg', '1,008 pts'],
    ['Complete the FlowForm', '1,111 pts'],
  ];

  var html = '';
  formula.forEach(function(row) {
    var isEgg = row[1] === '401 pts';
    html += '<div class="score-formula-row' + (isEgg ? ' sf-egg' : '') + '"' + (isEgg ? ' id="sfEggRow"' : '') + '>'
      + '<span class="sf-action">' + row[0] + '</span>'
      + '<span class="sf-pts">' + row[1] + '</span>'
      + '</div>';
  });
  formulaEl.innerHTML = html;

  var eggRow = document.getElementById('sfEggRow');
  var eggOverlay = document.getElementById('eggVideoOverlay');
  var eggVideo = document.getElementById('eggVideo');
  if (eggRow && eggOverlay && eggVideo) {
    function openEgg(e) {
      e.stopPropagation();
      SiteScore.once(1008, 'egg-video');
      eggOverlay.classList.add('visible');
      eggVideo.currentTime = 0;
      var p = eggVideo.play();
      if (p && p.catch) p.catch(function() {});
    }
    function closeEgg() {
      eggOverlay.classList.remove('visible');
      eggVideo.pause();
    }
    eggRow.addEventListener('click', openEgg);
    eggOverlay.addEventListener('click', closeEgg);
    eggVideo.addEventListener('ended', closeEgg);
  }

  function openModal() {
    overlay.hidden = false;
    requestAnimationFrame(function() {
      overlay.classList.add('visible');
    });
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('visible');
    setTimeout(function() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      scoreBtn.focus();
    }, 300);
  }

  scoreBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });
})();
