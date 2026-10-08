(() => {
  'use strict';

  const BASE = 'https://sugarbabestudio.com.ua/';
  const BUMPIX = 'https://bumpix.net/uk/433363';
  const DIRECT = 'https://ig.me/m/sugar_babe_studio';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const fmt = (n) => n.toLocaleString('uk-UA').replace(/ /g, ' ') + ' грн';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  /* ---------------- Price data (verbatim from the current site) ---------------- */
  const WAX_ITEMS = [
    { id: 'autumn', name: 'Комплекс «Осінь»', desc: 'Глибоке бікіні, пахви, ноги нижче колін', price: 1700, cat: 'complex', includes: ['deep-bikini', 'underarms', 'partial-legs'] },
    { id: 'summer', name: 'Комплекс «Літо»', desc: 'Глибоке бікіні, пахви, ноги повністю', price: 1900, cat: 'complex', includes: ['deep-bikini', 'underarms', 'full-legs'] },
    { id: 'spring', name: 'Комплекс «Весна»', desc: 'Глибоке бікіні + руки повністю', price: 1450, cat: 'complex', includes: ['deep-bikini', 'full-arms'] },
    { id: 'brows', name: 'Брови', price: 300, cat: 'face' },
    { id: 'nose', name: 'Ніс', price: 250, cat: 'face' },
    { id: 'sideburns', name: 'Бакенбарди', price: 350, cat: 'face' },
    { id: 'cheeks', name: 'Щоки', price: 350, cat: 'face' },
    { id: 'upper-lip', name: 'Верхня губа', price: 250, cat: 'face' },
    { id: 'face-two', name: 'Обличчя дві зони', price: 450, cat: 'face' },
    { id: 'neck', name: 'Овал по хвосту', price: 400, cat: 'face' },
    { id: 'underarms', name: 'Пахви', price: 450, cat: 'arms' },
    { id: 'forearms', name: 'Руки по лікоть', price: 550, cat: 'arms' },
    { id: 'full-arms', name: 'Руки повністю', price: 650, cat: 'arms' },
    { id: 'abdomen-line', name: 'Лінія живота', price: 200, cat: 'body' },
    { id: 'abdomen', name: 'Живіт повністю', price: 400, cat: 'body' },
    { id: 'lower-back', name: 'Поперек', price: 400, cat: 'body' },
    { id: 'classic-bikini', name: 'Класичне бікіні', price: 600, cat: 'bikini' },
    { id: 'deep-bikini', name: 'Глибоке бікіні', price: 800, cat: 'bikini' },
    { id: 'buttocks', name: 'Сідниці', price: 450, cat: 'body' },
    { id: 'partial-legs', name: 'Ноги нижче/вище колін', price: 650, cat: 'legs' },
    { id: 'full-legs', name: 'Ноги повністю', price: 900, cat: 'legs' },
  ];

  const METHODS = {
    electro: {
      label: 'Електроепіляція',
      short: 'Електро',
      note: 'Вартість залежить від тривалості процедури. Почни з консультації та пробної процедури — майстер пояснить, скільки часу знадобиться саме тобі.',
      masters: {
        vladyslava: {
          name: 'Владислава', sub: 'Обличчя та тіло', photo: 'masters/vladyslava-2026.jpg', map: 'electro-zones/vladyslava.webp',
          mapAlt: 'Зони електроепіляції майстра Владислави — тіло та обличчя',
          items: [
            { id: 'trial', name: 'Консультація та пробна процедура', price: 300, mins: 20 },
            { id: 'm30', name: '30 хв електроепіляції', price: 550, mins: 30 },
            { id: 'm60', name: '60 хв електроепіляції', price: 1100, mins: 60 },
            { id: 'm90', name: '90 хв електроепіляції', price: 1650, mins: 90 },
            { id: 'm120', name: '120 хв електроепіляції', price: 2200, mins: 120 },
          ],
        },
        tetiana: {
          name: 'Тетяна', sub: 'Тільки тіло', photo: 'masters/tetiana-2026.jpg', map: 'electro-zones/tetiana.webp',
          mapAlt: 'Зони електроепіляції майстра Тетяни — тіло без обличчя',
          items: [
            { id: 'trial', name: 'Консультація та пробна процедура', desc: 'тіло', price: 300, mins: 20 },
            { id: 'm30', name: '30 хв електроепіляції', desc: 'тіло', price: 350, mins: 30 },
            { id: 'm60', name: '60 хв електроепіляції', desc: 'тіло', price: 700, mins: 60 },
            { id: 'm90', name: '90 хв електроепіляції', desc: 'тіло', price: 1050, mins: 90 },
            { id: 'm120', name: '120 хв електроепіляції', desc: 'тіло', price: 1400, mins: 120 },
          ],
        },
      },
    },
    laser: {
      label: 'Лазерна епіляція',
      short: 'Лазер',
      note: 'Ціни на лазерну епіляцію — для жінок. Комплекси вигідніші, ніж ті самі зони окремо.',
      folder: 'laser-zones/',
      items: [
        { id: 'complex-1', name: 'Комплекс 1', desc: 'Глибоке бікіні, пахви', price: 1500, cat: 'complex', includes: ['deep-bikini', 'underarms'] },
        { id: 'complex-2', name: 'Комплекс 2', desc: 'Глибоке бікіні, пахви, ноги нижче колін', price: 2200, cat: 'complex', includes: ['deep-bikini', 'underarms', 'lower-legs-knees'] },
        { id: 'complex-3', name: 'Комплекс 3', desc: 'Глибоке бікіні, пахви, ноги повністю', price: 2800, cat: 'complex', includes: ['deep-bikini', 'underarms', 'full-legs'] },
        { id: 'chin', name: 'Підборіддя', price: 450, cat: 'face' },
        { id: 'underarms', name: 'Пахви', price: 600, cat: 'arms' },
        { id: 'forearms', name: 'Ручки до ліктя', price: 850, cat: 'arms' },
        { id: 'full-arms', name: 'Ручки повністю', price: 1100, cat: 'arms' },
        { id: 'lower-abdomen', name: 'Живіт низ', price: 400, cat: 'body' },
        { id: 'classic-bikini', name: 'Класичне бікіні', price: 800, cat: 'bikini' },
        { id: 'deep-bikini', name: 'Глибоке бікіні', price: 1100, cat: 'bikini' },
        { id: 'buttocks', name: 'Сідниці повністю', price: 700, cat: 'body' },
        { id: 'partial-thigh', name: 'Частина стегна', price: 800, cat: 'legs' },
        { id: 'thighs', name: 'Стегна', price: 1300, cat: 'legs' },
        { id: 'lower-legs-knees', name: 'Голені (з колінами)', price: 1100, cat: 'legs' },
        { id: 'full-legs', name: 'Ніжки повністю', price: 2000, cat: 'legs' },
      ],
    },
    wax: { label: 'Воскова депіляція', short: 'Віск', note: 'Ціни на віск і шугаринг однакові.', folder: 'wax-zones/', items: WAX_ITEMS },
    sugar: { label: 'Шугаринг', short: 'Шугаринг', note: 'Ціни на шугаринг і віск однакові.', folder: 'wax-zones/', items: WAX_ITEMS },
  };

  const CATS = { all: 'Усі', complex: 'Комплекси', face: 'Обличчя', arms: 'Руки й пахви', body: 'Тіло', bikini: 'Бікіні', legs: 'Ноги' };

  /* ---------------- Toast & clipboard ---------------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) { /* fall through */ }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    const ok = await copyText(btn.dataset.copy);
    toast(ok ? `Промокод ${btn.dataset.copy} скопійовано` : `Промокод: ${btn.dataset.copy}`);
  }));

  /* ---------------- Header: scrolled state + active nav ---------------- */
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll-spy: highlights the link of the section in the middle of the viewport
  function spyLinks(links, onActive) {
    if (!('IntersectionObserver' in window) || !links.length) return;
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        const link = byId.get(en.target.id);
        if (link) { link.classList.add('is-active'); if (onActive) onActive(link); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }
  spyLinks($$('.nav a[href^="#"]'));
  const subnav = $('.subnav__track');
  if (subnav) {
    spyLinks($$('a[href^="#"]', subnav), (link) => {
      const left = link.offsetLeft - (subnav.clientWidth - link.offsetWidth) / 2;
      subnav.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    });
  }

  /* ---------------- Dialogs ---------------- */
  const menu = $('#menu');
  $$('[data-open-menu]').forEach((b) => b.addEventListener('click', () => menu && menu.showModal()));
  $$('[data-close-dialog]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
  if (menu) $$('a', menu).forEach((a) => a.addEventListener('click', () => menu.close()));

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------------- Price explorer ---------------- */
  const pricer = $('[data-pricer]');
  const state = {
    tab: (pricer && pricer.dataset.method) || 'laser',
    cat: 'all',
    query: '',
    master: 'vladyslava',
    selected: new Map(), // key -> { key, method, name, desc, price }
  };

  const tabs = pricer ? $$('[role="tab"]', pricer) : [];
  const panel = $('#pricer-panel');
  const zonesEl = $('[data-zones]', pricer);
  const chipsEl = $('[data-chips]', pricer);
  const searchEl = $('[data-search]', pricer);
  const toolbarEl = $('[data-toolbar]', pricer);
  const masterEl = $('[data-master]', pricer);
  const noteEl = $('[data-note]', pricer);
  const emptyEl = $('[data-empty]', pricer);

  const keyOf = (method, item) => (method === 'electro' ? `electro:${state.master}:${item.id}` : `${method}:${item.id}`);
  const imgOf = (method, item) => (METHODS[method].folder ? BASE + METHODS[method].folder + item.id + '.webp' : null);

  function currentItems() {
    if (state.tab === 'electro') return METHODS.electro.masters[state.master].items;
    return METHODS[state.tab].items;
  }

  function visibleItems() {
    const q = state.query.trim().toLowerCase();
    return currentItems().filter((it) => {
      if (state.tab !== 'electro' && state.cat !== 'all' && it.cat !== state.cat) return false;
      if (!q) return true;
      return (it.name + ' ' + (it.desc || '')).toLowerCase().includes(q);
    });
  }

  function altPriceHint(item) {
    if (state.tab === 'laser') {
      const twin = WAX_ITEMS.find((w) => w.id === item.id);
      return twin ? `віск / шугаринг — ${fmt(twin.price)}` : '';
    }
    if (state.tab === 'wax' || state.tab === 'sugar') {
      const twin = METHODS.laser.items.find((l) => l.id === item.id);
      return twin ? `лазер — ${fmt(twin.price)}` : '';
    }
    return '';
  }

  function renderChips() {
    if (state.tab === 'electro') { chipsEl.innerHTML = ''; return; }
    const present = new Set(METHODS[state.tab].items.map((i) => i.cat));
    chipsEl.innerHTML = Object.entries(CATS)
      .filter(([k]) => k === 'all' || present.has(k))
      .map(([k, label]) => `<button type="button" class="chip" data-cat="${k}" aria-pressed="${state.cat === k}">${label}</button>`)
      .join('');
  }

  function renderMaster() {
    if (state.tab !== 'electro') { masterEl.hidden = true; masterEl.innerHTML = ''; return; }
    const ms = METHODS.electro.masters;
    const m = ms[state.master];
    masterEl.hidden = false;
    masterEl.innerHTML = `
      <div class="master-switch" role="group" aria-label="Обери майстра">
        ${Object.entries(ms).map(([k, v]) => `
          <button type="button" class="master-opt" data-master-id="${k}" aria-pressed="${state.master === k}">
            <img src="${BASE + v.photo}" alt="" width="40" height="40" loading="lazy">
            <span><strong>${v.name}</strong><small>${v.sub}</small></span>
          </button>`).join('')}
      </div>
      <button type="button" class="zone-map" data-zone-map>
        <img src="${BASE + m.map}" alt="" width="72" height="72" loading="lazy">
        <span><strong>Зони, з якими працює ${m.name}</strong>Натисни, щоб переглянути схему</span>
      </button>`;
  }

  function renderZones() {
    const items = visibleItems();
    const method = state.tab;
    emptyEl.hidden = items.length > 0;
    zonesEl.innerHTML = items.map((it) => {
      const key = keyOf(method, it);
      const id = 'z-' + key.replace(/[^a-z0-9]+/gi, '-');
      const img = imgOf(method, it);
      const alt = altPriceHint(it);
      const isComplex = it.cat === 'complex';
      let saving = 0;
      if (isComplex) {
        const sum = it.includes.reduce((s, zid) => s + (currentItems().find((x) => x.id === zid) || { price: 0 }).price, 0);
        saving = sum - it.price;
      }
      const thumb = img
        ? `<span class="zone__thumb"><img src="${img}" alt="" width="56" height="56" loading="lazy"></span>`
        : `<span class="zone__thumb zone__thumb--text">${it.mins}<small>хв</small></span>`;
      return `
        <li class="zone">
          <input class="zone__check" type="checkbox" id="${id}" data-key="${esc(key)}" data-item="${esc(it.id)}" ${state.selected.has(key) ? 'checked' : ''}>
          <label class="zone__label" for="${id}">
            ${thumb}
            <span class="zone__name">
              ${isComplex ? `<span class="zone__badge">${saving > 0 ? 'Вигідно · −' + fmt(saving) : 'Комплекс'}</span>` : ''}
              <strong>${esc(it.name)}</strong>
              ${it.desc ? `<small>${esc(it.desc)}</small>` : ''}
            </span>
            <span class="zone__price">${fmt(it.price)}${alt ? `<small class="zone__alt">${alt}</small>` : ''}</span>
            <span class="zone__tick">${icon('check')}</span>
          </label>
          ${img ? `<button type="button" class="zone__zoom" data-zoom="${esc(it.id)}" aria-label="Переглянути зону: ${esc(it.name)}"><span>${icon('zoom')}</span></button>` : ''}
        </li>`;
    }).join('');
  }

  function renderPanel() {
    tabs.forEach((t) => {
      const on = t.dataset.tab === state.tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    if (tabs.length) panel.setAttribute('aria-labelledby', 'tab-' + state.tab);
    toolbarEl.hidden = state.tab === 'electro';
    noteEl.textContent = METHODS[state.tab].note;
    renderChips();
    renderMaster();
    renderZones();
  }

  function setTab(tab, { focus = false } = {}) {
    if (!METHODS[tab] || !pricer) return;
    state.tab = tab;
    state.cat = 'all';
    state.query = '';
    if (searchEl) searchEl.value = '';
    renderPanel();
    if (focus) { const t = tabs.find((x) => x.dataset.tab === tab); if (t) t.focus(); }
  }

  function addItem(method, item) {
    const key = keyOf(method, item);
    if (method === 'electro') {
      // electro is billed by time: keep a single electro option selected
      [...state.selected.keys()].filter((k) => k.startsWith('electro:')).forEach((k) => state.selected.delete(k));
    }
    const masterName = method === 'electro' ? METHODS.electro.masters[state.master].name : '';
    state.selected.set(key, {
      key, method, name: item.name, price: item.price,
      desc: method === 'electro' ? `${METHODS.electro.short} · ${masterName}` : METHODS[method].short,
    });
  }

  function removeKey(key) { state.selected.delete(key); }

  function toggleItem(method, item, on) {
    if (on) addItem(method, item); else removeKey(keyOf(method, item));
    renderBasket();
    if (method === 'electro') renderZones();
  }

  /* ---- Basket ---- */
  const basketList = $('[data-basket-list]');
  const basketEmpty = $('[data-basket-empty]');
  const basketTotal = $('[data-basket-total]');
  const totalEl = $('[data-total]');
  const hintEl = $('[data-basket-hint]');
  const clearBtn = $('[data-clear]');
  const dockSum = $('[data-dock-sum]');

  function total() { let s = 0; state.selected.forEach((v) => { s += v.price; }); return s; }

  function findHint() {
    for (const method of ['laser', 'wax', 'sugar']) {
      const items = METHODS[method].items;
      const complexes = items.filter((i) => i.cat === 'complex').sort((a, b) => b.includes.length - a.includes.length);
      for (const c of complexes) {
        const cKey = `${method}:${c.id}`;
        if (state.selected.has(cKey)) {
          const dup = c.includes.filter((zid) => state.selected.has(`${method}:${zid}`));
          if (dup.length) {
            const names = dup.map((zid) => items.find((i) => i.id === zid).name.toLowerCase()).join(', ');
            return { text: `${c.name} вже включає: ${names}. Прибрати дублі з вибору?`, label: 'Прибрати дублі', run: () => dup.forEach((zid) => state.selected.delete(`${method}:${zid}`)) };
          }
          continue;
        }
        if (c.includes.every((zid) => state.selected.has(`${method}:${zid}`))) {
          const sum = c.includes.reduce((s, zid) => s + items.find((i) => i.id === zid).price, 0);
          if (c.price < sum) {
            return {
              text: `${METHODS[method].short}: обрані зони входять у ${c.name} — так вийде на ${fmt(sum - c.price)} дешевше.`,
              label: `Замінити на ${c.name}`,
              run: () => { c.includes.forEach((zid) => state.selected.delete(`${method}:${zid}`)); addItem(method, c); },
            };
          }
        }
      }
    }
    return null;
  }

  function renderBasket() {
    const items = [...state.selected.values()];
    basketEmpty.hidden = items.length > 0;
    basketTotal.hidden = items.length === 0;
    clearBtn.hidden = items.length === 0;
    basketList.innerHTML = items.map((v) => `
      <li class="basket__item">
        <span>${esc(v.name)}<small>${esc(v.desc)}</small></span>
        <b>${fmt(v.price)}</b>
        <button type="button" data-remove="${esc(v.key)}" aria-label="Прибрати: ${esc(v.name)}">${icon('close')}</button>
      </li>`).join('');
    const sum = total();
    totalEl.textContent = fmt(sum);
    if (dockSum) {
      dockSum.hidden = sum === 0;
      dockSum.textContent = sum ? fmt(sum) : '';
    }
    const hint = findHint();
    if (hint) {
      hintEl.hidden = false;
      hintEl.innerHTML = `<span>${icon('spark')} ${esc(hint.text)}</span><button type="button" class="btn btn--primary btn--sm" data-hint>${esc(hint.label)}</button>`;
      $('[data-hint]', hintEl).addEventListener('click', () => { hint.run(); renderBasket(); renderZones(); });
    } else {
      hintEl.hidden = true;
      hintEl.innerHTML = '';
    }
  }

  function selectionText() {
    const items = [...state.selected.values()];
    if (!items.length) return '';
    return 'Привіт! Хочу записатися:\n' + items.map((v) => `• ${v.desc} — ${v.name} (${fmt(v.price)})`).join('\n') + `\nРазом за прайсом: ${fmt(total())}`;
  }

  if (pricer) {
    // tabs: click + roving keyboard focus
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => setTab(t.dataset.tab));
      t.addEventListener('keydown', (e) => {
        let n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') n = 0;
        if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); setTab(tabs[n].dataset.tab, { focus: true }); }
      });
    });

    chipsEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cat]');
      if (!b) return;
      state.cat = b.dataset.cat;
      $$('.chip', chipsEl).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
      renderZones();
    });

    searchEl.addEventListener('input', () => {
      state.query = searchEl.value;
      if (state.query && state.cat !== 'all') {
        state.cat = 'all';
        $$('.chip', chipsEl).forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === 'all')));
      }
      renderZones();
    });

    zonesEl.addEventListener('change', (e) => {
      const cb = e.target.closest('.zone__check');
      if (!cb) return;
      const item = currentItems().find((x) => x.id === cb.dataset.item);
      if (item) toggleItem(state.tab, item, cb.checked);
    });

    zonesEl.addEventListener('click', (e) => {
      const z = e.target.closest('[data-zoom]');
      if (!z) return;
      const item = currentItems().find((x) => x.id === z.dataset.zoom);
      if (item) openZone(state.tab, item, z);
    });

    masterEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-master-id]');
      if (b) { state.master = b.dataset.masterId; renderMaster(); renderZones(); return; }
      if (e.target.closest('[data-zone-map]')) {
        const m = METHODS.electro.masters[state.master];
        openImage(BASE + m.map, m.mapAlt, `Майстер ${m.name}`, m.sub);
      }
    });

    basketList.addEventListener('click', (e) => {
      const b = e.target.closest('[data-remove]');
      if (!b) return;
      removeKey(b.dataset.remove);
      renderBasket();
      renderZones();
    });

    clearBtn.addEventListener('click', () => { state.selected.clear(); renderBasket(); renderZones(); });

    $('[data-send-direct]').addEventListener('click', async () => {
      const text = selectionText();
      window.open(DIRECT, '_blank', 'noopener');
      if (!text) return;
      const ok = await copyText(text);
      toast(ok ? 'Вибір скопійовано — встав його в повідомлення' : 'Відкрили Direct — напиши, які зони обрала');
    });

    renderPanel();
    renderBasket();
  }

  // Service cards & chooser → open a tab in the price explorer
  function showPrices(tab) {
    setTab(tab);
    const target = $('#prices');
    if (target) target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-show-prices]');
    if (b) showPrices(b.dataset.showPrices);
  });

  /* ---------------- Zone preview dialog ---------------- */
  const zd = $('#zone-dialog');
  let zdCurrent = null;
  function syncZoneButton() {
    if (!zdCurrent) return;
    const btn = $('[data-zd-toggle]', zd);
    const on = state.selected.has(keyOf(zdCurrent.method, zdCurrent.item));
    btn.innerHTML = on ? `${icon('check')}Обрано` : `${icon('plus')}Додати до вибору`;
    btn.classList.toggle('btn--primary', !on);
    btn.classList.toggle('btn--soft', on);
    btn.setAttribute('aria-pressed', String(on));
  }
  function openZone(method, item) {
    zdCurrent = { method, item };
    $('[data-zd-img]', zd).src = imgOf(method, item);
    $('[data-zd-img]', zd).alt = `Зона обробки: ${item.name}${item.desc ? ' (' + item.desc + ')' : ''}`;
    $('[data-zd-method]', zd).textContent = METHODS[method].label;
    $('[data-zd-title]', zd).textContent = item.name;
    $('[data-zd-desc]', zd).textContent = item.desc || '';
    $('[data-zd-price]', zd).textContent = fmt(item.price);
    $('[data-zd-toggle]', zd).hidden = false;
    $('.zone-dialog__row', zd).hidden = false;
    syncZoneButton();
    zd.showModal();
  }
  function openImage(src, alt, title, desc) {
    zdCurrent = null;
    $('[data-zd-img]', zd).src = src;
    $('[data-zd-img]', zd).alt = alt;
    $('[data-zd-method]', zd).textContent = 'Електроепіляція';
    $('[data-zd-title]', zd).textContent = title;
    $('[data-zd-desc]', zd).textContent = desc || '';
    $('.zone-dialog__row', zd).hidden = true;
    zd.showModal();
  }
  if (zd) {
    $('[data-zd-toggle]', zd).addEventListener('click', () => {
      if (!zdCurrent) return;
      const { method, item } = zdCurrent;
      const on = !state.selected.has(keyOf(method, item));
      toggleItem(method, item, on);
      renderZones();
      syncZoneButton();
    });
    zd.addEventListener('click', (e) => { if (e.target === zd) zd.close(); });
  }

  /* ---------------- Method chooser ---------------- */
  const RESULTS = {
    smooth: {
      title: 'Віск або шугаринг',
      text: 'Видалення волосся, коли гладкість потрібна вже після візиту. Віск — для обличчя та різних зон тіла, цукрова паста — твоя знайома гладкість. Ціни на обидва методи однакові.',
      img: 'depilation-campaign.webp', alt: 'Ілюстрація: до та після регулярної депіляції',
      actions: [{ tab: 'wax', label: 'Ціни на віск' }, { tab: 'sugar', label: 'Ціни на шугаринг' }],
      more: [{ href: 'waxing.html', label: 'Про віск' }, { href: 'shugaring.html', label: 'Про шугаринг' }],
    },
    laser: {
      title: 'Лазерна епіляція',
      text: 'Курс процедур для поступового зменшення росту волосся. Зони, інтервали й план курсу обговоримо індивідуально. Працювати по волосинці можна й електроепіляцією.',
      img: 'service-photos/laser.webp', alt: 'Процедура лазерної епіляції',
      actions: [{ tab: 'laser', label: 'Ціни на лазер' }, { href: BUMPIX, label: 'Записатися' }],
      more: [{ href: 'laser.html', label: 'Детальніше про лазер' }],
    },
    electro: {
      title: 'Електроепіляція',
      text: 'Працюємо з кожною волосинкою окремо — зокрема зі світлим, рудим або сивим волоссям. Почни з консультації та пробної процедури (20 хв) — 300 грн.',
      img: 'electro-campaign.webp', alt: 'Ілюстрація: до та після електроепіляції',
      actions: [{ tab: 'electro', label: 'Ціни на електро' }, { href: BUMPIX, label: 'Записатися' }],
      more: [{ href: 'electroepilation.html', label: 'Детальніше про електро' }],
    },
    unsure: {
      title: 'Почни з консультації',
      text: 'Напиши нам, яку зону хочеш обробити та якого результату очікуєш. Майстер уточнить деталі й пояснить доступні варіанти — лазер чи електроепіляцію.',
      img: 'studio-photos/waiting-room.webp', alt: 'Зона очікування у Sugar Babe Studio',
      actions: [{ href: DIRECT, label: 'Написати в Direct' }, { tab: 'electro', label: 'Пробна процедура — 300 грн' }],
      more: [{ href: 'laser.html', label: 'Про лазер' }, { href: 'electroepilation.html', label: 'Про електро' }],
    },
  };

  const chooser = $('[data-chooser]');
  const resultEl = $('[data-chooser-result]');
  function showResult(key) {
    const r = RESULTS[key];
    if (!r) { resultEl.hidden = true; resultEl.innerHTML = ''; return; }
    resultEl.hidden = false;
    resultEl.innerHTML = `
      <div class="result__media"><img src="${BASE + r.img}" alt="${esc(r.alt)}" loading="lazy"></div>
      <div class="result__copy">
        <p class="tag">Тобі може підійти</p>
        <h4>${r.title}</h4>
        <p>${r.text}</p>
        <div class="result__actions">
          ${r.actions.map((a, i) => a.tab
            ? `<button type="button" class="btn ${i === 0 ? 'btn--primary' : 'btn--ghost'} btn--sm" data-show-prices="${a.tab}">${a.label}</button>`
            : `<a class="btn ${i === 0 ? 'btn--primary' : 'btn--ghost'} btn--sm" href="${a.href}" target="_blank" rel="noopener">${a.label}${icon('arrow')}</a>`).join('')}
        </div>
        ${r.more ? `<div class="result__more">${r.more.map((m) => `<a class="text-link" href="${m.href}">${m.label}${icon('right')}</a>`).join('')}</div>` : ''}
        <button type="button" class="link-btn result__reset" data-chooser-reset>Пройти ще раз</button>
      </div>`;
  }
  if (chooser) {
    const step2 = $('[data-step="2"]', chooser);
    chooser.addEventListener('change', (e) => {
      const t = e.target;
      if (t.name === 'goal') {
        $$('input[name="hair"]', chooser).forEach((i) => { i.checked = false; });
        if (t.value === 'today') { step2.hidden = true; showResult('smooth'); }
        else { step2.hidden = false; showResult(null); }
      }
      if (t.name === 'hair') {
        showResult({ dark: 'laser', light: 'electro', unsure: 'unsure' }[t.value]);
      }
    });
    resultEl.addEventListener('click', (e) => {
      if (!e.target.closest('[data-chooser-reset]')) return;
      chooser.reset();
      step2.hidden = true;
      showResult(null);
      const first = $('input[name="goal"]', chooser);
      if (first) first.focus();
    });
  }

  /* ---------------- Reviews ---------------- */
  const REVIEWS = [
    'Дуже задоволена студією і звісно ж результатами процедур. Віталія професіонал своєї справи, турботлива та уважна до деталей. Дуже задоволена лазерною епіляцією. Також спробувала в студії електро епіляцію над верхньою губою, Влада топ майстер. Результатом теж дуже задоволена. Зручна локація, гарна студія, ціни приємні. Рекомендую!',
    'Вітаю! Дуже задоволена відвідуванням студії. Проходила процедуру електроепіляції зони над верхньою губою, ще не закінчила весь курс, але досягла значного результату за декілька процедур, тому і надалі буду ходити. Майстриня працювала професійно, усе детально пояснила, спершу було лячно, бо трохи боюся голок, але Влада створила комфортну атмосферу, тому все обійшлося 🥰',
    'Приходжу в студію на електро до Владислави завжди із задоволенням і виходжу із вражаючим результатом. Процедура проходить максимально комфортно, з професійним підходом. Всі побажання враховуються, на питання, які мене турбували, відповіли) Щиро рекомендую Владиславу як майстра! Та й загалом студія подобається і має дуже зручне та доступне місцезнаходження 😊',
    'Чудова студія - ходила і на шугарінг, і електроепіляцію (різні зони) і завжди залишаюсь задоволена. Адміністратори завжди йдуть назустріч із записом, навіть якщо звертаюсь в останній момент) Майстри професійні, процедури проходять швидко, але без жодних компромісів із якістю ❤️',
    'Мала досвід і у інших студіях, але Влада просто майстер обезболювання! Настільки комфортно і професійно, що не чекаєш на процедуру як на каторгу 🤪 Ще й ціна хороша) рекомендую!',
    'Проходжу курс електроепіляції на обличчі у Владислави. Дуже приємний та емпатичний майстер, а результат просто бомба. Рекомендую',
    'Всім привіт! 😉 Ходжу на електроепіляцію до Влади ще з весни, і результатами я дуже задоволена. Дуже рада, що обрала саме цю студію. Влада — справжній професіонал і неймовірно приємна людина. Щиро рекомендую записуватися до неї на електроепіляцію, якщо хочете позбутися небажаного волосся назавжди. 💛💛💛',
    'Дуже вдячна Віталії за її турботливе ставлення, ретельність і уважність в роботі! Також, Каті велике дякую, просто рідше бачимося) Завжди з радістю їду до вас на процедури, з вами якісно і безболісно!) Всім рекомендую!',
    'Найкраща студія шугарингу та депіляції в Києві 🤍 Дякую Віталії за класний підхід, атмосферу та якість обслуговування!',
    'Вже більше року відвідую цю студію, дуже задоволена 😊 Дівчатка дуже приємні, уважні, працюють акуратно. Тут можна обрати процедуру, яка підійде найліпше. Мені дуже пощастило знайти пані Віталію, адже підбір майстра справа делікатна.',
  ];
  const track = $('[data-reviews]');
  if (track) {
    track.innerHTML = REVIEWS.map((t, i) => {
      const long = t.length > 240;
      return `
        <article class="review" aria-label="Відгук ${i + 1} з ${REVIEWS.length}">
          <div class="review__stars" role="img" aria-label="Оцінка 5 з 5">${icon('star').repeat(5)}</div>
          <blockquote id="rev-${i}" class="${long ? 'is-clamped' : ''}">${esc(t)}</blockquote>
          ${long ? `<button type="button" class="review__more" aria-expanded="false" aria-controls="rev-${i}">Читати повністю</button>` : ''}
          <div class="review__src"><span class="review__g" aria-hidden="true">G</span>Відгук з Google</div>
        </article>`;
    }).join('');

    track.addEventListener('click', (e) => {
      const b = e.target.closest('.review__more');
      if (!b) return;
      const q = document.getElementById(b.getAttribute('aria-controls'));
      const open = q.classList.toggle('is-clamped') === false;
      b.setAttribute('aria-expanded', String(open));
      b.textContent = open ? 'Згорнути' : 'Читати повністю';
    });

    const prev = $('[data-rev-prev]');
    const next = $('[data-rev-next]');
    const step = () => { const c = $('.review', track); return c ? c.getBoundingClientRect().width + 16 : track.clientWidth; };
    const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
    const syncArrows = () => {
      if (!prev || !next) return;
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce() ? 'auto' : 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce() ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows);
    syncArrows();
  }

  /* ---------------- Mobile booking dock ---------------- */
  const dock = $('[data-dock]');
  const heroCta = $('[data-hero-cta]');
  const contacts = $('#contacts');
  if (dock && heroCta && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let contactsVisible = false;
    const sync = () => dock.classList.toggle('is-visible', !heroVisible && !contactsVisible);
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting || en.boundingClientRect.top > 0; sync(); }).observe(heroCta);
    if (contacts) new IntersectionObserver(([en]) => { contactsVisible = en.isIntersecting; sync(); }, { threshold: 0.15 }).observe(contacts);
  } else if (dock) {
    dock.classList.add('is-visible');
  }
})();
