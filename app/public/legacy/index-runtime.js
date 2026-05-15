// ===== Live clock for menubars =====
// Both the page-level menubar and the macbook's internal menubar carry a
// [data-live-clock] span. Update them every 30s in macOS format ("Sat 26 Apr  14:07").
(function(){
  const els = document.querySelectorAll('[data-live-clock]');
  if(!els.length) return;
  const fmt = () => {
    const d = new Date();
    const wd = d.toLocaleDateString('en-GB', {weekday:'short'});
    const mo = d.toLocaleDateString('en-GB', {month:'short'});
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    return `${wd} ${d.getDate()} ${mo}  ${hh}:${mm}`;
  };
  const tick = () => { const s = fmt(); els.forEach(el => el.textContent = s); };
  tick();
  setInterval(tick, 30_000);
})();

// ===== Scroll-driven perf toggles =====
// Two effects both need to know "is the user actively scrolling":
//   1. Nav: drop backdrop-filter while scrolling — biggest scroll-time
//      cost on the page (a sticky blur re-rasters every frame the
//      content under it moves). Keep the Tahoe glass only at scrollY=0.
//   2. Aurora: pause the two full-viewport blur(60px) drift animations
//      during scroll. Their textures stay live on the GPU otherwise,
//      eating composite budget exactly when we want it free.
// One passive scroll listener drives both. rAF dedupes the per-frame
// work; a 150ms idle timer flips body.scrolling off after the user
// stops, which is when the aurora drift becomes visible again.
(function(){
  const nav  = document.querySelector('.nav');
  const body = document.body;
  let rafId = null;
  let idleT = null;
  let lastScrolled = false;
  let isScrolling  = false;
  function update(){
    const scrolled = window.scrollY > 4;
    if(scrolled !== lastScrolled){
      if(nav) nav.classList.toggle('scrolled', scrolled);
      lastScrolled = scrolled;
    }
    rafId = null;
  }
  function onScroll(){
    if(!rafId) rafId = requestAnimationFrame(update);
    if(!isScrolling){
      isScrolling = true;
      body.classList.add('scrolling');
    }
    if(idleT) clearTimeout(idleT);
    idleT = setTimeout(() => {
      isScrolling = false;
      body.classList.remove('scrolling');
    }, 150);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();

// ===== Scroll reveals =====
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// ===== Hero palette animation =====
// One-shot demo synced to its carousel panel. Story beats fit inside
// the carousel's 10s window so the focus-beat (chosen window appears)
// always lands before the panel switches. Token system aborts the
// in-flight demo if the panel re-activates mid-run.
(function(){
  const stage   = document.getElementById('hero-stage');
  const palette = document.getElementById('hero-palette');
  const hotkey  = document.getElementById('hero-hotkey');
  const enterP  = document.getElementById('hero-enter');
  const typed   = document.getElementById('hero-typed');
  const ghost   = document.getElementById('hero-ghost');
  const openHnt = document.getElementById('hero-open-hint');
  const topIde  = document.getElementById('hero-topide');
  const hintPill = document.getElementById('hero-hint');
  const chosen  = document.getElementById('hero-chosen');
  const list    = document.getElementById('hero-list');
  const cap     = document.getElementById('hero-cap');
  if(!palette || !list || !stage) return;

  // Caption pill below the demo. Same swap pattern as .mb-caption:
  // briefly dip the old text out before the new copy arrives so each
  // beat reads as a discrete change instead of a silent replace.
  let capTok = 0;
  function setCap(html){
    if(!cap) return;
    if(!html){ cap.classList.remove('shown'); return; }
    const tok = ++capTok;
    if(cap.classList.contains('shown') && cap.innerHTML !== html){
      cap.classList.add('swapping');
      setTimeout(() => {
        if(tok !== capTok) return;
        cap.innerHTML = html;
        cap.classList.remove('swapping');
        cap.classList.add('shown');
      }, 110);
      return;
    }
    cap.innerHTML = html;
    cap.classList.add('shown');
  }

  // Tab cycles through the editors open on the selected project. Matches
  // OnboardingSearchAnimation's "Tab to pick an editor" beat.
  const EDITORS = [
    { key: 'cursor',   src: 'assets/ide/cursor.webp',   alt: 'Cursor',   name: 'Cursor'   },
    { key: 'vscode',   src: 'assets/ide/vscode.webp',   alt: 'VS Code',  name: 'VS Code'  },
    { key: 'intellij', src: 'assets/ide/intellij.webp', alt: 'IntelliJ', name: 'IntelliJ' },
  ];
  function setFocusedIde(key){
    const row = list.querySelector('li.on');
    if(!row) return;
    row.querySelectorAll('.ide-stack .ide').forEach(el => {
      el.classList.toggle('focused', !!key && el.dataset.ide === key);
    });
  }
  function clearFocusedIde(){
    list.querySelectorAll('.ide-stack .ide.focused').forEach(el => el.classList.remove('focused'));
  }
  async function tabSwap(editor){
    topIde.classList.add('switching');
    await wait(120);
    const img = topIde.querySelector('img');
    img.src = editor.src;
    img.alt = editor.alt;
    openHnt.textContent = '— Open in ' + editor.name;
    setFocusedIde(editor.key);
    await wait(40);
    topIde.classList.remove('switching');
  }

  const QUERY = 'web';
  const items = Array.from(list.querySelectorAll('li'));

  function filterList(q){
    items.forEach(li => {
      const match = q.length === 0 || (li.dataset.keys || '').toLowerCase().includes(q.toLowerCase());
      li.setAttribute('data-filtered', match ? '0' : '1');
    });
    const visible = items.filter(li => li.getAttribute('data-filtered') === '0');
    items.forEach(li => li.classList.remove('on'));
    if(visible[0]) visible[0].classList.add('on');
  }

  function setGhost(q){
    const visible = items.filter(li => li.getAttribute('data-filtered') === '0');
    if(!visible[0] || q.length === 0){ ghost.textContent = ''; openHnt.textContent=''; return; }
    const keys = (visible[0].dataset.keys || '').split(' ');
    const full = keys[0] || '';
    ghost.textContent = full.toLowerCase().startsWith(q.toLowerCase()) ? full.slice(q.length) : '';
    openHnt.textContent = '— Open';
  }

  function lightStage(){ stage.classList.add('lit'); }

  async function setHint(html){
    if(!hintPill) return;
    if(hintPill.classList.contains('shown')){
      hintPill.classList.remove('shown');
      await wait(180);
    }
    hintPill.innerHTML = html;
    hintPill.classList.add('shown');
  }
  function hideHint(){ if(hintPill) hintPill.classList.remove('shown'); }

  const HINT = {
    fuzzy:    '<span class="ico">⚡</span><span>Fuzzy match</span>',
    alreadyOpen: '<span class="dot-live"></span><span>Already open · 3 editors</span>',
    tab:      '<kbd>⇥</kbd><span>Switch editor</span>',
    enter:    '<kbd>↵</kbd><span>Focuses open window</span>',
  };

  function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
  const heroKeyEls = Array.from(hotkey.querySelectorAll('[data-key]'));
  function pressChord(ms=240){
    heroKeyEls.forEach(el => el.classList.add('pressed'));
    return wait(ms).then(() => heroKeyEls.forEach(el => el.classList.remove('pressed')));
  }

  // Snap everything back to the pre-demo idle state.
  function resetState(){
    typed.textContent = '';
    ghost.textContent = '';
    openHnt.textContent = '';
    filterList('');
    const img = topIde.querySelector('img');
    img.src = 'assets/ide/cursor.webp';
    img.alt = 'Cursor';
    topIde.classList.add('tinted');
    topIde.classList.remove('switching');
    clearFocusedIde();
    hideHint();
    enterP.classList.remove('shown');
    chosen.classList.remove('shown');
    palette.classList.remove('dimmed');
    items.forEach(li => li.classList.remove('on'));
    items[0].classList.add('on');
  }

  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    typed.textContent = QUERY;
    filterList(QUERY);
    setGhost(QUERY);
    topIde.classList.remove('tinted');
    openHnt.textContent = '— Open in Cursor';
    setFocusedIde('cursor');
    if(hintPill){ hintPill.innerHTML = HINT.alreadyOpen; hintPill.classList.add('shown'); }
    lightStage();
    setCap('<kbd>↵</kbd> opens Cursor.');
    return;
  }

  // Token aborts the in-flight demo when the panel re-activates,
  // so a fresh run never collides with a still-running prior one.
  let runToken = 0;
  async function runDemo(){
    const myToken = ++runToken;
    const alive = () => myToken === runToken;

    resetState();
    lightStage();
    // Three captions for the whole arc — gesture, action, result.
    // The hint-pill INSIDE the search bar (HINT.fuzzy / alreadyOpen /
    // tab / enter) handles the contextual "fuzzy match", "already
    // open · 3 editors" colour — this caption pill stays focused on
    // the keyboard chord that the viewer needs to learn.
    setCap('<kbd>⌥</kbd><kbd>Space</kbd> opens the palette.');
    await wait(560); if(!alive()) return;

    // ⌥ Space chord — quick visual confirmation
    await pressChord(280); if(!alive()) return;
    await wait(420);       if(!alive()) return;

    // Type "web" — list shrinks as non-matches filter out. Slower
    // per-key cadence (240ms) so the typing reads as deliberate.
    setHint(HINT.fuzzy);
    setCap('Type three letters.');
    for(let i = 1; i <= QUERY.length; i++){
      if(!alive()) return;
      const q = QUERY.slice(0, i);
      typed.textContent = q;
      filterList(q);
      setGhost(q);
      await wait(240);
    }
    await wait(1100); if(!alive()) return;

    // Un-tint Cursor — "already open" hint pill carries the message
    // ("Already open · 3 editors") via the small badge in the search
    // bar; the bottom caption stays quiet so the eye can read the
    // hint-pill without two simultaneous prose updates.
    topIde.classList.remove('tinted');
    openHnt.textContent = '— Open in Cursor';
    setFocusedIde('cursor');
    setHint(HINT.alreadyOpen);
    await wait(1100); if(!alive()) return;

    // Tab cycle through the 3 open editors. ONE caption explains the
    // gesture; the visible top-IDE icon swap IS the per-step proof.
    // Captioning each individual editor swap (Cursor → VS Code →
    // IntelliJ → Cursor) read as a flicker the eye couldn't track.
    await setHint(HINT.tab);
    setCap('<kbd>⇥</kbd> picks the editor.');
    await wait(900);           if(!alive()) return;
    await tabSwap(EDITORS[1]); if(!alive()) return;
    await wait(800);           if(!alive()) return;
    await tabSwap(EDITORS[2]); if(!alive()) return;
    await wait(800);           if(!alive()) return;
    await tabSwap(EDITORS[0]); if(!alive()) return;
    await wait(700);           if(!alive()) return;

    // ↵ — focus the chosen window
    await setHint(HINT.enter);
    setCap('<kbd>↵</kbd> opens Cursor.');
    enterP.classList.add('shown');
    await wait(950); if(!alive()) return;

    chosen.classList.add('shown');
    palette.classList.add('dimmed');
    enterP.classList.remove('shown');
    hideHint();
    // No closing caption — the chosen window growing into focus is
    // the result; restating it as text would dilute the visual.
    // Stay in the focused state until the next activation re-runs.
  }

  // Trigger on initial intersection (page-load arrival) AND whenever
  // the hosting carousel panel becomes active again.
  let firstFireDone = false;
  function start(){ if(!firstFireDone){ firstFireDone = true; runDemo(); } }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ start(); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  io.observe(palette);

  const panel = palette.closest('.f-panel');
  if(panel){
    panel.addEventListener('panel:active', () => { runDemo(); });
  } else {
    start();
  }
})();

// ===== Actions stage: type "web" → ⌘K → map each action → yaml =====
// 4-beat loop on the actions panel (data-idx=2). Reuses the carousel-1
// search palette as the entry point: types "web" letter-by-letter so
// the palette filters down to web-app, presses ⌘K (popover slides in
// bottom-right while ~/.odak/config.yaml reveals behind it), then
// sequentially "maps" each action row to its corresponding entry in
// the file — both light up together so the viewer registers that
// action ↔ yaml entry are the same thing. Final beat dismisses the
// popover and lifts the file to centre-stage. One-shot per
// panel:active; runToken aborts a stale run on re-fire. Reduced
// motion lands directly on the morphed final frame.
(function(){
  const stage = document.getElementById('actions-stage');
  if(!stage) return;
  const palette = document.getElementById('ax-palette');
  const card    = document.getElementById('ax-card');
  const chord   = document.getElementById('ax-chord');
  const list    = document.getElementById('ax-list');
  const yamlF   = document.getElementById('ax-yaml-file');
  const yamlEl  = document.getElementById('ax-yaml-entries');
  const typed   = document.getElementById('ax-typed');
  const ghost   = document.getElementById('ax-ghost');
  const openHnt = document.getElementById('ax-open-hint');
  const topIde  = document.getElementById('ax-topide');
  const projects= document.getElementById('ax-projects');
  const cap     = document.getElementById('ax-cap');
  if(!palette || !card || !list || !yamlF || !yamlEl) return;
  if(!typed || !ghost || !projects) return;

  const QUERY = 'web';
  const projectItems = Array.from(projects.querySelectorAll('li'));
  const actionItems  = Array.from(list.querySelectorAll('li'));
  const yamlEntries  = Array.from(yamlEl.querySelectorAll('.ax-yaml-entry'));

  // One per action row. The mapping beat needs more than the action's
  // label — the viewer should learn what each action does, where it
  // lives in ~/.odak/config.yaml, and which dimension changes per
  // project (URL, env var, working directory). Keyed by data-key on
  // the popover row so the captions can't drift if rows reorder.
  const ACTION_CAPTIONS = {
    'open-github':   '<kbd>⌘</kbd><kbd>R</kbd> opens <span class="dim">github.com/acme/web-app</span>.',
    'open-staging':  '<kbd>⌘</kbd><kbd>S</kbd> opens <span class="dim">{STAGING_URL}</span> from <span class="dim">.odak</span>.',
    'tail-logs':     '<kbd>⌘</kbd><kbd>L</kbd> tails Kibana for <span class="dim">web-app</span>.',
    'terminal-here': '<kbd>⌘</kbd><kbd>↵</kbd> opens a shell <span class="dim">cd\'d</span> into the project.',
  };

  // Caption pill at the bottom of the actions panel. Same swap pattern
  // as the macbook frame's .mb-caption — brief dip-out before the new
  // copy lands so each beat reads as a deliberate change.
  let capTok = 0;
  function setCap(html){
    if(!cap) return;
    if(!html){ cap.classList.remove('shown'); return; }
    const tok = ++capTok;
    if(cap.classList.contains('shown') && cap.innerHTML !== html){
      cap.classList.add('swapping');
      setTimeout(() => {
        if(tok !== capTok) return;
        cap.innerHTML = html;
        cap.classList.remove('swapping');
        cap.classList.add('shown');
      }, 110);
      return;
    }
    cap.innerHTML = html;
    cap.classList.add('shown');
  }

  function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

  function filterProjects(q){
    projectItems.forEach(li => {
      const match = q.length === 0 || (li.dataset.keys || '').toLowerCase().includes(q.toLowerCase());
      li.setAttribute('data-filtered', match ? '0' : '1');
    });
    const visible = projectItems.filter(li => li.getAttribute('data-filtered') === '0');
    projectItems.forEach(li => li.classList.remove('on'));
    if(visible[0]) visible[0].classList.add('on');
  }
  function setGhost(q){
    const visible = projectItems.filter(li => li.getAttribute('data-filtered') === '0');
    if(!visible[0] || q.length === 0){ ghost.textContent = ''; openHnt.textContent = ''; return; }
    const keys = (visible[0].dataset.keys || '').split(' ');
    const full = keys[0] || '';
    ghost.textContent = full.toLowerCase().startsWith(q.toLowerCase()) ? full.slice(q.length) : '';
    openHnt.textContent = '— Open';
  }

  function resetState(){
    typed.textContent = '';
    ghost.textContent = '';
    openHnt.textContent = '';
    filterProjects('');
    if(topIde) topIde.classList.remove('tinted');
    actionItems.forEach((li, i) => {
      li.classList.toggle('on', i === 0);
      li.classList.remove('mapping');
    });
    yamlEntries.forEach(e => { e.classList.remove('lit'); e.classList.remove('mapping'); });
    if(chord) chord.classList.remove('shown');
    card.classList.remove('open');
    stage.classList.remove('popover-open','morphed');
  }

  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    filterProjects('');
    if(topIde) topIde.classList.remove('tinted');
    yamlEntries.forEach(e => e.classList.add('lit'));
    actionItems.forEach(li => li.classList.remove('on'));
    stage.classList.add('popover-open','morphed');
    setCap('Every action is one yaml entry.');
    return;
  }

  let runToken = 0;
  async function runDemo(){
    const myToken = ++runToken;
    const alive = () => myToken === runToken;

    resetState();
    // No "web-app selected." caption — the highlighted row in the
    // palette is the visual confirmation by itself.
    await wait(1100); if(!alive()) return;

    // Beat 2 — ⌘K chord flashes; the search/project rows fade out;
    // yaml file reveals; popover slides in bottom-right. ONE caption
    // here for the gesture; the "each row is one yaml entry" beat is
    // dropped because the yaml file lighting up alongside each row IS
    // that explanation, and the closing morphed-state caption ("Every
    // action is one yaml entry.") drives it home anyway.
    if(chord) chord.classList.add('shown');
    setCap('<kbd>⌘</kbd><kbd>K</kbd> opens project actions.');
    await wait(220); if(!alive()) return;
    stage.classList.add('popover-open');
    await wait(280); if(!alive()) return;
    card.classList.add('open');
    await wait(1500); if(!alive()) return;
    if(chord) chord.classList.remove('shown');
    await wait(900); if(!alive()) return;

    // Beat 3 — walk the bright blue selection down the action list,
    // pairing each row with its corresponding yaml entry AND swapping
    // the caption to whichever effect that action fires. Each row's
    // caption explains what the action *does* (open browser, tail
    // logs, cd into repo) so the viewer learns the action library
    // even when their cursor isn't over the screen. Moving .on
    // (instead of pinning it to row 0) reads as "the next action is
    // selected" — the same visual you'd see arrowing through the
    // real popover.
    //
    // Pulse pacing (slowed from 950+560 = 1510ms): 1300ms with the
    // mapping flash on, then 900ms rest with .lit holding. Total
    // 2200ms per row gives the eye time to read the action's caption
    // (sentence-length, includes a kbd chord + a description) before
    // the next pair takes over. Last pair gets a longer rest so the
    // morphed beat doesn't feel rushed.
    for(let i = 0; i < actionItems.length; i++){
      if(!alive()) return;
      const entry = yamlEntries[i];
      const row   = actionItems[i];
      const key   = row && row.dataset.key;
      actionItems.forEach((li, j) => li.classList.toggle('on', j === i));
      if(entry){
        entry.classList.add('mapping');
        entry.classList.add('lit');
      }
      if(key && ACTION_CAPTIONS[key]) setCap(ACTION_CAPTIONS[key]);
      await wait(1300);
      if(!alive()) return;
      if(entry) entry.classList.remove('mapping');
      await wait(i === actionItems.length - 1 ? 1500 : 900);
    }

    // Beat 4 — popover dismisses, yaml file lifts to centre stage.
    stage.classList.add('morphed');
    setCap('Every action is one yaml entry.');
    // Hold on the morphed state until the carousel advances and re-fires.
  }

  let firstFireDone = false;
  function start(){ if(!firstFireDone){ firstFireDone = true; runDemo(); } }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ start(); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  io.observe(stage);

  const panel = stage.closest('.f-panel');
  if(panel){
    panel.addEventListener('panel:active', () => { runDemo(); });
  }
})();

// ===== MacBook stage: full feature tour (chaos → search → ⇥ → ⌘K → GitHub) =====
//
// Story beats (≈12s cycle):
//   0. Chaos: 12 IDE windows scattered. Caption: "12 projects. Which one?"
//   1. ⌥ Space pressed — palette materializes, windows dim. Caption: "⌥ Space"
//   2. Type "web" — web-app row highlights (3 IDE icons). Caption: "Type a few letters"
//   3. Tab cycle — top IDE swaps Cursor → VS Code → IntelliJ → Cursor.
//      Caption: "⇥ Switch editor"
//   4. ↵ — matching chaos window grows into focus.
//   5. Palette returns, swaps to actions list (⌘K). Caption: "⌘ K — project actions"
//   6. Highlight "Open on GitHub" — browser mock pops in.
//      Caption: "↵ Open on GitHub"
//   7. Fade everything, loop.
(function(){
  const stage    = document.querySelector('.mb-stage');
  if(!stage) return;
  const typed    = document.getElementById('mb-typed');
  const ghost    = document.getElementById('mb-ghost');
  const openHnt  = document.getElementById('mb-open-hint');
  const topIde   = document.getElementById('mb-topide');
  const list     = document.getElementById('mb-list');
  const actionsP = document.getElementById('mb-actions-panel');
  const actionsL = document.getElementById('mb-actions-list');
  const wins     = document.getElementById('mb-windows');
  const wrap     = document.getElementById('mb-palette-wrap');
  const cap      = document.getElementById('mb-caption');
  const tcard    = document.getElementById('mb-titlecard');
  const tcEyebrow= tcard ? tcard.querySelector('.eyebrow') : null;
  const tcTitle  = tcard ? tcard.querySelector('.title')   : null;
  const tcSub    = tcard ? tcard.querySelector('.sub')     : null;
  const browser  = document.getElementById('mb-browser');
  const actionsFilterIn = document.getElementById('mb-actions-filter-input');
  const actionsTyped    = document.getElementById('mb-actions-typed');
  if(!typed || !list || !wins || !wrap) return;

  const items   = Array.from(list.querySelectorAll('li'));
  const actionItems = actionsL ? Array.from(actionsL.querySelectorAll('li')) : [];
  const QUERY = 'web';

  // Editors open on web-app — order matches the row's ide-stack.
  const EDITORS = [
    { key:'cursor',   src:'assets/ide/cursor.webp',   name:'Cursor'   },
    { key:'vscode',   src:'assets/ide/vscode.webp',   name:'VS Code'  },
    { key:'intellij', src:'assets/ide/intellij.webp', name:'IntelliJ' },
  ];

  function wait(ms){ return new Promise(r => setTimeout(r, ms)); }

  function filterList(q){
    items.forEach(li => {
      const match = q.length === 0 || (li.dataset.keys || '').toLowerCase().includes(q.toLowerCase());
      li.setAttribute('data-filtered', match ? '0' : '1');
    });
    const visible = items.filter(li => li.getAttribute('data-filtered') === '0');
    items.forEach(li => li.classList.remove('on'));
    if(visible[0]) visible[0].classList.add('on');
  }
  function setGhost(q){
    const visible = items.filter(li => li.getAttribute('data-filtered') === '0');
    if(!visible[0] || q.length === 0){ ghost.textContent = ''; openHnt.textContent=''; return; }
    const k = (visible[0].dataset.keys || '').split(' ');
    const full = k[0] || '';
    ghost.textContent = full.toLowerCase().startsWith(q.toLowerCase()) ? full.slice(q.length) : '';
    openHnt.textContent = '— Open';
  }

  // Presentation title card: full-screen overlay shown between chapters.
  // Replaces blank dead-air at chapter breaks with a serif title slide so
  // the cycle reads like a guided demo, not just a looping animation.
  function showTitleCard({ eyebrow = '', title = '', sub = '' } = {}){
    if(!tcard) return;
    if(tcEyebrow) tcEyebrow.textContent = eyebrow;
    if(tcTitle)   tcTitle.innerHTML     = title;
    if(tcSub)     tcSub.innerHTML       = sub;
    // Force a reflow so the entrance transition runs even on rapid
    // back-to-back show/hide (browsers otherwise collapse the change).
    void tcard.offsetWidth;
    tcard.classList.add('shown');
  }
  function hideTitleCard(){
    if(!tcard) return;
    tcard.classList.remove('shown');
  }

  // Caption track: short labels that swap per beat. Empty hides.
  // When the caption is already shown and we're swapping copy, briefly
  // dip the old text out before swapping so each beat reads as a
  // distinct change instead of an instant replace the eye misses.
  let capSwapTok = 0;
  function setCaption(html){
    if(!cap) return;
    if(!html){ cap.classList.remove('shown'); return; }
    const tok = ++capSwapTok;
    if(cap.classList.contains('shown') && cap.innerHTML !== html){
      cap.classList.add('swapping');
      setTimeout(() => {
        if(tok !== capSwapTok) return;
        cap.innerHTML = html;
        cap.classList.remove('swapping');
        cap.classList.add('shown');
      }, 140);
      return;
    }
    cap.innerHTML = html;
    cap.classList.add('shown');
  }

  // Tab swap: animate the top-IDE icon crossfade + ring the matching IDE
  // inside the active row's ide-stack.
  function setFocusedIde(key){
    const row = list.querySelector('li.on');
    if(!row) return;
    row.querySelectorAll('.ide-stack .ide').forEach(el => {
      el.classList.toggle('focused', el.dataset.ide === key);
    });
  }
  function clearFocusedIde(){
    list.querySelectorAll('.ide-stack .ide.focused').forEach(el => el.classList.remove('focused'));
  }
  async function tabSwap(editor){
    topIde.classList.add('switching');
    await wait(140);
    const img = topIde.querySelector('img');
    img.src = editor.src; img.alt = editor.name;
    openHnt.textContent = '— Open in ' + editor.name;
    setFocusedIde(editor.key);
    await wait(40);
    topIde.classList.remove('switching');
  }
  function resetTopIde(){
    const img = topIde.querySelector('img');
    img.src = EDITORS[0].src; img.alt = EDITORS[0].name;
    topIde.classList.add('tinted');
    clearFocusedIde();
  }

  // Open / close the actions panel as a second layer on top of the
  // search panel. The search panel stays visible underneath but dims and
  // pushes back so the actions popup reads as "on top". When actions
  // open we restore visibility on all project rows (web-app stays
  // selected) so the user sees ≥5 projects behind the popover, matching
  // the real Odak ActionsPanelView where the project list is fully
  // visible behind the contextual menu.
  function openActions(){
    if(!actionsP) return;
    actionItems.forEach((li, i) => {
      li.classList.toggle('on', i === 0);
      li.setAttribute('data-filtered', '0');
    });
    items.forEach(li => li.setAttribute('data-filtered', '0'));
    resetActionsFilter();
    wrap.classList.add('actions-open');
    actionsP.classList.add('shown');
    actionsP.setAttribute('aria-hidden', 'false');
  }
  function closeActions(){
    if(!actionsP) return;
    wrap.classList.remove('actions-open');
    actionsP.classList.remove('shown');
    actionsP.setAttribute('aria-hidden', 'true');
  }

  // Reset the actions filter back to its empty placeholder state.
  // Called from openActions so a re-open never shows leftover typing
  // or hidden rows from a prior cycle.
  function resetActionsFilter(){
    if(actionsTyped) actionsTyped.textContent = '';
    if(actionsFilterIn) actionsFilterIn.classList.remove('typing');
    actionItems.forEach(li => li.setAttribute('data-filtered', '0'));
  }

  // Sync the browser-mock URL to the currently-selected project row so
  // "Open on GitHub" doesn't lie when Act 2 navigates off web-app.
  function syncBrowserUrl(){
    if(!browser) return;
    const sel = list.querySelector('li.on');
    const key = sel ? (sel.dataset.keys || '').split(' ')[0] : 'web-app';
    const url = browser.querySelector('.url');
    if(url) url.textContent = `github.com/acme/${key}`;
  }

  // Pop the matching chaos window out of the blur — visual confirmation
  // that "search → open" lands on a real window.
  const winEls = Array.from(wins.querySelectorAll('.mb-window'));

  function focusWindow(key){
    if(!key) return;
    const target = winEls.find(w => w.dataset.project === key);
    winEls.forEach(w => { if(w !== target){ w.classList.remove('focused'); w.style.removeProperty('--cx'); w.style.removeProperty('--cy'); w.style.removeProperty('--focus-scale'); } });
    if(!target) return;
    const winsRect = wins.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const dx = (winsRect.left + winsRect.width / 2) - (tRect.left + tRect.width / 2);
    const dy = (winsRect.top + winsRect.height / 2) - (tRect.top + tRect.height / 2);
    const scale = Math.min(3.6, (winsRect.height * 0.72) / Math.max(tRect.height, 1));
    target.style.setProperty('--cx', `${dx.toFixed(1)}px`);
    target.style.setProperty('--cy', `${dy.toFixed(1)}px`);
    target.style.setProperty('--focus-scale', scale.toFixed(2));
    target.classList.add('focused');
  }
  function clearFocus(){
    winEls.forEach(w => {
      w.classList.remove('focused');
      w.style.removeProperty('--cx');
      w.style.removeProperty('--cy');
      w.style.removeProperty('--focus-scale');
    });
  }
  function topVisibleKey(){
    const visible = items.filter(li => li.getAttribute('data-filtered') === '0');
    return visible[0] ? (visible[0].dataset.keys || '').split(' ')[0] : '';
  }

  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    // Static end-state for reduced-motion users — land on the actions
    // beat with the browser mock visible (most informative single frame).
    // Title card stays hidden so the product is what's on screen.
    wins.classList.add('shown', 'dimmed');
    wrap.classList.add('shown');
    typed.textContent = 'web-app';
    filterList(QUERY);
    openActions();
    if(browser) browser.classList.add('shown');
    setCaption('<kbd>↵</kbd> opens on GitHub.');
    hideTitleCard();
    return;
  }

  // Title-card timing: card hold + fade so the eye registers the slide
  // without the loop dragging. The Apple-style entrance is slower
  // (~700–800ms transitions), so the hold lengthens to match.
  const TC_HOLD = 2900;
  const TC_FADE = 700;

  async function loop(){
    while(true){
      // ----- Reset: hide everything before the opening title card -----
      wins.classList.remove('shown', 'dimmed');
      wrap.classList.remove('shown', 'receded');
      typed.textContent = ''; ghost.textContent = ''; openHnt.textContent = '';
      resetTopIde();
      filterList('');
      items.forEach(li => li.classList.remove('on'));
      if(items[0]) items[0].classList.add('on');
      closeActions();
      clearFocus();
      if(browser) browser.classList.remove('shown');
      setCaption('');
      hideTitleCard();
      await wait(280);

      // =========================================================
      // ACT 1 — Search
      // =========================================================
      showTitleCard({
        eyebrow: 'Act 1 — Search',
        title: 'Any project. <em>Instantly.</em>',
        sub: '<kbd>⌥</kbd><kbd>Space</kbd> <span class="dot"></span> Type three letters <span class="dot"></span> <kbd>↵</kbd>'
      });
      await wait(TC_HOLD);
      hideTitleCard();
      await wait(TC_FADE);

      // ----- Beat 1: chaos reveal -----
      // No caption — the wall of scattered IDE windows is the question
      // ("which one?") all by itself. A pill underneath would just
      // restate what the eye already sees.
      wins.classList.add('shown');
      await wait(1600);

      // ----- Beat 2: palette opens (⌥ Space) -----
      // First explanatory caption — viewers need to know the gesture
      // since the chord isn't visualized in the chrome.
      wins.classList.add('dimmed');
      wrap.classList.add('shown');
      setCaption('<kbd>⌥</kbd><kbd>Space</kbd> opens Odak.');
      await wait(1700);

      // ----- Beat 3: type "we" -----
      // Caption renders before the typing starts so the viewer reads
      // it WHILE the keys appear. Slower per-key cadence (200ms) makes
      // the typing itself easier to follow as well.
      setCaption('Type three letters.');
      for(let i = 1; i <= QUERY.length; i++){
        const q = QUERY.slice(0, i);
        typed.textContent = q;
        filterList(q);
        setGhost(q);
        await wait(200 + Math.random() * 70);
      }
      await wait(1300);

      // ----- Beat 4: settle, signal already-open Cursor -----
      // No caption — the row's three IDE icons (Cursor, VS Code,
      // IntelliJ) and the un-tinted top icon already say "already
      // open in three editors". Hold briefly so the viewer can land
      // on that visual before ⇥ starts cycling.
      topIde.classList.remove('tinted');
      openHnt.textContent = '— Open in Cursor';
      setFocusedIde('cursor');
      await wait(900);

      // ----- Beat 5: Tab cycles through the 3 editors open on web-app -----
      // ONE caption for the whole cycle — the visible IDE icon swapping
      // in the top-right of the search bar IS the demonstration of ⇥;
      // captioning each individual swap (Cursor → VS Code → IntelliJ →
      // Cursor) only adds a flicker the eye has to chase.
      setCaption('<kbd>⇥</kbd> picks the editor.');
      await wait(1000);
      await tabSwap(EDITORS[1]);  // VS Code
      await wait(900);
      await tabSwap(EDITORS[2]);  // IntelliJ
      await wait(900);
      await tabSwap(EDITORS[0]);  // back to Cursor
      await wait(700);

      // ----- Beat 6: ↵ → matching window grows into focus -----
      setCaption('<kbd>↵</kbd> opens Cursor.');
      await wait(520);
      focusWindow(topVisibleKey());
      wrap.classList.add('receded');
      await wait(2100);

      // =========================================================
      // ACT 2 — Actions
      // No search this time: the palette is back to its full project
      // list, the user just arrows down a few rows to land on a
      // different project, then ⌘K opens the actions popover scoped
      // to that selection. The card's blur backdrop covers the
      // cleanup so the transition reads clean.
      // =========================================================
      setCaption('');
      showTitleCard({
        eyebrow: 'Act 2 — Actions',
        title: 'Any action. <em>Per project.</em>',
        sub: '<kbd>⌘</kbd><kbd>K</kbd> <span class="dot"></span> Pick the action <span class="dot"></span> <kbd>↵</kbd>'
      });
      // Cleanup behind the card: full project list visible, top row
      // selected, search bar empty, top-IDE back to its tinted resting
      // state so the chrome doesn't flash a stale Cursor highlight.
      await wait(420);
      clearFocus();
      wrap.classList.remove('receded');
      typed.textContent = ''; ghost.textContent = ''; openHnt.textContent = '';
      resetTopIde();
      filterList('');
      items.forEach(li => li.classList.remove('on'));
      if(items[0]) items[0].classList.add('on');
      await wait(TC_HOLD - 420);
      hideTitleCard();
      await wait(TC_FADE);

      // ----- Beat 6: ↓ navigate — selection walks down a few rows so
      //  the user sees keyboard nav without typing. Lands on the
      //  3rd row (index 2 = react-dashboard) for the actions context.
      // No caption — the highlight visibly walking is itself the
      // explanation. A "↓ picks the project" pill restates the visual.
      await wait(620);
      const NAV_TARGET = Math.min(2, items.length - 1);
      for(let s = 1; s <= NAV_TARGET; s++){
        items.forEach(li => li.classList.remove('on'));
        items[s].classList.add('on');
        await wait(460);
      }
      await wait(900);

      // ----- Beat 7: ⌘K — actions popover opens scoped to the row the
      //  user just arrowed onto. "Open on GitHub" is already selected. -----
      // ONE caption for ⌘K — the popover that drops in already shows
      // the action library (GitHub / logs / terminal), so a follow-up
      // line listing those actions would just label what's on screen.
      openActions();
      setCaption('<kbd>⌘</kbd><kbd>K</kbd> opens project actions.');
      await wait(2400);

      // ----- Beat 8: caption swap, hint at the action ↵ fires -----
      setCaption('<kbd>↵</kbd> opens on GitHub.');
      await wait(1700);

      // ----- Beat 9: actions close, browser mock pops up — sync the
      //  URL to whichever project is currently selected so the mock
      //  doesn't lie about where the action went.
      // No caption — the browser mock IS the proof; clearing the
      // caption keeps the eye on the URL bar instead of new copy. -----
      syncBrowserUrl();
      closeActions();
      if(browser) browser.classList.add('shown');
      setCaption('');
      await wait(2400);

      // ----- Outro: fade everything, loop back to the Act-1 card -----
      if(browser) browser.classList.remove('shown');
      wrap.classList.remove('shown');
      wins.classList.remove('dimmed');
      setCaption('');
      await wait(800);
    }
  }

  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting && !started){
        started = true;
        loop();
        io.unobserve(stage);
      }
    });
  }, { threshold: 0.2 });
  io.observe(stage);
})();

// ===== Feature 2 (⌥Tab) switcher: selection cycles between rows =====
(function(){
  const demo = document.querySelector('.tab-demo');
  if(!demo) return;
  const rows = Array.from(demo.querySelectorAll('.win'));
  if(rows.length < 2) return;
  const cap  = document.getElementById('tab-cap');

  // ONE static caption for the whole panel — every row already shows
  // project + IDE icon + ⌥1–9 hint, so swapping the pill on each
  // selection just labelled what was already on screen. The pill
  // sticks to the gesture itself ("⌥⇥ walks every editor window")
  // because the chord is the only piece NOT visualized in the chrome.
  function showCap(html){
    if(!cap) return;
    cap.innerHTML = html;
    cap.classList.add('shown');
  }

  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    showCap('<kbd>⌥</kbd><kbd>⇥</kbd> walks every editor window.');
    return;
  }

  function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
  function setSelected(idx){
    rows.forEach(r => r.classList.remove('on'));
    rows[idx].classList.add('on');
  }

  async function loop(){
    showCap('<kbd>⌥</kbd><kbd>⇥</kbd> walks every editor window.');
    let i = 0;
    const max = Math.min(rows.length, 5);
    while(true){
      setSelected(i);
      i = (i + 1) % max;
      await wait(1700);
    }
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ loop(); io.unobserve(demo); } });
  }, { threshold: 0.3 });
  io.observe(demo);
})();

// ===== Notch panel: re-fire keyframes on panel:active =====
// CSS animations don't replay just because a parent class flips, and the
// notch demo needs every layer (cursor, popover, growing notch, IDE icon
// hovers) to restart from 0% so the choreography stays in sync every
// time the carousel returns to this panel. The caption pill below the
// notch is also driven from here — JS schedules its swaps against the
// same 13s cycle the cursor keyframes use, so the copy lines up with
// "approach", "drop", "hover-A", "hover-B", "hover-C", "drift away".
(function(){
  const panel = document.getElementById('f-panel-notch');
  if(!panel) return;
  const targets = panel.querySelectorAll(
    '.ns-cursor, .ns-popover, .ns-bezel, .ns-shoulder, .np-ide'
  );
  if(!targets.length) return;
  const cap = document.getElementById('notch-cap');

  // ONE caption that holds for the whole 13s cycle. Every other beat
  // (cursor climbing, popover dropping, the three IDE-icon hovers) is
  // narrated by the visible motion itself; an extra pill restating
  // each phase ("Cursor drifts up", "Recents drop", "Hover Odak", …)
  // turned the bottom row into a typewriter the eye had to chase.
  // The single line names the GESTURE — the only thing the chrome
  // doesn't visualize — so the viewer can read it once and keep
  // their attention up on the notch where the action happens.
  const NOTCH_BEATS = [
    { at: 2400, html: 'Hover the notch — recents + per-project actions.' },
  ];
  let capTimers = [];
  function clearCapTimers(){
    capTimers.forEach(t => clearTimeout(t));
    capTimers = [];
  }
  function applyCap(html){
    if(!cap) return;
    if(cap.classList.contains('shown') && cap.innerHTML !== html){
      cap.classList.add('swapping');
      setTimeout(() => {
        cap.innerHTML = html;
        cap.classList.remove('swapping');
        cap.classList.add('shown');
      }, 110);
      return;
    }
    cap.innerHTML = html;
    cap.classList.add('shown');
  }
  function scheduleCaps(){
    if(!cap) return;
    clearCapTimers();
    NOTCH_BEATS.forEach(b => {
      capTimers.push(setTimeout(() => applyCap(b.html), b.at));
    });
    // Loop the schedule alongside the 13s CSS animation cycle so the
    // captions keep narrating after the first run without relying on
    // panel:active alone (which only fires on tab-switch, not loops).
    capTimers.push(setTimeout(scheduleCaps, 13000));
  }

  // Reduced-motion: animations are stopped at the "popover open" frame,
  // so park the caption on a static label that matches what the user
  // is looking at instead of cycling through copy that doesn't match.
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    if(cap){ cap.innerHTML = 'Hover the notch — recents and actions.'; cap.classList.add('shown'); }
  } else if(cap){
    // Pre-populate first beat so the panel doesn't show an empty
    // pill on initial paint before the first scheduled timer fires.
    cap.innerHTML = NOTCH_BEATS[0].html;
    cap.classList.add('shown');
  }

  panel.addEventListener('panel:active', () => {
    targets.forEach(el => {
      el.style.animation = 'none';
      // Force reflow so re-applying the animation registers as new.
      void el.offsetWidth;
      el.style.animation = '';
    });
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    scheduleCaps();
  });

  // Kick off the schedule once the panel is initially visible — a
  // panel that starts active (e.g. linked-to from elsewhere) wouldn't
  // get panel:active otherwise, and the captions would never run.
  if(panel.classList.contains('active') &&
     !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)){
    scheduleCaps();
  }
})();

/* ============================================================
   FEATURE CAROUSEL — auto-advancing tabs over the feature panels.
   Auto-advances continuously while in view; hover does NOT pause.
   The first user click (or arrow-key) on any tab is treated as
   engagement and permanently stops auto-advance for the session.
   Disabled on mobile (CSS hides the tabs) and when
   prefers-reduced-motion is set.
   ============================================================ */
(function(){
  const carousel = document.querySelector('.f-carousel');
  if(!carousel) return;
  const tabs = Array.from(carousel.querySelectorAll('.f-tab'));
  const panels = Array.from(carousel.querySelectorAll('.f-panel'));
  if(tabs.length === 0 || tabs.length !== panels.length) return;

  const ADVANCE_MS = parseInt(carousel.dataset.advanceMs, 10) || 7000;
  carousel.style.setProperty('--f-advance', `${ADVANCE_MS}ms`);

  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentIdx = 0;
  let timer = null;
  let inView = false;
  let userStopped = false;

  function activate(idx){
    currentIdx = idx;
    tabs.forEach((t, i) => {
      const active = i === idx;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach((p, i) => {
      const active = i === idx;
      p.classList.toggle('active', active);
      p.setAttribute('aria-hidden', active ? 'false' : 'true');
      if(active) p.dispatchEvent(new CustomEvent('panel:active'));
    });
    // Restart the bar fill cleanly so it always starts at 0% — CSS
    // animations don't always replay just from a class swap when the
    // same property values are reapplied.
    const bar = tabs[idx] && tabs[idx].querySelector('.bar');
    if(bar){
      bar.style.animation = 'none';
      // Force reflow so the next assignment is treated as a new animation.
      void bar.offsetWidth;
      bar.style.animation = '';
    }
  }
  // Mark the carousel as having completed one full cycle the first time
   // we wrap back to the start. CSS uses this (.f-carousel[data-cycled])
   // to fade out the per-tab progress bar — the user has seen all four
   // panels, so the "still cycling" signal becomes visual noise.
  function next(){
    const nextIdx = (currentIdx + 1) % tabs.length;
    if(nextIdx === 0 && !carousel.dataset.cycled){
      carousel.dataset.cycled = '1';
    }
    activate(nextIdx);
  }

  function clearTimer(){
    if(timer){ clearInterval(timer); timer = null; }
  }
  // Sync timer + .running class with the latest state. Going off-screen,
  // hitting reduced-motion, or the user engaging via click/arrow-key
  // drops .running entirely (the bar stops with it).
  function sync(){
    if(reducedMotion || !inView || userStopped){
      clearTimer();
      carousel.classList.remove('running');
      return;
    }
    carousel.classList.add('running');
    if(!timer){
      timer = setInterval(next, ADVANCE_MS);
    }
  }
  // First user interaction stops auto-advance for the rest of the
  // session — they're driving now.
  function stop(){
    userStopped = true;
    sync();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      activate(i);
      stop();
    });
    tab.addEventListener('keydown', (e) => {
      // Arrow-key navigation between tabs, per WAI-ARIA tablist pattern.
      if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = (i + dir + tabs.length) % tabs.length;
        tabs[nextIdx].focus();
        activate(nextIdx);
        stop();
      }
    });
  });

  if('IntersectionObserver' in window){
    new IntersectionObserver((entries) => {
      entries.forEach(e => { inView = e.isIntersecting; sync(); });
    }, { threshold: 0.3 }).observe(carousel);
  } else {
    inView = true;
    sync();
  }
})();
