/* Halla — i18n runtime. Aplica o dicionário (js/i18n-dict.js) aos text nodes
 * anotados com data-i18n="kNNN:idx" (e variantes -1, -2...), traduz alts,
 * title/meta/og e gerencia o seletor de idioma da nav. Persiste em
 * localStorage; detecta pelo navigator.language na primeira visita.
 * PT é o idioma fonte do HTML — nunca falta chave. */
(function () {
  'use strict';

  var D = window.HALLA_I18N;
  if (!D) return;

  var LANGS = ['pt', 'en', 'es'];
  var STORE = 'halla-site-lang';

  function detect() {
    try {
      var saved = localStorage.getItem(STORE);
      if (LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) { /* storage bloqueado */ }
    var nav = (navigator.language || 'pt').toLowerCase();
    if (nav.indexOf('pt') === 0) return 'pt';
    if (nav.indexOf('es') === 0) return 'es';
    return 'en';
  }

  var lang = detect();
  var html = document.documentElement;

  function padOf(data) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(data);
    return m ? [m[1], m[3]] : ['', ''];
  }

  function applyLang() {
    var dict = D[lang] || D.pt;

    // text nodes: data-i18n, data-i18n-1, data-i18n-2, ...
    var all = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      for (var a = 0; a < el.attributes.length; a++) {
        var attr = el.attributes[a];
        if (attr.name === 'data-i18n' || attr.name.indexOf('data-i18n-') === 0) {
          var spec = attr.value.split(':');
          var t = dict[spec[0]];
          if (t === undefined) continue;
          var idx = parseInt(spec[1], 10);
          var node = el.childNodes ? el.childNodes[idx] : null;
          if (!node || node.nodeType !== 3) continue;
          var pad = padOf(node.data);
          node.data = pad[0] + t + pad[1];
        }
      }
    }

    // alts (data-i18n-alt)
    var alts = document.querySelectorAll('[data-i18n-alt]');
    for (var j = 0; j < alts.length; j++) {
      var k = alts[j].getAttribute('data-i18n-alt');
      if (dict[k] !== undefined) alts[j].setAttribute('alt', dict[k]);
    }

    // documento
    html.setAttribute('lang', lang === 'pt' ? 'pt-BR' : lang);
    if (dict['@title']) document.title = dict['@title'];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && dict['@desc']) desc.setAttribute('content', dict['@desc']);
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt && dict['@ogtitle']) ogt.setAttribute('content', dict['@ogtitle']);
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd && dict['@ogdesc']) ogd.setAttribute('content', dict['@ogdesc']);

    // switcher
    var sw = document.getElementById('langSw');
    if (sw) {
      var btns = sw.querySelectorAll('button');
      for (var b = 0; b < btns.length; b++) {
        btns[b].setAttribute('aria-pressed', btns[b].getAttribute('data-lang') === lang ? 'true' : 'false');
      }
    }
  }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) { applyLang(); return; }
    lang = l;
    try { localStorage.setItem(STORE, l); } catch (e) {}
    applyLang();
  }

  // aplica imediatamente (script fica no fim do body) e liga o switcher
  applyLang();

  document.addEventListener('DOMContentLoaded', function () {
    var sw = document.getElementById('langSw');
    if (!sw) return;
    sw.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('button') : null;
      if (btn && btn.getAttribute('data-lang')) setLang(btn.getAttribute('data-lang'));
    });
  });
})();
