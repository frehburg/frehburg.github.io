/* Progressive enhancement only: every page works without this script. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const copy = async (text, btn) => {
    try { await navigator.clipboard.writeText(text); }
    catch (e) { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    const old = btn.innerHTML; btn.textContent = 'Copied';
    setTimeout(() => { btn.innerHTML = old; }, 1400);
  };

  /* dialogs */
  $$('[data-open]').forEach(b => b.addEventListener('click', () => { const d = document.getElementById(b.dataset.open); if (d) d.showModal(); }));
  $$('dialog.dlg').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

  /* collapsible panels (abstract, BibTeX) */
  $$('[data-panel]').forEach(p => { p.hidden = true; });
  $$('[data-toggle]').forEach(b => b.addEventListener('click', () => {
    const p = document.getElementById(b.dataset.toggle);
    if (!p) return;
    p.hidden = !p.hidden;
    b.setAttribute('aria-expanded', String(!p.hidden));
  }));
  $$('[data-copy]').forEach(b => b.addEventListener('click', () => copy($('#' + b.dataset.copy).textContent, b)));
  $$('[data-copy-text]').forEach(b => b.addEventListener('click', () => copy($('pre', document.getElementById(b.dataset.copyText)).textContent, b)));
  $$('[data-print]').forEach(b => b.addEventListener('click', () => window.print()));

  /* publications: filter by topic and year, plus free-text search */
  const list = $('[data-list]');
  if (list) {
    const cards = $$('[data-year]', list), chips = $$('.fchip');
    const search = $('[data-search]'), empty = $('[data-empty]'), count = $('[data-count]');
    const state = { topic: 'all', year: 'all', q: '' };
    const readHash = () => {
      const h = new URLSearchParams(location.hash.slice(1));
      ['topic', 'year'].forEach(g => { state[g] = h.get(g) || 'all'; });
    };
    readHash();

    const apply = () => {
      const q = state.q.trim().toLowerCase();
      let n = 0;
      cards.forEach(c => {
        const ok = (state.year === 'all' || c.dataset.year === state.year)
          && (state.topic === 'all' || c.dataset.topics.split('|').includes(state.topic))
          && (!q || c.dataset.text.includes(q));
        c.hidden = !ok;
        if (ok) n++;
      });
      chips.forEach(b => b.setAttribute('aria-pressed', String(state[b.dataset.group] === b.dataset.value)));
      empty.hidden = n > 0;
      count.textContent = `Showing ${n} of ${cards.length}`;
      const hash = new URLSearchParams();
      if (state.topic !== 'all') hash.set('topic', state.topic);
      if (state.year !== 'all') hash.set('year', state.year);
      history.replaceState(null, '', hash.toString() ? '#' + hash : location.pathname + location.search);
    };
    chips.forEach(b => b.addEventListener('click', () => { state[b.dataset.group] = b.dataset.value; apply(); }));
    if (search) search.addEventListener('input', () => { state.q = search.value; apply(); });
    window.addEventListener('hashchange', () => { readHash(); apply(); });
    apply();
  }

  /* theme dialog: live preview of the three colors, snippet for config.typ */
  const dlg = $('#theme-dialog');
  if (dlg) {
    const keys = ['main', 'accent', 'contrast'];
    const style = document.documentElement.style;
    const defaults = { main: dlg.dataset.main, accent: dlg.dataset.accent, contrast: dlg.dataset.contrast };
    let saved = defaults;
    try { saved = JSON.parse(localStorage.getItem('site-theme')) || defaults; } catch (e) { /* ignore */ }
    let draft = { ...saved };
    const valid = v => /^#[0-9a-f]{6}$/i.test(v);
    const preview = t => keys.forEach(k => style.setProperty('--' + k, t[k]));
    const snippet = t => `#let theme = (\n  main: rgb("${t.main}"),\n  accent: rgb("${t.accent}"),\n  contrast: rgb("${t.contrast}"),\n)`;
    const sync = () => {
      keys.forEach(k => $$(`[data-key="${k}"]`, dlg).forEach(i => { if (i !== document.activeElement) i.value = draft[k]; }));
      $('#theme-code').textContent = snippet(draft);
      $$('.preset', dlg).forEach(p => p.classList.toggle('on', p.dataset.preset === keys.map(k => draft[k]).join(',')));
      preview(draft);
    };
    $$('[data-open="theme-dialog"]').forEach(b => b.addEventListener('click', () => { draft = { ...saved }; sync(); }));
    $$('.preset', dlg).forEach(p => p.addEventListener('click', () => {
      const [main, accent, contrast] = p.dataset.preset.split(',');
      draft = { main, accent, contrast }; sync();
    }));
    $$('[data-key]', dlg).forEach(i => i.addEventListener('input', () => {
      if (valid(i.value)) { draft[i.dataset.key] = i.value.toLowerCase(); sync(); }
    }));
    $('[data-reset]', dlg).addEventListener('click', () => { draft = { ...defaults }; sync(); });
    $('[data-apply]', dlg).addEventListener('click', () => {
      saved = { ...draft };
      if (keys.every(k => saved[k] === defaults[k])) localStorage.removeItem('site-theme');
      else localStorage.setItem('site-theme', JSON.stringify(saved));
      dlg.close();
    });
    dlg.addEventListener('close', () => { draft = { ...saved }; preview(saved); });
    sync(); preview(saved);
  }
})();
