/* ═══════════════════════════════════════════════════════════
   HALLA — interações
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── ano ─── */
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  /* ─── toast ─── */
  function toast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2100);
  }

  /* ─── nav ─── */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const burger = $('#hamburger');

  burger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  $$('#navLinks a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
    })
  );

  const sections = $$('main section[id]');
  let ticking = false;

  function onScroll() {
    const scrollY = window.scrollY;

    nav?.classList.toggle('scrolled', scrollY > 16);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const bar = $('#scrollBar');
    if (bar) bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';

    let current = null;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= 140) current = s.id;
    });
    $$('#navLinks a').forEach((a) => a.classList.remove('active'));
    if (current) {
      const link = $(`#navLinks a[href="#${current}"]`);
      link?.classList.add('active');
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ─── reveal ─── */
  const reveals = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ─── copiar ─── */
  $$('.copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const val = btn.dataset.copy || '';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(val);
        } else {
          const ta = document.createElement('textarea');
          ta.value = val;
          ta.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1600);
        toast(`Copiado: ${val}`);
      } catch (_) {
        toast('Não foi possível copiar');
      }
    });
  });

  /* ─── FAQ: um aberto por vez ─── */
  const faqItems = $$('.faq__i');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) faqItems.forEach((o) => { if (o !== item) o.open = false; });
    });
  });

  /* ─── forma de onda do hero ─── */
  const wave = $('#wave');
  if (wave && wave.getContext && !reduced) {
    const ctx = wave.getContext('2d');
    let w = 0, h = 0;
    const bars = 44;
    const phase = Array.from({ length: bars }, (_, i) => i * 0.33);

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = wave.getBoundingClientRect();
      w = Math.max(r.width, 120);
      h = Math.max(r.height, 20);
      wave.width = w * dpr;
      wave.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const gap = w / bars;
      for (let i = 0; i < bars; i++) {
        const s  = Math.sin(t * 1.9 + phase[i]) * 0.5 + 0.5;
        const s2 = Math.sin(t * 0.7 + i * 0.19) * 0.5 + 0.5;
        const bh = Math.max(2.4, (0.16 + s * 0.52 + s2 * 0.34) * h * 0.94);
        const x  = i * gap + gap * 0.22;
        const bw = Math.max(1.8, gap * 0.54);

        const g = ctx.createLinearGradient(0, (h - bh) / 2, 0, (h + bh) / 2);
        g.addColorStop(0, 'rgba(34,211,238,0.95)');
        g.addColorStop(1, 'rgba(124,92,255,0.88)');
        ctx.fillStyle = g;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, (h - bh) / 2, bw, bh, 2.5);
        else ctx.rect(x, (h - bh) / 2, bw, bh);
        ctx.fill();
      }
      t += 0.022;
      requestAnimationFrame(draw);
    }

    size();
    window.addEventListener('resize', size);
    draw();
  }

  /* ─── parallax suave no mockup ─── */
  const appWin = $('#appWindow');
  if (appWin && !reduced && window.matchMedia('(pointer: fine)').matches) {
    const stage = appWin.closest('.hero__stage');
    stage?.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      appWin.style.transform =
        `perspective(1400px) rotateX(${(1.4 - py * 3.4).toFixed(2)}deg) ` +
        `rotateY(${(px * 4).toFixed(2)}deg) translateY(-6px)`;
    });
    stage?.addEventListener('mouseleave', () => { appWin.style.transform = ''; });
  }

  /* ─── âncoras ─── */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 92,
        behavior: reduced ? 'auto' : 'smooth'
      });
    });
  });
})();
