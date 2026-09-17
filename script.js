// ════════════════════════════════════════════════════════════════
//  HOMEPAGE LOGIC
//  Project data: projects-data.js (shared with project.html)
//  Skills: here (homepage-only).
//  Each skill: { name, icon, pct, detail, projects }
//    projects : optional array of project IDs (from projects-data.js) where
//               you used this skill. They render as clickable chips inside
//               the hover panel. Unknown IDs are silently skipped, so you can
//               add them before the project itself exists.
// ════════════════════════════════════════════════════════════════
const SKILLS = {
  'Languages': [
    { name: 'C#',         icon: 'devicon-csharp-plain',     pct: 95, detail: 'My main language for game programming. Years of Unity work and coursework at Saxion — comfortable with clean architecture and maintainable gameplay systems.', projects: ['castle-siege', 'the-scorch', 'jiefs-diner', 'hex-maze', 'procedural-spider'] },
    { name: 'C++',        icon: 'devicon-cplusplus-plain',  pct: 80, detail: 'Used for Unreal Engine and lower-level work. Strong on memory management and performance.', projects: ['the-hunt', 'the-hunt-map', 'opengl-renderer'] },
    { name: 'Python',     icon: 'devicon-python-plain',     pct: 65, detail: 'Tooling, scripting, and quick prototypes.', projects: [] },
    { name: 'JavaScript', icon: 'devicon-javascript-plain', pct: 65, detail: 'Web projects like this portfolio — comfortable with the fundamentals and DOM work.', projects: [] },
    { name: 'Lua',        icon: 'devicon-lua-plain',        pct: 40, detail: 'Scripting in a few engines and game mods.', projects: [] }
  ],
  'Engines & Tools': [
    { name: 'Unity',   icon: 'devicon-unity-plain',           pct: 95, detail: 'My primary engine. Confident across the editor, C# scripting, physics, UI, and the asset pipeline.', projects: ['castle-siege', 'the-scorch', 'jiefs-diner', 'hex-maze', 'procedural-spider'] },
    { name: 'Unreal',  icon: 'devicon-unrealengine-original', pct: 65, detail: 'Built a full vertical slice in UE5 — GAS combat, StateTree AI, and procedural generation in C++ and Blueprints.', projects: ['the-hunt', 'the-hunt-map'] },
    { name: '.NET',    icon: 'devicon-dotnetcore-plain',      pct: 80, detail: 'The framework behind my C# work.', projects: ['castle-siege', 'the-scorch', 'jiefs-diner'] },
    // two icons on one row — `icons` takes an array, `icon` still works for single
    { name: 'Visual Studio & VS Code', icon: 'devicon-visualstudio-plain', pct: 95, detail: 'My daily editors — Visual Studio for C++ and C# engine work, VS Code for everything else. Debugging, extensions, the whole workflow.', projects: ['the-hunt', 'castle-siege', 'the-scorch', 'jiefs-diner', 'opengl-renderer'] }
  ],
  'Version Control': [
    { name: 'Git',    icon: 'devicon-git-plain',      pct: 80, detail: 'Daily across solo and team projects — branching, merging, clean history.', projects: ['the-hunt', 'the-scorch', 'castle-siege', 'jiefs-diner'] },
    { name: 'GitHub', icon: 'devicon-github-original', pct: 80, detail: 'Where I host and collaborate — PRs, issues, project boards.', projects: ['the-hunt', 'the-scorch', 'castle-siege', 'jiefs-diner', 'hex-maze'] },
    { name: 'GitLab', icon: 'devicon-gitlab-plain',    pct: 65, detail: 'Team settings including CI/CD pipelines.', projects: [] }
  ],
  'Learning': [
    { name: 'Unreal Engine 5', icon: 'devicon-unrealengine-original', pct: 65, detail: 'Actively deepening this one — I have a project running in UE5 and I keep pushing further into the engine\u2019s systems rather than treating it as finished.', projects: ['the-hunt', 'the-hunt-map'] },
    // no devicon for VR, so this row uses an inline SVG instead of an icon font
    { name: 'VR Development', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-3.2a2 2 0 0 1-1.6-.8l-1-1.3a1.5 1.5 0 0 0-2.4 0l-1 1.3a2 2 0 0 1-1.6.8H4.5a2 2 0 0 1-2-2z"/></svg>', pct: 20, detail: 'Just starting out. Learning how VR actually works under the hood and building toward hand tracking.', projects: [] }
  ]
};

// ════════════════════════════════════════════════════════════════
//  "RIGHT NOW" CARDS  —  rendered into #nowList on the homepage
//  tag   : short pill label
//  title : what it is
//  text  : one or two lines
//  link  : optional { href, label }
// ════════════════════════════════════════════════════════════════
const NOW = [
  {
    tag: 'Ongoing',
    title: 'The Hunt, past the vertical slice',
    text: 'The minor is handed in, but the project isn\u2019t done. I\u2019m clearing the bugs that only surfaced in the packaged build and finishing the systems I had to set aside for time.',
    link: { href: 'project.html?id=the-hunt', label: 'See the project' }
  },
  {
    tag: 'Learning',
    title: 'VR development',
    text: 'Starting from the ground up \u2014 how VR actually works under the hood, and building toward hand tracking as the first real milestone.'
  },
  {
    tag: 'Currently in progress',
    title: 'Castle Siege',
    text: 'The core tower-defense loop is still being tightened: placement validation, wave pacing, enemy pressure, and the shared economy/status systems are the main focus right now.',
    link: { href: 'project.html?id=castle-siege', label: 'See the project' }
  }
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Skills: tabs + proficiency-bar list with hover detail ──────
// Resolve a skill's project IDs into clickable chips linking to the detail page.
// IDs that don't exist in PROJECTS are skipped, so you can list them early.
function skillProjectLinks(ids) {
  if (!ids || !ids.length || typeof PROJECTS === 'undefined') return '';
  const links = ids
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => `<a class="skill-proj-link" href="project.html?id=${encodeURIComponent(p.id)}">${p.title} \u2197</a>`)
    .join('');
  if (!links) return '';
  return `<div class="skill-projects">
            <span class="skill-projects-label">Used in</span>${links}
          </div>`;
}

function buildSkills() {
  const tabsEl = document.getElementById('skillTabs');
  const gridEl = document.getElementById('skillGrid');
  if (!tabsEl || !gridEl) return;

  const categories = Object.keys(SKILLS);

  const animateBars = () => {
    const bars = gridEl.querySelectorAll('.skill-bar-fill');
    // start at 0, then grow to target on the next frames (animated fill)
    bars.forEach((bar) => { bar.style.width = '0%'; });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bars.forEach((bar) => { bar.style.width = (bar.dataset.pct || '0') + '%'; });
      });
    });
  };

  // Render a category. `animate` plays the fade-out first so switching
  // tabs cross-fades instead of snapping.
  // The detail panel sits BESIDE the list, not over or under it, so it can
  // never cover the row you're about to hover. Both live in a wrapper, and
  // the panel only hides once the cursor leaves the wrapper entirely —
  // that way you can move onto the panel to click a project chip.
  const wrap = document.createElement('div');
  wrap.className = 'skill-layout';
  gridEl.parentNode.insertBefore(wrap, gridEl);
  wrap.appendChild(gridEl);

  const panel = document.createElement('div');
  panel.className = 'skill-panel';
  panel.innerHTML = '<div class="skill-panel-inner"></div>';
  wrap.appendChild(panel);
  const panelInner = panel.querySelector('.skill-panel-inner');

  const hideDetail = () => panel.classList.remove('show');
  wrap.addEventListener('mouseleave', hideDetail);

  // Point the panel's arrow at the row being hovered. Measured at hover time
  // because the panel is sticky — its box moves independently of the list.
  const aimArrow = (row) => {
    if (!row) return;
    const r = row.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const y = (r.top + r.height / 2) - p.top;
    // keep the arrow inside the panel's edges so it never floats off a corner
    const clamped = Math.max(18, Math.min(p.height - 18, y));
    panel.style.setProperty('--arrow-y', clamped + 'px');
  };

  const showDetail = (s, row) => {
    panel.classList.add('show');
    aimArrow(row);
    const links = skillProjectLinks(s.projects);
    panelInner.innerHTML = `
      <span class="skill-panel-name">${s.name}</span>
      <p class="skill-panel-text">${s.detail || ''}</p>
      ${links}`;
    panelInner.classList.remove('swap');
    void panelInner.offsetWidth;            // restart the fade
    panelInner.classList.add('swap');
  };

  const iconHtml = (s) => {
    if (s.svg) return `<i class="skill-icon skill-icon-svg" aria-hidden="true">${s.svg}</i>`;
    const list = s.icons || [s.icon];
    return `<i class="skill-icon${list.length > 1 ? ' skill-icon-multi' : ''}" aria-hidden="true">` +
      list.map((c) => `<i class="${c}"></i>`).join('') + '</i>';
  };

  const markup = (category) => SKILLS[category].map((s, i) => {
      const pct = Math.max(0, Math.min(100, s.pct || 0));
      const flag = (s.projects && s.projects.length) ? '<span class="skill-link-flag" aria-hidden="true">\u2197</span>' : '';
      return `
        <div class="skill-row" style="--i:${i}" data-idx="${i}">
          <div class="skill-top">
            ${iconHtml(s)}
            <span class="skill-name">${s.name}</span>${flag}
            <span class="skill-bar"><span class="skill-bar-fill" style="width:${pct}%" data-pct="${pct}"></span></span>
            <span class="skill-pct">${pct}%</span>
          </div>
          <div class="skill-inline">
            <p class="skill-inline-text">${s.detail || ''}</p>
            ${skillProjectLinks(s.projects)}
          </div>
        </div>`;
    }).join('');

  let currentCat = null;

  const render = (category) => {
    currentCat = category;
    const set = SKILLS[category];
    gridEl.innerHTML = markup(category);
    gridEl.querySelectorAll('.skill-row').forEach((row) => {
      const s = set[Number(row.dataset.idx)];
      row.addEventListener('mouseenter', () => showDetail(s, row));
    });
    hideDetail();
    gridEl.classList.remove('is-leaving');
    animateBars();
  };

  // Categories hold different numbers of skills, so switching tabs used to
  // grow and shrink the section and shove the rest of the page around.
  // Measure the tallest category once, then pin the list — and the panel
  // beside it — to that height so the section never changes size.
  const sizeLayout = () => {
    const keep = gridEl.innerHTML;
    gridEl.style.minHeight = '';
    let max = 0;
    categories.forEach((cat) => {
      gridEl.innerHTML = markup(cat);
      max = Math.max(max, gridEl.offsetHeight);
    });
    gridEl.innerHTML = keep;
    // a zero reading means layout isn't ready (webfonts still loading, or
    // the section is off-screen) — pinning to 0 would clip the panel
    if (max > 0) {
      gridEl.style.minHeight = max + 'px';
      panel.style.height = max + 'px';
    }
  };

  let sizeTimer;
  const resize = () => {
    clearTimeout(sizeTimer);
    sizeTimer = setTimeout(() => { sizeLayout(); render(currentCat); }, 150);
  };
  window.addEventListener('resize', resize, { passive: true });
  // re-measure once webfonts have landed, since they change row heights
  window.addEventListener('load', resize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);

  // fade the old list out, swap, fade the new one in (rows stagger via CSS).
  // The pending timer is always cleared first — without that, clicking a tab
  // mid-fade rendered the new category and then got overwritten by the
  // previous one when the old timer fired.
  let switchTimer;
  const switchTo = (category) => {
    clearTimeout(switchTimer);
    if (prefersReducedMotion) { render(category); return; }
    gridEl.classList.add('is-leaving');
    switchTimer = setTimeout(() => render(category), 170);
  };

  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (i === 0 ? ' active' : '');
    btn.textContent = cat;
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      tabsEl.querySelectorAll('.tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      switchTo(cat);
    });
    tabsEl.appendChild(btn);
  });
  sizeLayout();
  render(categories[0]);
}

// ── Projects: homepage zigzag ──────────────────────────────────
function buildPreviewMedia(media) {
  if (!media) return '<div class="proj-placeholder">▣ PREVIEW</div>';
  if (media.type === 'image') return `<img src="${media.src}" alt="" class="proj-img" onerror="this.parentElement.innerHTML='<div class=\\'proj-placeholder\\'>▣ PREVIEW</div>'">`;
  if (media.type === 'video') return `<video class="proj-video" controls ${media.poster ? `poster="${media.poster}"` : ''}><source src="${media.src}" type="video/mp4"></video>`;
  return '<div class="proj-placeholder">▣ PREVIEW</div>';
}

function buildProjects() {
  const list = document.getElementById('projectList');
  if (!list || typeof PROJECTS === 'undefined') return;

  // Two flags keep entries out of this list:
  //   hidden: true    → a deep dive into one system, linked from its parent
  //   scale: 'small'  → smaller work, rendered as a compact card below
  // Both also stay out of the 01/02/03 numbering.
  PROJECTS.filter((p) => !p.hidden && p.scale !== 'small').forEach((p, i) => {
    const row = document.createElement('article');
    row.className = 'project-row' + (i % 2 ? ' reversed' : '');
    const status = p.status ? `<span class="project-status">${p.status}</span>` : '';

    const links = [
      `<a href="project.html?id=${encodeURIComponent(p.id)}" class="btn btn-primary">Read more →</a>`,
      p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="devicon-github-original"></i> GitHub</a>` : '',
      p.download ? `<a href="${p.download}" class="btn btn-ghost" download>↓ Build</a>` : ''
    ].join('');

    // Deep-dive child pages, reachable straight from the homepage rather
    // than only from inside the parent write-up.
    const subs = (p.subpages || [])
      .map((id) => PROJECTS.find((x) => x.id === id))
      .filter(Boolean);
    const subLinks = subs.length ? `
      <div class="project-subs">
        <span class="skills-label">Deep dive${subs.length > 1 ? 's' : ''}</span>
        ${subs.map((s) => `<a class="sub-link" href="project.html?id=${encodeURIComponent(s.id)}">
          <span class="sub-link-title">${s.title}</span>
          <span class="sub-link-arrow" aria-hidden="true">→</span>
        </a>`).join('')}
      </div>` : '';

    row.innerHTML = `
      <div class="project-media">${buildPreviewMedia(p.media)}</div>
      <div class="project-info">
        <div class="project-head">
          <span class="project-num">0${i + 1}</span>
          ${status}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.short}</p>
        <div class="project-skills">
          <span class="skills-label">Skills used &amp; acquired</span>
          <div class="skill-pills">${p.skills.map((s) => `<span class="pill">${s}</span>`).join('')}</div>
        </div>
        ${subLinks}
        <div class="cta-row">${links}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

// ── Smaller projects ───────────────────────────────────────────
//  A compact grid for work that is worth showing but does not carry a
//  full write-up. Flag an entry with `scale: 'small'` and it lands here
//  instead of in the main list; delete the flag to promote it back.
//  Each card carries a thumbnail and opens its own detail page, same as
//  the big rows — the page is just shorter.
//
//  Two kinds of entry land here:
//    scale: 'small'            → work that never had a full write-up
//    hidden: true + parent     → a deep dive into one system of a big
//                                project, which otherwise is only
//                                reachable from that project's own page
function buildSmallProjects() {
  const list = document.getElementById('smallList');
  const head = document.getElementById('smallHead');
  if (!list || typeof PROJECTS === 'undefined') return;

  const small = PROJECTS.filter((p) => p.scale === 'small' || (p.hidden && p.parent));
  if (!small.length) {
    if (head) head.style.display = 'none';
    list.style.display = 'none';
    return;
  }

  const titleOf = (id) => {
    const parent = PROJECTS.find((x) => x.id === id);
    return parent ? parent.title : '';
  };

  list.innerHTML = small.map((p) => {
    // on a deep dive, which project it belongs to is worth more than the year
    const parentName = p.parent ? titleOf(p.parent) : '';
    const year = parentName
      ? `<span class="small-card-tag">${parentName}</span>`
      : ((p.meta && p.meta.Year) ? `<span class="small-card-year">${p.meta.Year}</span>` : '');
    const pills = (p.skills || []).slice(0, 3)
      .map((s) => `<span class="pill pill-sm">${s}</span>`).join('');

    // a still thumbnail either way — a <video> in a card is a click target
    // fighting the card's own link
    const src = p.media ? (p.media.poster || (p.media.type === 'image' ? p.media.src : '')) : '';
    const thumb = src
      ? `<img src="${src}" alt="" class="small-card-img" loading="lazy"
             onerror="this.parentElement.classList.add('is-empty'); this.remove();">`
      : '';

    return `<a class="small-card reveal-up" href="project.html?id=${encodeURIComponent(p.id)}">
      <div class="small-card-media${src ? '' : ' is-empty'}">${thumb}</div>
      <div class="small-card-body">
        <div class="small-card-head">
          <h4 class="small-card-title">${p.title}</h4>
          ${year}
        </div>
        <p class="small-card-desc">${p.short || ''}</p>
        <div class="skill-pills">${pills}</div>
        <span class="small-card-cta">Read more <span aria-hidden="true">→</span></span>
      </div>
    </a>`;
  }).join('');
}

// ── "Right now" cards ──────────────────────────────────────────
function buildNow() {
  const list = document.getElementById('nowList');
  if (!list || typeof NOW === 'undefined') return;
  list.innerHTML = NOW.map((n) => `
    <article class="now-card reveal-up">
      <span class="now-tag">${n.tag}</span>
      <h3 class="now-title">${n.title}</h3>
      <p class="now-text">${n.text}</p>
      ${n.link ? `<a class="now-link" href="${n.link.href}">${n.link.label} \u2192</a>` : ''}
    </article>`).join('');
}

// ── Scroll reveal ──────────────────────────────────────────────
function setupReveal() {
  const rows = document.querySelectorAll('.project-row, .small-card');
  if (!rows.length) return;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) { rows.forEach((r) => r.classList.add('in-view')); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  rows.forEach((r) => obs.observe(r));
}

// ── Mouse spotlight + scroll progress bar ──────────────────────
function setupEffects() {
  // progress bar
  //  scrollHeight / clientHeight both force a layout recalculation, so they
  //  are cached and the write is batched into an animation frame instead of
  //  running on every single scroll event.
  const bar = document.getElementById('progress');
  let max = 0, barTicking = false;
  const remeasureBar = () => {
    const h = document.documentElement;
    max = h.scrollHeight - h.clientHeight;
  };
  const paintBar = () => {
    barTicking = false;
    if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  const onScroll = () => {
    if (!barTicking) { barTicking = true; requestAnimationFrame(paintBar); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { remeasureBar(); onScroll(); }, { passive: true });
  window.addEventListener('load', () => { remeasureBar(); onScroll(); });
  if ('ResizeObserver' in window) new ResizeObserver(() => { remeasureBar(); onScroll(); }).observe(document.body);
  remeasureBar();
  paintBar();

  // spotlight (only on fine pointers, respect reduced motion)
  if (prefersReducedMotion || !window.matchMedia('(pointer:fine)').matches) return;
  const spot = document.getElementById('spotlight');
  if (!spot) return;
  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, shown = false;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!shown) { spot.style.opacity = '1'; shown = true; }
    kick();
  }, { passive: true });
  // The spotlight is a large radial gradient — repainting it every frame
  // forever competes with scrolling. The loop now idles once it has caught
  // up with the cursor and restarts on the next move.
  let raf = null;
  const loop = () => {
    cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
    spot.style.transform = `translate(${cx}px, ${cy}px)`;
    raf = (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) ? requestAnimationFrame(loop) : null;
  };
  const kick = () => { if (raf === null) raf = requestAnimationFrame(loop); };
  loop();
}

// ── Measuring positions ────────────────────────────────────────
//  getBoundingClientRect() includes CSS transforms, and un-revealed
//  content blocks sit at translateY(22px) until they scroll into view —
//  so it reports headings ~22px below where they actually are, and the
//  number changes as the reveal fires. offsetTop is pure layout and
//  ignores transforms, so scroll maths uses this instead.
function pageTop(el) {
  let y = 0, node = el;
  while (node) { y += node.offsetTop; node = node.offsetParent; }
  return y;
}

// ── Anchor jumps that actually land ────────────────────────────
//  Native #anchor scrolling picks its destination up front. Lazy-loaded
//  images finish loading mid-scroll and change the page height, so the
//  browser lands short. This scrolls manually, then waits for scrolling
//  to STOP before checking for drift and correcting — correcting while a
//  smooth scroll is still in flight would yank the page.
function setupSmoothAnchors(offset) {
  offset = offset || 96;                       // clears the fixed topbar
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let target = null, tries = 0, idleTimer = null;

  const stop = () => { target = null; clearTimeout(idleTimer); };

  // if the visitor takes over the scroll, stop correcting immediately
  ['wheel', 'touchstart', 'keydown'].forEach((ev) =>
    window.addEventListener(ev, () => { if (target) stop(); }, { passive: true }));

  const onIdle = () => {
    if (!target) return;
    const drift = pageTop(target) - offset - window.scrollY;
    if (Math.abs(drift) > 4 && tries++ < 10) {
      window.scrollBy({ top: drift, behavior: 'auto' });
      armIdle();                                // verify it stuck
    } else {
      stop();
    }
  };
  // fires only once scrolling has been quiet for 130ms
  const armIdle = () => { clearTimeout(idleTimer); idleTimer = setTimeout(onIdle, 130); };

  window.addEventListener('scroll', () => { if (target) armIdle(); }, { passive: true });

  const goTo = (el, behavior) => {
    target = el; tries = 0;
    window.scrollTo({ top: pageTop(el) - offset, behavior });
    armIdle();                                  // covers "already there, no scroll fires"
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;                            // href="#" placeholders
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    goTo(el, smooth ? 'smooth' : 'auto');
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  });

  // arriving with a hash already in the URL (e.g. index.html#projects)
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => goTo(el, 'auto'), 60);
  }
}

// ── Page transitions ───────────────────────────────────────────
//  Fades the page out before navigating, and in on arrival. Only touches
//  same-origin, same-tab links — external links, downloads, mailto and
//  in-page anchors all behave normally.
function setupPageTransitions() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.hasAttribute('download')) return;
    if (a.target && a.target !== '_self') return;

    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) return;

    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(() => { location.href = a.href; }, 280);
  });

  // returning via the back button from the bfcache — undo the fade-out
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) document.body.classList.remove('page-leave');
  });
}

// ── Right-side section nav (scroll-spy) ────────────────────────
//  Built in JS so no HTML edits are needed. `items` is
//  [{ id: 'about', label: 'About' }, …] in page order.
//
//  The position indicator is a single pill that glides. It is driven by a
//  FRACTIONAL scroll position, not a whole section index — so while the
//  page scrolls it slides continuously down the rail instead of hopping
//  from one item to the next, which looked like stuttering.
function buildSideNav(items) {
  items = items.filter((it) => it && document.getElementById(it.id));
  if (items.length < 2) return;

  const nav = document.createElement('nav');
  nav.className = 'sidenav';
  nav.setAttribute('aria-label', 'Section navigation');
  nav.innerHTML = '<ul class="sn-list"><span class="sn-marker" aria-hidden="true"></span>' +
    items.map((it) => `
    <li><a class="sn-link" href="#${it.id}" title="${it.label}">
      <span class="sn-label">${it.label}</span><span class="sn-dash"></span>
    </a></li>`).join('') + '</ul>';
  document.body.appendChild(nav);

  const list = nav.querySelector('.sn-list');
  const marker = nav.querySelector('.sn-marker');
  const links = Array.from(nav.querySelectorAll('.sn-link'));
  const targets = items.map((it) => document.getElementById(it.id));
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If the rail is taller than the screen it scrolls internally. Debounced,
  // so a long jump moves it once at the end rather than fighting itself.
  let viewTimer;
  const keepInView = (el) => {
    clearTimeout(viewTimer);
    viewTimer = setTimeout(() => {
      if (list.scrollHeight <= list.clientHeight + 1) return;
      const pad = 28;
      const lr = list.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      let delta = 0;
      if (er.top < lr.top + pad) delta = er.top - (lr.top + pad);
      else if (er.bottom > lr.bottom - pad) delta = er.bottom - (lr.bottom - pad);
      if (delta) list.scrollTo({ top: list.scrollTop + delta, behavior: smooth ? 'smooth' : 'auto' });
    }, 130);
  };

  // Positions are measured ONCE and cached. Reading offsetTop or
  // scrollHeight forces a layout recalculation; doing that per scroll
  // frame is what made everything janky.
  let offsets = [], linkTops = [], docHeight = 0;
  const measure = () => {
    offsets = targets.map(pageTop);
    linkTops = links.map((l) => l.offsetTop);
    docHeight = document.documentElement.scrollHeight;
    marker.style.height = links[0].offsetHeight + 'px';
  };

  // How far down the section list we are, as a float:
  // 3.0 = exactly at section 4's heading, 3.5 = halfway to the next.
  const progress = () => {
    const line = window.scrollY + 150;
    const last = offsets.length - 1;
    if (window.innerHeight + window.scrollY >= docHeight - 6) return last;
    if (line <= offsets[0]) return 0;
    for (let i = last; i >= 0; i--) {
      if (line >= offsets[i]) {
        if (i === last) return last;
        const span = offsets[i + 1] - offsets[i];
        return span > 0 ? i + Math.min(1, (line - offsets[i]) / span) : i;
      }
    }
    return 0;
  };

  let activeIdx = -1;
  const apply = () => {
    const pos = progress();

    // the pill slides to a fraction between two rows — continuous motion
    const lo = Math.max(0, Math.min(links.length - 1, Math.floor(pos)));
    const hi = Math.min(links.length - 1, lo + 1);
    const y = linkTops[lo] + (linkTops[hi] - linkTops[lo]) * (pos - lo);
    marker.style.transform = `translateY(${y}px)`;

    // the label nearest the pill is the lit one
    const idx = Math.max(0, Math.min(links.length - 1, Math.round(pos)));
    if (idx !== activeIdx) {
      activeIdx = idx;
      links.forEach((l, i) => l.classList.toggle('active', i === idx));
      keepInView(links[idx]);
    }
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; apply(); }); }
  }, { passive: true });

  // re-measure only when the page can actually have changed height:
  // lazy images finishing, fonts loading, window resizing
  let measureTimer;
  const remeasure = () => {
    clearTimeout(measureTimer);
    measureTimer = setTimeout(() => { measure(); apply(); }, 120);
  };
  window.addEventListener('load', remeasure);
  window.addEventListener('resize', remeasure, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);

  measure();
  apply();
  requestAnimationFrame(() => { measure(); apply(); marker.classList.add('ready'); });
}

// ── Mobile nav ─────────────────────────────────────────────────
function setupNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));
}

// ── Generic scroll reveal for any .reveal-up element ───────────
function setupRevealUp() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in-view')); return; }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach((e) => obs.observe(e));
}

// ── 3D tilt + cursor glow on project media ─────────────────────
function setupTilt() {
  if (prefersReducedMotion || !window.matchMedia('(pointer:fine)').matches) return;
  document.querySelectorAll('.project-media').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -8;   // tilt up/down
      const ry = (px - 0.5) * 10;   // tilt left/right
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildSkills();
  buildProjects();
  buildSmallProjects();
  buildNow();
  setupReveal();
  setupRevealUp();
  setupTilt();
  setupEffects();
  setupNav();
  buildSideNav([
    { id: 'home',     label: 'Home' },
    { id: 'about',    label: 'About' },
    { id: 'skills',   label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'now',      label: 'Right now' },
    { id: 'contact',  label: 'Contact' }
  ]);
  setupSmoothAnchors();
  setupPageTransitions();
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
