// ════════════════════════════════════════════════════════════════
//  HOMEPAGE LOGIC
//  Project data: projects-data.js (shared with project.html)
//  Skills: here (homepage-only). Each skill: { name, icon, level, detail }
// ════════════════════════════════════════════════════════════════
const SKILLS = {
  'Languages': [
    { name: 'C#',         icon: 'devicon-csharp-plain',     level: 5, detail: 'My main language for game programming. Years of Unity work and coursework at Saxion — comfortable with clean architecture and maintainable gameplay systems.' },
    { name: 'C++',        icon: 'devicon-cplusplus-plain',  level: 4, detail: 'Used for Unreal Engine and lower-level work. Strong on memory management and performance.' },
    { name: 'Python',     icon: 'devicon-python-plain',     level: 3, detail: 'Tooling, scripting, and quick prototypes.' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain', level: 3, detail: 'Web projects like this portfolio — comfortable with the fundamentals and DOM work.' },
    { name: 'Lua',        icon: 'devicon-lua-plain',        level: 2, detail: 'Scripting in a few engines and game mods.' }
  ],
  'Engines & Tools': [
    { name: 'Unity',     icon: 'devicon-unity-plain',            level: 5, detail: 'My primary engine. Confident across the editor, C# scripting, physics, UI, and the asset pipeline.' },
    { name: 'Unreal',    icon: 'devicon-unrealengine-original',  level: 3, detail: 'Several projects with Blueprints and C++. Comfortable building gameplay.' },
    { name: 'Godot',     icon: 'devicon-godot-plain',            level: 3, detail: 'Lightweight 2D/3D projects — comfortable with the node system and GDScript.' },
    { name: 'Blender',   icon: 'devicon-blender-original',       level: 2, detail: 'Basic modelling and getting assets into engine.' },
    { name: '.NET',      icon: 'devicon-dotnetcore-plain',       level: 4, detail: 'The framework behind my C# work.' },
    { name: 'VS Code',   icon: 'devicon-vscode-plain',           level: 5, detail: 'Daily editor — extensions, debugging, the whole workflow.' }
  ],
  'Version Control': [
    { name: 'Git',    icon: 'devicon-git-plain',       level: 4, detail: 'Daily across solo and team projects — branching, merging, clean history.' },
    { name: 'GitHub', icon: 'devicon-github-original',  level: 4, detail: 'Where I host and collaborate — PRs, issues, project boards.' },
    { name: 'GitLab', icon: 'devicon-gitlab-plain',     level: 3, detail: 'Team settings including CI/CD pipelines.' }
  ],
  'Learning': [
    { name: 'Rust',  icon: 'devicon-rust-original', level: 2, detail: 'Learning for its performance and safety.' },
    { name: 'React', icon: 'devicon-react-original', level: 2, detail: 'Picking up for richer web interfaces.' }
  ]
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Skills: tabs + grid with stars + click-to-open detail ──────
function buildSkills() {
  const tabsEl = document.getElementById('skillTabs');
  const gridEl = document.getElementById('skillGrid');
  if (!tabsEl || !gridEl) return;

  const categories = Object.keys(SKILLS);
  const stars = (level) => {
    let out = '';
    for (let i = 1; i <= 5; i++) out += `<span class="star ${i <= level ? 'filled' : ''}">★</span>`;
    return `<span class="skill-stars" aria-label="${level} out of 5">${out}</span>`;
  };

  const render = (category) => {
    gridEl.innerHTML = SKILLS[category].map((s) => `
      <div class="skill-icon" tabindex="0" role="button" aria-expanded="false" aria-label="${s.name} — tap for details">
        <i class="${s.icon}" aria-hidden="true"></i>
        <span class="skill-name">${s.name}</span>
        ${stars(s.level || 0)}
        <div class="skill-detail" role="tooltip">
          <strong class="skill-detail-title">${s.name}</strong>
          ${stars(s.level || 0)}
          <p>${s.detail || ''}</p>
        </div>
      </div>
    `).join('');

    gridEl.querySelectorAll('.skill-icon').forEach((card) => {
      const toggle = (e) => {
        e.stopPropagation();
        const isOpen = card.classList.contains('open');
        gridEl.querySelectorAll('.skill-icon.open').forEach((c) => { c.classList.remove('open'); c.setAttribute('aria-expanded', 'false'); });
        if (!isOpen) { card.classList.add('open'); card.setAttribute('aria-expanded', 'true'); }
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); }
        if (e.key === 'Escape') { card.classList.remove('open'); card.setAttribute('aria-expanded', 'false'); }
      });
    });
  };

  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab' + (i === 0 ? ' active' : '');
    btn.textContent = cat;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      render(cat);
    });
    tabsEl.appendChild(btn);
  });
  render(categories[0]);

  document.addEventListener('click', () => {
    gridEl.querySelectorAll('.skill-icon.open').forEach((c) => { c.classList.remove('open'); c.setAttribute('aria-expanded', 'false'); });
  });
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

  PROJECTS.forEach((p, i) => {
    const row = document.createElement('article');
    row.className = 'project-row' + (i % 2 ? ' reversed' : '');
    const status = p.status ? `<span class="project-status">${p.status}</span>` : '';

    const links = [
      `<a href="project.html?id=${encodeURIComponent(p.id)}" class="btn btn-primary">Read more →</a>`,
      p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost"><i class="devicon-github-original"></i> GitHub</a>` : ''
    ].join('');

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
        <div class="cta-row">${links}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

// ── Scroll reveal ──────────────────────────────────────────────
function setupReveal() {
  const rows = document.querySelectorAll('.project-row');
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
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
    const el = document.getElementById('progress');
    if (el) el.style.width = p + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // spotlight (only on fine pointers, respect reduced motion)
  if (prefersReducedMotion || !window.matchMedia('(pointer:fine)').matches) return;
  const spot = document.getElementById('spotlight');
  if (!spot) return;
  let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, shown = false;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!shown) { spot.style.opacity = '1'; shown = true; }
  });
  const loop = () => {
    cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
    spot.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  };
  loop();
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

document.addEventListener('DOMContentLoaded', () => {
  buildSkills();
  buildProjects();
  setupReveal();
  setupEffects();
  setupNav();
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
