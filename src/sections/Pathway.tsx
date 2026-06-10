import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { MaskedReveal } from '../components/MaskedReveal';
import { RealDogPair } from '../doodles/RealDogs';
import { PROJECTS, type Project } from '../content';

/** A photo for each project so visitors can "click into" them. */
const PROJECT_PHOTO: Record<string, string> = {
  riskradar: '/photos/risk-radar-cover.png',
  analytico: '/photos/analytico-cover.svg',
};

const PROJECT_PHOTO_CLASS: Record<string, string | undefined> = {
  riskradar: 'trailstop__shot--risk',
  analytico: 'trailstop__shot--logo',
};

const PROJECT_FRAME_CLASS: Record<string, string | undefined> = {
  riskradar: 'trailstop__frame--risk',
};

/* ---------------- The greeting (Kultiveret-style welcome) ---------------- */
export const Greeting: React.FC = () => (
  <section className="greet walk-panel" aria-label="Welcome">
    <div className="greet__inner">
      <p className="greet__eyebrow">
        <MaskedReveal>The dogs insisted</MaskedReveal>
      </p>
      <h2 className="greet__title">
        <MaskedReveal>Hello, I&apos;m Anvi.</MaskedReveal>
        <MaskedReveal delay={0.12}>
          <em>Walk with me.</em>
        </MaskedReveal>
      </h2>
      <Reveal delay={0.3}>
        <p className="greet__lede">
          They&apos;ll lead the way down the path. A bit about me first, then
          real projects to step into: the problem, the users, the decisions, and
          what shipped.
        </p>
      </Reveal>
      <Reveal delay={0.45} className="greet__dogs">
        <RealDogPair style={{ width: 'min(420px, 70vw)', height: 'auto' }} />
      </Reveal>
      <motion.span
        className="greet__scroll"
        aria-hidden="true"
        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓
      </motion.span>
    </div>
  </section>
);

/* ---------------- A single clickable stop on the trail ---------------- */
const TrailStop: React.FC<{ p: Project; index: number; onOpen: () => void }> = ({
  p,
  index,
  onOpen,
}) => {
  const side = index % 2 === 0 ? 'left' : 'right';
  return (
    <div className={`trailstop trailstop--${side}`}>
      <span className="trailstop__node" aria-hidden="true" />
      <Reveal y={40} className="trailstop__card-wrap">
        <button
          type="button"
          className="trailstop__card"
          onClick={onOpen}
          aria-label={`Open project ${p.title}`}
        >
          <span className={`trailstop__frame${PROJECT_FRAME_CLASS[p.id] ? ` ${PROJECT_FRAME_CLASS[p.id]}` : ''}`}>
            <img
              src={PROJECT_PHOTO[p.id]}
              alt={p.title}
              loading="lazy"
              className={PROJECT_PHOTO_CLASS[p.id]}
            />
            <span className="trailstop__enter">Step inside →</span>
          </span>
          <span className="trailstop__meta">
            <span className="trailstop__n">Project {String(index + 1).padStart(2, '0')} · {p.timeframe}</span>
            <span className="trailstop__title">{p.title}</span>
            <span className="trailstop__tag">{p.tagline}</span>
            <span className="trailstop__chips" aria-hidden="true">
              {p.tags.map((t) => <span className="trailstop__chip" key={t}>{t}</span>)}
            </span>
          </span>
        </button>
      </Reveal>
    </div>
  );
};

/* ---------------- Project case-study modal ---------------- */
const ProjectModal: React.FC<{ p: Project; onClose: () => void }> = ({ p, onClose }) => (
  <motion.div
    className="scrim"
    onClick={onClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    role="dialog"
    aria-modal="true"
    aria-label={`${p.title} case study`}
  >
    <motion.div
      className="modal modal--withshot modal--case"
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.92, y: 24, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      <button className="modal__close" type="button" onClick={onClose} aria-label="Close case study">
        ×
      </button>
      <div className="modal__hero">
        <img
          src={PROJECT_PHOTO[p.id]}
          alt={`${p.title}, project visual`}
          className={PROJECT_PHOTO_CLASS[p.id]}
        />
      </div>

      <p className="modal__kicker">{p.timeframe}</p>
      <h3>{p.title}</h3>
      <p className="tagline">{p.tagline}</p>
      <p className="modal__role">{p.role}</p>

      <div className="modal__chips">
        {p.tags.map((t) => <span className="modal__chip modal__chip--tag" key={t}>{t}</span>)}
      </div>

      <div className="metrics">
        {p.metrics.map((m) => (
          <div className="metric" key={m.label}>
            <b>{m.value}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </div>

      <section>
        <h4>Problem</h4>
        <p>{p.problem}</p>
      </section>
      <section>
        <h4>Who it's for</h4>
        <p>{p.users}</p>
      </section>
      <section>
        <h4>Insight</h4>
        <p>{p.insight}</p>
      </section>
      <section>
        <h4>My role</h4>
        <p>{p.role}</p>
      </section>
      <section>
        <h4>Product decisions</h4>
        <ul className="modal__decisions">
          {p.decisions.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </section>
      <section>
        <h4>Tradeoffs</h4>
        <p>{p.tradeoffs}</p>
      </section>
      <section>
        <h4>Technical implementation</h4>
        <p>{p.technical}</p>
        <div className="modal__stack">
          {p.stack.map((s) => <span className="modal__chip" key={s}>{s}</span>)}
        </div>
      </section>
      <section>
        <h4>Impact</h4>
        <p>{p.impact}</p>
      </section>
      <section>
        <h4>What I'd improve next</h4>
        <p>{p.next}</p>
      </section>

      {p.link && (
        <a className="modal__link link-pill" href={p.link.href} target="_blank" rel="noreferrer">
          {p.link.label} ↗
        </a>
      )}
    </motion.div>
  </motion.div>
);

/* ---------------- Case studies along the path ---------------- */
export const CaseStudies: React.FC = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="pathway walk-panel" id="case-studies" aria-label="Case studies along the path">
      <div className="pathway__trail">
        <div className="pathway__spine" aria-hidden="true" />
        <Reveal className="pathway__head" style={{ textAlign: 'center' }}>
          <p className="eyebrow">Stops along the walk</p>
          <h2><MaskedReveal>Case studies</MaskedReveal></h2>
          <p className="lede lede--center">
            Click a photo to step off the path and into the work: the problem,
            the users, the decisions, and what shipped.
          </p>
        </Reveal>

        <div className="pathway__stops">
          {PROJECTS.map((p, i) => (
            <TrailStop key={p.id} p={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>

        <Reveal className="pathway__handoff" style={{ textAlign: 'center' }}>
          <span className="pathway__node-end" aria-hidden="true" />
          <p className="eyebrow">The walk isn&apos;t over yet</p>
          <h3>Further down the trail</h3>
          <p className="lede lede--center">
            Keep scrolling. The dogs have more to show you. Up next: where
            I&apos;ve been, what I carry, and how to say hello.
          </p>
          <span className="pathway__scroll" aria-hidden="true">↓</span>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
};
