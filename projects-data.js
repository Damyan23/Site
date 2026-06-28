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
//  │ { type:'columns',  text:'Text on one side…',                │
//  │                    image:'assets/x.jpg',                    │
//  │                    caption:'Optional',                      │
//  │                    flip:false }   // flip:true = image left │
//  └─────────────────────────────────────────────────────────────┘
//  caption is always optional. Leave a field out and it's skipped.
// ════════════════════════════════════════════════════════════════
const PROJECTS = [
  {
    id: 'project-one',
    title: 'Project One',
    short: 'A short description shown on the homepage — what the game/app is and what you built.',
    media: { type: 'video', src: 'assets/project-one.mp4', poster: 'assets/project-one.jpg' },
    skills: ['C#', 'Unity'],
    github: 'https://github.com/yourname/project-one',
    content: [
      { type: 'text', text: 'Open with what the project is and the idea behind it. This first paragraph sets the scene before any media.' },

      { type: 'video', src: 'assets/project-one.mp4', poster: 'assets/project-one.jpg', caption: 'Gameplay trailer / demo reel.' },

      { type: 'heading', text: 'The idea' },
      { type: 'text', text: 'Explain the concept, the goal, who it was for. Keep paragraphs readable — a few sentences each.' },

      { type: 'columns', text: 'Use a two-column block when you want text to sit beside a supporting image — great for explaining a specific feature or mechanic. Set flip:true to put the image on the left instead.', image: 'assets/project-one-2.jpg', caption: 'A feature worth showing off.', flip: false },

      { type: 'heading', text: 'Challenges' },
      { type: 'text', text: 'Describe a problem you ran into and how you solved it. This is the part that shows how you think.' },

      { type: 'image', src: 'assets/project-one-3.jpg', caption: 'A full-width screenshot with a caption underneath.' },

      { type: 'quote', text: 'Use a quote block for a key takeaway, a nice bit of feedback, or a one-line summary you want to stand out.' },

      { type: 'heading', text: 'What I learned' },
      { type: 'text', text: 'Wrap up with the skills you gained and what you would do next time.' },

      { type: 'gallery', images: ['assets/project-one-2.jpg', 'assets/project-one-3.jpg', 'assets/project-one-4.jpg'] }
    ]
  },
  {
    id: 'project-two',
    title: 'Project Two',
    short: 'A short description shown on the homepage. Keep it tight and punchy.',
    media: { type: 'video', src: 'assets/project-two.mp4', poster: 'assets/project-two.jpg' },
    skills: ['C++', 'Unreal'],
    github: 'https://github.com/yourname/project-two',
    content: [
      { type: 'text', text: 'Full writeup for project two goes here. Mix in blocks however you like.' },
      { type: 'image', src: 'assets/project-two.jpg', caption: 'Add a caption to give context.' },
      { type: 'heading', text: 'Highlights' },
      { type: 'text', text: 'More detail about what makes this one interesting.' }
    ]
  },
  {
    id: 'project-three',
    title: 'Project Three',
    short: 'No video yet? The homepage preview can be an image instead.',
    media: { type: 'image', src: 'assets/project-three.jpg' },
    skills: ['Godot', 'Python'],
    github: 'https://github.com/yourname/project-three',
    content: [
      { type: 'text', text: 'Full writeup for project three goes here.' },
      { type: 'columns', text: 'Two-column with the image flipped to the left side.', image: 'assets/project-three-2.jpg', flip: true }
    ]
  }
];
