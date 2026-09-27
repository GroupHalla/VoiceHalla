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

  /* ─── 6. tilt 3D nos cards ─── */
  if (finePointer && !reduced) {
    const tiltEls = $$('.dl__card, .pcard, .shots__rail figure');
    tiltEls.forEach((el) => {
      el.classList.add('fx-tilt');
      let raf = 0, ev = null;
      const apply = () => {
        raf = 0;
        if (!ev) return;
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - .5;
        const py = (ev.clientY - r.top) / r.height - .5;
        const lift = el.classList.contains('pcard') ? 'translateX(6px) ' : 'translateY(-6px) ';
        el.style.transform = lift +
          'rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' + (px * 7).toFixed(2) + 'deg)';
      };
      el.addEventListener('pointerenter', () => {
        el.style.willChange = 'transform';
      });
      el.addEventListener('pointermove', (e) => {
        ev = e;
        if (!raf) raf = requestAnimationFrame(apply);
      }, { passive: true });
      el.addEventListener('pointerleave', () => {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        ev = null;
        el.style.transform = '';
        el.style.willChange = '';
      });
    });
  }

  /* ─── 7. botões magnéticos (hero + outro) ─── */
  if (finePointer && !reduced) {
    $$('.hero__cta .btn, .outro__cta .btn').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * .22));
        const dy = Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * .3));
        btn.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + (dy - 2).toFixed(1) + 'px)';
      }, { passive: true });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ─── 8. ripple nos botões ─── */
  if (!reduced) {
    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest ? e.target.closest('.btn') : null;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const sp = document.createElement('span');
      sp.className = 'fx-ripple';
      sp.style.left = (e.clientX - r.left).toFixed(0) + 'px';
      sp.style.top = (e.clientY - r.top).toFixed(0) + 'px';
      btn.appendChild(sp);
      sp.addEventListener('animationend', () => sp.remove(), { once: true });
    }, { passive: true });
  }

  /* ─── 9. código SAS: dígitos rolam e assentam quando entram na tela ─── */
  const sasCode = $('.sas__code');
  if (sasCode && !reduced && 'IntersectionObserver' in window) {
    const digits = $$('span', sasCode);
    const finals = digits.map((d) => (d.firstChild ? d.firstChild.data : d.textContent));
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        sio.disconnect();
        digits.forEach((d, i) => {
          const node = d.firstChild;
          const final = finals[i];
          const dur = 420 + i * 95;
          const t0 = performance.now();
          d.classList.remove('set');
          (function roll(now) {
            if (now - t0 < dur) {
              if (node) node.data = String(Math.floor(Math.random() * 10));
              requestAnimationFrame(roll);
            } else {
              if (node) node.data = final;
              d.classList.add('set');
            }
          })(t0);
        });
      });
    }, { threshold: .45 });
    sio.observe(sasCode);
  }

  /* ─── 10. chat vivo: alguém "digita" e manda mensagem no mockup ─── */
  const chatLog = $('.app__chat .chat__log');
  if (chatLog && window.HALLA_I18N && !reduced) {
    const USERS = ['Bruna', 'Luan', 'mari.dev', 'khali', 'rtc_nina'];
    const KEYS = ['k320', 'k321', 'k322', 'k323', 'k324'];
    const slot = document.createElement('p');
    slot.id = 'chatSim';
    slot.setAttribute('aria-hidden', 'true');
    chatLog.appendChild(slot);

    let visible = true, idx = Math.floor(Math.random() * KEYS.length), stop = false;
    new IntersectionObserver((es) => {
      es.forEach((en) => { visible = en.isIntersecting; });
    }, { threshold: .15 }).observe(chatLog);

    const dictOf = () => {
      const l = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
      return window.HALLA_I18N[l] || window.HALLA_I18N.pt;
    };
    const clock = () => {
      const d = new Date();
      return [d.getHours(), d.getMinutes(), d.getSeconds()]
        .map((n) => String(n).padStart(2, '0')).join(':');
    };
    const wait = (ms, fn) => setTimeout(() => {
      if (stop || document.hidden || !visible) { wait(900, fn); return; }
      fn();
    }, ms);

    const next = () => {
      if (stop) return;
      const user = USERS[idx % USERS.length];
      const msg = dictOf()[KEYS[idx % KEYS.length]] || '';
      idx++;

      // 1) indicador de digitação
      slot.className = 'chat__typing';
      slot.innerHTML = '<i></i><i></i><i></i>';
      wait(1300 + Math.random() * 900, () => {
        // 2) mensagem entra no lugar
        slot.className = 'chat__msg';
        slot.innerHTML = '<time>[' + clock() + ']</time> <b>' + user +
          '</b><span></span>';
        slot.lastChild.textContent = msg;
        wait(3800 + Math.random() * 2200, () => {
          // 3) some e recomeça
          slot.classList.add('out');
          wait(520, () => { wait(1600 + Math.random() * 2600, next); });
        });
      });
    };
    wait(3400, next);
  }

  /* ─── 11. voltar ao topo com anel de progresso ─── */
  if (!reduced) {
    const LBL = { pt: 'Voltar ao topo', en: 'Back to top', es: 'Volver arriba' };
    const l = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
    const btn = document.createElement('button');
    btn.className = 'toTop';
    btn.type = 'button';
    btn.setAttribute('aria-label', LBL[l] || LBL.pt);
    btn.innerHTML =
      '<svg class="ring" viewBox="0 0 48 48" aria-hidden="true">' +
      '<defs><linearGradient id="toTopGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/>' +
      '</linearGradient></defs>' +
      '<circle class="bg" cx="24" cy="24" r="22"></circle>' +
      '<circle class="fg" cx="24" cy="24" r="22"></circle></svg>' +
      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 19V5M5 12l7-7 7 7"></path></svg>';
    document.body.appendChild(btn);

    const CIRC = 138.23;
    const fg = btn.querySelector('.fg');
    let ticking = false;
    const upd = () => {
      ticking = false;
      const cur = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
      btn.setAttribute('aria-label', LBL[cur] || LBL.pt);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      fg.style.strokeDashoffset = (CIRC * (1 - p)).toFixed(2);
      btn.classList.toggle('show', window.scrollY > 620);
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(upd); }
    }, { passive: true });
    upd();
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── 12. assinatura no console ─── */
  try {
    console.log(
      '%c Halla %c github.com/GroupHalla ',
      'background:linear-gradient(90deg,#7c5cff,#22d3ee);color:#fff;font-weight:bold;border-radius:4px 0 0 4px;padding:2px 8px;',
      'background:#14122c;color:#c6c1e8;border-radius:0 4px 4px 0;padding:2px 8px;'
    );
  } catch (_) { /* noop */ }
})();
