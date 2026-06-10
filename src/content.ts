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
    "I'm Anvi, a CS student at UT Dallas and product-minded builder. These two dogs are my unofficial tour guides. I work where product, AI, design, and engineering meet, and I like owning a problem end to end until the answer feels obvious.",
  interests: ['Product strategy', '0→1 products', 'AI-powered features', 'React · Next.js · TypeScript', 'Design systems & UX', 'Data-informed decisions'],
  background:
    'I lead front-end on hackathon-winning teams, run marketing and design for two of UT Dallas’ largest tech orgs, and ship side projects from the first Figma frame to production on Vercel. I’m comfortable across discovery, design, build, and launch.',
  goals:
    'Pursuing a career in product management: building at the intersection of user problems, design, and engineering, and shipping products people actually use.',
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
    tagline: 'Home insurance that helps you act on risk before damage happens',
    role: 'Front-End Lead · 4-person team',
    timeframe: 'Apr 2026 · WEHack 2026',
    tags: ['Product', 'AI', 'Front-end', 'Data'],
    stack: ['React', 'Flask', 'Python', 'MongoDB', 'OpenAI', 'FEMA & NOAA'],
    problem:
      'Insurance is reactive. Homeowners usually only deal with their policy after something goes wrong. There was no easy way to see a home’s risks before they turn into damage, or to know which fixes actually matter most.',
    users:
      'Homeowners who enter their address, upload inspection reports, and take a short quiz to understand what is risky about their house. We also built with insurers in mind: people who want preventative action, not just claims.',
    insight:
      'The team could show scores, factor breakdowns, and external data from FEMA and NOAA. The risk was overwhelming people with numbers. My call as front-end lead was to make the interactive floor plan the core differentiator: risk mapped to where they live, not an abstract score.',
    decisions: [
      'Led with an interactive floor plan instead of a score dashboard, so risk reads spatially the way people picture their home.',
      'Mapped three risk categories (fire, water, weather) to room-level context so the most urgent fixes surface first.',
      'Made every score explainable with a factor-by-factor breakdown tied back to the report, quiz, or external data.',
    ],
    tradeoffs:
      'I scoped the floor plan to curated room templates instead of free-form drawing. Less flexible, but it let us ship a polished, legible v1 inside a hackathon timebox and kept the data model clean.',
    technical:
      'Owned the React front end and the interactive SVG floor-plan layer. Worked across the stack on a Flask + Python pipeline that fused uploaded documents, quiz answers, claims history, and FEMA/NOAA data into one household risk profile in MongoDB, with OpenAI summarizing findings into plain-language recommendations.',
    impact:
      'Won the State Farm Challenge at WEHack 2026. Judges responded to how the floor plan turned abstract risk into concrete, room-level insight a homeowner could act on in minutes.',
    next:
      'Real-time weather and hazard alerts, maintenance timeline tracking, predictive risk modeling, and progress tracking that shows how user actions improve their score.',
    link: { label: 'Devpost', href: 'https://devpost.com/software/risk-radar-6mv83t' },
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
    tagline: 'Analytics for creators who need to know what to do next',
    role: 'Creator + Front-End Lead · Founding team',
    timeframe: 'Jan 2025 – Present',
    tags: ['Product', 'Front-end', 'Design'],
    stack: ['React', 'Tailwind', 'Figma'],
    problem:
      'Creators and social media managers do not know how to grow their accounts. Their data is scattered and hard to read, so it is tough to see where they are falling short or what to do next.',
    users:
      'Social media managers and creators who own performance but are not full-time data analysts.',
    insight:
      'The exciting idea was an AI growth agent, but none of us knew how to build and connect one yet. The right first step was analytics dashboards that show where users are falling short, with the agent as a later phase.',
    decisions: [
      'Built analytics dashboards first instead of chasing the AI agent upfront.',
      'Designed every view to end in a suggested next step, not just raw metrics.',
      'Kept the UI calm and scannable so non-analysts are not overwhelmed.',
    ],
    tradeoffs:
      'Deferred the AI agent to focus on what the team could actually ship. That meant delivering user value now instead of betting everything on a feature we had not figured out yet.',
    technical:
      'Co-created the product idea and led the front end from Figma wireframes to a responsive React + Tailwind UI: dashboards, report views, and recommendation flows.',
    impact:
      'Pre-launch. We have a complete Figma design and a built front end, but the backend was never connected, so the product is not live yet.',
    next:
      'Set up a shared front-end/back-end contract from day one: what data the UI needs and what the API provides, so both sides build toward integration instead of parallel silos.',
    metrics: [
      { label: 'Status', value: 'Pre-launch' },
      { label: 'Role', value: 'FE Lead' },
      { label: 'Stack', value: 'React' },
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
  { id: 'acm', title: 'ACM UTD', role: 'Marketing Co-Director', timeframe: 'Jan 2026 – Present', blurb: 'The largest computing org on campus (1,000+ members). I lead the marketing and design team end to end, and drove February 2026 to 314K+ Instagram views and 15.7K accounts reached, the org’s strongest month on record, by tightening cadence and aligning creative to each division’s audience.', tint: 'var(--sky-soft)' },
  { id: 'ktp', title: 'Kappa Theta Pi', role: 'VP of Marketing', timeframe: 'Jan 2026 – Present', blurb: 'Professional technology fraternity at UT Dallas. I own brand and marketing for recruitment and professional events, building multi-week Rush campaigns with the exec board and tying marketing output to concrete chapter-growth goals (applicant volume, event turnout).', tint: 'var(--bloom-soft)' },
  { id: 'beats', title: 'Beats by Dre', role: 'Data Analytics Extern', timeframe: 'Dec 2024 – Mar 2025', blurb: 'Analyzed marketing datasets to surface targeting and content insights for campaign teams, and built lightweight LLM-assisted reporting workflows that cut turnaround time on recurring requests.', tint: 'var(--sun-soft)' },
  { id: 'hs', title: 'HSBuilds', role: 'Lead Developer', timeframe: 'Aug 2023 – Aug 2024', blurb: 'Student-run nonprofit web-dev group. Led developers and designers across 10+ nonprofit projects on GitHub, shipping responsive sites while owning client communication, requirements, and delivery scheduling.', tint: 'var(--leaf-light)' },
  { id: 'hacks', title: 'Hackathons', role: 'Winner & finalist', timeframe: 'Ongoing', blurb: 'Front-end lead on hackathon teams: fast discovery, scrappy prototypes, and demos that lead with the user problem. Most recently won the State Farm Challenge at WEHack 2026.', tint: 'var(--sky-soft)' },
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
