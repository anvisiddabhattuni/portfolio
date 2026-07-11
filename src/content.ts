/* ============================================================
   Content — the single source of truth for the portfolio.
   Synced to the July 2026 resume + LinkedIn.
   Positioning: Product (primary), AI Product / AI Eng,
   Software Engineering, with Product Design / UX as support.
   ============================================================ */

export const PROFILE = {
  name: 'Anvi Siddabhattuni',
  /** the one line a recruiter should remember */
  positioning:
    'PM intern at Colaberry. My content strategy at ACM UTD reached 314K views in one month, and my hackathon build won the State Farm Challenge at WEHack 2026.',
  roles: ['Product Management', 'AI Product / AI Engineering', 'Software Engineering', 'Product Design / UX'],
  location: 'Dallas–Fort Worth, TX',
};

export const ABOUT = {
  name: 'Anvi',
  intro:
    "I'm Anvi, a product management intern at Colaberry and a CS student at UT Dallas. These two dogs are the unofficial tour guides. I found product through the side door: running marketing for two campus orgs and building at hackathons, where the part I kept coming back to was deciding what to build and proving it worked. That's the job now. Write the spec, cut the scope, ship it, check the numbers.",
  interests: [
    'Product discovery',
    'Roadmapping & specs',
    '0→1 AI products',
    'A/B testing & product analytics',
    'Evals & prompt design',
    'Growth & content strategy',
  ],
  background:
    'By day I’m a PM intern on a Scrum team at Colaberry, running feature discovery for data-analytics tooling. On campus I lead a 19-officer marketing and design team at ACM UTD, where one month of our content reached 314K Instagram views. I also build my own products. The latest won the State Farm Challenge at WEHack 2026.',
  goals:
    'Looking for a Summer 2027 PM internship with real ownership: a problem I can research properly and ship against.',
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
  links?: { label: string; href: string }[];
  metrics: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'muse',
    object: 'lantern',
    title: 'Muse',
    tagline: 'Reads a whole Pinterest board’s aesthetic and turns it into a shoppable page of real products',
    role: 'Product Manager & Builder · Solo',
    timeframe: 'Jul 2026',
    tags: ['AI', 'Product', '0→1'],
    stack: ['Next.js', 'Vision model', 'Embeddings', 'OpenAI'],
    problem:
      'People collect aesthetics on Pinterest, but shopping them is manual: reverse-image-searching one pin at a time never captures the overall vibe of a board. The look lives across fifty pins, not in any single one.',
    users:
      'Pinterest-first shoppers: people who curate boards for a look they want to buy into, not for a single item.',
    insight:
      'The unit of intent is the board, not the pin. Reading the aesthetic across every pin (palette, materials, style) and matching it against product embeddings gets far closer to what the user actually wants than any one-image match.',
    decisions: [
      'Wrote the spec first and cut scope to a focused MVP: one board in, one shoppable page out.',
      'Set the success metrics up front (12+ real product matches per board, under 30 seconds to results) and built to hit them.',
      'Chose a vision model + embeddings pipeline over per-pin reverse image search, so results match the board’s overall aesthetic.',
    ],
    tradeoffs:
      'Matched against a curated product catalog instead of live-scraping every retailer. Smaller inventory, but reliable matches, stable latency, and a demo that always works.',
    technical:
      'Built on Next.js: a vision model reads the board’s pins into an aesthetic profile, embeddings match that profile against product data, and the results render as a shoppable page.',
    impact:
      'Wrote the spec, set the targets, built the product, and hit them: 12+ real matches per board in under 30 seconds.',
    next:
      'Saved boards and accounts, affiliate links, and evals that score match quality so the matching improves against real user feedback instead of my own taste.',
    links: [
      { label: 'Live site', href: 'https://frontend-xi-eight-44.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/anvisiddabhattuni/Sartorial-Curation' },
    ],
    metrics: [
      { label: 'Matches per board', value: '12+' },
      { label: 'To results', value: '<30s' },
      { label: 'Spec to ship', value: 'Solo' },
    ],
  },
  {
    id: 'riskradar',
    object: 'stump',
    title: 'Risk Radar',
    tagline: 'Won the State Farm Challenge at WEHack 2026 by flagging home risk before it becomes damage',
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
    links: [{ label: 'Devpost', href: 'https://devpost.com/software/risk-radar-6mv83t' }],
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
    tagline: 'A stalled front-end project I pivoted into a working analytics app for student-org marketers',
    role: 'Product Manager & Builder · Founding team',
    timeframe: 'Jan 2025 – Present',
    tags: ['Product', 'Full-stack', 'Design'],
    stack: ['React', 'Tailwind', 'Supabase', 'Figma'],
    problem:
      'Student-org marketers own growth but their data is scattered and hard to read, so it’s tough to see where they’re falling short or what to do next. I hit this problem myself running marketing for two orgs at UT Dallas.',
    users:
      'Student-org marketers and social media managers: people who own performance numbers but are not full-time data analysts.',
    insight:
      'The project had stalled as a front-end-only build with no backend in sight. The pivot: narrow to a user I deeply understand (student-org marketers, and I am one), and own the full stack myself so the product can actually ship instead of waiting on integration.',
    decisions: [
      'Pivoted a stalled front-end-only project into a Facebook analytics app for student-org marketers.',
      'Set the roadmap and run ongoing user research with org marketers on campus.',
      'Designed every view to end in a suggested next step, not just raw metrics.',
    ],
    tradeoffs:
      'Chose Supabase over a custom backend, trading infrastructure control for shipping speed. Auth, data model, and APIs stood up in days instead of weeks, which is what a one-person build needed.',
    technical:
      'I own the whole build: the Supabase backend and data model, plus the React + Tailwind front end across dashboards, reports, and recommendation flows.',
    impact:
      'The stalled project is now in active build with a working backend: a live data model, dashboards rendering real data, and a user research loop feeding the roadmap.',
    next:
      'Instagram support next, since that’s where student orgs actually live. Then recommendation quality: turning “here’s your reach” into “post this, at this time, to this audience.”',
    links: [
      { label: 'Live site', href: 'https://www.4nalytico.com/' },
      { label: 'GitHub', href: 'https://github.com/anvisiddabhattuni/analytico' },
    ],
    metrics: [
      { label: 'Status', value: 'In build' },
      { label: 'Role', value: 'PM & Builder' },
      { label: 'Backend', value: 'Supabase' },
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
  {
    id: 'colaberry',
    title: 'Colaberry',
    role: 'Product Management Intern',
    timeframe: 'Jun 2026 – Present',
    blurb:
      'PM intern on a Scrum team in Plano building data-analytics tooling. I run feature discovery and contribute to sprint planning. My job is turning user problems into a backlog the engineers actually want to build, then shipping against it.',
    tint: 'var(--sky-soft)',
  },
  {
    id: 'acm',
    title: 'ACM UTD',
    role: 'Marketing Co-Director',
    timeframe: 'Jan 2026 – Present',
    blurb:
      '314K Instagram views and 15.7K accounts reached in one month, a record for the largest CS org at UT Dallas (1,000+ members). I own the content strategy and lead 19 marketing and design officers. I got the numbers by A/B testing posting cadence and splitting creative by audience, and I replaced ad-hoc request DMs with an intake tool that routes 90+ requests a semester into one prioritized queue.',
    tint: 'var(--sun-soft)',
  },
  {
    id: 'ktp',
    title: 'Kappa Theta Pi',
    role: 'VP of Marketing',
    timeframe: 'Jan 2026 – May 2026',
    blurb:
      'Professional technology fraternity at UT Dallas; promoted from Director of Social Media after one year. Ran a 60-applicant recruitment funnel that converted 32% into a 19-person pledge class, and led a 3-person social and design team while setting the semester marketing roadmap with the exec board.',
    tint: 'var(--bloom-soft)',
  },
  {
    id: 'beats',
    title: 'Beats by Dre',
    role: 'Data Analytics Extern',
    timeframe: 'Dec 2024 – Mar 2025',
    blurb:
      'Remote externship via Extern. Analyzed ~150 survey responses and Amazon reviews on the Beats Pill, then turned the sentiment and pricing findings into product recommendations. LLM tooling cut the analysis time roughly in half.',
    tint: 'var(--sun-soft)',
  },
  {
    id: 'hacks',
    title: 'Hackathons',
    role: 'Winner & finalist',
    timeframe: 'Ongoing',
    blurb:
      'Front-end lead on hackathon teams. Fast discovery, scrappy prototypes, demos that open with the user problem. Most recent: Risk Radar, winner of the State Farm Challenge at WEHack 2026.',
    tint: 'var(--sky-soft)',
  },
];

export const SKILLS = [
  {
    kind: 'brush' as const,
    title: 'Product',
    items: ['Discovery', 'User research', 'Roadmapping', 'A/B testing', 'Product analytics', 'Agile / Scrum'],
  },
  {
    kind: 'notebook' as const,
    title: 'AI',
    items: ['LLM app development', 'Evals & prompt design', 'Model selection & cost/latency tradeoffs', 'Embeddings & semantic search', 'OpenAI API', 'Vertex AI (Gemini)'],
  },
  {
    kind: 'laptop' as const,
    title: 'Build',
    items: ['Next.js · React · TypeScript', 'Tailwind', 'Flask · Node · Python', 'SQL · Supabase', 'Figma', 'Git'],
  },
  {
    kind: 'chart' as const,
    title: 'Growth',
    items: ['Content strategy', 'Social growth', 'Campaign roadmaps', 'Funnel ownership'],
  },
];

export const CONTACT = {
  /**
   * Serverless endpoint that sends contact form submissions through Resend.
   * Requires RESEND_API_KEY in the deployment environment.
   */
  formEndpoint: '/api/contact',
  email: 'anvimsiddabhattuni@gmail.com',
  linkedin: 'https://www.linkedin.com/in/anvi-siddabhattuni',
  linkedinProjects: 'https://www.linkedin.com/in/anvi-siddabhattuni/details/projects/',
  github: 'https://github.com/anvisiddabhattuni',
  devpost: 'https://devpost.com/anvisiddabhattuni',
  resume: '/Anvi_Siddabhattuni_PM_Resume_JULY2026.pdf',
};
