// ════════════════════════════════════════════════════════════════
//  PROJECT DETAIL PAGE LOGIC
//  Reads ?id= from the URL, finds that project in PROJECTS
//  Block types: heading, text, image, gallery, video, clip, clips,
//  quote, columns, note, details
//  (projects-data.js), and renders its content blocks in order.
// ════════════════════════════════════════════════════════════════
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Escape any text that comes from the data file before inserting as HTML
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str == null ? '' : String(str);
  return d.innerHTML;
}

// turn a heading into a stable anchor id for the side nav
function slugify(text) {
  return 'sec-' + String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function captionHtml(caption) {
  return caption ? `<figcaption class="block-caption">${esc(caption)}</figcaption>` : '';
}

// Wrap an image in a frame that gets the hover effect + click-to-zoom.
// data-caption is what the lightbox shows underneath the enlarged image.
function mediaFrame(src, caption) {
  // width/height let the browser reserve the box before the image loads.
  // Without them a lazy image pops in mid-scroll and pushes everything
  // below it down, which is what made section links miss.
  const size = (typeof IMAGE_SIZES !== 'undefined' && IMAGE_SIZES[src]) || null;
  const dims = size ? ` width="${size[0]}" height="${size[1]}"` : '';
  return `<span class="media-frame"${size ? ` style="aspect-ratio:${size[0]}/${size[1]}"` : ''}>
            <img src="${esc(src)}" alt="${esc(caption || '')}"${dims}
                 data-zoom="1" data-caption="${esc(caption || '')}"
                 loading="lazy" decoding="async" onerror="this.style.opacity=.25">
            <span class="media-zoom" aria-hidden="true">\u2922</span>
          </span>`;
}

// ── Render one content block → HTML string ─────────────────────
//  `nested` is true for blocks living inside a `details` block. Nested
//  headings render as smaller sub-headings and get NO id, so they stay
//  out of the side nav — a nav link that scrolls to collapsed content
//  would just land on a closed box.
function renderBlock(block, nested) {
  if (!block || !block.type) return '';

  switch (block.type) {
    case 'heading':
      return nested
        ? `<h3 class="block-subheading">${esc(block.text)}</h3>`
        : `<h2 class="block-heading" id="${slugify(block.text)}">${esc(block.text)}</h2>`;

    // details: a collapsed deep-dive. Keeps the page a short read while
    // the full write-up stays one click away. `blocks` is an ordinary
    // array of any other block type.
    case 'details': {
      const inner = (block.blocks || []).map((b) => renderBlock(b, true)).join('');
      return `<details class="block-details"${block.open ? ' open' : ''}>
                <summary class="details-summary">
                  <span class="details-chevron" aria-hidden="true">\u203a</span>
                  <span class="details-title">${esc(block.summary)}</span>
                  <span class="details-hint" aria-hidden="true"></span>
                </summary>
                <div class="details-body">${inner}</div>
              </details>`;
    }

    case 'text':
      return `<p class="block-text">${esc(block.text)}</p>`;

    case 'image':
      return `<figure class="block-image">
                ${mediaFrame(block.src, block.caption)}
                ${captionHtml(block.caption)}
              </figure>`;

    case 'video':
      return `<figure class="block-video">
                <video controls ${block.poster ? `poster="${esc(block.poster)}"` : ''}>
                  <source src="${esc(block.src)}" type="video/mp4">
                </video>
                ${captionHtml(block.caption)}
              </figure>`;

    // clip: a short looping gameplay capture. These started life as GIFs in
    // my evaluation deck — converted to MP4 because the GIFs were 6-35 MB
    // each. Autoplays muted and loops, so it behaves like a GIF but costs
    // a fraction of the bandwidth. No controls; it's illustration, not media.
    case 'clip':
      return `<figure class="block-clip">
                <video autoplay loop muted playsinline preload="metadata"
                       ${block.poster ? `poster="${esc(block.poster)}"` : ''}
                       width="800" height="450">
                  <source src="${esc(block.src)}" type="video/mp4">
                </video>
                ${captionHtml(block.caption)}
              </figure>`;

    case 'clips': {
      const items = (block.items || []).map((c) => `
        <figure class="clip-cell">
          <video autoplay loop muted playsinline preload="metadata"
                 ${c.poster ? `poster="${esc(c.poster)}"` : ''}
                 width="800" height="450">
            <source src="${esc(c.src)}" type="video/mp4">
          </video>
          ${c.caption ? `<figcaption class="block-caption">${esc(c.caption)}</figcaption>` : ''}
        </figure>`).join('');
      return `<div class="block-clips">${items}</div>`;
    }

    case 'quote':
      return `<blockquote class="block-quote">${esc(block.text)}</blockquote>`;

    // note: a callout box with an optional button — used for the
    // "full write-up is on GitHub" pointer at the end of a project, and
    // for pointing at a deep-dive child page.
    case 'note': {
      const href = block.href || '';
      // http(s) links and local files (PDFs, builds) both open in a new tab
      const external = /^https?:/i.test(href) || /\.(pdf|zip|rar|7z)(\?|#|$)/i.test(href);
      const icon = /github\.com/i.test(href) ? '<i class="devicon-github-original"></i> ' : '';
      const btn = href
        ? `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ''} class="btn btn-primary">
             ${icon}${esc(block.label || 'Read more')}
           </a>`
        : '';
      return `<div class="block-note"><p>${esc(block.text)}</p>${btn}</div>`;
    }

    case 'gallery': {
      const imgs = (block.images || []).map((src) => mediaFrame(src, block.caption)).join('');
      // 2 images side by side, 3+ wraps into a grid — set as a data attr for CSS
      return `<div class="block-gallery" data-count="${(block.images || []).length}"${block.fit ? ` data-fit="${esc(block.fit)}"` : ''}>${imgs}
              ${captionHtml(block.caption)}</div>`;
    }

    case 'columns':
      return `<div class="block-columns ${block.flip ? 'flip' : ''}">
                <div class="col-text"><p>${esc(block.text)}</p></div>
                <figure class="col-media">
                  ${mediaFrame(block.image, block.caption)}
                  ${captionHtml(block.caption)}
                </figure>
              </div>`;

    default:
      return '';
  }
}

function renderNotFound(root) {
  root.innerHTML = `
    <div class="detail-notfound">
      <h1 class="detail-title">Project not found</h1>
      <p class="prose">That project doesn’t exist (or the link is wrong).</p>
      <a href="index.html#projects" class="btn btn-primary">← Back to projects</a>
    </div>`;
}

function renderProject(root, p, index) {
  document.title = `${p.title} — Damyan Peychev`;

  // A child page (`parent: '<id>'`) is a deep dive into one system of a
  // bigger project. It points back at its parent rather than the project
  // list, and borrows its parent's number instead of claiming its own.
  const parent = (p.parent && typeof PROJECTS !== 'undefined')
    ? PROJECTS.find((x) => x.id === p.parent) : null;

  // Build the body from content blocks. Fall back to `short` if empty.
  // NOTE: must be an explicit arrow. `map(renderBlock)` passes the array
  // index as the second argument, which lands in `nested` and turns every
  // heading after the first into an id-less sub-heading — killing the side nav.
  const blocks = (p.content && p.content.length)
    ? p.content.map((b) => renderBlock(b)).join('')
    : `<p class="block-text">${esc(p.short || '')}</p>`;

  const skills = (p.skills || [])
    .map((s) => `<span class="pill">${esc(s)}</span>`).join('');

  const githubBtn = p.github
    ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn btn-primary"><i class="devicon-github-original"></i> View on GitHub</a>`
    : '';

  // download: the `download` attribute forces a direct save for SAME-ORIGIN files
  // (e.g. assets/build.zip). For cloud links it's ignored by the browser, so the
  // provider decides — use the &download=1 / uc?export=download tricks in the data file.
  const downloadBtn = p.download
    ? `<a href="${esc(p.download)}" class="btn btn-ghost" download>↓ Download build</a>`
    : '';

  const actions = githubBtn + downloadBtn;

  // The pager walks the top-level projects only. A hidden deep-dive page
  // isn't a sibling of anything, so it gets a single link home instead.
  let pager = '';
  const siblings = (typeof PROJECTS !== 'undefined')
    ? PROJECTS.filter((x) => !x.hidden && x.scale !== 'small') : [];
  const sIndex = siblings.indexOf(p);

  if (p.hidden) {
    if (parent) {
      pager = `
        <div class="detail-pager">
          <a href="project.html?id=${encodeURIComponent(parent.id)}" class="pager-link">← Back to ${esc(parent.title)}</a>
        </div>`;
    }
  } else if (siblings.length > 1 && sIndex !== -1) {
    const prev = siblings[(sIndex - 1 + siblings.length) % siblings.length];
    const next = siblings[(sIndex + 1) % siblings.length];
    pager = `
      <div class="detail-pager">
        <a href="project.html?id=${encodeURIComponent(prev.id)}" class="pager-link">← ${esc(prev.title)}</a>
        <a href="project.html?id=${encodeURIComponent(next.id)}" class="pager-link pager-next">${esc(next.title)} →</a>
      </div>`;
  }

  // grouped meta block (Role / Engine / Year / Team …)
  let metaBlock = '';
  if (p.meta && Object.keys(p.meta).length) {
    const rows = Object.entries(p.meta).map(([k, v]) => `
      <div class="meta-row">
        <span class="meta-key">${esc(k)}</span>
        <span class="meta-val">${esc(v)}</span>
      </div>`).join('');
    metaBlock = `
      <div class="info-group">
        <span class="info-group-label">Project info</span>
        ${rows}
      </div>`;
  }

  // Child pages listed in `subpages` — pinned in the sidebar so they are
  // reachable from the top of the page, not only from the note block that
  // sits wherever the relevant section happens to fall.
  let subBlock = '';
  const subs = (p.subpages || [])
    .map((id) => (typeof PROJECTS !== 'undefined' ? PROJECTS.find((x) => x.id === id) : null))
    .filter(Boolean);
  if (subs.length) {
    const rows = subs.map((s) => `
      <a class="sub-link" href="project.html?id=${encodeURIComponent(s.id)}">
        <span class="sub-link-title">${esc(s.title)}</span>
        <span class="sub-link-arrow" aria-hidden="true">→</span>
      </a>`).join('');
    subBlock = `
      <div class="info-group">
        <span class="info-group-label">Deep dive${subs.length > 1 ? 's' : ''}</span>
        ${rows}
      </div>`;
  }

  root.innerHTML = `
    <a href="${parent ? `project.html?id=${encodeURIComponent(parent.id)}` : 'index.html#projects'}" class="detail-back">${parent ? `← ${esc(parent.title)}` : '← All projects'}</a>

    <div class="detail-grid">
      <div class="detail-main">
        <header class="detail-head" id="overview">
          <span class="detail-num">${parent ? `${esc(parent.title)} · Deep dive` : `Project 0${sIndex >= 0 ? sIndex + 1 : index + 1}`}</span>
          <div class="detail-title-row">
            <h1 class="detail-title">${esc(p.title)}</h1>
            ${p.status ? `<span class="detail-status">${esc(p.status)}</span>` : ''}
          </div>
        </header>
        <article class="detail-content">${blocks}</article>
      </div>

      <aside class="detail-side">
        ${metaBlock}
        ${subBlock}
        <div class="info-group">
          <span class="info-group-label">Skills used &amp; acquired</span>
          <div class="skill-pills">${skills}</div>
        </div>
        ${actions ? `<div class="detail-actions">${actions}</div>` : ''}
      </aside>
    </div>

    ${pager}`;
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

// ── Lightbox: click any content image to blow it up ────────────
//  Builds one overlay and reuses it. Arrow keys / the side buttons
//  step through every zoomable image on the page in document order.
function setupLightbox(root) {
  const imgs = Array.from(root.querySelectorAll('img[data-zoom]'));
  if (!imgs.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = `
    <button class="lb-close" aria-label="Close">\u2715</button>
    <button class="lb-nav lb-prev" aria-label="Previous image">\u2039</button>
    <button class="lb-nav lb-next" aria-label="Next image">\u203a</button>
    <figure class="lb-figure">
      <div class="lb-stage"><img class="lb-img" alt=""></div>
      <figcaption class="lb-caption"></figcaption>
    </figure>
    <div class="lb-zoom">
      <button class="lb-zoom-out" aria-label="Zoom out">\u2212</button>
      <button class="lb-zoom-level" aria-label="Reset zoom">100%</button>
      <button class="lb-zoom-in" aria-label="Zoom in">+</button>
    </div>`;
  document.body.appendChild(box);

  const stage = box.querySelector('.lb-stage');
  const lbImg = box.querySelector('.lb-img');
  const lbCap = box.querySelector('.lb-caption');
  const lbLevel = box.querySelector('.lb-zoom-level');
  let current = 0;

  // ── zoom + pan ────────────────────────────────────────────────
  //  transform-origin is 0 0, so zooming about a point is just
  //  "shift the translation by however far that point would move".
  //  scale 1 == fit to the stage; maxScale is derived per image from
  //  its natural resolution so you can never zoom past its own pixels.
  let scale = 1, tx = 0, ty = 0, maxScale = 4;

  const setMaxScale = () => {
    const w = lbImg.clientWidth || 1;
    const natural = lbImg.naturalWidth || w;
    // a little past 1:1 is still sharp enough to be useful
    maxScale = Math.min(14, Math.max(2, (natural / w) * 1.3));
  };

  const apply = () => {
    lbImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    const zoomed = scale > 1.001;
    box.classList.toggle('zoomed', zoomed);
    lbLevel.textContent = Math.round(scale * 100) + '%';
  };

  //  keeps the view honest: centred while it fits, gap-free once it
  //  doesn't. Without this, panning leaves dead space at the edges.
  const clamp = () => {
    const r = lbImg.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight, pad = 12;
    if (r.width <= vw - pad * 2) tx += (vw - r.width) / 2 - r.left;
    else {
      if (r.left > pad) tx -= r.left - pad;
      if (r.right < vw - pad) tx += (vw - pad) - r.right;
    }
    if (r.height <= vh - pad * 2) ty += (vh - r.height) / 2 - r.top;
    else {
      if (r.top > pad) ty -= r.top - pad;
      if (r.bottom < vh - pad) ty += (vh - pad) - r.bottom;
    }
  };

  const smooth = (on) => lbImg.classList.toggle('smooth', on);

  const reset = () => { smooth(true); scale = 1; tx = 0; ty = 0; apply(); };

  // zoom to `next`, holding whatever sits under (cx, cy) still
  const zoomTo = (next, cx, cy, animate) => {
    next = Math.min(maxScale, Math.max(1, next));
    smooth(!!animate);
    if (next === scale) return;
    if (next === 1) { scale = 1; tx = 0; ty = 0; apply(); return; }
    const r = lbImg.getBoundingClientRect();
    const f = next / scale;
    tx -= (cx - r.left) * (f - 1);
    ty -= (cy - r.top) * (f - 1);
    scale = next;
    apply(); clamp(); apply();
  };

  const zoomCentre = (f) => {
    zoomTo(scale * f, window.innerWidth / 2, window.innerHeight / 2, true);
  };

  const show = (i) => {
    current = (i + imgs.length) % imgs.length;
    const src = imgs[current];
    lbImg.classList.remove('swap');
    void lbImg.offsetWidth; // force reflow so the swap replays every step
    lbImg.classList.add('swap');
    lbImg.src = src.currentSrc || src.src;
    lbImg.alt = src.alt || '';
    const cap = src.dataset.caption || '';
    lbCap.textContent = cap;
    lbCap.style.display = cap ? '' : 'none';
    box.querySelectorAll('.lb-nav').forEach((b) => {
      b.style.display = imgs.length > 1 ? '' : 'none';
    });
    smooth(false);
    scale = 1; tx = 0; ty = 0; apply();
    if (lbImg.complete) setMaxScale();
  };

  lbImg.addEventListener('load', setMaxScale);
  window.addEventListener('resize', () => { setMaxScale(); if (scale > 1) { clamp(); apply(); } });

  const open = (i) => {
    show(i);
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lb-locked');
  };
  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lb-locked');
  };

  imgs.forEach((im, i) => {
    im.addEventListener('click', () => open(i));
  });

  // ── wheel / trackpad ──────────────────────────────────────────
  //  deltaMode matters: Firefox reports lines (1) and some setups
  //  report pages (2), so a raw deltaY would barely move the zoom.
  box.addEventListener('wheel', (e) => {
    if (!box.classList.contains('open')) return;
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
    const d = e.deltaY * unit;
    const step = e.ctrlKey ? 0.012 : 0.0035; // ctrl+wheel is a trackpad pinch
    zoomTo(scale * Math.exp(-d * step), e.clientX, e.clientY, false);
  }, { passive: false });

  // ── drag to pan, two fingers to pinch ─────────────────────────
  const pointers = new Map();
  let last = null, pinch = null, moved = 0;

  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved = 0;
    smooth(false);
    if (pointers.size === 1) last = { x: e.clientX, y: e.clientY };
    else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, s: scale };
    }
  });

  stage.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size >= 2 && pinch) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      moved += 10;
      zoomTo(pinch.s * (d / pinch.d), (a.x + b.x) / 2, (a.y + b.y) / 2, false);
      return;
    }
    if (scale <= 1 || !last) return;
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    moved += Math.abs(dx) + Math.abs(dy);
    tx += dx; ty += dy;
    last = { x: e.clientX, y: e.clientY };
    box.classList.add('dragging');
    apply(); clamp(); apply();
  });

  const endPointer = (e) => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 0) { last = null; box.classList.remove('dragging'); }
  };
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);

  // click the image to step in, double-click to go back to fit
  lbImg.addEventListener('click', (e) => {
    e.stopPropagation();
    if (moved > 6) { moved = 0; return; }
    if (scale > 1.001) return; // already zoomed: leave clicks to panning
    zoomTo(Math.min(2.5, maxScale), e.clientX, e.clientY, true);
  });
  lbImg.addEventListener('dblclick', (e) => { e.preventDefault(); reset(); });

  box.querySelector('.lb-zoom-in').addEventListener('click', (e) => { e.stopPropagation(); zoomCentre(1.4); });
  box.querySelector('.lb-zoom-out').addEventListener('click', (e) => { e.stopPropagation(); zoomCentre(1 / 1.4); });
  lbLevel.addEventListener('click', (e) => { e.stopPropagation(); reset(); });

  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  box.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  // clicking the dark backdrop closes — but a pan that ended there is not a click
  box.addEventListener('click', (e) => {
    if (moved > 6) { moved = 0; return; }
    if (e.target === box || e.target === stage || e.target.classList.contains('lb-figure')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === '+' || e.key === '=') zoomCentre(1.4);
    if (e.key === '-' || e.key === '_') zoomCentre(1 / 1.4);
    if (e.key === '0') reset();
  });
}

// ── Fade content blocks in as they scroll into view ────────────
function setupBlockReveal(root) {
  const blocks = Array.from(root.querySelectorAll('.detail-content > *'));
  if (!blocks.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    blocks.forEach((b) => b.classList.add('in-view'));
    return;
  }
  blocks.forEach((b) => b.classList.add('block-reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  blocks.forEach((b) => obs.observe(b));
}

// ── Collapsible deep-dive sections ─────────────────────────────
//  <details> snaps open with no animation, so the click is intercepted
//  and the body height is animated instead. The element is forced open
//  BEFORE measuring (a closed <details> has no laid-out content to
//  measure) and only closed once the collapse animation has finished.
function setupDetails(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.querySelectorAll('.block-details').forEach((d) => {
    const body = d.querySelector('.details-body');
    const sum = d.querySelector('.details-summary');
    if (!body || !sum) return;

    let anim = null;

    sum.addEventListener('click', (e) => {
      e.preventDefault();
      if (reduce) { d.open = !d.open; return; }

      const wasOpen = d.open;
      // height mid-flight, before cancelling, so a double-click reverses
      // from where it actually is instead of snapping
      const cur = anim ? body.getBoundingClientRect().height : null;
      if (anim) { anim.cancel(); anim = null; }

      body.style.overflow = 'hidden';
      if (!wasOpen) d.open = true;              // must be open to measure
      const full = body.scrollHeight;
      // box-sizing is border-box, so a height of 0 would still render the
      // body's bottom padding as a stray gap — it collapses with the height
      const pad = getComputedStyle(body).paddingBottom;

      const from = cur != null ? cur : (wasOpen ? full : 0);
      const to = wasOpen ? 0 : full;

      anim = body.animate(
        {
          height: [from + 'px', to + 'px'],
          paddingBottom: wasOpen ? [pad, '0px'] : ['0px', pad],
          opacity: [wasOpen ? 1 : 0, wasOpen ? 0 : 1]
        },
        { duration: Math.min(560, 240 + full * 0.22), easing: 'cubic-bezier(.2,.7,.25,1)' }
      );
      anim.onfinish = () => {
        anim = null;
        body.style.overflow = '';
        if (wasOpen) d.open = false;
      };
    });

    // keyboard: <summary> fires a click for Enter/Space, so the handler
    // above already covers it — nothing extra needed.
  });
}

// ── Mouse spotlight + scroll progress (shared look with homepage) ──
function setupEffects() {
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

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
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

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('detailRoot');
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  setupEffects();

  if (typeof PROJECTS === 'undefined') { renderNotFound(root); return; }

  const id = getParam('id');
  const index = PROJECTS.findIndex((p) => p.id === id);
  if (index === -1) { renderNotFound(root); return; }

  renderProject(root, PROJECTS[index], index);
  setupBlockReveal(root);
  setupDetails(root);
  setupLightbox(root);

  // side nav is built from the write-up's own headings
  const items = [{ id: 'overview', label: 'Overview' }].concat(
    Array.from(root.querySelectorAll('.block-heading'))
      .map((h) => ({ id: h.id, label: h.textContent.trim() }))
  );
  buildSideNav(items);
  setupSmoothAnchors();
  setupPageTransitions();
});
