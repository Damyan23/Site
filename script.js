// ════════════════════════════════════════════════════════════════
//  HOMEPAGE LOGIC
//  Project data lives in projects-data.js (shared with project.html)
//  Skills live here since they're homepage-only.
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
//  SKILLS  —  each skill has:
//    name   : label
//    icon   : Devicon class
//    level  : 1–5  (how many stars are filled)
//    detail : text shown in the popup when you click the skill —
//             how you acquired it + how skilled you are. Edit freely.
// ════════════════════════════════════════════════════════════════
const SKILLS = {
  'Languages': [
    { name: 'C#',         icon: 'devicon-csharp-plain',     level: 5, detail: 'My main language for game programming. Acquired through coursework at Saxion and years of Unity projects. Comfortable with advanced features, clean architecture, and writing maintainable gameplay systems.' },
    { name: 'C++',        icon: 'devicon-cplusplus-plain',  level: 4, detail: 'Used for Unreal Engine work and lower-level projects. Strong grasp of memory management and performance, still deepening my knowledge of advanced template work.' },
    { name: 'Python',     icon: 'devicon-python-plain',     level: 3, detail: 'Used for tooling, scripting, and quick prototypes. Comfortable for automation and data tasks rather than large applications.' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain', level: 3, detail: 'Picked up for web projects like this portfolio. Comfortable with the fundamentals and DOM work.' },
    { name: 'Lua',        icon: 'devicon-lua-plain',        level: 2, detail: 'Used for scripting in a few engines and game mods. Working knowledge of the basics.' }
  ],
  'Engines & Tools': [
    { name: 'Unity',     icon: 'devicon-unity-plain',            level: 5, detail: 'My primary engine. Years of personal and team projects — confident with the editor, C# scripting, physics, UI, and the asset pipeline.' },
    { name: 'Unreal',    icon: 'devicon-unrealengine-original',  level: 3, detail: 'Used for several projects with Blueprints and C++. Comfortable building gameplay, growing my command of its larger systems.' },
    { name: 'Godot',     icon: 'devicon-godot-plain',            level: 3, detail: 'Explored for lightweight 2D/3D projects. Comfortable with the node system and GDScript.' },
    { name: 'Blender',   icon: 'devicon-blender-original',       level: 2, detail: 'Used for basic modelling and getting assets into engine. Working knowledge of the essentials.' },
    { name: '.NET',      icon: 'devicon-dotnetcore-plain',       level: 4, detail: 'The framework behind my C# work. Comfortable across the tooling and ecosystem.' },
    { name: 'VS Code',   icon: 'devicon-vscode-plain',           level: 5, detail: 'My daily editor for everything outside the engine. Know my way around extensions, debugging, and the workflow.' }
  ],
  'Version Control': [
    { name: 'Git',    icon: 'devicon-git-plain',       level: 4, detail: 'Used daily across solo and team projects. Comfortable with branching, merging, resolving conflicts, and a clean commit history.' },
    { name: 'GitHub', icon: 'devicon-github-original',  level: 4, detail: 'Where I host my projects and collaborate. Comfortable with pull requests, issues, and project boards.' },
    { name: 'GitLab', icon: 'devicon-gitlab-plain',     level: 3, detail: 'Used in team settings, including CI/CD pipelines. Solid working knowledge.' }
  ],
  'Learning': [
    { name: 'Rust',  icon: 'devicon-rust-original', level: 2, detail: 'Currently learning for its performance and safety. Working through the fundamentals.' },
    { name: 'React', icon: 'devicon-react-original', level: 2, detail: 'Picking up to build richer web interfaces. Comfortable with components and state basics.' }
  ]
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Skills: tabs + grid ────────────────────────────────────────
function buildSkills() {
  const tabsEl = document.getElementById('skillTabs');
  const gridEl = document.getElementById('skillGrid');
  if (!tabsEl || !gridEl) return;

  const categories = Object.keys(SKILLS);

  const stars = (level) => {
    let out = '';
    for (let i = 1; i <= 5; i++) {
      out += `<span class="star ${i <= level ? 'filled' : ''}">★</span>`;
    }
    return `<span class="skill-stars" aria-label="${level} out of 5">${out}</span>`;
  };

  const render = (category) => {
    gridEl.innerHTML = SKILLS[category].map((s, i) => `
      <div class="skill-icon" data-skill="${i}" tabindex="0" role="button"
           aria-expanded="false" aria-label="${s.name} — tap for details">
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

    // wire up click / keyboard to toggle each skill's detail panel
    gridEl.querySelectorAll('.skill-icon').forEach((card) => {
      const toggle = (e) => {
        e.stopPropagation();
        const isOpen = card.classList.contains('open');
        // close any other open card first
        gridEl.querySelectorAll('.skill-icon.open').forEach((c) => {
          c.classList.remove('open'); c.setAttribute('aria-expanded', 'false');
        });
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
      tabsEl.querySelectorAll('.tab').forEach((t) => {
        t.classList.remove('active'); t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      render(cat);
    });
    tabsEl.appendChild(btn);
  });
  render(categories[0]);

  // click outside any card closes the open detail
  document.addEventListener('click', () => {
    gridEl.querySelectorAll('.skill-icon.open').forEach((c) => {
      c.classList.remove('open'); c.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Projects: homepage zigzag rows ─────────────────────────────
function buildPreviewMedia(media) {
  if (!media) return '';
  if (media.type === 'image') return `<img src="${media.src}" alt="" class="proj-img" onerror="this.style.opacity=.25">`;
  if (media.type === 'video') return `<video class="proj-video" controls ${media.poster ? `poster="${media.poster}"` : ''}><source src="${media.src}" type="video/mp4"></video>`;
  return '';
}

function buildProjects() {
  const list = document.getElementById('projectList');
  if (!list || typeof PROJECTS === 'undefined') return;

  PROJECTS.forEach((p, i) => {
    const row = document.createElement('article');
    row.className = 'project-row' + (i % 2 ? ' reversed' : '');

    const links = [
      `<a href="project.html?id=${encodeURIComponent(p.id)}" class="btn btn-primary">Read more</a>`,
      p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost">View on GitHub</a>` : ''
    ].join('');

    row.innerHTML = `
      <div class="project-media">${buildPreviewMedia(p.media)}</div>
      <div class="project-info">
        <span class="project-num">0${i + 1}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.short}</p>
        <div class="project-skills">
          <span class="skills-label">Skills used &amp; acquired</span>
          <div class="skill-pills">
            ${p.skills.map((s) => `<span class="pill">${s}</span>`).join('')}
          </div>
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
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    rows.forEach((r) => r.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  rows.forEach((r) => obs.observe(r));
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
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

document.addEventListener('DOMContentLoaded', () => {
  buildSkills();
  buildProjects();
  setupReveal();
  setupNav();
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});