/* ============================================================
   Content — the single source of truth for the portfolio.
   Positioning: Product (primary), AI Product / AI Eng,
   Software Engineering, with Product Design / UX as support.
   ============================================================ */

export const PROFILE = {
  name: 'Anvi Siddabhattuni',
  /** the one line a recruiter should remember */
  positioning:
    'Computer Science student at UT Dallas, building at the intersection of product, AI, design, and engineering.',
  roles: ['Product Management', 'AI Product / AI Engineering', 'Software Engineering', 'Product Design / UX'],
  location: 'Dallas, TX',
};

export const ABOUT = {
  name: 'Anvi',
  intro:
    "I'm Anvi — CS student at UT Dallas, product-minded builder, and unofficial tour guide for two very opinionated dogs. I work where product, AI, design, and engineering meet, and I like owning a problem end to end until the answer feels obvious.",
  interests: ['Product strategy', '0→1 products', 'AI-powered features', 'React · Next.js · TypeScript', 'Design systems & UX', 'Data-informed decisions'],
  background:
    'I lead front-end on hackathon-winning teams, run marketing and design for two of UT Dallas’ largest tech orgs, and ship side projects from the first Figma frame to production on Vercel. I’m comfortable across the whole arc — discovery, design, build, and launch.',
  goals:
    'Pursuing a career in product management — building at the intersection of user problems, design, and engineering, and shipping products people actually use.',
};

export interface Project {
  id: string;
  object: 'lantern' | 'stump' | 'birdhouse' | 'tent';
  title: string;
  tagline: string;
  /** my role + the shape of the team */
  role: string;
  timeframe: string;
  /** quick scan chips: the lens this work shows off */
  tags: string[];
  stack: string[];
  /* ---- the case study, in PM order ---- */
  problem: string;
  users: string;
  insight: string;
  decisions: string[];
  tradeoffs: string;
  technical: string;
  impact: string;
  next: string;
  link?: { label: string; href: string };
  metrics: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'riskradar',
    object: 'lantern',
    title: 'Risk Radar',
    tagline: 'Turning a dense home-risk report into something you can act on',
    role: 'Front-End Lead · 4-person team',
    timeframe: 'Apr 2026 · WEHack 2026',
    tags: ['Product', 'AI', 'Front-end', 'Data'],
    stack: ['React', 'Flask', 'Python', 'MongoDB', 'OpenAI'],
    problem:
      'Homeowners get risk and insurance information as dense, jargon-heavy reports. It’s technically accurate and nearly impossible to act on — so most people ignore it until something actually breaks.',
    users:
      'Homeowners (especially first-time buyers) trying to understand what’s genuinely risky about their house, and the insurers who want them to take preventative action before a claim.',
    insight:
      'People don’t reason about risk as a single score — they reason room by room. “Is the kitchen a fire risk? Is the basement going to flood?” Mapping risk onto physical space makes an abstract number instantly legible.',
    decisions: [
      'Led with an interactive floor plan instead of a score dashboard, so risk reads spatially — the way people actually picture their home.',
      'Color-coded risk by category (fire, water, weather) at the room level, so the most urgent fixes surface first.',
      'Made every score explainable — each number traces back to the report, claim, or external data that produced it.',
    ],
    tradeoffs:
      'I scoped the floor plan to a curated set of room templates instead of free-form drawing. Less flexible, but it let us ship a polished, legible v1 inside a hackathon timebox and kept the data model clean.',
    technical:
      'Owned the React front-end and the interactive SVG floor-plan layer. Worked across the stack on a Flask + Python pipeline that fused unstructured inspection reports, claims history, quiz inputs, and external FEMA/NOAA data into one explainable risk profile (stored in MongoDB), with OpenAI summarizing findings into plain-language recommendations.',
    impact:
      'Won the State Farm Challenge at WEHack 2026. Judges singled out the floor-plan view as the differentiator — it turned an abstract score into something a homeowner could act on in minutes.',
    next:
      'Add free-form room editing and a prioritized “fix-it” checklist with rough cost estimates, then validate the scoring weights against real claims data.',
    link: { label: 'Devpost', href: 'https://devpost.com/anvisiddabhattuni' },
    metrics: [
      { label: 'State Farm Challenge', value: 'Winner' },
      { label: 'Person team', value: '4' },
      { label: 'React + Flask', value: 'Full-stack' },
    ],
  },
  {
    id: 'analytico',
    object: 'birdhouse',
    title: 'Analytico',
    tagline: 'Social analytics that ends in a recommendation, not a chart',
    role: 'Front-End Developer · small team',
    timeframe: 'Jan 2025 – Present',
    tags: ['Product', 'Front-end', 'Design'],
    stack: ['React', 'Tailwind', 'Figma'],
    problem:
      'Content managers spend hours each week manually pulling numbers from scattered platform dashboards just to answer “how did this campaign do?” — and rarely walk away with a clear next step.',
    users:
      'Social and content managers who own performance but don’t have the time (or mandate) to be data analysts.',
    insight:
      'The real job isn’t “show me charts” — it’s “tell me what to do next.” Analytics only earns its keep when it ends in a recommendation.',
    decisions: [
      'Designed the dashboard around recommendations, not raw metrics — every view ends in a suggested action.',
      'Built reusable report views so a manager can go from data to a shareable summary in a couple of clicks.',
      'Kept the UI calm and scannable so non-analysts aren’t overwhelmed.',
    ],
    tradeoffs:
      'Prioritized a tight, opinionated dashboard for a few key platforms over broad-but-shallow coverage — depth and clarity first, breadth later.',
    technical:
      'Translating Figma mockups into a responsive React + Tailwind front-end — dashboards, report views, and recommendation flows. Currently in active development.',
    impact:
      'In active development with a small team. [insert beta-user count] · [insert before/after reporting-time result] once piloted.',
    next:
      'Run a closed beta with a handful of content managers, instrument time-to-report, and use it to validate which recommendations actually get acted on.',
    metrics: [
      { label: 'shipping soon', value: 'In dev' },
      { label: 'Tailwind + Figma', value: 'React' },
      { label: 'design → UI', value: 'Figma' },
    ],
  },
];

export interface Experience {
  id: string;
  title: string;
  role: string;
  timeframe: string;
  blurb: string;
  tint: string;
}

export const EXPERIENCES: Experience[] = [
  { id: 'acm', title: 'ACM UTD', role: 'Marketing Co-Director', timeframe: 'Jan 2026 – Present', blurb: 'The largest computing org on campus (1,000+ members). I lead the marketing and design team end to end — and drove February 2026 to 314K+ Instagram views and 15.7K accounts reached, the org’s strongest month on record, by tightening cadence and aligning creative to each division’s audience.', tint: 'var(--sky-soft)' },
  { id: 'ktp', title: 'Kappa Theta Pi', role: 'VP of Marketing', timeframe: 'Jan 2026 – Present', blurb: 'Professional technology fraternity at UT Dallas. I own brand and marketing for recruitment and professional events, building multi-week Rush campaigns with the exec board and tying marketing output to concrete chapter-growth goals (applicant volume, event turnout).', tint: 'var(--bloom-soft)' },
  { id: 'beats', title: 'Beats by Dre', role: 'Data Analytics Extern', timeframe: 'Dec 2024 – Mar 2025', blurb: 'Analyzed marketing datasets to surface targeting and content insights for campaign teams, and built lightweight LLM-assisted reporting workflows that cut turnaround time on recurring requests.', tint: 'var(--sun-soft)' },
  { id: 'hs', title: 'HSBuilds', role: 'Lead Developer', timeframe: 'Aug 2023 – Aug 2024', blurb: 'Student-run nonprofit web-dev group. Led developers and designers across 10+ nonprofit projects on GitHub, shipping responsive sites while owning client communication, requirements, and delivery scheduling.', tint: 'var(--leaf-light)' },
  { id: 'hacks', title: 'Hackathons', role: 'Winner & finalist', timeframe: 'Ongoing', blurb: 'Front-end lead on hackathon teams — fast discovery, scrappy prototypes, and demos that lead with the user problem. Most recently won the State Farm Challenge at WEHack 2026.', tint: 'var(--sky-soft)' },
];

export const SKILLS = [
  { kind: 'brush' as const, title: 'Product & UX', items: ['User research', 'Jobs-to-be-done', 'Prioritization', 'PRDs & specs', 'Figma prototyping', 'Design systems'] },
  { kind: 'chart' as const, title: 'Front-end & Frameworks', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node / NestJS', 'Flask'] },
  { kind: 'laptop' as const, title: 'Languages & Data', items: ['Java', 'C / C++', 'Python', 'JavaScript', 'SQL', 'MongoDB / PostgreSQL'] },
  { kind: 'notebook' as const, title: 'AI & Experimentation', items: ['OpenAI API', 'Vertex AI (Gemini)', 'Elasticsearch', 'A/B testing', 'Funnels & metrics'] },
];

export const CONTACT = {
  email: 'anvimsiddabhattuni@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anvi-siddabhattuni',
  github: 'https://github.com/anvisiddabhattuni',
  devpost: 'https://devpost.com/anvisiddabhattuni',
  resume: '/Anvi-Siddabhattuni-Resume.pdf',
};
