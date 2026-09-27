/* ═══════════════════════════════════════════════════════════
   HALLA — FX pack
   partículas · spotlight · stagger do mockup · status ao vivo
   Tudo desativado com prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ─── 1. stagger cascata das linhas do mockup ─── */
  const appWin = $('#appWindow');
  if (appWin && !reduced) {
    const rows = [
      ...$$('.app__tree > .srv, .app__tree .branch > *'),
      ...$$('.app__info > *:not(.info__wm)'),
      ...$$('.app__chat .chat__log p, .app__chat .chat__tabs, .app__chat .chat__fmt, .app__chat .chat__input'),
      ...$$('.app__status')
    ];
    rows.forEach((el, i) => {
      el.classList.add('fx-st');
      el.style.setProperty('--i', Math.min(i, 34));
    });
  }

  /* ─── 2. spotlight que segue o mouse nos cards ─── */
  if (finePointer && !reduced) {
    const spots = $$('.dl__card, .pcard, .panel, .codewin, .priv__main, .shots__rail figure');
    spots.forEach((el) => {
      el.classList.add('fx-spot');
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left).toFixed(1) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top).toFixed(1) + 'px');
      }, { passive: true });
    });
  }

  /* ─── 3. partículas flutuantes do hero ─── */
  const hero = $('.hero');
  const dust = $('.fx-dust');
  if (hero && dust && dust.getContext && !reduced) {
    const ctx = dust.getContext('2d');
    let W = 0, H = 0, ps = [], raf = 0, visible = true, t = 0;

    const mk = (fromAnywhere) => ({
      x: Math.random() * W,
      y: fromAnywhere ? Math.random() * H : H + 12,
      r: .7 + Math.random() * 1.9,
      vy: .1 + Math.random() * .38,
      sway: .25 + Math.random() * 1.1,
      ph: Math.random() * Math.PI * 2,
      hue: Math.random()
    });

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = hero.getBoundingClientRect();
      W = Math.max(r.width, 320);
      H = Math.max(r.height, 400);
      dust.width = W * dpr;
      dust.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = [];
      const n = Math.min(85, Math.round((W * H) / 24000));
      for (let i = 0; i < n; i++) ps.push(mk(true));
    }

    function step() {
      raf = 0;
      if (!visible || document.hidden) return;
      raf = requestAnimationFrame(step);
      t += .016;
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        p.y -= p.vy;
        if (p.y < -10) Object.assign(p, mk(false));
        const sx = Math.sin(t * p.sway + p.ph) * 10;
        const tw = .5 + .5 * Math.sin(t * 1.7 + p.ph * 3);
        const col = p.hue < .55 ? '205,208,255' : (p.hue < .82 ? '124,92,255' : '34,211,238');
        ctx.fillStyle = 'rgba(' + col + ',' + (.1 + .3 * tw).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x + sx, p.y, p.r, 0, 6.2832);
        ctx.fill();
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        visible = en.isIntersecting;
        if (visible && !raf && !document.hidden) raf = requestAnimationFrame(step);
      });
    });
    io.observe(hero);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      else if (visible && !raf) raf = requestAnimationFrame(step);
    });

    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(size, 180); }, { passive: true });

    size();
    raf = requestAnimationFrame(step);
  }

  /* ─── 4. mockup vivo: uptime contando ─── */
  const up = $('#uptimeVal');
  if (up) {
    let s = 3;
    const fmt = () =>
      [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
        .map((n) => String(n).padStart(2, '0')).join(':');
    up.textContent = fmt();
    setInterval(() => { s++; up.textContent = fmt(); }, 1000);
  }

  /* ─── 5. mockup vivo: ping flutuando ─── */
  const ping = $('#pingVal');
  if (ping) {
    const tick = () => {
      ping.textContent = 'Ping: ' + (47 + Math.round(Math.random() * 25)) + ' ms';
      setTimeout(tick, 1600 + Math.random() * 1900);
    };
    setTimeout(tick, 2600);
  }

  /* ─── 6. assinatura no console ─── */
  try {
    console.log(
      '%c Halla %c github.com/GroupHalla ',
      'background:linear-gradient(90deg,#7c5cff,#22d3ee);color:#fff;font-weight:bold;border-radius:4px 0 0 4px;padding:2px 8px;',
      'background:#14122c;color:#c6c1e8;border-radius:0 4px 4px 0;padding:2px 8px;'
    );
  } catch (_) { /* noop */ }
})();
