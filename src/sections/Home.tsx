/* ============================================================
   Home — product-management portfolio, single page.
   NKORA-style rhythm: every section wears its own palette color.
   Navigation is a fixed top rail with a sliding active tab and
   scrollspy behavior.
   The Frame-1 hero pins, splits in four directions on scroll,
   and lands directly on the About section.
   ============================================================ */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { PROFILE, CONTACT } from '../content';
import { WaveArt } from '../components/WaveArt';
import { RisingWords } from '../components/RisingWords';
import { InteractiveHoverButton, InteractiveHoverLink } from '../components/ui/interactive-hover-button';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CaseStudies } from './Pathway';
import { AboutStop, ExperienceStop, SkillsStop } from './Stops';

/** Very light wave linework laid behind a section for texture. */
function WaveTexture({ variant }: { variant: 1 | 2 | 3 | 4 }) {
  return (
    <div className="nk-texture" aria-hidden="true">
      <WaveArt variant={variant} bare />
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- corner-flying section headers ---------------- */

/**
 * CornerTitle — the section's display headline sails in from a bottom
 * corner as the section enters the viewport, then stays put. The
 * flight spreads over the first 40% of the title's scroll journey —
 * a slow drift — and since the title sits mid-page, a nav jump
 * (landing ≈0.58) still arrives fully settled. Scroll-linked;
 * static under reduced motion.
 */
function CornerTitle({
  text,
  from = 'left',
  className = '',
}: {
  text: string;
  from?: 'left' | 'right';
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const dir = from === 'left' ? -1 : 1;
  const x = useTransform(p, [0, 0.5], [`${dir * 70}vw`, '0vw']);
  const y = useTransform(p, [0, 0.5], ['26vh', '0vh']);
  const rotate = useTransform(p, [0, 0.5], [dir * 9, 0]);
  const opacity = useTransform(p, [0, 0.28], [0, 1]);

  if (reduced) {
    return <h2 className={className}>{text}</h2>;
  }

  return (
    <div ref={ref} className="corner-title">
      <motion.h2 className={className} style={{ x, y, rotate, opacity }}>
        {text}
      </motion.h2>
    </div>
  );
}

/**
 * SectionIntro — the full-viewport color page that announces each part
 * of the site (the EXPERIENCE page pattern, now for every section).
 * Title flies in from a corner and stays put; the index number ties the
 * page to its folder tab (01 · About, 02 · Work, …).
 */
function SectionIntro({
  id,
  index,
  title,
  statement,
  tone,
  from,
}: {
  id: string;
  index: string;
  title: string;
  statement: string;
  tone: 'amber' | 'garnet' | 'spice' | 'olive' | 'yale';
  from: 'left' | 'right';
}) {
  return (
    <section className={`nk-human nk-intro nk-intro--${tone}`} id={id}>
      <span className="nk-intro__n" aria-hidden="true">{index}</span>
      <div className="nk-human__words">
        <CornerTitle text={title} from={from} className="nk-display nk-display--stack" />
      </div>
      <div className="nk-human__text">
        <Reveal>
          <p className="nk-statement">{statement}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- horizontal top section tabs ---------------- */

interface Tab {
  id: string;
  label: string;
}

const TABS: Tab[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'case-studies', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/** each folder tab wears its section's intro-page color — the rail shows
    the whole palette, one color per section, no neighbors repeating */
const TAB_TONES: Record<string, { bg: string; ink: string }> = {
  hero: { bg: 'var(--cream)', ink: 'var(--garnet)' },
  about: { bg: 'var(--amber)', ink: 'var(--garnet)' },
  'case-studies': { bg: 'var(--garnet)', ink: 'var(--cream)' },
  experience: { bg: 'var(--spice)', ink: 'var(--cream)' },
  skills: { bg: 'var(--olive)', ink: 'var(--cream)' },
  contact: { bg: 'var(--yale)', ink: 'var(--cream)' },
};

const SECTION_IDS = TABS.map((t) => t.id);

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const compute = () => {
      const mid = window.innerHeight * 0.45;
      // walk the sections back to front: the sticky hero's rect still
      // straddles the viewport while About slides over it, so the
      // LATEST section past the midline must win, not the first
      let current = ids[0];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= mid) {
          current = ids[i];
          break;
        }
      }
      setActive(current);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [ids]);
  return active;
}

function scrollToSection(id: string) {
  // the hero is sticky inside a taller wrapper, so scrollIntoView
  // stops mid-split; Home means the very top of the page
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '#hero');
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

/** TopNav: a persistent horizontal section rail with a springy active tab. */
function TopNav() {
  const active = useActiveSection(SECTION_IDS) || TABS[0].id;

  return (
    <motion.nav
      className="top-nav"
      aria-label="Sections"
      initial={{ opacity: 0, x: '-50%', y: -16 }}
      animate={{ opacity: 1, x: '-50%', y: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      {TABS.map((t, i) => {
        const isActive = active === t.id;
        const activeTone =
          t.id === 'hero'
            ? {
                bg: 'var(--cream)',
                ink: 'var(--garnet)',
                dot: 'var(--cream)',
                border: 'var(--garnet)',
                dotBorder: 'var(--garnet)',
              }
            : t.id === 'contact'
              ? {
                  bg: 'var(--yale)',
                  ink: 'var(--amber)',
                  dot: 'var(--amber)',
                  border: 'var(--yale)',
                  dotBorder: 'var(--amber)',
                }
              : t.id === 'case-studies'
              ? { bg: 'var(--garnet)', ink: 'var(--amber)', dot: 'var(--amber)' }
              : { ...TAB_TONES[t.id], dot: TAB_TONES[t.id].ink };
        const buttonVars = {
          '--hover-bg': activeTone.bg,
          '--hover-fg': activeTone.ink,
          '--nav-dot': activeTone.bg,
          '--nav-active-dot': activeTone.dot,
          '--nav-active-border': activeTone.border ?? 'transparent',
          '--nav-dot-border': activeTone.dotBorder ?? 'transparent',
          '--nav-active-dot-border': activeTone.dotBorder ?? 'transparent',
        } as CSSProperties;

        return (
          <motion.div
            key={t.id}
            className="top-nav__slot"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, type: 'spring', stiffness: 320, damping: 28 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <InteractiveHoverButton
              text={t.label}
              className="top-nav__item"
              data-active={isActive}
              data-nav-id={t.id}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => scrollToSection(t.id)}
              showArrow={false}
              style={buttonVars}
            />
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

/** Thin amber→spice→garnet bar along the top tracking the walk. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* ---------------- hero (Frame 1, splits four ways on scroll) ---------------- */

/**
 * A live rebuild of Anvi's `design/Frame 1.svg`, with her watercolor
 * dogs placed around the frame. Pinned for most of a viewport of
 * scroll; every element flies out in its own direction and the page
 * lands directly on About.
 */
function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const fade = useTransform(p, [0.4, 0.8], [1, 0]);

  const anvisX = useTransform(p, [0, 1], ['0vw', '-52vw']);
  const anvisY = useTransform(p, [0, 1], ['0vh', '-42vh']);
  const anvisR = useTransform(p, [0, 1], [0, -7]);

  const greenX = useTransform(p, [0, 1], ['0vw', '-58vw']);
  const greenY = useTransform(p, [0, 1], ['0vh', '32vh']);
  const greenR = useTransform(p, [0, 1], [0, -10]);

  const amberX = useTransform(p, [0, 1], ['0vw', '58vw']);
  const amberY = useTransform(p, [0, 1], ['0vh', '-46vh']);
  const amberR = useTransform(p, [0, 1], [0, 9]);

  const portX = useTransform(p, [0, 1], ['0vw', '52vw']);
  const portY = useTransform(p, [0, 1], ['0vh', '44vh']);
  const portR = useTransform(p, [0, 1], [0, 6]);

  const ctaOpacity = useTransform(p, [0, 0.15], [1, 0]);

  return (
    <div className="nk-hero-wrap" ref={wrapRef}>
      <section className="nk-hero" id="hero">
        <div className="f1">
          <motion.div
            className="f1__pos f1__pos--name"
            style={{ x: anvisX, y: anvisY, rotate: anvisR, opacity: fade }}
          >
            <motion.span
              className="f1__anvis"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease }}
            >
              Anvi Sidda&rsquo;s
            </motion.span>
          </motion.div>

          <motion.div
            className="f1__pos f1__pos--green"
            style={{ x: greenX, y: greenY, rotate: greenR, opacity: fade }}
          >
            <motion.div
              className="f1__square"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
            >
              <img
                src="/dogs/frame1-dogs.png"
                alt="Crayon drawing of a golden retriever on an olive-green square"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="f1__pos f1__pos--amber"
            style={{ x: amberX, y: amberY, rotate: amberR, opacity: fade }}
          >
            <motion.div
              className="f1__square"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
            >
              <img
                src="/dogs/frame1-dogs.png"
                alt="Crayon drawing of a white poodle on an amber-gold square"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="f1__pos f1__pos--portfolio"
            style={{ x: portX, y: portY, rotate: portR, opacity: fade }}
          >
            <motion.span
              className="f1__portfolio"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease }}
            >
              Portfolio
            </motion.span>
          </motion.div>

          <div className="nk-hero__actions-wrap">
            <motion.div
              className="nk-hero__actions"
              style={{ opacity: ctaOpacity }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.9, ease }}
            >
              <InteractiveHoverLink
                className="nk-hero__button"
                href="#about"
                text="Let's Go"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection('about');
                }}
              />
              <InteractiveHoverLink
                className="nk-hero__button nk-hero__button--resume"
                href={CONTACT.resume}
                target="_blank"
                rel="noopener noreferrer"
                text="Résumé"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- contact (cream, real form) ---------------- */

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [problem, setProblem] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setProblem('All three fields are needed: name, email, and a message.');
      setStatus('error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setProblem('That email does not look right. Mind double-checking it?');
      setStatus('error');
      return;
    }
    setProblem('');
    setStatus('sending');
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      setStatus('sent');
    } catch {
      setProblem('The message did not go through. Email me directly instead, I read everything.');
      setStatus('error');
    }
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <section className="nk-contact" id="contact-detail">
      <WaveTexture variant={2} />

      <div className="nk-contact__inner">
        <div className="nk-contact__intro">
          <h2 className="nk-display nk-contact__heading">
            <RisingWords text="Say hello" />
          </h2>
          <Reveal delay={0.1}>
            <p className="nk-body nk-contact__lede">
              Recruiting, feedback, or just want to talk product? Leave a note here and it
              lands in my inbox.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="nk-contact__dogs" aria-hidden="true">
              <img src="/dogs/entry-golden.png" alt="" draggable={false} />
              <img src="/dogs/entry-poodle.png" alt="" draggable={false} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="nk-contact__links">
              <a className="pill pill--mini" href={`mailto:${CONTACT.email}`}>Email</a>
              <a className="pill pill--mini" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="pill pill--mini" href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="pill pill--mini" href={CONTACT.devpost} target="_blank" rel="noopener noreferrer">Devpost</a>
              <a className="pill pill--mini" href={CONTACT.resume} target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {status === 'sent' ? (
            <motion.div
              className="nk-form nk-form--sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="nk-form__thanks">
                Got it. Thanks, {form.name.split(' ')[0] || 'friend'}, I will get back to you
                soon.
              </p>
            </motion.div>
          ) : (
            <form className="nk-form" onSubmit={submit} noValidate>
              <label>
                Name
                <input type="text" name="name" autoComplete="name" {...field('name')} />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" {...field('email')} />
              </label>
              <label>
                Message
                <textarea name="message" rows={6} {...field('message')} />
              </label>
              {status === 'error' && (
                <p className="nk-form__error" role="alert">
                  {problem}{' '}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </p>
              )}
              <InteractiveHoverButton
                className="nk-form__submit"
                type="submit"
                disabled={status === 'sending'}
                text={status === 'sending' ? 'Sending…' : 'Send it'}
              />
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="nk-footer">
      <h2 className="nk-display nk-footer__title">
        <RisingWords text="THANKS FOR STOPPING BY" />
      </h2>
      <div className="nk-footer__row">
        <div className="nk-footer__links">
          <a href={`mailto:${CONTACT.email}`}>Email</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={CONTACT.devpost} target="_blank" rel="noopener noreferrer">
            Devpost
          </a>
          <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
        <p className="nk-footer__copy">
          © 2026 {PROFILE.name} · {PROFILE.location}
        </p>
      </div>
    </footer>
  );
}

export function Home() {
  return (
    <div className="nk-page">
      <ScrollProgress />
      <TopNav />
      <main>
        <Hero />
        <SectionIntro
          id="about"
          index="01"
          title="ABOUT"
          tone="amber"
          from="left"
          statement="PM intern at Colaberry, CS student at UT Dallas, and handler of two very opinionated tour guides."
        />
        {/* Original editorial About on an olive band (anvisidda.com format) */}
        <div className="nk-legacy nk-legacy--olive">
          <WaveTexture variant={4} />
          <AboutStop />
        </div>
        <SectionIntro
          id="case-studies"
          index="02"
          title="WORK"
          tone="garnet"
          from="left"
          statement="Three products, spec to ship. Open one for the problem, the calls I made, and what came of it."
        />
        {/* Original folder-styled case studies (cream band, yale folder tab) */}
        <div className="nk-legacy">
          <CaseStudies />
        </div>
        <SectionIntro
          id="experience"
          index="03"
          title="EXPERIENCE"
          tone="spice"
          from="left"
          statement="Internships, campus leadership, and hackathon teams. Here is what I owned and what came of it."
        />
        {/* Original experience folder on a yale band */}
        <div className="nk-legacy nk-legacy--yale">
          <ExperienceStop />
        </div>
        <SectionIntro
          id="skills"
          index="04"
          title="SKILLS"
          tone="olive"
          from="left"
          statement="What I reach for, from writing the spec to shipping the build to growing it after."
        />
        {/* Skills folder on an amber band */}
        <div className="nk-legacy nk-legacy--amber">
          <SkillsStop />
        </div>
        <SectionIntro
          id="contact"
          index="05"
          title="CONTACT"
          tone="yale"
          from="left"
          statement="You made it to the end of the walk. Say hello, ask about the work, or send the dogs a compliment."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
