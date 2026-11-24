/*
 * Botó «PDF» a la capçalera, al costat del mode fosc i de l'idioma.
 *  - Esta pàgina: diàleg d'impressió del navegador (Guardar com a PDF).
 *  - Tot el material: obri print_page/ (plugin print-site) i hi llança la impressió.
 */
(function () {
  'use strict';

  var TEXT = {
    es: { button: 'Descargar PDF', page: 'Esta página', all: 'Todo el material', wait: 'Preparando el PDF…' },
    ca: { button: 'Descarrega en PDF', page: 'Esta pàgina', all: 'Tot el material', wait: 'Preparant el PDF…' },
  };
  var ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-9.5 8.5c0 .8-.7 1.5-1.5 1.5H7v2H5.5V9H8c.8 0 1.5.7 1.5 1.5zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5V9H13c.8 0 1.5.7 1.5 1.5zm4-3H17v1h1.5V13H17v2h-1.5V9h3zm-6.5 0h1v3h-1zm-5 0h1v1H7z"/></svg>';
  var PRINT_HASH = '#imprimir';

  function lang() {
    var l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return TEXT[l] ? l : 'es';
  }

  var DEFAULT_LANG = 'es';

  /*
   * Arrel del lloc en l'idioma actual. Material publica l'arrel comuna en #__config;
   * el plugin i18n posa cada idioma que no és el predeterminat en una subcarpeta (ca/).
   */
  function siteBase() {
    var root;
    try {
      var cfg = JSON.parse(document.getElementById('__config').textContent);
      root = new URL(cfg.base.replace(/\/?$/, '/'), location.href).href;
    } catch (e) {
      root = new URL('./', location.href).href;
    }
    var l = lang();
    return l === DEFAULT_LANG ? root : root + l + '/';
  }

  function isPrintPage() {
    return /\/print_page\/(index\.html)?$/.test(location.pathname);
  }

  function addButton() {
    if (document.querySelector('.dwes-pdf')) return;
    var options = document.querySelectorAll('.md-header__inner .md-header__option');
    var anchor = options.length ? options[options.length - 1] : document.querySelector('.md-header__inner .md-search');
    if (!anchor) return;
    var t = TEXT[lang()];

    var box = document.createElement('div');
    box.className = 'md-header__option dwes-pdf';
    box.innerHTML =
      '<div class="md-select">' +
        '<button class="md-header__button md-icon" type="button" aria-label="' + t.button + '" title="' + t.button + '" aria-haspopup="true">' + ICON + '</button>' +
        '<div class="md-select__inner"><ul class="md-select__list">' +
          '<li class="md-select__item"><a class="md-select__link" href="#" data-pdf="page">' + t.page + '</a></li>' +
          '<li class="md-select__item"><a class="md-select__link" href="' + siteBase() + 'print_page/' + PRINT_HASH + '" data-pdf="all" target="_blank" rel="noopener">' + t.all + '</a></li>' +
        '</ul></div>' +
      '</div>';
    box.querySelector('[data-pdf="page"]').addEventListener('click', function (e) {
      e.preventDefault();
      openAll();
      window.print();
    });
    if (anchor.classList.contains('md-header__option')) anchor.after(box);
    else anchor.before(box);
  }

  /* Obri els desplegables (details) perquè isquen en el PDF. */
  function openAll() {
    document.querySelectorAll('.md-content details:not([open])').forEach(function (d) {
      d.setAttribute('open', '');
      d.setAttribute('data-pdf-opened', '');
    });
  }

  function closeOpened() {
    document.querySelectorAll('details[data-pdf-opened]').forEach(function (d) {
      d.removeAttribute('open');
      d.removeAttribute('data-pdf-opened');
    });
  }

  /* En print_page/#imprimir: espera que es carreguen imatges i diagrames i llança la impressió. */
  function autoPrint() {
    if (!isPrintPage() || location.hash !== PRINT_HASH) return;
    history.replaceState(null, '', location.pathname + location.search);
    var note = document.createElement('div');
    note.className = 'dwes-pdf-wait';
    note.textContent = TEXT[lang()].wait;
    document.body.appendChild(note);
    var go = function () {
      note.remove();
      openAll();
      window.print();
    };
    if (document.readyState === 'complete') setTimeout(go, 1500);
    else window.addEventListener('load', function () { setTimeout(go, 1500); });
  }

  window.addEventListener('afterprint', closeOpened);

  function init() {
    addButton();
    autoPrint();
  }

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
