/*
 * Autoevaluació de RA i CE (hooks/ra_ce.py).
 * Els CE marcats es guarden només en el localStorage d'este navegador.
 */
(function () {
  'use strict';

  function storeKey(module) { return 'ra-ce:' + module; }

  function load(module) {
    try {
      var list = JSON.parse(localStorage.getItem(storeKey(module)) || '[]');
      return new Set(Array.isArray(list) ? list : []);
    } catch (e) { return new Set(); }
  }

  function save(module, done) {
    try { localStorage.setItem(storeKey(module), JSON.stringify(Array.from(done))); } catch (e) { /* navegació privada */ }
  }

  function setBar(el, ratio) {
    if (!el) return;
    var pct = Math.round(ratio * 100);
    el.querySelector('.race-bar > span').style.width = pct + '%';
    el.querySelector('.race-pct').textContent = pct + ' %';
    el.classList.toggle('race-full', pct === 100);
  }

  /* Progrés d'un RA: suma dels pesos dels CE marcats. Si cap CE té pes, compta CE. */
  function raRatio(ra, done) {
    var rows = ra.querySelectorAll('[data-race-row]');
    var total = 0, got = 0, n = 0, nGot = 0;
    rows.forEach(function (row) {
      var w = parseFloat(row.getAttribute('data-race-weight')) || 0;
      var on = done.has(row.getAttribute('data-race-row'));
      total += w; n += 1;
      if (on) { got += w; nGot += 1; }
    });
    if (total > 0) return got / total;
    return n ? nGot / n : 0;
  }

  function refresh(root, module, done) {
    root.querySelectorAll('input[data-race-ce]').forEach(function (box) {
      box.checked = done.has(box.getAttribute('data-race-ce'));
    });
    root.querySelectorAll('[data-race-row]').forEach(function (row) {
      row.classList.toggle('race-done', done.has(row.getAttribute('data-race-row')));
    });
    root.querySelectorAll('[data-race-chip]').forEach(function (chip) {
      chip.classList.toggle('race-done', done.has(chip.getAttribute('data-race-chip')));
    });

    var weighted = 0, weights = 0, plain = 0, count = 0;
    root.querySelectorAll('[data-race-ra]').forEach(function (ra) {
      var r = raRatio(ra, done);
      setBar(ra.querySelector('summary .race-progress'), r);
      var w = parseFloat(ra.getAttribute('data-race-weight')) || 0;
      weighted += w * r; weights += w; plain += r; count += 1;
    });
    setBar(root.querySelector('[data-race-total]'), weights > 0 ? weighted / weights : (count ? plain / count : 0));
  }

  function init() {
    document.querySelectorAll('[data-race-module]').forEach(function (root) {
      if (root.dataset.raceReady) return;
      root.dataset.raceReady = '1';
      var module = root.getAttribute('data-race-module');
      var done = load(module);

      root.addEventListener('change', function (e) {
        var box = e.target;
        if (!box.matches || !box.matches('input[data-race-ce]')) return;
        var code = box.getAttribute('data-race-ce');
        done = load(module);
        if (box.checked) done.add(code); else done.delete(code);
        save(module, done);
        refresh(root, module, done);
      });

      var reset = root.querySelector('.race-reset');
      if (reset) {
        reset.addEventListener('click', function () {
          if (!window.confirm(reset.getAttribute('data-confirm') || '¿Borrar?')) return;
          done = new Set();
          save(module, done);
          refresh(root, module, done);
        });
      }

      window.addEventListener('storage', function (e) {
        if (e.key === storeKey(module)) { done = load(module); refresh(root, module, done); }
      });

      refresh(root, module, done);
    });
  }

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
