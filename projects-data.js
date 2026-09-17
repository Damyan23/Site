// ════════════════════════════════════════════════════════════════
//  SHARED PROJECT DATA  —  used by the homepage AND project.html
//  Edit your projects here, once. Each gets a detail page at
//     project.html?id=<id>
//
//  ── Homepage card fields ──
//  id     : unique slug, no spaces (becomes the URL ?id=...)
//  title  : project name
//  short  : one/two lines shown on the homepage card
//  media  : homepage preview — { type:'video', src, poster } | { type:'image', src }
//  skills : tech pills shown on the card AND the detail page sidebar
//  github : repo URL ('' hides the button)
//  download : optional build-download URL ('' or omit hides the button).
//             • Self-hosted file (e.g. 'assets/The-Hunt/build.zip') downloads
//               directly. Keep builds in their own project folder, not loose in /assets.
//             • OneDrive: take your share link and append '&download=1' to push
//               a direct download instead of opening the OneDrive page.
//             • Google Drive: use 'https://drive.google.com/uc?export=download&id=FILE_ID'
//             (Cloud links can't be 100% forced — providers may still show a page.)
//  status : optional short label shown as a pill on the card (e.g. 'Vertical slice')
//  meta   : optional object of label→value pairs shown as a grouped info
//           block on the detail page sidebar, e.g.
//           meta: { Role: 'Gameplay Programmer', Engine: 'Unity', Year: '2024', Team: 'Solo' }
//
//  ── Detail page content ──
//  content : an ORDERED array of blocks. They render top-to-bottom in
//            whatever order you list them. Available block types below.
//
//  ┌─────────────────────────────────────────────────────────────┐
//  │ BLOCK TYPES (copy a line, change the values)                │
//  ├─────────────────────────────────────────────────────────────┤
//  │ { type:'heading',  text:'Section title' }                   │
//  │ { type:'text',     text:'A paragraph of writing.' }         │
//  │ { type:'image',    src:'assets/x.jpg', caption:'Optional' } │
//  │ { type:'video',    src:'assets/x.mp4', poster:'assets/x.jpg',│
//  │                    caption:'Optional' }                     │
//  │ { type:'quote',    text:'A callout or pulled quote.' }      │
//  │ { type:'gallery',  images:['assets/a.jpg','assets/b.jpg'] } │
//  │ { type:'note',     text:'Callout text.',                    │
//  │                    href:'https://…', label:'Button text' }  │
//  │ { type:'columns',  text:'Text on one side…',                │
//  │                    image:'assets/x.jpg',                    │
//  │                    caption:'Optional',                      │
//  │                    flip:false }   // flip:true = image left │
//  │ { type:'details',  summary:'Label on the closed box',       │
//  │                    blocks:[ …any blocks… ],                 │
//  │                    open:false }   // open:true = starts open│
//  └─────────────────────────────────────────────────────────────┘
//
//  ── details: keeping the page a short read ──
//  The main thread of a write-up should be skimmable in ~5 minutes.
//  Anything heavier — implementation detail, second examples, the
//  history of a system that got rebuilt — goes inside a `details`
//  block, collapsed by default and one click away.
//  A `heading` INSIDE a details renders as a smaller sub-heading and
//  is deliberately left out of the right-hand section nav, since a
//  nav link pointing at collapsed content would land on a shut box.
//  caption is always optional. Leave a field out and it's skipped.
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
//  IMAGE DIMENSIONS
//  Lets the browser reserve the right amount of space BEFORE an image
//  loads. Without this, lazy images pop in at their real size while you
//  are scrolling, shove everything below them down, and section links
//  land in the wrong place. Add an entry whenever you add an image.
// ════════════════════════════════════════════════════════════════
const IMAGE_SIZES = {
  'assets/The-Hunt/ai-sketch.jpg': [831, 1107],
  'assets/The-Hunt/animation_notifier_attack1.png': [954, 959],
  'assets/The-Hunt/animation_notifier_attack2.png': [954, 959],
  'assets/The-Hunt/architecture.png': [1228, 580],
  'assets/The-Hunt/board-brazier-close.jpg': [1400, 747],
  'assets/The-Hunt/board-braziers.jpg': [1400, 747],
  'assets/The-Hunt/board-shrine.jpg': [1400, 747],
  'assets/The-Hunt/board-wide.jpg': [1600, 850],
  'assets/The-Hunt/clip-block.jpg': [800, 450],
  'assets/The-Hunt/clip-inventory-rune.jpg': [800, 450],
  'assets/The-Hunt/clip-moveset-1.jpg': [800, 450],
  'assets/The-Hunt/clip-moveset-2.jpg': [800, 450],
  'assets/The-Hunt/clip-moveset-3.jpg': [800, 450],
  'assets/The-Hunt/combat-now.jpg': [1600, 902],
  'assets/The-Hunt/combat-then.jpg': [1600, 901],
  'assets/The-Hunt/enemy-attacking.jpg': [1600, 873],
  'assets/The-Hunt/enemy-blocking.jpg': [737, 402],
  'assets/The-Hunt/gas_player_slash_effect1.png': [387, 288],
  'assets/The-Hunt/gas_player_slash_effect2.png': [534, 284],
  'assets/The-Hunt/hero-map.jpg': [1380, 733],
  'assets/The-Hunt/hitreaction_back.gif': [800, 503],
  'assets/The-Hunt/hitreaction_front.gif': [800, 503],
  'assets/The-Hunt/hitreaction_left.gif': [800, 503],
  'assets/The-Hunt/hitreaction_right.gif': [800, 503],
  'assets/The-Hunt/hud-damage.jpg': [1600, 901],
  'assets/The-Hunt/hud.jpg': [711, 295],
  'assets/The-Hunt/ik-animbp.png': [779, 362],
  'assets/The-Hunt/ik-hands.jpg': [660, 566],
  'assets/The-Hunt/inventory-early.png': [282, 287],
  'assets/The-Hunt/inventory-now.jpg': [1600, 900],
  'assets/The-Hunt/inventory-then.jpg': [1600, 900],
  'assets/The-Hunt/inventory.jpg': [1400, 788],
  'assets/The-Hunt/item-definition.png': [1144, 947],
  'assets/The-Hunt/item-definition2.png': [1144, 947],
  'assets/The-Hunt/map-astar-1.jpg': [667, 541],
  'assets/The-Hunt/map-astar-2.jpg': [662, 536],
  'assets/The-Hunt/map-delaunay.jpg': [1359, 1015],
  'assets/The-Hunt/map-final.jpg': [1380, 733],
  'assets/The-Hunt/map-poisson.jpg': [960, 902],
  'assets/The-Hunt/planning-board.jpg': [1592, 862],
  'assets/The-Hunt/poison-rune.png': [1380, 572],
  'assets/The-Hunt/state-machine.png': [1301, 995],
  'assets/The-Hunt/statetree-full.png': [1100, 1112],
  'assets/The-Hunt/statetree.gif': [596, 335],
  'assets/The-Hunt/statetree.png': [747, 755],
  'assets/The-Hunt/sts-reference.jpg': [1280, 720],
  'assets/The-Hunt/sts_combat.png': [1919, 1199],
  'assets/The-Hunt/sts_heal.png': [1919, 1199],
  'assets/The-Hunt/sts_poisonrune1.png': [1919, 1199],
  'assets/The-Hunt/sts_poisonrune2.png': [1919, 1199],
  'assets/The-Hunt/sts_randomencounter1.png': [1919, 1199],
  'assets/The-Hunt/sts_randomencounter2.png': [1919, 1199],
  'assets/The-Hunt/sts_randomencounter3.png': [1919, 1199],
  'assets/The-Hunt/stsmap.gif': [800, 503],
  'assets/The-Hunt/world-banners.jpg': [1600, 901],

  // ── Jief's Diner ──
  // THESE MUST BE THE FILE'S REAL PIXEL SIZE. The frame takes its shape from
  // this number and the image is object-fit: cover inside it — so a wrong
  // value here does not letterbox, it silently crops the picture. That is
  // what made the phone screenshot look zoomed in.
  'assets/Jiefs-Diner/hero.png':                  [1920, 1080],   // confirmed
  'assets/Jiefs-Diner/phone-and-pc-poster.jpg':   [1920, 1080],   // confirmed
  'assets/Jiefs-Diner/pc-instructions.png':       [1920, 1080],   // TODO measure
  'assets/Jiefs-Diner/screen-pc.png':             [1920, 1080],   // TODO measure
  'assets/Jiefs-Diner/screen-phone.png':          [1080, 1920],   // TODO measure
  'assets/Jiefs-Diner/station-cutting.png':       [1920, 1080],   // TODO measure
  'assets/Jiefs-Diner/station-mixing.png':        [1920, 1080],   // TODO measure
  'assets/Jiefs-Diner/station-plating.png':       [1920, 1080],   // TODO measure
  'assets/Jiefs-Diner/network-diagram.svg':       [1600, 900],    // confirmed
  'assets/Jiefs-Diner/recipe-asset.png':          [1600, 900],    // TODO measure
  'assets/Jiefs-Diner/recipe-folder.png':         [1600, 900],    // TODO measure

  // ── Castle Siege ──
  'assets/Castle-Siege/hero.png':             [1600, 900],
  'assets/Castle-Siege/uml-managers.png':       [3622, 3758],
  'assets/Castle-Siege/uml-status-effects.png': [3658, 2264],
  'assets/Castle-Siege/uml-enemies.png':        [3598, 2494],
  'assets/Castle-Siege/uml-towers.png':         [4218, 4068],
  'assets/Castle-Siege/uml-projectiles.png':    [2430, 1614],
  'assets/Castle-Siege/uml-placement.png':      [3162, 2028],
  'assets/Castle-Siege/placement.png':        [1600, 900],
  'assets/Castle-Siege/placement_incorrect.png': [1600, 900],
  'assets/Castle-Siege/tower-ballista.png':   [1000, 1000],
  'assets/Castle-Siege/tower-cannon.png':     [1000, 1000],
  'assets/Castle-Siege/tower-mage.png':       [1000, 1000],
  'assets/Castle-Siege/cannon-explosion.png': [1600, 900],
  'assets/Castle-Siege/lightning-chain.png':  [1600, 900],
  'assets/Castle-Siege/status-effects.png':   [1200, 800],
  'assets/Castle-Siege/enemy-wave.png':       [1600, 900],

  // ── Hex Grid & Pathfinding ──
  'assets/Hex-Map/hero.png':                  [1600, 900],
  'assets/Hex-Maze/hero.png':                 [1600, 900],

  // ── Procedural spider ──
  'assets/Spider/hero.png':                   [1600, 900],
  'assets/Spider/terrain.png':                [1920, 1080],   // TODO measure
  'assets/Spider/gizmos.png':                 [1600, 900],

  // ── OpenGL renderer ──
  'assets/OpenGL/gl-triangle-white.png':      [539, 400],
  'assets/OpenGL/gl-triangle-colour.png':     [783, 591],
  'assets/OpenGL/gl-triangle-textured.png':   [782, 590],
  'assets/OpenGL/gl-cube.png':                [564, 421],
  'assets/OpenGL/gl-directional.png':         [393, 298],
  'assets/OpenGL/gl-pointlight.png':          [430, 319],
  'assets/OpenGL/gl-spotlight.png':           [469, 353],
  'assets/Hex-Maze/maze-generate.gif':        [1000, 1000],
  // These three render with fit: 'natural', so they take their shape from the
  // file itself and these numbers only reserve space while it loads.
  'assets/Hex-Maze/algo-dfs.gif':             [1000, 1000],
  'assets/Hex-Maze/algo-prim.gif':            [1000, 1000],
  'assets/Hex-Maze/algo-wilson.gif':          [1000, 1000],
  'assets/Hex-Maze/maze-pathfind.gif':        [1000, 1000],
  'assets/Hex-Map/tile-assets.png':           [1400, 900],
  'assets/Hex-Map/grid-coords.png':           [1400, 900],
  'assets/Hex-Map/weight-map.png':            [1400, 900],
  'assets/Hex-Map/road-tiles.png':            [1400, 900],
  'assets/Hex-Map/road-drawn.gif':            [1200, 800]
};

const PROJECTS = [
  {
    id: 'the-hunt',
    title: 'The Hunt',
    short: 'A third-person horror roguelike in Unreal Engine 5 \u2014 Soulslike combat meets a procedural, Slay the Spire-style board. Sole engineer on a two-person team. Most of my time went into combat feel and the board generator; what I am proudest of is coming in having only ever used Unity and still getting every core system working end to end in C++.',
    media: { type: 'video', src: 'assets/The-Hunt/the-hunt.mp4', poster: 'assets/The-Hunt/hero-map.jpg' },
    skills: ['C++', 'Unreal Engine 5', 'Blueprints', 'GAS', 'StateTree', 'Procedural Generation'],
    status: 'Vertical slice',
    meta: { Role: 'Sole Engineer (code & integration)', Engine: 'Unreal Engine 5 (C++ & Blueprints)', Year: '2025-2026', Team: 'Two-person team' },
    github: 'https://github.com/Damyan23/The-Hunt',
    download: 'assets/The-Hunt/TheHunt_Build.zip',
    subpages: ['the-hunt-map'],
    content: [
      { type: 'text', text: 'The Hunt is a vertical slice of a third-person horror roguelike built in Unreal Engine 5 with C++ and Blueprints. It blends Soulslike combat \u2014 stamina, blocking, stagger, parries, dodge frames \u2014 with a procedural, branching board inspired by Slay the Spire, layered with event-based encounters and roguelike progression. I was the sole engineer on a two-person team, handling all code and integration while my teammate handled art, design, and level design.' },
      { type: 'video', src: 'assets/The-Hunt/the-hunt.mp4', poster: 'assets/The-Hunt/hero-map.jpg', caption: 'Gameplay trailer \u2014 combat, the procedural board, and the explorable areas.' },

      { type: 'heading', text: 'Why this project' },
      { type: 'text', text: 'Before this I worked almost entirely in Unity. Unreal was unfamiliar territory, and I wanted to change that by confronting its hardest aspects head-on \u2014 real-time combat, AI, procedural generation, and modular architecture \u2014 rather than easing in through tutorial-style exercises. The goal was a focused vertical slice where every core system was proven end to end, built on foundations solid enough to keep extending afterwards.' },
      { type: 'image', src: 'assets/The-Hunt/world-banners.jpg', caption: 'One of the explorable areas \u2014 the world the board sends you into.' },

      { type: 'heading', text: 'Architecture' },
      { type: 'text', text: 'The decision that mattered most was separating concerns across the class hierarchy from day one. Rather than putting player logic into the player class, I built ABaseCharacter \u2014 a base class holding everything shared between players and enemies: the Ability System Component, the attribute set, weapon attachment, death handling, and footstep audio. APlayerCharacter and the enemy classes inherit from it and add only their own input handling and specialised behaviour.' },
      { type: 'image', src: 'assets/The-Hunt/architecture.png', caption: 'Core class architecture \u2014 shared base classes in the middle, engine classes and concrete subclasses branching off.' },
      { type: 'details', summary: 'Where the shared base paid off', blocks: [
          { type: 'text', text: 'That paid off constantly. Hit reactions, stagger, and sound playback were written once in the base class and every derived class inherited them immediately, and AMeleeWeapon could be built against the base character interface instead of being duplicated per character type. The same principle runs through the rest of the project: every interactable derives from a common AInteractable base defining a single interaction contract, items and runes live in a UItemDefinition data-asset hierarchy, and StateTree tasks are built on shared bases.' },
          { type: 'text', text: 'The guiding rule was that systems communicate through events, gameplay tags, and data assets rather than direct references. Combat applies effects through GAS without ever knowing the target\u2019s type, and configuration lives in data assets so my teammate could tune weapons, items, and enemies without touching code. The aim was that adding new content would slot into the existing framework rather than force changes to it \u2014 and the rest of this page is largely the story of that paying off.' }
      ] },

      { type: 'heading', text: 'Combat on the Gameplay Ability System' },
      { type: 'text', text: 'GAS lets combat states like attacking, blocking, parrying, and staggering be represented as tags, while damage and status effects apply as Gameplay Effects with no direct link between attacker and target. Both the player and the enemies carry health, stamina, and stagger attributes. Blocking feeds the stagger system: when a blocking character is struck, a stagger value builds, and once it hits its maximum the character is stunned for 1.5 seconds \u2014 the opening to punish. Because the attack and block abilities live on the shared base from the previous section, the exact same combat logic drives the player and every enemy instead of being written twice.' },
      { type: 'details', summary: 'Setting GAS up', blocks: [
          { type: 'text', text: 'Combat is built on Unreal\u2019s Gameplay Ability System, a data-driven framework for abilities, attributes, effects, and tags. It is powerful but has a famously steep learning curve and fragmented documentation, so getting it set up correctly was one of the bigger early investments. The pieces I needed were Ability System Components, Gameplay Attributes, Gameplay Effects, and Gameplay Tags.' },
          { type: 'gallery', images: ['assets/The-Hunt/gas_player_slash_effect1.png', 'assets/The-Hunt/gas_player_slash_effect2.png'], caption: 'GAS player slash effects — the attack ability and its cost - how much stamina it needs.' }
      ] },

      { type: 'heading', text: 'Weapons as data' },
      { type: 'text', text: 'Each weapon carries its own animations on its item definition, so a weapon is not a special case in code \u2014 it is a data asset the shared combat system reads. The clips below are the same attack, block, and stagger logic running with different data behind it.' },
      { type: 'clips', items: [
          { src: 'assets/The-Hunt/clip-moveset-1.mp4', poster: 'assets/The-Hunt/clip-moveset-1.jpg', caption: 'A weapon\u2019s moveset.' },
          { src: 'assets/The-Hunt/clip-moveset-2.mp4', poster: 'assets/The-Hunt/clip-moveset-2.jpg', caption: 'A weapon\u2019s moveset. The enemy blocks and gets staggered.' }
      ] },
      { type: 'details', summary: 'Every moveset, and the asset behind them', blocks: [
          { type: 'clips', items: [
              { src: 'assets/The-Hunt/clip-moveset-3.mp4', poster: 'assets/The-Hunt/clip-moveset-3.jpg', caption: 'A weapon\u2019s moveset.' },
              { src: 'assets/The-Hunt/clip-block.mp4', poster: 'assets/The-Hunt/clip-block.jpg', caption: 'Blocking. Stagger builds on every absorbed hit until the guard gives out.' }
          ] },
          { type: 'text', text: 'Adding a weapon costs almost nothing: you create the item definition, set the mesh, assign its animations, and it is ready \u2014 no further code required. That is the whole asset behind one of the movesets above.' },
          { type: 'gallery', images: ['assets/The-Hunt/item-definition.png', 'assets/The-Hunt/item-definition2.png'], fit: 'natural', caption: 'A weapon\u2019s item definition \u2014 type, icon, mesh, combat data and animations, all authored as data rather than code.' }
      ] },

      { type: 'heading', text: 'From first-person to third-person' },
      { type: 'text', text: 'The game did not start out in third person. The early build was first-person, and a large rework late in the project moved it to third \u2014 a deliberate shift to bring it closer to its Soulslike reference points, where seeing your own character and a locked-on target is central to how combat reads. It touched nearly every part of the player.' },
      { type: 'gallery', images: ['assets/The-Hunt/combat-then.jpg', 'assets/The-Hunt/combat-now.jpg'], caption: 'Then and now \u2014 first-person in a greybox test level, and the third-person build it became.' },
      { type: 'details', summary: 'Everything the switch touched', blocks: [
          { type: 'text', text: 'The camera was rebuilt onto a spring arm, a component that holds the camera at a set distance behind the character and handles collision smoothly, which is what made the lock-on camera possible \u2014 keeping a targeted enemy in frame while the player circles. The animations became fully character-driven rather than derived from the weapon, and the dash was reworked to suit the new perspective. It also killed an inverse-kinematics hand system I had spent most of a quarter on, which I come back to further down.' }
      ] },

      { type: 'heading', text: 'Combat feel: combos, reactions, and feedback' },
      { type: 'text', text: 'A Soulslike lives or dies on how combat feels, so a lot of the work went into responsiveness and readability. The attack animations support combos through input buffering: each animation carries two notifies, \u201copen combo window\u201d and \u201cclose combo window\u201d (notifies are markers that fire events at exact moments in an animation). If the player clicks inside that window the input is stored, and when the window closes the character flows straight into the next attack. That buffering is what makes strings feel chainable rather than locking you into isolated swings.' },
      { type: 'gallery', images: ['assets/The-Hunt/animation_notifier_attack1.png', 'assets/The-Hunt/animation_notifier_attack2.png'], fit: 'natural', caption: 'Animation notifiers for combo timing — the exact moments that let attack inputs flow into the next hit cleanly.' },
      { type: 'details', summary: 'Hit reactions, cues, and parry frames', blocks: [
          { type: 'text', text: 'On top of that I added directional hit reactions \u2014 a function works out which direction a hit came from so the matching front, back, or side animation plays, making incoming damage far easier to read. Feedback is layered on through GAS Gameplay Cues: two camera-shake profiles (a heavy one when the player is hit, a shorter punchier one when an enemy is), per-enemy Niagara hit particles, distinct spark VFX for blocks and parries, and per-weapon sound pools that pick a random hit, swing, block, or parry sound on play. ' },
          { type: 'gallery', images: ['assets/The-Hunt/hitreaction_front.gif', 'assets/The-Hunt/hitreaction_back.gif', 'assets/The-Hunt/hitreaction_left.gif', 'assets/The-Hunt/hitreaction_right.gif'], caption: 'Directional hit reactions — front, back, left, and right reactions all trigger from the same hit logic and keep incoming damage readable at a glance.' },
          {type: 'text', text: 'There is a parry window driven by a Parryable state on the enemy\u2019s attack animation, and the player\u2019s hitbox is disabled during a dash for invulnerability frames.'}
      ] },

      { type: 'heading', text: 'Enemy AI, rebuilt on StateTree' },
      { type: 'text', text: 'After QA flagged it as the weakest system, I rebuilt it on Unreal\u2019s StateTree, a visual framework where states and transitions are laid out as a tree. Dedicated evaluators read perception, distance to the player, and combat stats like attack cost, health, stamina, and stagger, feeding those into the transitions \u2014 so the behaviour logic never queries the world directly. The enemy starts in Idle, moves to Patrol and walks its surroundings until it detects the player, then Investigates, pausing briefly to confirm the player is really there before committing to Combat.' },
      { type: 'image', src: 'assets/The-Hunt/statetree-full.png', caption: 'The enemy StateTree \u2014 states, transitions, and the stat-driven conditions that gate them.' },
      { type: 'text', text: 'The hard part was not making the AI capable, it was making it feel fair. An enemy that attacks too often or tracks too precisely breaks the Soulslike feel entirely. Attack-commitment windows, recovery delays, per-state cooldowns, and distance-based attack selection all went in to give the player consistent, readable openings to respond to. It was the single biggest time investment of the project, and the one that most clearly paid for itself.' },
      { type: 'details', summary: 'The first version: a hand-coded state machine', blocks: [
          { type: 'text', text: 'The first enemy AI was a hand-coded C++ state machine driving an enum through Patrol, Alert, Chase, and Attack inside a custom AI controller, using Unreal\u2019s perception component for sight. A successful sight stimulus flipped the enemy to Alert and stopped it moving; a one-second timer then re-checked whether the player was still visible before committing to Chase, which filtered out single-frame sight blips. It worked, and it was genuinely useful as a first pass \u2014 it let me work out what the enemy should do before worrying about structure \u2014 but the logic was hand-written and tightly wound together, so it was rigid and awkward to extend.' },
          { type: 'image', src: 'assets/The-Hunt/state-machine.png', caption: 'The original hand-coded state machine \u2014 functional, but every new behaviour meant more tangled branching.' }
      ] },
      { type: 'details', summary: 'Inside the combat subtree', blocks: [
          { type: 'text', text: 'Combat is the most complex state, and its own subtree. It first runs Chase Player to close the distance, then continuously re-evaluates based on the enemy\u2019s current numbers: it attacks if it has the stamina and health, strafes to reposition while stamina regenerates, or blocks if both are running low. A separate Staggered state takes over the moment the stagger meter fills, briefly stunning the enemy \u2014 the player\u2019s reward for breaking its guard. Because every one of those decisions reads live stats rather than hard-coded conditions, the same tree produces very different fights as the numbers shift.' },
          { type: 'image', src: 'assets/The-Hunt/statetree.gif', caption: 'The StateTree in motion — transitions and evaluators are checked every tick as the enemy reacts to distance, perception, and combat state.' }
      ] },

      { type: 'heading', text: 'The procedural Slay the Spire-style board' },
      { type: 'text', text: 'The roguelike board was the most algorithmically novel part of the project, and I had no prior experience with anything like it. The key insight came early: the board is fundamentally a graph problem, not a spatial one \u2014 the challenge is producing the right connectivity, not placing rooms in space. That reframing led to a four-stage generation pipeline that runs fresh every run, so the path is different every time.' },
      { type: 'details', summary: 'The four-stage generation pipeline', blocks: [
          { type: 'text', text: 'Stage one \u2014 scattering the nodes. Poisson-disk sampling distributes points randomly but with a guaranteed minimum distance between them, so the nodes feel naturally spread out rather than clumping together or landing on a rigid grid.' },
          { type: 'image', src: 'assets/The-Hunt/map-poisson.jpg', caption: 'Stage one \u2014 Poisson-disk sampling scatters nodes with a natural, even spread.' },
          { type: 'text', text: 'Stage two \u2014 working out connections. Delaunay triangulation, via Unreal\u2019s FDelaunay2, runs over those points and computes which nodes are close enough to sensibly connect, producing a clean web of candidate links with no awkward overlapping edges.' },
          { type: 'image', src: 'assets/The-Hunt/map-delaunay.jpg', caption: 'Stage two \u2014 Delaunay triangulation builds the web of candidate connections.' },
          { type: 'text', text: 'Stage three \u2014 carving the routes. From that web, a multi-path A* search carves several distinct routes from the bottom of the map to the top. Running A* repeatedly with weighted penalties on already-used edges pushes the paths to diverge, while still deliberately allowing them to share some junction nodes \u2014 and those shared junctions are exactly what make the player\u2019s route choices meaningful, since a path can split, rejoin another, and split again.' },
          { type: 'gallery', images: ['assets/The-Hunt/map-astar-1.jpg', 'assets/The-Hunt/map-astar-2.jpg'], caption: 'Stage three \u2014 the first A* pass, then several more carving branching routes that share junctions.' },
          { type: 'text', text: 'Stage four \u2014 assigning node types. Each node is given a type \u2014 combat, rest, rune, or random encounter \u2014 spaced along each path so encounters arrive at a steady rhythm rather than clustering. Finally, the generated layout and the player\u2019s position on it persist across level loads, so leaving the board to fight and coming back leaves everything exactly as it was.' }
      ] },
      { type: 'image', src: 'assets/The-Hunt/map-final.jpg', caption: 'The finished board in-engine \u2014 a completely fresh layout on every run.' },
      { type: 'image', src: 'assets/The-Hunt/stsmap.gif', caption: 'The procedural board in motion \u2014 the player moves between generated nodes before entering the next encounter.' },
      { type: 'gallery', images: ['assets/The-Hunt/board-shrine.jpg', 'assets/The-Hunt/board-braziers.jpg', 'assets/The-Hunt/board-brazier-close.jpg', 'assets/The-Hunt/board-wide.jpg'], caption: 'Walking the board \u2014 each node is a physical place you move between, not a menu.' },
      { type: 'note', text: 'The generator is the part of this project with the most behind it. There is a separate write-up going through each stage properly \u2014 the algorithms, the tuning, and the attempts that did not survive.', href: 'project.html?id=the-hunt-map', label: 'Read the full breakdown' },

      { type: 'heading', text: 'Items, inventory, and runes' },
      { type: 'text', text: 'Every item in the game is a UItemDefinition data asset, like the weapon shown earlier \u2014 holding its type, icon, description, and, for weapons, the associated combat data and animations. Nothing is hardcoded as its own class, so new items are authored as pure data, and the inventory gets a single uniform thing to store and pass around whether it is a weapon, a consumable, or a rune.' },
      { type: 'text', text: 'Runes sit on top of that. Each weapon holds three rune slots, and a rune fires its effect the moment the weapon connects with a target. The proof of concept was an on-hit poison rune applying a damage-over-time effect \u2014 and because runes hook into the weapon\u2019s existing hit-detection point, building it was just a matter of defining a new Gameplay Effect. No changes to the combat code at all.' },
      { type: 'image', src: 'assets/The-Hunt/poison-rune.png', caption: 'The poison rune\u2019s definition \u2014 icon, description, and the Gameplay Effect it applies.' },
      { type: 'gallery', images: ['assets/The-Hunt/inventory-then.jpg', 'assets/The-Hunt/inventory-now.jpg'], caption: 'The inventory, then and now \u2014 an empty grid in a greybox level, and the finished UI.' },
      { type: 'details', summary: 'Inventory internals, and the instancing rework', blocks: [
          { type: 'text', text: 'The inventory itself is three parts working together: a UInventoryComponent that holds item data and can attach to any character, a UInventorySubsystem that registers each inventory so other systems can look one up by its owning actor without holding a direct reference, and a UI that talks to the component purely through events.' },
          { type: 'text', text: 'Getting there took one rework that was invisible but essential. Originally every item of a type pointed at a single shared definition, so slotting a rune into one sword modified every sword in the game \u2014 including the ones enemies were holding. I reworked it so each non-stackable item creates and holds its own instance of its definition, keeping changes local to that weapon. Tracking that down was a prerequisite for runes working at all.' },
          { type: 'clip', src: 'assets/The-Hunt/clip-inventory-rune.mp4', poster: 'assets/The-Hunt/clip-inventory-rune.jpg', caption: 'Slotting the poison rune into a weapon \u2014 the modification stays on that one weapon, which is what the instancing rework bought.' },
          { type: 'text', text: 'The UI around it was rebuilt too, from a bare grid in a greybox level into something that actually communicates: item hover panels showing stats and slotted runes, a separate perk inventory, and the ability to drop, rearrange, and equip directly from the slots.' }
      ] },

      { type: 'heading', text: 'Persistence and map events' },
      { type: 'text', text: 'On top of the board sits a data-driven random-encounter system. Reaching an encounter node opens a short event with its own description, requirements, possible rewards, and UI, turning the map into more than a route between fights. The event is configured as data rather than hardcoded as a one-off sequence, so the same structure can support different kinds of choices while keeping the player\u2019s inventory and progression connected to the outcome.' },
      { type: 'gallery', images: ['assets/The-Hunt/sts_combat.png', 'assets/The-Hunt/sts_heal.png'], caption: 'Different board outcomes: a combat node asks the player to face what awaits, while a healing node restores health before the next leg of the run.' },
      { type: 'details', summary: 'How state survives the trip between levels', blocks: [
          { type: 'text', text: 'Progression, attributes, the equipped weapon and its runes, the inventory, and perks are all gathered into a single serializable structure that survives the move between the board and the combat levels. The tricky part is that runtime objects only exist while a level is loaded and are destroyed the moment the player travels, so anything that needs to persist has to be stored as data that can safely be carried across \u2014 a distinction that caused several subtle bugs before the system was reliable. Because everything already lives in one serializable structure, it extends cleanly to full save-and-load to disk; for this scope it persists between worlds within a session, which is all the slice needs.' }
      ] },
      { type: 'details', summary: 'The encounters, end to end', blocks: [
          { type: 'text', text: 'The encounters I built included tool-usage events, trades, and push-your-luck decisions. Each one asks the player to weigh a cost against a possible benefit: give up something useful now, accept a risk, or leave with no reward. The result is a small layer of uncertainty between combat nodes, while the underlying system stays consistent enough to extend with new encounter data.' },
          { type: 'heading', text: 'Finding a poison rune' },
          { type: 'text', text: 'One example is the poison rune encounter. The player discovers the rune through a short narrative prompt, then the reward is placed into the inventory rather than being treated as a purely visual event. This connects the map event directly to the item and rune systems: the rune can later be slotted into a weapon and apply its damage-over-time Gameplay Effect when that weapon connects with a target.' },
          { type: 'gallery', images: ['assets/The-Hunt/sts_poisonrune1.png', 'assets/The-Hunt/sts_poisonrune2.png'], caption: 'The poison rune encounter \u2014 the discovery prompt followed by the rune being added to the inventory.' },
          { type: 'heading', text: 'Trading a weapon for a weapon' },
          { type: 'text', text: 'A second encounter presents a more direct trade. The player finds a supply crate and is told that something valuable is trapped beneath the debris. The encounter requires a weapon as the cost, and after giving one up the player receives a Normal Sword in return. This demonstrates the event system reading the player\u2019s inventory, checking an item requirement, removing the offered item, and granting the configured reward through the same data-driven flow.' },
          { type: 'gallery', images: ['assets/The-Hunt/sts_randomencounter1.png', 'assets/The-Hunt/sts_randomencounter2.png', 'assets/The-Hunt/sts_randomencounter3.png'], caption: 'A weapon-trade encounter \u2014 discovering the supply crate, showing the weapon requirement, and receiving the Normal Sword.' }
      ] },

      { type: 'heading', text: 'What went wrong' },
      { type: 'text', text: 'Plenty. The biggest single loss was the inverse-kinematics weapon system \u2014 a full IK setup targeting specific bones on a weapon so weapons could be swapped and animated from weapon position alone, making new weapons cheap to add. It worked, took a large chunk of a quarter, and was cut after feedback in favour of per-weapon animation, which simply looked better and survived the move to third person. The irony is that the goal behind it \u2014 cheap new weapons \u2014 is exactly what the data-driven item definitions ended up delivering, through a far simpler route.' },
      { type: 'image', src: 'assets/The-Hunt/ik-hands.jpg', caption: 'The IK system that did not make it \u2014 hands solved onto bone sockets on the weapon.' },
      { type: 'details', summary: 'Estimates, and the rest of the damage', blocks: [
          { type: 'text', text: 'The enemy AI was built twice. The inventory was rebuilt from the ground up. The project also became corrupted twice, costing several days each time, and packaging surfaced bugs that never appeared in the editor \u2014 several of which I only caught two days before the deadline.' },
          { type: 'text', text: 'The estimates were the other recurring problem. The enemy AI was budgeted at around 30 hours and took well over 100 across two rewrites. What held up better was the scope itself: even when individual systems overran, I always had a clear picture of which features were essential to the slice and which could be cut, which is what kept it coherent. The lesson I actually took from it is to build far more slack into estimates for engine features I have never used, and to treat \u201cmake it feel good\u201d as its own significant task rather than folding it into implementation time.' },
          { type: 'image', src: 'assets/The-Hunt/planning-board.jpg', caption: 'The Hack\u2019n\u2019Plan board \u2014 weekly goals, roughly 600 hours across the minor.' }
      ] },

      { type: 'quote', text: 'More than any single feature, what I\u2019m most satisfied with is the quality of the decisions behind it \u2014 choosing GAS, choosing StateTree, designing the character hierarchy the way I did. Each came from researching the options, weighing alternatives, and committing.' },

      { type: 'heading', text: 'What I took away' },
      { type: 'text', text: 'I came in having never shipped anything in Unreal and came out fluent in its gameplay framework, GAS, StateTree, and the C++/Blueprint split that actually works \u2014 C++ for data structures, interfaces, and core logic, Blueprint for presentation and configuration. Some calls turned out wrong and had to be redone, but even those sharpened my judgement on when a clever general system is worth building and when a simpler one fits the scope better. It is technically ambitious for a student project and it is not something I plan to leave as it is \u2014 I intend to keep building on it.' },
      { type: 'note', text: 'This is the condensed version. The full technical write-up \u2014 the research behind each decision, all four QA sessions and what changed because of them, and the complete source \u2014 lives on GitHub.', href: 'https://github.com/Damyan23/TheHunt/tree/main', label: 'Read more on GitHub' }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  //  DEEP DIVE — a child page of The Hunt
  //  hidden: true       → kept off the homepage list and out of the pager
  //  parent: 'the-hunt' → back link + header read as part of The Hunt
  //  Reached from the note block in The Hunt's board section.
  //  The TODO blocks below are yours to write — the structure, images
  //  and navigation are already wired up.
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'the-hunt-map',
    hidden: true,
    parent: 'the-hunt',
    title: 'A procedural roguelike board that never repeats',
    short: 'The between-combat map in The Hunt is generated from scratch every run. Scatter the nodes, work out which ones should connect, then carve several routes through the result that branch apart and meet again.',
    media: { type: 'image', src: 'assets/The-Hunt/map-final.jpg' },
    skills: ['C++', 'Unreal Engine 5', 'Procedural Generation', 'Graph Algorithms'],
    meta: { Role: 'Sole Engineer', Engine: 'Unreal Engine 5 (C++)', Year: '2025-2026', 'Part of': 'The Hunt' },
    github: 'https://github.com/Damyan23/The-Hunt',
    download: '',
    content: [
      { type: 'text', text: 'Between fights, The Hunt drops you onto a board of nodes and lets you pick your way up it — a fight here, a rest there, a stranger who wants to trade. It is the structure Slay the Spire made familiar. None of it is placed by hand. The whole layout is generated fresh every run.' },
      { type: 'text', text: 'That means the generator has to guarantee a few things on its own, without anyone checking the result. You must be able to get from the bottom to the top. There have to be several routes, and they have to be different enough that picking one is a real decision. Those routes need to touch in places, so the board reads as a web of choices rather than a set of parallel corridors. And it has to hold up on every seed, not just the ones I happened to look at. Everything below is a consequence of that list.' },
      { type: 'image', src: 'assets/The-Hunt/map-final.jpg', caption: 'The finished board in-engine — a completely fresh layout on every run.' },

      { type: 'heading', text: 'Why a graph and not a level' },
      { type: 'text', text: 'My first instinct was to think about this as a space: where do the nodes sit, how far apart, how do I stop them overlapping. That framing gets you stuck quickly, because none of those questions are the ones that decide whether the board is any good.' },
      { type: 'text', text: 'The reframe that unlocked it was realising the board is a graph problem, not a spatial one. What matters is which nodes connect to which — the connectivity. Where they sit on screen is presentation. Once I stopped trying to design a layout and started trying to produce a set of connections, the problem split cleanly into stages I could solve one at a time: place some points, decide which pairs are neighbours, then find routes through the result.' },
      { type: 'image', src: 'assets/The-Hunt/sts-reference.jpg', caption: 'The reference point — Slay the Spire\u2019s branching map.' },

      { type: 'heading', text: 'Stage one: scattering the nodes' },
      { type: 'text', text: 'The nodes are placed by Poisson-disk sampling, which scatters points at random but guarantees a minimum distance between any two of them. That guarantee is the entire reason to use it. Pure random placement clumps — you get three nodes on top of each other and a dead patch beside them. A grid does not clump, but it reads as a grid, and a board that looks machine-made undoes the point of generating it.' },
      { type: 'text', text: 'Poisson-disk sits between the two: irregular enough to look organic, even enough that nothing collides. It also does the next stage a favour, because a well-spread set of points produces a much cleaner set of connections than a clumped one would.' },
      { type: 'image', src: 'assets/The-Hunt/map-poisson.jpg', caption: 'Stage one — Poisson-disk sampling scatters nodes with a natural, even spread.' },
      { type: 'details', summary: 'How Poisson-disk sampling actually works', blocks: [
        { type: 'text', text: 'It grows outward from a single seed point. That point goes onto an active list, and the algorithm repeatedly picks one point off that list and tries to spawn a neighbour: generate a candidate somewhere in the ring between one and two radii away, check whether it is far enough from everything already placed, and if it is, keep it and add it to the active list too. If several candidates in a row all fail, that point is considered surrounded and comes off the list. When the list empties, the space is full.' },
        { type: 'text', text: 'The part that makes it practical is the background grid. Checking a candidate against every existing point would get slower as the board fills up. Instead the space is divided into cells small enough that each holds at most one point, so a candidate only has to be compared against the handful of cells immediately around it. The check stays the same cost whether there are ten points down or a thousand.' }
      ] },

      { type: 'heading', text: 'Stage two: candidate connections' },
      { type: 'text', text: 'A cloud of points is not a board yet — nothing is connected. The connections come from Delaunay triangulation, which takes a set of points and joins them into triangles in the way that avoids long, thin slivers. In practice it gives you exactly what you want here: every node ends up linked to the nodes actually nearest to it, and no two links cross each other.' },
      { type: 'text', text: 'Unreal ships this as FDelaunay2 in its geometry module, so I did not have to implement it. The work was on either side of the call — feeding the sampled points in, and turning the triangles that come back out into the thing the next stage needs, which is a flat list of connected pairs with the duplicates removed. Every triangle shares its edges with its neighbours, so the raw output lists most connections twice.' },
      { type: 'image', src: 'assets/The-Hunt/map-delaunay.jpg', caption: 'Stage two — Delaunay triangulation builds the web of candidate connections.' },
      { type: 'details', summary: 'Why triangulate instead of just linking nearby nodes', blocks: [
        { type: 'text', text: 'The obvious alternative is to connect every node to whatever is within some distance of it. That fails in both directions at once: in a dense patch a node ends up with eight connections and the board turns to mush, and in a sparse corner a node ends up with none and becomes unreachable. Tuning the distance to fix one end breaks the other, and since the point spread is random, there is no value that works on every seed.' },
        { type: 'text', text: 'Triangulation sidesteps the problem because it is defined by the points themselves rather than by a number I have to pick. Dense areas get short connections, sparse areas get long ones, everything gets connected to its actual neighbours, and nothing crosses. No tuning, and it behaves the same on every seed.' }
      ] },

      { type: 'heading', text: 'Stage three: carving the routes' },
      { type: 'text', text: 'Now the board is a fully connected web, which is too much — you could wander anywhere. The routes are carved out of it with A*, the standard shortest-path search, run once per route from the bottom of the board to the top. The first route is close to a plain A* run, with a small fraction of connections randomly withheld so that two boards with similar node layouts do not produce the same first path.' },
      { type: 'text', text: 'The routes after that are where the design actually lives, because A* finds the best path, and the best path is the same path every time. Run it four more times unchanged and you get four identical routes. Something has to push each new run somewhere else, and what that something is turns out to decide whether the board feels like a set of choices or a set of corridors.' },
      { type: 'text', text: 'My answer is to pick a few shared junctions and force every route through them. Two or three nodes are chosen off the first route, spaced evenly along it, and every later route is required to visit all of them in order. Between those fixed points it is free to go wherever it likes — and to make sure it goes somewhere different, roughly forty per cent of the previous route\u2019s nodes are blocked off before the search runs, so it physically cannot retrace the same line. The result is routes that split apart, meet at a junction, and split again, which is exactly the shape that makes choosing one of them mean something.' },
      { type: 'gallery', images: ['assets/The-Hunt/map-astar-1.jpg', 'assets/The-Hunt/map-astar-2.jpg'], caption: 'Stage three — the first A* pass, then several more carving branching routes that share junctions.' },
      { type: 'details', summary: 'Forcing a search through waypoints', blocks: [
        { type: 'text', text: 'A* does not take waypoints, so a route through two junctions is really three separate searches — start to the first junction, first to second, second to the end — run back to back and stitched together, dropping the duplicated node at each join. If any one of those three legs fails, the whole route fails, which matters more than it sounds like it should once nodes are being blocked off.' },
        { type: 'text', text: 'The junctions are always taken from the first route rather than from whichever route was generated last. That gives the board a single shared spine that every route touches. Picking them from the previous route instead would let the junctions drift across the board, and the structure would slowly come apart over five routes rather than converging.' },
        { type: 'text', text: 'The blocked-off nodes are the previous route\u2019s interior only. Its start, its end, and any junction are always left alone, because blocking one of those guarantees a failed search. Forty per cent is a tuned number: too low and the new route hugs the old one, too high and there is not enough graph left to find a legal way through.' }
      ] },

      { type: 'heading', text: 'Stage four: node types and pacing' },
      { type: 'text', text: 'With the routes drawn, each node gets a type: a combat encounter, a rest, a rune, or a random event. These are spaced along each route rather than rolled independently per node, because rolling independently is how you get three rests in a row on one route and nothing but fights on the next. Spacing them gives every route the same rhythm of pressure and relief regardless of which one the player takes, which matters because the routes are not all the same length.' },

      { type: 'heading', text: 'Making the board a place' },
      { type: 'text', text: 'None of the above is a map yet — it is a list of positions and connections. The last stage builds the actual space: each node becomes a physical marker you walk up to, the connections between them become the visible paths, and the player moves between them on foot rather than clicking a menu. The board is somewhere you are standing, which is a deliberate choice for a horror game. Picking your next fight while stood in the snow lands differently than picking it off a screen.' },
      { type: 'text', text: 'The harder half is that the board has to survive you leaving it. Choosing a combat node loads a different level entirely, and coming back has to return you to the same board, at the same node, with everything you were carrying. Everything alive in a level is destroyed when you travel, so the board cannot simply be left sitting there — its layout and your position on it are stored as plain data that outlives the level, and rebuilt when you return.' },
      { type: 'image', src: 'assets/The-Hunt/stsmap.gif', caption: 'The procedural board in motion — the player moves between generated nodes before entering the next encounter.' },
      { type: 'gallery', images: ['assets/The-Hunt/board-shrine.jpg', 'assets/The-Hunt/board-braziers.jpg', 'assets/The-Hunt/board-brazier-close.jpg', 'assets/The-Hunt/board-wide.jpg'], caption: 'Walking the board — each node is a physical place you move between, not a menu.' },
      { type: 'details', summary: 'Carrying a run across a level load', blocks: [
        { type: 'text', text: 'Travelling between levels wipes everything that exists in the world, so anything that has to persist is gathered into one structure first: the generated board, where the player is standing on it, their attributes and progression, their inventory, and the weapon they are holding along with whatever runes are slotted into it. That structure lives outside the level and is read back and reapplied once the new one has loaded.' },
        { type: 'text', text: 'The bugs here were the fiddly kind. Anything that got stored as a reference to a live object rather than as data came back empty on the other side, and because the symptom is always "the thing you had is gone" it never points at which system dropped it. The upside is that once everything the run needs is already in one serialisable structure, saving to disk between sessions is writing that same structure to a file rather than a new system.' }
      ] },

      { type: 'heading', text: 'What broke along the way' },
      { type: 'text', text: 'The first version of the divergence trick was simply wrong. Instead of blocking nodes from the previous route, it withheld random connections from the whole graph before each search — which sounds similar and is not, because it has nothing to do with where the previous route actually went. Sometimes it nudged a route aside, sometimes it removed connections nowhere near it and changed nothing, and I had no way to predict which. It only became obvious once I stopped thinking about connections and started thinking about the route as a set of nodes I wanted the next search to avoid.' },
      { type: 'text', text: 'Blocking nodes introduced its own failure, though: block the wrong combination and a junction becomes unreachable, and the whole route fails rather than degrading. So a failed search retries on the untouched graph. That always finds a route, but it finds one that looks a lot like the previous one, so a run that hits the fallback quietly produces a flatter board. Duplicate routes are caught and thrown away at the end too, which is a check rather than a fix — it detects that two searches converged, it does not stop them converging.' },
      { type: 'text', text: 'The broader lesson was about time. I had the three algorithms working reasonably early, and assumed that meant the board was nearly finished. Almost all of the remaining work was the things around them — turning a graph into a walkable space, pacing the node types, and persisting the whole thing across a level load — and the map ended up overrunning its estimate by a long way.' },

      { type: 'heading', text: 'What I would do differently' },
      { type: 'text', text: 'The pipeline itself I would keep. Poisson-disk into Delaunay into a repeated A* is a good fit for this shape of board, and each stage is replaceable without disturbing the others.' },
      { type: 'text', text: 'What I would change is how the generator handles its own failures. Right now the fallback path and the duplicate check are both reactions after the fact, and they hide their effects — the board is simply less interesting that run, with nothing on screen to say so. I would rather generate a full set of routes, score the result on how much the routes actually diverge, and regenerate from scratch if it comes out under a threshold. A few discarded attempts cost nothing at load time, and it would replace two quiet degradations with one explicit quality bar. I would also want a seed I can type in, because every one of the bugs above was found by accident and could not be reproduced on demand.' },

      { type: 'note', text: 'The generator lives in the repository if you want to read the implementation itself.', href: 'https://github.com/Damyan23/TheHunt/tree/main', label: 'View the source' }
    ]
  },
  {
    id: 'castle-siege',
    title: 'Castle Siege',
    short: 'A 3D tower-defence prototype in Unity — build towers along the route, spend what the dead drop, keep the castle standing. Most of my time went into the status-effect system: burns and slows are data assets with their own build-up rules, so adding a new one means authoring an asset rather than editing tower or enemy code. What I am proudest of is that nothing in the game holds a reference to anything else — every system just reacts to events.',
    media: { type: 'video', src: 'assets/Castle-Siege/castle-siege.mp4', poster: 'assets/Castle-Siege/hero.png' },
    skills: ['C#', 'Unity', 'NavMesh', 'ScriptableObjects', 'Event-Driven Architecture', 'Gameplay Systems', 'UI Programming'],
    status: 'Playable prototype',
    meta: { Role: 'Gameplay & systems programmer', Engine: 'Unity 2022', Year: '2024', Team: 'Solo' },
    github: 'https://github.com/Damyan23/Castle-Siege',
    download: 'assets/Castle-Siege/Castle-Siege.rar',
    // Child pages of this project. Each id must exist in PROJECTS below.
    // HIDDEN \u2014 hex map page is offline until the generator works again. Uncomment to restore.
    // subpages: ['hex-map-generator'],
    content: [
      { type: 'text', text: 'Castle Siege is a 3D tower-defence prototype in Unity. Enemies walk a fixed route toward your castle, you build towers along it with the gold they drop, and you try to survive every wave. The level is hand-built, with the road marked so towers cannot be placed on it. That was deliberate — the map was never the interesting part of this project.' },
      { type: 'video', src: 'assets/Castle-Siege/castle-siege.mp4', poster: 'assets/Castle-Siege/hero.png', caption: 'A full round — placing towers, upgrading them, and holding the line as the waves get heavier.' },

      { type: 'heading', text: 'How it fits together' },
      { type: 'text', text: 'Two ideas hold the codebase up. The first is a single object, GameManager, owning the handful of systems everything else needs to reach: input, placement, gold, damage numbers, selection. They are wired up once at startup, so no script ever goes searching the scene for another one.' },
      { type: 'text', text: 'The second is that systems never call each other directly — they announce things. When an enemy dies it raises an event, and three unrelated systems answer on their own terms: gold goes up, the wave counter ticks down, a coin label floats off the corpse. None of them knows the other two exist. Same for buying a tower, the castle taking a hit, winning the game. The rule was that a system may read from GameManager, but may only tell the rest of the game something by raising an event.' },
      { type: 'text', text: 'I drew a class diagram alongside the code rather than reconstructing one at the end, and it earned its keep — a class with arrows running out to six others is usually a class doing too much. It runs to about forty types, so the images below show one region of it at a time.' },
      { type: 'note', text: 'The complete diagram, as vector, if you want to see the whole shape at once.', href: 'assets/Castle-Siege/UML_Diagram.pdf', label: 'Open the full diagram (PDF)' },
      { type: 'image', src: 'assets/Castle-Siege/uml-managers.png', caption: 'The manager layer. Every arrow out of EventManager, bottom left, is an announcement something else chose to listen for.' },
      { type: 'details', summary: 'What the event layer actually carries', blocks: [
        { type: 'text', text: 'Seven signals, all of them plain C# events on a static class: an enemy died, the castle was hit, the castle fell, a tower was bought, a tower was refunded, a tower was clicked, the game was won. Each one carries only what a listener could not work out for itself — the enemy that died, the tower that was bought, the amount of damage taken — and nothing else.' },
        { type: 'text', text: 'The payoff showed up somewhere I did not expect it. Debug tooling cost almost nothing to write, because every hook it needed already existed: infinite money listens for the gold-removed signal and immediately puts the gold back, and forcing a win or a loss is one line each. I would not have bothered building any of that if it had meant threading references through five systems first.' }
      ] },

      { type: 'heading', text: 'Placing towers' },
      { type: 'text', text: 'Placement snaps to a grid laid over the terrain. The cursor is raycast onto the ground, converted into a cell and back out again so it lands on that cell\u2019s centre, then dropped to the terrain height underneath so the marker follows hills instead of floating over them.' },
      { type: 'text', text: 'Clicking a build button spawns the real tower immediately, with its logic switched off and a copy of its material so it can be tinted — the preview is the actual tower, not a stand-in that has to be kept in sync with it. It follows the highlighted cell, and a box the size of that cell checks what is already there. Overlap another tower or any part of the road and it turns red, and the click does nothing. Left click places, right click cancels.' },
      { type: 'gallery', images: ['assets/Castle-Siege/placement.png', 'assets/Castle-Siege/placement_incorrect.png'], caption: 'The same preview on a legal cell and on the road, where placement is blocked.' },
      { type: 'image', src: 'assets/Castle-Siege/uml-placement.png', caption: 'Four small classes: one reads the mouse, one snaps the cell, one decides whether the cell is legal, one animates the drop.' },
      { type: 'details', summary: 'The details that were easy to get wrong', blocks: [
        { type: 'text', text: 'Copying the material matters more than it looks. Tinting the shared material would have recoloured every tower of that type already standing on the map, so the preview gets its own copy on creation and the original is put back the moment it is placed.' },
        { type: 'text', text: 'The range indicator caused a subtler bug. It is built out of line renderers at click time, and those lines are created as children of the tower — which put them on the tower layer, which meant the placement check saw them as solid geometry and refused every cell inside an existing tower\u2019s range. Moving the generated lines onto a layer nothing collides with fixed it.' },
        { type: 'text', text: 'Gold is charged the moment the preview spawns, not when it lands, and refunded if the player cancels. It reads backwards in the code, but it is the behaviour that feels right: the affordability check on the build buttons updates instantly, so you can never queue up a tower you can no longer pay for.' }
      ] },

      { type: 'heading', text: 'Towers and targeting' },
      { type: 'text', text: 'Every tower runs the same loop: wait for the cooldown, check whether an enemy is in range, turn toward it, fire. If nothing is in range it picks a new target using whichever rule the player chose — closest, toughest, fastest, or melee only. All of that lives in one shared base class, so the three tower types only fill in what genuinely differs.' },
      { type: 'text', text: 'Aiming is what differs most. The ballista points both of its pivots straight at the target. The cannon has to account for height as well, so it turns on the flat first and then raises or drops the barrel. The mage tower only turns left and right, because a bolt of lightning does not need a barrel lined up with anything.' },
      { type: 'gallery', images: ['assets/Castle-Siege/tower-ballista.png', 'assets/Castle-Siege/tower-cannon.png', 'assets/Castle-Siege/tower-mage.png'], caption: 'Three towers, three ways of aiming — flat tracking, turn-then-elevate, and turn only.' },
      { type: 'image', src: 'assets/Castle-Siege/uml-towers.png', caption: 'Everything shared sits in the Tower base in the middle. Ballista, Cannon and Mage carry almost nothing by comparison.' },
      { type: 'text', text: 'Upgrades are a list per tower type — each entry holds the next model, its cost and its numbers. Placement reads the first entry of that same list, so a tower\u2019s stats only ever live in one place.' },
      { type: 'details', summary: 'How an upgrade actually happens', blocks: [
        { type: 'text', text: 'Each entry in the list carries a prefab, a cost and a stat block: damage, fire rate, range, plus blast radius or slow factor where the type uses them. Upgrading finds the tower\u2019s current tier, spawns the next prefab at the same position, applies that tier\u2019s stats, plays the stretch-and-bounce animation and destroys the old one. Because placement applies tier one from the same list, there is no second copy of a tower\u2019s numbers anywhere.' },
        { type: 'text', text: 'Finding the current tier is the ugly part: it matches the live object\u2019s name against the prefab name plus Unity\u2019s "(Clone)" suffix. It works, and it is the first thing I would replace — storing a tier index on the tower component would do the same job without depending on a naming convention.' }
      ] },

      { type: 'heading', text: 'Projectiles' },
      { type: 'text', text: 'All projectiles share a base class handling the boring half: damage, speed, lifespan, movement, and noticing when they hit something. The ballista bolt is the simple case — it flies straight and damages what it reaches.' },
      { type: 'text', text: 'The cannonball does not chase anything. On firing it locks in where it launched from and where it is going to land, then follows a curved arc between the two, facing along that curve so it reads as a real shell rather than a sliding object. When it lands it damages everything nearby, weaker the further out. That makes the cannon different to play with: it punishes a bunched-up group, and it misses if the target has moved on.' },
      { type: 'image', src: 'assets/Castle-Siege/cannon-explosion.png', caption: 'The cannon fires on an arc and hits an area, rather than tracking one enemy.' },
      { type: 'image', src: 'assets/Castle-Siege/uml-projectiles.png', caption: 'The base class does the flying; each type only overrides what happens on impact.' },
      { type: 'details', summary: 'The arc, in detail', blocks: [
        { type: 'text', text: 'The curve is a quadratic Bézier, which is just two straight interpolations nested inside each other. Start and end are captured on firing, and the control point is the midpoint of the two lifted straight up by the apex height — raise that one number and the shell lobs higher without any other part of the maths changing. A single value walks from 0 to 1 over the flight and gives the position at each frame.' },
        { type: 'text', text: 'Facing comes from sampling the curve a fraction further along and pointing the shell at where it is about to be, which is cheaper and steadier than differentiating it. On landing it walks the list of live enemies, takes everything inside the blast radius, and scales the damage by how far out each one is, clamped so nothing at the edge ends up healing.' }
      ] },

      { type: 'heading', text: 'Chain lightning' },
      { type: 'text', text: 'The mage tower has no projectile at all. It draws a bolt as a line between itself and its target and rebuilds it every frame, pinned at both ends and pushed off course in the middle by a controlled wobble — enough to read as lightning, not so much that it looks like noise. The chain works outward from there: from the enemy it just hit, it finds the nearest one it has not hit yet and is still close enough to reach, damages it, and draws another bolt, repeating until it runs out of targets or hops. Each jump is thinner than the last, so the strike visibly weakens as it spreads.' },
      { type: 'image', src: 'assets/Castle-Siege/lightning-chain.png', caption: 'One shot, several targets. Each jump is a thinner line than the one before it.' },
      { type: 'details', summary: 'Drawing something that reads as lightning', blocks: [
        { type: 'text', text: 'The bolt is a line with a handful of points, the count taken from the distance so a long shot does not end up coarser than a short one. Each interior point is pushed off the straight line in a random direction perpendicular to it, and that push is scaled by a curve that is zero at both ends and largest in the middle. That envelope is the whole trick: the bolt stays welded to the tower and the enemy, and only misbehaves in between.' },
        { type: 'text', text: 'The chain is recursive, and the two things keeping it honest are a list of everything already hit — so it cannot bounce back and forth between the same pair — and a hop limit. Each new link gets its own line, drawn thinner than its parent. A short timer holds the whole structure on screen, drives the looping sound, and tears every line down when it runs out.' }
      ] },

      { type: 'heading', text: 'Status effects as data' },
      { type: 'text', text: 'This is the system I am happiest with. Burns and slows are not damage checks bolted onto towers — they are data assets, each with its own rules for how much punishment triggers it and how long it lasts. Every hit adds charge toward that threshold, and while the effect is still building, that charge drains away again. One lightning hit does nothing lasting; keeping fire on the same enemy is what sets it off. That one rule is what makes the towers feel better together than apart.' },
      { type: 'text', text: 'Each enemy carries its own copy of whichever effects are on it, updated on a fixed tick rather than every frame, so two burning enemies never share one timer. A burn deals damage per tick; a slow cuts movement speed and restores it afterwards, with a guard so it cannot stack into a frozen enemy. Adding a third effect means authoring a new asset — not touching towers or enemies.' },
      { type: 'image', src: 'assets/Castle-Siege/status-effects.png', caption: 'Two rings per icon: the outer one fills as the effect builds up, the inner one drains once it has triggered.' },
      { type: 'image', src: 'assets/Castle-Siege/uml-status-effects.png', caption: 'The asset in the middle defines the behaviour. Burn and slow override two methods each and nothing else.' },
      { type: 'details', summary: 'How damage carries an effect with it', blocks: [
        { type: 'text', text: 'Towers do not pass a number when they hit something. They pass a small bundle: the damage, which effect it applies, how much charge it adds, and how hard it slows. The enemy unpacks that bundle in one place — spawn the floating damage label, push the charge into its own effect manager, then apply the damage. Adding a new debuff means authoring an asset and filling in its numbers; it does not mean touching the tower or the enemy.' },
        { type: 'text', text: 'The icons above enemies are driven by three callbacks the manager fires: activate, update, deactivate. On activation the UI spawns an icon once and caches the two fill images inside it, so the per-tick update is two numbers assigned and nothing else. Deactivating hides the icon instead of destroying it, so an enemy that keeps getting re-burned is not allocating a fresh one every time.' }
      ] },

      { type: 'heading', text: 'Enemies, waves and gold' },
      { type: 'text', text: 'Enemies use Unity\u2019s built-in pathfinding to walk to the castle, then stop and attack. Melee enemies land damage from their animation, so the hit connects on the swing rather than on contact; ranged enemies fire an arrow that only cares about the castle. One running list of every live enemy is kept up to date, and the cannon blast and the lightning chain read from it instead of searching the scene.' },
      { type: 'image', src: 'assets/Castle-Siege/uml-enemies.png', caption: 'Melee and ranged add three things between them — the difference between the two is mostly in the prefab.' },
      { type: 'text', text: 'Waves are data too: enemy types and counts, how fast they come, how many at once. Each wave counts down on screen, spawns in random groups, and waits until the field is empty before the next starts. The gold counter does nothing but listen — enemy died, tower bought, tower refunded — so it cannot drift out of step with what actually happened.' },
      { type: 'image', src: 'assets/Castle-Siege/enemy-wave.png', caption: 'A wave on its way in. Every enemy carries gold it drops when it dies.' },
      { type: 'details', summary: 'Debug tooling', blocks: [
        { type: 'text', text: 'Four toggles on single keys: clear the field instantly, make the castle invincible, infinite money, and force a game over. The invincible one is my favourite piece of laziness — instead of special-casing the castle, it temporarily zeroes every enemy\u2019s damage, which is one line and behaves identically.' },
        { type: 'text', text: 'It sounds trivial, but it is the reason wave pacing and the upgrade curve got tuned at all. Testing whether tier three of the cannon is worth its cost is unbearable if you have to earn the gold first, and any balance pass I could not repeat in ten seconds is one I would simply not have done.' }
      ] },

      { type: 'heading', text: 'What I would change' },
      { type: 'text', text: 'The closest-target search scans the scene every time it runs, even though a list of live enemies already sits three files away. The tower menu recalculates the whole upgrade chain every frame instead of once, on selection. And there is an Ice status type in the code with nothing behind it. None of it breaks the prototype, which is exactly why it survived — but it is the gap between something that works and something I would hand to another programmer.' },

      { type: 'heading', text: 'Where it goes next' },
      { type: 'text', text: 'The real limitation is the map. One hand-built terrain with one route means every round is played on the same board. So the map is what I am replacing: a generated hex grid with its own terrain weighting and its own pathfinding. I built it separately rather than growing it inside this project, because nothing above cares what shape a cell is — only whether you can build on it and where the enemies walk.' },
      // HIDDEN \u2014 hex map page is offline until the generator works again. Uncomment to restore.
      // { type: 'note', text: 'The hex grid and the route-finding that runs on it are a project of their own.', href: 'project.html?id=hex-map-generator', label: 'Read that write-up →' }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  //  THE SCORCH — second project.
  //  Reconstructed from the repo + the team's design/justification doc.
  //  Remaining 'TODO —' markers are things neither source could answer.
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'the-scorch',
    title: 'The Scorch',
    short: 'A 3D open-world desert adventure in Unity \u2014 sail a sand boat between ancient ruins, and rebuild a lost world\u2019s story from what you find. One of two engineers on a six-person team. My focus was the in-world book that carries the journal, map, inventory and settings as one interface, and I am proud that it holds together across pausing, tab switching and scene changes instead of coming apart at the seams.',
    media: { type: 'video', src: 'assets/The-Scorch/The-Scorch-Trailer.mp4', poster: 'assets/The-Scorch/hero.png' },
    skills: ['C#', 'Unity', 'UI Programming', 'ScriptableObjects', 'FMOD', 'Systems Design'],
    status: 'Playable prototype',
    meta: { Role: 'Engineer \u2014 systems, UI & world interaction', Engine: 'Unity 2022.3 (URP)', Year: '2025', Team: 'Six-person team' },
    github: 'https://github.com/Jasper-Nijkamp/Project-Startup',
    download: 'assets/The-Scirch/The-Scorch.zip',
    content: [
      { type: 'text', text: 'The Scorch was a Unity prototype built in a short sprint with a six-person team, and most of my work sat in the systems and UI layer. My role was the engineer behind the book interface, the discovery loop, the inventory/data model, scene persistence, and the day/night lighting system.' },
      { type: 'video', src: 'assets/The-Scorch/The-Scorch-Trailer.mp4', poster: 'assets/The-Scorch/hero.png' },
      { type: 'text', text: 'The design goal was not “add a menu,” but “make the world feel readable through what the player finds.” That is why the interface lived in a physical book rather than a separate HUD: the journal, map, settings, and inventory all shared one interaction model, and the world only became legible after a structure had actually been discovered.' },

      { type: 'heading', text: 'The book as the game interface' },
      { type: 'text', text: 'The main UI object was the in-world book. In code, BookManager centralised the active tab, open/closed state, pause logic, cursor locking, and the keyboard shortcuts for J, M, I, and Escape. It toggled the relevant panel, reset the button sprite state, and ensured the game paused while the book was open without leaving the player stuck in an inconsistent state during scene transitions or tab changes.' },
      { type: 'image', src: 'assets/The-Scorch/inventory_book.png', caption: 'The interactive book — a single, persistent UI layer for discovery, inventory, and world information.' },
      { type: 'details', summary: 'Why the book mattered so much', blocks: [
        { type: 'text', text: 'The key implementation choice was to make the book a real stateful object rather than several unrelated screens. That meant the UI had to stay coherent across open/close events, tab switching, and pause/resume transitions. The benefit was that every system feeding the book — journal, map, inventory, settings — inherited the same behaviour and the same interaction model.' }
      ] },

      { type: 'heading', text: 'Discovery: map and journal from the same event' },
      { type: 'text', text: 'The discovery system was the most important technical piece of the prototype. I connected the journal and map to the same structure-visited event: when a Structure entered range, it was added to the visited list, its icon was activated on the map, and its JournalEntry was added to the journal. In practice this meant one trigger produced two different views of the same world-state change, which kept the exploration loop coherent.' },
      { type: 'gallery', images: ['assets/The-Scorch/map_nothing.png', 'assets/The-Scorch/map.png'], caption: 'The map before and after discovery — empty at first, then filled in as the player learns the world.' },
      { type: 'details', summary: 'Journal entries and lore as data', blocks: [
        { type: 'text', text: 'The technical flow was straightforward but useful: Structure exposes the linked JournalEntry via GetJournalEntry(), GetEntryName(), and GetEntryText(), while EntriesManager reads the visitedStructures list and instantiates journal entries on demand. The map side was handled by MapManager.Update(), which finds nearby Structure objects and activates the matching map icon by name. That created a shared data flow across the whole discovery system and kept the world-state logic centralised instead of duplicated across panels.' },
        { type: 'gallery', images: ['assets/The-Scorch/journal_nothing.png', 'assets/The-Scorch/jurnal.png'], caption: 'The journal starts empty and fills as the player finds and reads the world.' }
      ] },

      { type: 'heading', text: 'Inventory and items as story' },
      { type: 'text', text: 'The inventory model was also data-driven. Inventory stores separate lists for collectables and weapons, but both are persisted with DontDestroyOnLoad so the player keeps their state when moving between scenes. The item classes are lightweight containers of data, and the UI refreshes through callbacks when the inventory changes, which means the same underlying state can feed both narrative items and equipment without separate code paths for each one. ' },
      { type: 'gallery', images: ['assets/The-Scorch/inventory_book.png', 'assets/The-Scorch/inventory_weapons.png'], caption: 'Collectables and weapons use the same item data, but they are presented in two different UI flows. The second marker is a temporary key placeholder; the intended final icon should be a weapon or equipment marker.' },
      { type: 'details', summary: 'Why the data-driven approach mattered', blocks: [
        { type: 'text', text: 'The real advantage was not only persistence. Because item metadata lives in data rather than in hardcoded scene references, descriptions, icons, and names could be authored as content and reused across inventory, journal, and world interactions. That kept the prototype scalable and let the UI present story information without creating a second, parallel content pipeline for the data itself.' }
      ] },

      { type: 'heading', text: 'The time system and world mood' },
      { type: 'text', text: 'The day/night cycle was implemented as a service-layer system. TimeManager owns the Unity presentation layer — rotating the sun, blending the skybox, updating the light intensities, and exposing sunrise/sunset/hour-change events. TimeService holds the actual simulation state: current time, sunrise/sunset thresholds, the time multiplier, and the observable values for is-daytime and current hour. This separation gave the world a clear simulation/presentation boundary and made the lighting system react to time without hardcoding world rules into the visual layer.' },
      { type: 'image', src: 'assets/The-Scorch/timesystem.gif', caption: 'The sunset-to-night loop — a fast preview of the desert lighting system and its mood shifts over time.' },
      { type: 'details', summary: 'What it gave the project', blocks: [
        { type: 'text', text: 'The time system was small in code footprint but important in how the world felt. The desert needed a daily rhythm, and the service pattern gave the rest of the game a clean hook for events such as sunrise, sunset, and hour-based state changes without coupling the gameplay systems directly to the lighting system.' }
      ] },

      { type: 'heading', text: 'What I actually built' },
      { type: 'text', text: 'The work I actually built in this prototype was the systems layer around discovery and persistence: the book UI via BookManager, the map and journal flow tied to Structure and JournalEntry, the scene-safe inventory in Inventory, the settings data loaded through LoadPrefs, and the time-of-day system built from TimeManager and TimeService. Those systems were the backbone of the prototype, and they are what made the world feel consistent as the player moved between scenes.' },
      { type: 'details', summary: 'Why this mattered more than raw feature count', blocks: [
        { type: 'text', text: 'The project was only a small prototype, but the value was in the flow between systems: discover a place, read it in the journal, carry that state between scenes, and let the world continue to feel coherent. That is what made the game feel like a real prototype rather than a pile of isolated systems.' }
      ] },

      { type: 'note', text: 'This project was a short but meaningful prototype: a compact, playable loop built around discovery, inventory, and persistent world-state.', href: 'https://github.com/Jasper-Nijkamp/Project-Startup', label: 'View the repository' }
    ]
  },
  {
    id: 'jiefs-diner',
    title: "Jief's Diner",
    short: 'A time-based cooking game for PC and mobile, built with Sliding Dog \u2014 the PC is the kitchen, and you swing a phone around as a motion controller \u2014 chopping by moving it up and down, stirring by moving it across. Most of my time went into the networking that holds the two devices together, and what I am proudest of is that a physical movement made in the air reliably becomes a cooking action in a game running on a machine nobody is touching.',
    media: { type: 'video', src: 'assets/Jiefs-Diner/gameplay.mp4', poster: 'assets/Jiefs-Diner/hero.png' },
    skills: ['C#', 'Unity', 'Mirror', 'Networking', 'Motion Input', 'UI Programming', 'ScriptableObjects', 'Mobile'],
    status: 'Playable prototype',                                   // TODO: confirm
    meta: { Role: 'Engineer \u2014 networking, UI & input', Engine: 'Unity', Year: '2025', Team: 'Six-person team (Sliding Dog)' },   // year taken from the script dates — correct it if wrong
    github: 'https://github.com/Damyan23/Jiefs-Diner',
    download: 'assets/Jiefs-Diner/Jiefs-Diner.rar',
    content: [
      { type: 'text', text: "Jief's Diner is a time-based cooking game in the spirit of Overcooked, made by Sliding Dog \u2014 six of us: two engineers, three artists and a designer. It came before The Scorch, the other Sliding Dog project on this site. The unusual part is where it is played. The game runs on a PC, but nobody touches the PC. Every player uses their own phone as a controller, and the two screens deliberately show completely different things." },
      { type: 'video', src: 'assets/Jiefs-Diner/gameplay.mp4', poster: 'assets/Jiefs-Diner/hero.png', caption: 'A round in progress on the PC \u2014 orders coming in, stations in use, timers running.' },

      { type: 'heading', text: 'Two screens, one kitchen' },
      { type: 'text', text: 'The PC is the kitchen. It shows the cooking stations, the orders on their way in, the timers running down \u2014 everything the whole table needs to see at once. The phone shows almost nothing by comparison: what you are carrying, and which station you are at. Neither screen is a copy of the other, which is the entire point \u2014 you look up to see the state of the kitchen, and down only to check what is in your hands.' },
      { type: 'gallery', images: ['assets/Jiefs-Diner/screen-pc.png', 'assets/Jiefs-Diner/screen-phone.png'], caption: 'The same moment on both devices \u2014 the whole kitchen on the PC, and everything the phone has to say about it.' },
      { type: 'video', src: 'assets/Jiefs-Diner/phone-and-pc.mp4', poster: 'assets/Jiefs-Diner/phone-and-pc-poster.jpg', caption: 'Both screens at once: the phone being used as the controller, and the PC reacting to it.' },
      { type: 'text', text: 'That split is what turned this into a networking project rather than a UI project. Swinging a phone downwards is not a game action. It is a movement that has to be recognised as a chop, then sent to another machine, checked against what that machine believes the player is holding, and finally turned into something visible on a screen the player is not touching.' },

      { type: 'gallery', images: ['assets/Jiefs-Diner/station-cutting.png', 'assets/Jiefs-Diner/station-mixing.png', 'assets/Jiefs-Diner/station-plating.png'], caption: 'The three cooking stations, all of them on the PC \u2014 the phone only says which one you are standing at.' },

      { type: 'heading', text: 'Mirror, and a PC that acts as the server' },
      { type: 'text', text: 'I used Mirror to handle the connection layer. The PC runs as a dedicated server and the phones join it as clients, so the PC holds the real state of the game and a phone only ever holds a view of it. Mirror took care of the transport and the message plumbing, which left me to decide the things that actually mattered: what lives on the server, what each client needs to know, and when to send it.' },
      { type: 'text', text: 'This was the first time I had to think about a game as two separate programs that only know each other through messages. Nothing is shared. A phone cannot read a variable on the PC, and a value the PC changes does not exist on the phone until something is sent. Everything I had previously done in a single process by calling a method had to be redesigned as a message with a sender, a payload and a moment of arrival.' },
      { type: 'details', summary: 'How the two devices actually talk', blocks: [
        { type: 'text', text: 'Everything the phone says to the server is a Mirror Command. SendKnifeDetection carries a completed chop; CmdSendInput was written to carry raw sensor data and never called. Traffic in the other direction is RPCs: one tells a phone which station it is now at, one tells it to add a processed ingredient to its inventory, one asks it to work out the output of a cooking step, and one moves every client to a new scene together.' },
        { type: 'text', text: 'Binding a phone to the right player object took almost nothing from me. The network manager does not override player spawning or keep a mapping of its own \u2014 Mirror already knows which object belongs to which connection, and its default behaviour was enough. The one custom piece is that once the local player starts, the phone asks the server for authority over that object, so the client owns the thing it is driving. That is an authority question rather than an identity one.' },
        { type: 'text', text: 'There is not a single SyncVar in the gameplay scripts. State lives in ordinary fields and changes as a side effect of whichever command or RPC has just arrived. That holds together because there is one phone and one screen and one of everything else, and it is the part of the design least likely to survive a second player being added.' },
        { type: 'text', text: 'Disconnects are not handled at all. Nothing overrides the server or client disconnect callbacks, no slot is kept for a player who drops, no round is reset, nothing is saved. Mirror does its default thing and the player object goes away. A phone that reconnects is given a fresh one and recovers none of what it had \u2014 not the ingredients it was carrying, not the progress through a chop, not the station it was at, not how far the round had got. With one player sitting at the machine the honest answer was to start again, so I never wrote anything better. It is the clearest example on this page of the gap between something that works and something that is finished.' }
      ] },

      { type: 'heading', text: 'The phone as a motion controller' },
      { type: 'text', text: 'The phone is not a screen with buttons on it. It is a motion controller. You chop by moving the phone up and down, you stir by moving it from side to side, and every cooking action has its own physical movement, so what the player does with their hands roughly resembles what the character does in the kitchen. Almost nothing is tapped.' },
      { type: 'text', text: 'That is a far more awkward thing to turn into a game action than a button press. A button has an obvious moment of truth. A movement is a continuous stream of orientation and acceleration readings arriving many times a second, most of it noise, because a hand holding a phone is never perfectly still. Something has to watch that stream and decide when a chop has genuinely happened \u2014 and where that decision gets made turned out to be the biggest architectural choice in the project.' },
      { type: 'text', text: 'I put it on the phone. The phone reads its own accelerometer and gyroscope, decides for itself whether a movement looked like a chop or a stir, and sends the server a single message saying the action happened. The sensor stream never leaves the device. There is still a command sitting in the code for sending raw input across, written and then never called, because in the end it was not needed.' },
      { type: 'text', text: 'That divides the work unevenly. The server counts actions, holds the cooking state and receives the chosen ingredients. But the phone is what interprets the motion, what judges whether a movement qualified, and \u2014 once enough actions have registered \u2014 what works out the resulting dish and reports it back. The server takes the client at its word on all of it.' },
      { type: 'text', text: 'That was a decision rather than an accident, though not one I would defend as general practice. The game is single-player: there is no opponent to gain anything from a faked chop, and the only person a dishonest client could rob is the person holding it. I was also short on time, and trusting the phone was by a good margin the easier of the two roads. At the time it looked like the right trade.' },
      { type: 'image', src: 'assets/Jiefs-Diner/network-diagram.svg', caption: 'Which side of the connection makes each decision \u2014 and how little of it the server actually checks.' },

      { type: 'heading', text: 'Recipes are data, not code' },
      { type: 'text', text: 'A recipe is an asset rather than a class. It holds a name, an image, and a list of ingredients that each carry their own name, quantity and icon. Adding a dish to the game means creating an asset in the editor and filling in fields \u2014 no code is touched, and an artist can author one without asking me.' },
      { type: 'text', text: 'Nothing keeps a hand-written list of which recipes exist. At startup the recipe database loads every recipe asset out of the Cooking folder in one call, so an asset that exists is a dish that is in the game. Each recipe then announces itself as it loads, through a single event on the event manager. The database never has to know who cares about a dish \u2014 it loads the asset, the asset says it is here, and anything that needs to react builds itself from that.' },
      { type: 'text', text: 'Holding it together is a small GameManager that owns the database and the event manager and hands them out, so no script ever searches the scene for either one.' },
      { type: 'gallery', images: ['assets/Jiefs-Diner/recipe-asset.png', 'assets/Jiefs-Diner/recipe-folder.png'], caption: 'A recipe as an authored asset, and the folder the database sweeps at startup.' },
      { type: 'details', summary: 'Loading by folder instead of by list', blocks: [
        { type: 'text', text: 'The database does not hold a serialised array that someone has to remember to drag a new recipe into. It asks Unity for everything of type Recipe inside one folder and takes whatever comes back. The trade is a convention for a list: adding a dish is dropping an asset in the right place, and the price is that the folder name is now load-bearing, with nothing to catch a typo in it except an empty menu at runtime.' }
      ] },
      { type: 'details', summary: 'Managing the data underneath', blocks: [
        { type: 'text', text: 'Most of the work below the networking was plain data handling: lists of what each player is carrying, dictionaries keyed by station and by player, arrays of the ingredients a dish still needs before it can be plated. It is the least glamorous part of the project and it is also most of what a cooking game is \u2014 knowing precisely what is where, on two machines at once, at every moment.' }
      ] },

      { type: 'heading', text: 'Every interface on both devices' },
      { type: 'text', text: 'I built all of the UI on both ends, and the phone side is interesting mainly for how little ended up on it. It shows your inventory, and it has two buttons for moving between stations. That is the whole of it. The stations themselves, the food sitting on them, the orders and the timers all live on the PC, and the actions are performed by moving the phone rather than by pressing anything on it.' },
      { type: 'text', text: 'Keeping it that sparse was the right call for a game where looking down costs you time. A player glances at the phone to confirm what they are holding and otherwise plays with their eyes on the PC and the phone moving in their hand. The PC does the opposite job: no input at all, only feedback, and readable at a glance from across a room.' },
      { type: 'columns', text: 'The game also has to teach itself, and motion controls make that harder than buttons would. There is nothing on screen to press and nothing to be discovered by prodding at it \u2014 a player has to be told outright that chopping means moving the phone down and stirring means moving it across. Those instructions sit on the PC rather than the phone, which follows the same rule as everything else here: the phone is for doing, the screen is for reading.', image: 'assets/Jiefs-Diner/pc-instructions.png', caption: 'The controls, explained on the PC before a round starts.' },

      { type: 'heading', text: 'What I would change' },
      { type: 'text', text: 'The recipe layer has a seam in it that I did not notice while writing it. A recipe announces itself the instant it loads, and it reaches the event manager by going through the GameManager singleton with null-conditional calls the whole way down. If the managers are not up yet, that is not an error \u2014 it is silence. The recipe loads, nothing hears it, and nothing visibly breaks, which is worse than a crash because there is nothing to chase.' },
      { type: 'text', text: 'The trust model is the thing I would change first. A client that decides whether an action counted, and then tells the server what the dish turned out to be, can in principle say anything at all \u2014 chops that never happened, ingredients it never held, a finished recipe out of nowhere. Nothing exploits that today because there is nobody to cheat against, but nobody being motivated to break something is not the same as it being sound.' },
      { type: 'text', text: 'The shape I should have built is the phone sending movement and the server validating the rest: whether the motion qualified, whether the station and the ingredients match what the player is actually holding, how many actions have really registered, and what the recipe output ought to be. The client reports evidence; the server reaches the verdict. That is the version I would write now, and it is far cheaper to start that way than to go back and retrofit it.' },
      { type: 'text', text: 'The same system then fails the opposite way at the other end: the event is raised without checking whether anything is actually subscribed, so with no listener it throws outright. One system, silent in one direction and loud in the other, and both behaviours come down to startup order I was not controlling. If I wrote it again the database would own the list and hand it out on request, and anything that wanted to know about new dishes would subscribe first and ask second.' },

      { type: 'note', text: 'The next thing Sliding Dog built was a desert adventure, where I moved off networking and onto systems and UI.', href: 'project.html?id=the-scorch', label: 'Read that write-up \u2192' }
    ]
  },
  // ═══════════════════════════════════════════════════════════════
  //  DEEP DIVE — a child page of Castle Siege, same pattern as
  //  'the-hunt-map' under The Hunt.
  //    hidden: true           → off the homepage list and out of the pager
  //    parent: 'castle-siege' → back link and header read as part of it
  //  Castle Siege lists it in `subpages`, so it is also pinned in that
  //  project's sidebar and on its homepage card.
  //  The TODO blocks are yours to write; structure and links are wired.
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hex-map-generator',
    hidden: true,
    // HIDDEN \u2014 hex map page is offline until the generator works again. Uncomment to restore.
    // `parent` is what places a hidden page into the "Other things I've built" grid.
    // parent: 'castle-siege',
    title: 'Procedural hex maps that draw their own roads',
    short: 'Castle Siege is played on one hand-built map. This is the replacement: a hex grid that weights its own terrain, finds a route across it, and lays road tiles along that route — growing outward with every wave you clear.',
    media: { type: 'video', src: 'assets/Hex-Map/hex-map.mp4', poster: 'assets/Hex-Map/hero.png' },
    skills: ['C#', 'Unity', 'Procedural Generation', 'Pathfinding', 'Graph Algorithms'],
    status: 'In progress',
    meta: { Role: 'Sole engineer', Engine: 'Unity 2022', Year: '2025', 'Part of': 'Castle Siege' },
    download: '',
    content: [
      { type: 'text', text: 'Castle Siege has one map. The terrain was built by hand, the road was drawn once, and every round is played on exactly that board. It works, but it caps how much the game can ask of you — you learn the good tower positions on your third run and there is nothing left to solve. This page is about the thing replacing it: a hex grid that generates its own terrain, finds its own route across it, and builds the road out of tiles that actually connect.' },
      { type: 'video', src: 'assets/Hex-Map/hex-map.mp4', poster: 'assets/Hex-Map/hero.png', caption: 'The generator running — grid, terrain weights, and a road drawn along the route.' },

      { type: 'heading', text: 'Where the idea came from' },
      { type: 'text', text: 'It did not start as a Castle Siege feature. A few months earlier I built a hex maze generator as a standalone project, and it is the reason any of this exists. You set a width and height, it generates a grid of hexes, carves a maze through it with one of three algorithms you can pick between, and then finds the route from the entrance to the exit. The whole thing animates while it works — cells drop in from above as the grid builds, walls come down one at a time as the maze is carved, and the search colours cells as it visits them so you can watch it explore, hit dead ends, and back out.' },
      { type: 'image', src: 'assets/Hex-Maze/maze-generate.gif', caption: 'The original project — the maze carving itself out, one wall at a time.' },
      { type: 'text', text: 'Animating it was not decoration. Half the work on that project was direction bugs — a hex has six neighbours and every other row is offset, so "the cell up and to the left of this one" is a different arithmetic depending on which row you are in. Getting it wrong removes the wrong wall, and in a finished maze that is invisible. Watching it build one step at a time made the bug obvious immediately. The down-left direction was wrong for about a week before I could see it happening.' },
      { type: 'details', summary: 'The three algorithms', blocks: [
        { type: 'text', text: 'The first was a randomised depth-first search: walk to a random unvisited neighbour, knock down the wall between, and keep going until you are stuck, then back up to the last cell with an unvisited neighbour and carry on. It produces long winding corridors with few junctions, because it commits hard to one direction before it ever branches.' },
        { type: 'text', text: 'The other two exist because that character bothered me. Prim\u2019s grows outward from a single cell, always picking a random wall on the frontier of what it has already built, which gives short branches and a lot of junctions — the opposite feel. Wilson\u2019s works by random walks that erase their own loops, and its selling point is that every possible maze is equally likely, with none of the bias the other two have. It is also by far the slowest, which is very visible when you are watching it run.' },
        { type: 'text', text: 'Having three of them side by side is what taught me the most, because a maze algorithm is not judged on correctness — all three produce a valid maze every time. They are judged on the shape of what they produce, and you only see that by watching them next to each other.' }
      ] },
      { type: 'details', summary: 'The refactor, and the detour that caused it', blocks: [
        { type: 'text', text: 'Partway through I tried to add a cube grid alongside the hex one, and gave up on it. Not because cubes are hard, but because my code assumed hexes everywhere — the direction mapping, the neighbour lookup, and the algorithm itself were all tangled into the same classes. Supporting a second cell shape meant editing all of them.' },
        { type: 'text', text: 'So I rebuilt it around interfaces instead: one for a maze algorithm and one for a grid, with a base cell class the hex cell inherits from. Each algorithm became its own class behind that interface. Nothing about the generated mazes changed, but adding a fourth algorithm became a new file rather than another branch in an existing one. That is the lesson that carried directly into this project — every piece below is separable from the others on purpose.' }
      ] },
      { type: 'note', text: 'The maze generator is a separate project with its own repository — the three algorithms, the hex grid, and the animated build are all in there.', href: 'https://github.com/Damyan23/Procedurally-Generated-Maze', label: 'View the maze generator on GitHub' },
      { type: 'text', text: 'What turned it into a Castle Siege idea was finding a set of free hex tile assets — forest, water, road pieces that line up across tile edges. I had a generator producing hex layouts and no reason to use it, and suddenly there were tiles that would make one look like an actual place. Tower defence is played on a route through terrain, which is exactly what the maze project already produced. The pieces fit.' },
      { type: 'image', src: 'assets/Hex-Map/tile-assets.png', caption: 'The tile set that made the idea concrete — pieces that connect across hex edges.' },

      { type: 'heading', text: 'What it is meant to do' },
      { type: 'text', text: 'The plan is not a generated map you play once. It is a map that grows. You start with a small board and a single path from the spawn to the castle, and every time you clear a wave, more hexes are added at the edges and more routes are carved through the new space. The board you are defending is bigger and more open each round than it was the round before.' },
      { type: 'text', text: 'That changes what a tower placement means. In the current game you pick your positions once and they stay correct for the whole run, because the route never changes. Here a tower covering the only approach is excellent until a second approach opens up behind it, and then you have a decision: reposition, or spend gold covering the new one. The generator is not there to add variety for its own sake — it is there so that the board can keep asking new questions after you have answered the first one.' },

      { type: 'heading', text: 'Building the grid' },
      { type: 'text', text: 'The grid is a two-dimensional array of hex objects, laid out by measuring the hex prefab rather than by hard-coded spacing. Rows sit at three quarters of a hex height apart, because hexes interlock vertically rather than stacking, and every odd row is pushed half a hex to the right so the rows nest into each other. Each hex is told its own column and row when it spawns, and keeps a reference back to the grid, so any hex can answer questions about its surroundings without going through a manager.' },
      { type: 'text', text: 'Neighbours are the part that catches people out. On a square grid the offsets to your neighbours are the same wherever you are. On an offset hex grid they are not: because every other row is shifted, the step to your up-left neighbour is a different pair of numbers on an even row than on an odd one. So there are two lookup tables, one for each case, and everything that walks the grid goes through them.' },
      { type: 'image', src: 'assets/Hex-Map/grid-coords.png', caption: 'Six neighbours per hex, and two different sets of offsets depending on which row you are standing in.' },
      { type: 'details', summary: 'Two coordinate systems, on purpose', blocks: [
        { type: 'text', text: 'Hexes are stored in offset coordinates — plain column and row, which is what an array wants and what makes the layout easy to reason about on screen. But offset coordinates are miserable for anything geometric. Measuring the distance between two hexes in columns and rows gives an answer that is wrong in a way that depends on parity, which is exactly the kind of bug that only shows up on half your test cases.' },
        { type: 'text', text: 'So there is a second system underneath: cube coordinates, where each hex has three axes that always sum to zero. In that form the six directions are six fixed vectors you can just add, distance is a simple formula with no special cases, and none of it cares which row you are on. The grid converts between the two, using offset for storage and cube whenever the maths would otherwise have to know about parity.' }
      ] },

      { type: 'heading', text: 'Weighting the terrain' },
      { type: 'text', text: 'Before anything looks for a route, every hex is given a weight between zero and one — how expensive it is to cross. Most of the board gets a random value in the lower range, so ordinary ground varies without any of it being impassable. A small share of hexes are made water and pushed to the maximum, which is the same mechanism turned up: water is not a special case in the code, it is just ground nothing can afford to walk on.' },
      { type: 'text', text: 'While generating, each hex is tinted by its own weight — green through red for cost, blue for water — so the terrain is visible before a single tile has been placed on top of it. That is entirely a debugging view, and it is the most useful thing in the project. A route that looks strange is almost always a weight map that looks strange, and this makes that obvious at a glance instead of at a breakpoint.' },
      { type: 'image', src: 'assets/Hex-Map/weight-map.png', caption: 'The debug view — every hex tinted by what it costs to cross, water in blue.' },
      { type: 'details', summary: 'Why a weight and not just blocked or open', blocks: [
        { type: 'text', text: 'A blocked-or-open board gives a route with nothing to say about it. The search takes the shortest way round the obstacles, and since the shortest way is the same every time, the only variety comes from moving the obstacles. Weights let terrain argue with the route rather than dictate to it: crossing the marsh is allowed, it just costs you, and whether the route takes it depends on what the alternative costs.' },
        { type: 'text', text: 'It also gives one dial for two different jobs. The same number that makes a hex mildly annoying to cross makes it impassable at the top of its range, so water needed no separate concept — and if I later want a bridge, it is a low-weight hex placed on a water tile rather than a new rule about bridges.' },
        { type: 'text', text: 'The water is currently scattered single tiles. There is a half-written pass that grows each one into its neighbours to make rivers and lakes instead of puddles, which is switched off — it kept producing shapes that cut the board in half.' }
      ] },

      { type: 'heading', text: 'Finding the route' },
      { type: 'text', text: 'This is the piece I am building now, and it is the reason the page says in progress. The grid, the weights, and the road drawing all work; the search between the start hex and the castle is scaffolded but not finished.' },
      { type: 'text', text: 'The approach is a weighted A* — the same search as in most pathfinding, but with the terrain cost folded into the score so it does not simply take the straightest line. The distance estimate has to be a hex distance rather than a grid one, which is the cube coordinates earning their place: in that form it is one formula with no parity cases.' },
      { type: 'text', text: 'Multiple routes are the interesting part, and the plan is to use the weights I already have. After a route is found, push the cost of the hexes it used up toward the maximum and search again. The next route will avoid the first one wherever it reasonably can, but not absolutely — a shared hex is expensive rather than forbidden, so routes can still converge where the terrain genuinely funnels them. That is the behaviour I want for a tower-defence board: paths that mostly diverge, and meet at the chokepoints worth defending.' },

      { type: 'heading', text: 'Drawing the road' },
      { type: 'text', text: 'A route is a list of hexes, which is not something you can look at. Turning it into a road is the part I am happiest with, and it comes down to one idea: the tile a hex needs depends entirely on which two of its six neighbours the road connects to. If the road comes in from the left and leaves to the right, that is a straight piece. In from the left and out to the up-right is a gentle turn. In from the left and out to the down-right is a sharper one.' },
      { type: 'text', text: 'So the generator walks the route, and at each hex asks which direction the previous hex was and which direction the next one is. That pair of directions is looked up in a table that returns both which tile to use and how far to rotate it, and the tile is spawned as a child of the hex. Every connection case a hex can have is one entry in that table.' },
      { type: 'image', src: 'assets/Hex-Map/road-tiles.png', caption: 'The pieces — straight, gentle turn, sharp turn — and the rotations that make them meet.' },
      { type: 'image', src: 'assets/Hex-Map/road-drawn.gif', caption: 'The road appearing along a route, tile by tile, each one rotated to meet its neighbours.' },
      { type: 'details', summary: 'The direction-pair table', blocks: [
        { type: 'text', text: 'Six directions means thirty ordered pairs of two different directions, and the table has an entry for each. They group into three shapes by how far apart the two directions are: opposite each other is a straight, two apart is one turn, one apart is a tighter turn. Three tile prefabs cover all thirty, with rotation doing the rest.' },
        { type: 'text', text: 'Entering from the left and leaving to the right needs the same tile as entering from the right and leaving to the left, so the lookup tries the pair both ways round before giving up. That halves the entries I would otherwise have to keep correct by hand — and by hand is exactly how the rotations were found, one at a time, by placing a tile and turning it until the road lined up.' },
        { type: 'text', text: 'It is also the part most likely to be replaced. Thirty hand-tuned rotation values is thirty chances to have typed the wrong number, and the failure is silent: the road still draws, it just has a seam in it. Deriving the rotation from the angle between the two directions would be less code and would not need a table at all.' }
      ] },

      { type: 'heading', text: 'Where it is now' },
      { type: 'text', text: 'The grid generates, the terrain weights and water generate with it, the road drawing works once it is given a route, and there is a button in the editor that re-rolls the whole board so I can look at a hundred of them quickly. What is missing is the search in the middle, which is the next thing to finish.' },
      { type: 'text', text: 'After that comes the part that actually makes it a Castle Siege map rather than a nice picture: growing the board when a wave is cleared, and giving Castle Siege\u2019s tower placement what it needs from a hex rather than from a terrain. That turns out to be a short list — where a hex is in the world, whether you can build on it, and whether the road runs through it — which is why I have been building this separately instead of growing it inside the game.' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  SMALLER WORK — everything below is flagged `scale: 'small'`.
  //  These render as compact cards under "Other things I've built"
  //  on the homepage, and are skipped by the 01/02/03 numbering and
  //  by the prev/next pager. Delete the flag to promote one to a
  //  full project row.
  //
  //  A card links to its detail page when `content` has blocks in it,
  //  and straight to `github` when `content` is empty — so a repo link
  //  and a one-paragraph description is enough to add something here.
  //
  //  Template:
  //  {
  //    id: 'slug',
  //    scale: 'small',
  //    title: 'Name',
  //    short: 'One or two sentences. What it does, and the one thing
  //            about it worth knowing.',
  //    skills: ['C#', 'Unity'],
  //    meta: { Year: '2025' },
  //    github: 'https://github.com/...',
  //    content: []
  //  },
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'hex-maze',
    scale: 'small',
    title: 'Hex maze generator',
    short: 'A hex grid that carves itself into a maze with one of three algorithms, then solves it \u2014 every step animated.',
    media: { type: 'image', src: 'assets/Hex-Maze/hero.png' },
    skills: ['C#', 'Unity', 'Procedural Generation', 'Graph Algorithms'],
    meta: { Role: 'Solo', Engine: 'Unity', Year: '2025' },
    github: 'https://github.com/Damyan23/Procedurally-Generated-Maze',
    download: 'assets/Hex-Maze/Procedurally-Generated-Maze.zip',
    content: [
      { type: 'text', text: 'Set a width and a height, press generate, and this builds a grid of hexagons and carves a maze through it. You choose which of three algorithms does the carving, and once it is done it finds the route from the entrance to the exit. The hexes themselves are generated rather than modelled \u2014 the mesh is built in code, which is what made it cheap to knock individual walls out as the maze forms.' },
      { type: 'heading', text: 'Three algorithms, three shapes of maze' },
      { type: 'text', text: 'A randomised depth-first search keeps a stack of where it has been. It walks to a random unvisited neighbour, knocks down the wall between them, and keeps going until it is stuck \u2014 then pops back to the last cell with somewhere left to go. It produces long winding corridors and very few junctions, because it commits hard to one direction before it ever branches. Watching it run, the backtracking is the whole show: it charges off into the grid, hits a dead end, and unwinds cell by cell looking for a way out.' },
      { type: 'gallery', images: ['assets/Hex-Maze/algo-dfs.gif'], fit: 'natural', caption: 'Depth-first search \u2014 one long corridor at a time, then a visible unwind when it runs out of room.' },
      { type: 'text', text: 'That character is why I added the other two. Prim\u2019s keeps a frontier instead of a stack \u2014 every cell touching the part already carved. It picks one of those at random, joins it to a random neighbour that is already in the maze, and adds its neighbours to the frontier in turn. Because the choice is made across the whole edge rather than at one moving head, it grows outward in all directions at once and gives short branches with a lot of junctions. The opposite feel entirely.' },
      { type: 'gallery', images: ['assets/Hex-Maze/algo-prim.gif'], fit: 'natural', caption: 'Prim\u2019s \u2014 spreading outward on every side at once, leaving short dead ends behind it.' },
      { type: 'text', text: 'Wilson\u2019s is the strange one. It starts a random walk from a cell that is not in the maze yet and lets it wander \u2014 and whenever the walk crosses its own path it deletes the loop it just made and carries on from there. Only when the walk finally stumbles into the existing maze does any of it get carved. Its selling point is that every possible maze is equally likely, with none of the bias the other two have. The cost is that the first few walks flail around a mostly empty grid for a long time before they find anything to connect to, and it only gets quick once most of the maze exists. That is invisible in a finished maze and obvious the moment you animate it.' },
      { type: 'gallery', images: ['assets/Hex-Maze/algo-wilson.gif'], fit: 'natural', caption: 'Wilson\u2019s \u2014 random walks erasing their own loops, slow to start and fast to finish.' },
      { type: 'text', text: 'Having all three side by side is the thing I got most out of this. A maze algorithm is not judged on correctness \u2014 all three produce a valid maze every time. They are judged on the shape of what they produce, and you only see that by watching them next to each other.' },

      { type: 'heading', text: 'Animating it, and why' },
      { type: 'text', text: 'Cells drop in from above as the grid builds, walls come down one at a time as the maze is carved, and the search colours cells as it goes so you can watch it explore, hit dead ends and back out. That was not decoration. A hex has six neighbours and every other row is offset, so "the cell up and to the left of this one" is different arithmetic depending on which row you are standing in. Get it wrong and you remove the wrong wall \u2014 which in a finished maze is completely invisible. Watching it build one step at a time made it obvious. The down-left direction was wrong for about a week before I could see it happening.' },

      { type: 'heading', text: 'The detour that rewrote it' },
      { type: 'text', text: 'Partway through I tried adding square cells alongside the hexes and gave up. Not because squares are hard, but because my code assumed hexes everywhere \u2014 direction mapping, neighbour lookup and the algorithms were all tangled into the same classes, so a second cell shape meant editing all of them.' },
      { type: 'text', text: 'So I rebuilt it around interfaces: one for a maze algorithm, one for a grid, and a base cell class the hex cell inherits from. Each algorithm became its own class behind that interface. Nothing about the generated mazes changed, but adding a fourth algorithm became a new file instead of another branch in an existing one. It is a small project, and that refactor is the part of it I still think about \u2014 the lesson carried straight into the hex map I am now building for Castle Siege.' },
      // HIDDEN \u2014 hex map page is offline until the generator works again. Uncomment to restore.
      // { type: 'note', text: 'This grew into the procedural hex map that is replacing Castle Siege\u2019s hand-built level.', href: 'project.html?id=hex-map-generator', label: 'See where it went \u2192' }
    ]
  },
  {
    id: 'opengl-renderer',
    scale: 'small',
    title: 'OpenGL renderer',
    short: 'A 3D renderer built from scratch in C++ and OpenGL \u2014 empty window to lit, textured shapes with a free-look camera.',
    media: { type: 'image', src: 'assets/OpenGL/gl-pointlight.png' },
    skills: ['C++', 'OpenGL', 'GLSL', 'Graphics Programming', '3D Math'],
    meta: { Role: 'Solo', Language: 'C++ / GLSL', Year: '2024' },
    github: 'https://github.com/Damyan23/OpenGL',
    download: 'assets/OpenGL/OpenGL.rar',
    content: [
      { type: 'text', text: 'I had been working inside engines for a while without much idea what they were doing underneath, so I built a small renderer in C++ with OpenGL to find out. It starts at an empty window and ends with lit, textured shapes you can fly a camera around. I picked OpenGL over Vulkan or DirectX for exactly one reason: it is old, which means it is documented to death, and I wanted to spend the time on the concepts rather than on setup.' },

      { type: 'heading', text: 'Getting one triangle on screen' },
      { type: 'text', text: 'The first triangle took longer than everything after it. Drawing anything means handing the GPU a list of corner positions, telling it how to read that list, and writing two small programs that run on the GPU itself \u2014 a vertex shader that decides where each corner lands on screen, and a fragment shader that decides what colour every pixel between them should be. Nothing is drawn for you. A white triangle is the point at which all of that is finally working.' },
      { type: 'text', text: 'Colour came from handing the vertex shader a colour per corner and letting the GPU blend between them, which is why the middle of the triangle is a gradient nobody wrote. Textures came from loading an image and giving each corner a coordinate saying which part of that image belongs to it.' },
      { type: 'gallery', images: ['assets/OpenGL/gl-triangle-white.png', 'assets/OpenGL/gl-triangle-colour.png', 'assets/OpenGL/gl-triangle-textured.png'], caption: 'The first three milestones \u2014 geometry, then colour per corner, then a texture mapped onto it.' },

      { type: 'heading', text: 'Into 3D' },
      { type: 'text', text: 'Moving, rotating and scaling an object is matrix maths, and stacking those matrices in the right order is what puts a shape somewhere in a scene. Depth needs one more: a perspective matrix, which is what makes distant things smaller. That one cost me several days \u2014 a perspective bug looks like the scene being subtly wrong rather than broken, so there is nothing to trace.' },
      { type: 'text', text: 'Then I wrote a camera class, which is the part I would keep. It holds a position and a direction, turns keyboard input into movement along its own axes and mouse movement into pitch and yaw, and hands back the two matrices the shaders need. Once it existed I could actually look at what I was building, and everything after it went faster.' },
      { type: 'image', src: 'assets/OpenGL/gl-cube.png', caption: 'A textured cube in perspective \u2014 six faces, and depth testing so the back ones stay behind the front ones.' },

      { type: 'heading', text: 'Lighting' },
      { type: 'text', text: 'Lighting is three things added together in the fragment shader: a flat ambient term so nothing is pure black, a diffuse term from the angle between the surface and the light, and a specular highlight from the angle between the surface and your eye. On top of that, two textures per object decide how it responds \u2014 one for its colour, one for how shiny each part of it is, which is what makes the metal edges of the crate catch light the wood does not.' },
      { type: 'text', text: 'I then built the three light types on the same shader: a directional light with parallel rays for the sun, a point light that falls off with distance, and a spotlight cone attached to the camera.' },
      { type: 'gallery', images: ['assets/OpenGL/gl-directional.png', 'assets/OpenGL/gl-pointlight.png', 'assets/OpenGL/gl-spotlight.png'], caption: 'Directional, point, and the spotlight cone that follows the camera.' },

      { type: 'heading', text: 'What I would do differently' },
      { type: 'text', text: 'I lost a lot of the schedule to bugs that did not move the result \u2014 things I chased because they were interesting rather than because they mattered to what I was building. Deciding up front what actually has to exist, and letting the rest stay broken, is the habit I took from this one. The obvious next steps are shadow mapping and loading real models instead of generating primitives in code.' }
    ]
  },
  {
    id: 'procedural-spider',
    scale: 'small',
    title: 'Procedurally animated spider',
    short: 'A spider that walks with no walk animation \u2014 legs place their own feet on whatever terrain is under them.',
    media: { type: 'image', src: 'assets/Spider/hero.png' },
    skills: ['C#', 'Unity', 'Inverse Kinematics', 'Procedural Animation'],
    meta: { Role: 'Solo', Engine: 'Unity', Year: '2025' },
    github: 'https://github.com/Damyan23/Procedurally-Animated-Spider',
    download: '',
    content: [
      { type: 'text', text: 'There is no walk cycle in this project. The spider has a rig and an idle model, and everything you see it do is worked out at runtime \u2014 where each foot should land, when to pick it up, and how the body should sit on top of the result. Hand-animating that is easy on flat ground and falls apart the moment the terrain does not match what the animator assumed. Doing it procedurally means it works on a slope, a box, or a ramp without anyone authoring anything.' },

      { type: 'heading', text: 'One leg at a time' },
      { type: 'text', text: 'Each leg gets a two-bone IK constraint, so instead of rotating joints I move a single target and the leg bends to reach it. Next to each leg sits an invisible marker \u2014 its home position, the spot on the ground it would ideally be standing on. Every frame that marker casts a ray straight down, snaps itself to whatever it hits, and orients to match the slope. So the home position is always a real, reachable point on the actual geometry, not a guess.' },
      { type: 'text', text: 'The foot itself does not follow that marker. It stays exactly where it was planted, and only when the distance between it and its home position passes a threshold does it pick up and take a step. That is the whole trick. A foot that follows its target continuously slides; a foot that waits until it is stretched too far and then commits to a step reads as walking.' },
      { type: 'image', src: 'assets/Spider/gizmos.png', caption: 'The debug view \u2014 each foot\u2019s home position, the radius it is allowed to stretch to before stepping, and the ray finding the ground.' },
      { type: 'text', text: 'The step itself is an arc rather than a slide: the foot lifts, travels over, and sets down, following a curve from where it was to where it is going with a raised midpoint, easing in and out so it does not start and stop abruptly. On the way it also rotates to match the angle of the ground it is about to land on.' },

      { type: 'heading', text: 'Making it a gait' },
      { type: 'text', text: 'Legs stepping independently look like an insect having a seizure. Real spiders move diagonal pairs together, so front-left steps with back-right, then a fraction of a second later front-right steps with back-left, on a loop. Each leg still only steps if it individually needs to, so standing still costs nothing and turning on the spot moves only the legs that are actually stretched.' },
      { type: 'text', text: 'The body then rides on whatever the feet decided. Its height is the average of the four foot heights, so it rises over a box and dips into a dip. Its tilt comes from comparing those heights against each other \u2014 front feet higher than back means pitch up, left higher than right means roll \u2014 and both are eased in rather than snapped, so the body lags slightly behind the legs the way weight does.' },

      { type: 'image', src: 'assets/Spider/terrain.png', caption: 'Four feet at four different heights, and a body that has tilted to match.' },

      { type: 'heading', text: 'Building it up' },
      { type: 'text', text: 'It came together in that order, and each stage was broken in its own way. First just turning toward a target, with the legs frozen in place.' },
      { type: 'clip', src: 'assets/Spider/spider-1-turn.mp4', caption: 'Stage one \u2014 turning toward a target, legs not yet involved.' },
      { type: 'text', text: 'Then the body moving as well, which made the problem obvious: it slid around with its feet welded to the floor.' },
      { type: 'clip', src: 'assets/Spider/spider-2-body.mp4', caption: 'Stage two \u2014 the body follows the target, but the legs stay where they were planted.' },
      { type: 'text', text: 'Then the stepping, which is the point it stopped looking like a prop being dragged and started looking like an animal.' },
      { type: 'clip', src: 'assets/Spider/spider-3-legs.mp4', caption: 'Stage three \u2014 the legs step once they are stretched too far from home.' },
      { type: 'text', text: 'And finally swapping the target for keyboard input, so it is something you drive rather than something you watch. Movement and turning are both eased toward their target speed rather than applied directly, which is what stops it snapping to full speed the instant a key goes down.' },
      { type: 'text', text: 'The easing is written as an exponential decay against delta time rather than a fixed fraction per frame. It is one more term to type and it means the spider accelerates at the same rate whether the game runs at 60 frames a second or 144 \u2014 the naive version quietly changes its handling with the frame rate.' },
      { type: 'clip', src: 'assets/Spider/spider-4-control.mp4', caption: 'Stage four \u2014 driving it around, with the legs and body reacting to whatever it climbs over.' },

      { type: 'details', summary: 'Rough edges I can see now', blocks: [
        { type: 'text', text: 'Two separate pieces of code write the body rotation in the same frame. One aligns it to the surface underneath, the other applies the pitch and roll worked out from the feet, and they run back to back and pull against each other. It settles somewhere reasonable, which is exactly why it went unnoticed \u2014 but nothing in there decides what the body rotation should be, and that is not a property I would want in a system that grew.' },
        { type: 'text', text: 'There is also a hard-coded 45 degree turn applied to the forward direction, because the model faces a corner rather than an axis. That belongs on the transform of the mesh, not in the movement maths. And the fields for following a target are all still there \u2014 a target, a minimum and maximum distance, an angle \u2014 left over from the version in the first clip, now used by nothing except the debug gizmos.' }
      ] },

      { type: 'heading', text: 'What is unfinished' },
      { type: 'text', text: 'There is a jump in there that never got wired up \u2014 the crouch, launch and landing timings all exist as settings with nothing calling them. The body also assumes up is up: the pitch and roll are worked out from world heights, so it copes with slopes and steps but would fall apart on a wall or a ceiling. There is a wall layer sitting unused in the leg script from when I started thinking about it. That is the interesting version of this problem, and the one I would go after next.' }
    ]
  }
];
