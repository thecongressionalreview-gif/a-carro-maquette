(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: tiles "laid" away to reveal the photo
  const tiles = $('.hero__tiles');
  if (tiles && !reduce) {
    const cols = innerWidth < 700 ? 4 : 8, rows = innerWidth < 700 ? 7 : 5;
    tiles.style.setProperty('--cols', cols);
    tiles.style.gridTemplateRows = `repeat(${rows},1fr)`;
    const f = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = document.createElement('i');
      i.style.setProperty('--d', `${(r + c) * 55 + Math.random() * 90}ms`);
      f.appendChild(i);
    }
    tiles.appendChild(f);
    setTimeout(() => tiles.remove(), 2200);
  }

  // Header solid on scroll
  const head = $('.head');
  const onScroll = () => head.classList.toggle('is-solid', scrollY > 40 || !menu.hidden);
  addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const toggle = $('.toggle'), menu = $('#menu');
  const setMenu = open => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = open ? 'hidden' : '';
    onScroll();
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
  onScroll();

  // Reveal on scroll
  const rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(el => io.observe(el));
    const fallback = () => rv.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); });
    addEventListener('scroll', fallback, { passive: true }); fallback();
  } else rv.forEach(el => el.classList.add('in'));

  // Gallery filter
  const chips = $$('#realisations .chip');
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.setAttribute('aria-pressed', c === ch));
    const f = ch.dataset.f;
    $$('.gallery .g').forEach(g => g.classList.toggle('is-hidden', f !== 'all' && g.dataset.c !== f));
  }));

  // Toast for disabled links (maquette)
  const toast = $('#toast'); let t;
  const say = msg => { toast.textContent = msg; toast.classList.add('on'); clearTimeout(t); t = setTimeout(() => toast.classList.remove('on'), 2400); };
  $$('[data-off]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); say('Maquette : lien à activer'); }));

  // Form
  const form = $('#form');
  const files = $('#f-photos'), list = $('#file-list');
  files.addEventListener('change', () => {
    const n = files.files.length;
    if (n > 5) { list.textContent = '5 photos maximum : seules les 5 premières seront envoyées.'; return; }
    list.textContent = n ? `${n} photo${n > 1 ? 's' : ''} sélectionnée${n > 1 ? 's' : ''}` : '';
  });
  const check = (el, ok) => { const f = el.closest('.field'); f.classList.toggle('is-bad', !ok); $('.err', f).hidden = ok; el.setAttribute('aria-invalid', !ok); return ok; };
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true, first = null;
    const mark = (cond, el) => { if (!cond) { ok = false; first ||= el; } };
    const nom = $('#f-nom'), tel = $('#f-tel'), mail = $('#f-mail'), ville = $('#f-ville'), rgpd = $('#f-rgpd');
    mark(check(nom, nom.value.trim().length > 1), nom);
    mark(check(tel, /^[+\d][\d\s.\-]{8,}$/.test(tel.value.trim())), tel);
    mark(check(mail, !mail.value || mail.checkValidity()), mail);
    mark(check(ville, ville.value.trim().length > 1), ville);
    const tr = $$('input[name="travaux"]:checked', form).length > 0;
    $('#e-travaux').hidden = tr; mark(tr, $('input[name="travaux"]', form));
    $('#e-rgpd').hidden = rgpd.checked; mark(rgpd.checked, rgpd);
    if (!ok) { first.focus(); return; }
    const box = $('#ok'); box.hidden = false; box.focus();
  });

  const y = $('#y'); if (y) y.textContent = new Date().getFullYear();
})();
