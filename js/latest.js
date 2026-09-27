/* Halla — download direto da última versão. Elementos com data-release="Repo"
 * e data-asset=".exe" (por exemplo) têm o href trocado pelo browser_download_url
 * do asset correspondente da release "latest" do GitHub — o clique baixa o
 * instalador/APK da versão mais recente sem passar pela página de releases.
 * O card do HallaServer apenas atualiza o rótulo da versão (segue para o GitHub).
 * Fallback silencioso: mantém o href estático (página releases/latest). */
(function () {
  'use strict';

  var API = 'https://api.github.com/repos/GroupHalla/';

  function pickAsset(assets, ext) {
    if (!assets) return null;
    var e = ext.toLowerCase();
    for (var i = 0; i < assets.length; i++) {
      var name = (assets[i].name || '').toLowerCase();
      if (name.endsWith(e) && !name.endsWith('.sha256')) return assets[i];
    }
    return null;
  }

  function fetchLatest(repo) {
    return fetch(API + repo + '/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }

  function setVer(el, tag) {
    if (!el) return;
    var ver = el.querySelector('.dl__ver');
    if (ver) ver.textContent = 'v' + tag;
  }

  // 1. botões com download direto (Windows/Linux/Android + hero + CTA final)
  var byRepo = {};
  var targets = document.querySelectorAll('[data-release]');
  for (var i = 0; i < targets.length; i++) {
    var el = targets[i];
    var repo = el.getAttribute('data-release');
    (byRepo[repo] = byRepo[repo] || []).push(el);
  }

  Object.keys(byRepo).forEach(function (repo) {
    fetchLatest(repo).then(function (rel) {
      if (!rel || !rel.tag_name) return;
      var tag = rel.tag_name.replace(/^v/, '');
      byRepo[repo].forEach(function (el) {
        var asset = pickAsset(rel.assets, el.getAttribute('data-asset'));
        if (asset && asset.browser_download_url) el.href = asset.browser_download_url;
        setVer(el, tag);
      });
    });
  });

  // 2. card do servidor: só o rótulo da versão
  var srv = document.getElementById('dlSrv');
  if (srv) {
    fetchLatest('HallaServer').then(function (rel) {
      if (rel && rel.tag_name) setVer(srv, rel.tag_name.replace(/^v/, ''));
    });
  }
})();
