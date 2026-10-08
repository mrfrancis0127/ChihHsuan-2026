// v2：選單、展開、計數、複製；所有元件都可缺席（子頁不會報錯）
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// mobile nav
const burger = document.getElementById('burger'), navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.setAttribute('aria-controls', 'navLinks');
  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
  }));
}

// reveal on scroll（未支援時直接顯示）
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('on'));
} else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { threshold: .15 });
  reveals.forEach(el => io.observe(el));
}

// stat counters：HTML 已是真實數字；動畫只是裝飾
if (!reduceMotion && 'IntersectionObserver' in window) {
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.n, dur = 1400, t0 = performance.now();
    const step = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); co.unobserve(el);
  }), { threshold: .5 });
  document.querySelectorAll('.count').forEach(el => co.observe(el));
}

// accordions：aria 狀態同步；展開後不鎖高度，縮放視窗也不截斷
document.querySelectorAll('.acc-head').forEach((btn, i) => {
  const item = btn.parentElement, body = item.querySelector('.acc-body');
  if (!body) return;
  body.id = body.id || 'acc-body-' + i;
  btn.setAttribute('aria-controls', body.id);
  btn.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
  const close = (it) => {
    const b = it.querySelector('.acc-body'), h = it.querySelector('.acc-head');
    b.style.maxHeight = b.scrollHeight + 'px';
    requestAnimationFrame(() => { b.style.maxHeight = '0px'; });
    it.classList.remove('open'); if (h) h.setAttribute('aria-expanded', 'false');
  };
  btn.addEventListener('click', () => {
    const open = item.classList.contains('open');
    item.parentElement.querySelectorAll('.acc-item.open').forEach(o => { if (o !== item) close(o); });
    if (open) { close(item); return; }
    item.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
    body.style.maxHeight = body.scrollHeight + 'px';
    const done = () => { if (item.classList.contains('open')) body.style.maxHeight = 'none'; body.removeEventListener('transitionend', done); };
    body.addEventListener('transitionend', done);
    if (reduceMotion) done();
  });
});

// copy helpers
const flash = (el, txt, back) => { el.textContent = txt; setTimeout(() => el.textContent = back, 1500); };
document.querySelectorAll('.copy-tag').forEach(t => t.addEventListener('click', () => {
  if (navigator.clipboard) navigator.clipboard.writeText(t.dataset.copy).then(() => flash(t, '已複製', '複製'));
}));
const copyTpl = document.getElementById('copyTpl'), mailTpl = document.getElementById('mailTpl');
if (copyTpl && mailTpl) copyTpl.addEventListener('click', () => {
  if (navigator.clipboard) navigator.clipboard.writeText(mailTpl.textContent).then(() => flash(copyTpl, '已複製樣板', '複製樣板'));
});
