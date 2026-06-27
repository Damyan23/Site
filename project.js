// ════════════════════════════════════════════════════════════════
//  PROJECT DETAIL PAGE LOGIC
//  Reads ?id= from the URL, finds that project in PROJECTS
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

function captionHtml(caption) {
  return caption ? `<figcaption class="block-caption">${esc(caption)}</figcaption>` : '';
}

// ── Render one content block → HTML string ─────────────────────
function renderBlock(block) {
  if (!block || !block.type) return '';

  switch (block.type) {
    case 'heading':
      return `<h2 class="block-heading">${esc(block.text)}</h2>`;

    case 'text':
      return `<p class="block-text">${esc(block.text)}</p>`;

    case 'image':
      return `<figure class="block-image">
                <img src="${esc(block.src)}" alt="${esc(block.caption || '')}" onerror="this.style.opacity=.25">
                ${captionHtml(block.caption)}
              </figure>`;

    case 'video':
      return `<figure class="block-video">
                <video controls ${block.poster ? `poster="${esc(block.poster)}"` : ''}>
                  <source src="${esc(block.src)}" type="video/mp4">
                </video>
                ${captionHtml(block.caption)}
              </figure>`;

    case 'quote':
      return `<blockquote class="block-quote">${esc(block.text)}</blockquote>`;

    case 'gallery': {
      const imgs = (block.images || [])
        .map((src) => `<img src="${esc(src)}" alt="" onerror="this.style.opacity=.25">`)
        .join('');
      return `<div class="block-gallery">${imgs}</div>`;
    }

    case 'columns':
      return `<div class="block-columns ${block.flip ? 'flip' : ''}">
                <div class="col-text"><p>${esc(block.text)}</p></div>
                <figure class="col-media">
                  <img src="${esc(block.image)}" alt="${esc(block.caption || '')}" onerror="this.style.opacity=.25">
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

  // Build the body from content blocks. Fall back to `short` if empty.
  const blocks = (p.content && p.content.length)
    ? p.content.map(renderBlock).join('')
    : `<p class="block-text">${esc(p.short || '')}</p>`;

  const skills = (p.skills || [])
    .map((s) => `<span class="pill">${esc(s)}</span>`).join('');

  const githubBtn = p.github
    ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn btn-primary">View on GitHub</a>`
    : '';

  let pager = '';
  if (typeof PROJECTS !== 'undefined' && PROJECTS.length > 1) {
    const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(index + 1) % PROJECTS.length];
    pager = `
      <div class="detail-pager">
        <a href="project.html?id=${encodeURIComponent(prev.id)}" class="pager-link">← ${esc(prev.title)}</a>
        <a href="project.html?id=${encodeURIComponent(next.id)}" class="pager-link pager-next">${esc(next.title)} →</a>
      </div>`;
  }

  root.innerHTML = `
    <a href="index.html#projects" class="detail-back">← All projects</a>

    <header class="detail-head">
      <span class="detail-num">Project 0${index + 1}</span>
      <h1 class="detail-title">${esc(p.title)}</h1>
    </header>

    <div class="detail-grid">
      <article class="detail-content">${blocks}</article>
      <aside class="detail-side">
        <div class="detail-side-block">
          <span class="skills-label">Skills used &amp; acquired</span>
          <div class="skill-pills">${skills}</div>
        </div>
        <div class="detail-side-block detail-actions">${githubBtn}</div>
      </aside>
    </div>

    ${pager}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('detailRoot');
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  if (typeof PROJECTS === 'undefined') { renderNotFound(root); return; }

  const id = getParam('id');
  const index = PROJECTS.findIndex((p) => p.id === id);
  if (index === -1) { renderNotFound(root); return; }

  renderProject(root, PROJECTS[index], index);
});
