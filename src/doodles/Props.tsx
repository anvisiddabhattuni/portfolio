import React from 'react';
import { motion } from 'framer-motion';

const INK = 'var(--ink)';
const s = {
  fill: 'none' as const,
  stroke: INK,
  strokeWidth: 4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* ---- Wooden storybook SIGN (unfolds) ---- */
export const WoodSign: React.FC<{ label: string }> = ({ label }) => (
  <svg viewBox="0 0 240 200" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)">
      <path d="M112 196 L112 96 M128 196 L128 96" {...s} />
      <path d="M24 40 q -6 30 0 60 q 90 12 192 0 q 6 -30 0 -60 q -96 -14 -192 0 Z"
            fill="var(--bark)" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M40 56 q 80 -8 160 0 M40 84 q 80 8 160 0" stroke="var(--bark-deep)" strokeWidth={2.5} fill="none" />
    </g>
    <text x="120" y="82" textAnchor="middle" className="hand"
          style={{ fontSize: 38, fill: 'var(--paper)', fontWeight: 700 }}>{label}</text>
  </svg>
);

/* ---- BENCH ---- */
export const Bench: React.FC = () => (
  <svg viewBox="0 0 260 160" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M30 70 L230 70 M34 88 L226 88" />
      <path d="M30 60 L30 30 M70 60 L70 30 M190 60 L190 30 M230 60 L230 30" />
      <path d="M30 30 L230 30 M30 44 L230 44" />
      <path d="M44 88 L44 150 M216 88 L216 150 M44 130 L8 150 M216 130 L252 150" />
    </g>
  </svg>
);

/* ---- LANTERN (project object) ---- */
export const Lantern: React.FC = () => (
  <svg viewBox="0 0 120 200" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M60 12 q -20 0 -16 18 M60 12 q 20 0 16 18" />
      <path d="M40 30 L80 30 L84 40 L36 40 Z" fill="var(--bark)" />
      <path d="M40 42 q -8 60 0 110 q 20 10 40 0 q 8 -50 0 -110 Z" fill="var(--sun-soft)" />
      <path d="M40 152 L80 152 L84 164 L36 164 Z" fill="var(--bark)" />
      <circle cx="60" cy="98" r="14" fill="var(--sun)" stroke={INK} strokeWidth={3} />
    </g>
  </svg>
);

/* ---- TREE STUMP ---- */
export const Stump: React.FC = () => (
  <svg viewBox="0 0 140 120" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M24 40 q 46 -18 92 0 L116 96 q -46 16 -92 0 Z" fill="var(--bark)" />
      <ellipse cx="70" cy="40" rx="46" ry="14" fill="var(--bark-deep)" />
      <ellipse cx="70" cy="40" rx="30" ry="9" fill="none" stroke="var(--paper)" strokeWidth={2} />
      <ellipse cx="70" cy="40" rx="14" ry="4" fill="none" stroke="var(--paper)" strokeWidth={2} />
    </g>
  </svg>
);

/* ---- BIRDHOUSE ---- */
export const Birdhouse: React.FC = () => (
  <svg viewBox="0 0 120 200" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M60 184 L60 120" />
      <path d="M30 70 L60 40 L90 70 Z" fill="var(--bloom-soft)" />
      <rect x="30" y="70" width="60" height="54" rx="4" fill="var(--paper-warm)" />
      <circle cx="60" cy="96" r="11" fill="var(--ink)" />
      <path d="M60 116 L60 130" strokeWidth={3} />
    </g>
  </svg>
);

/* ---- TENT ---- */
export const Tent: React.FC = () => (
  <svg viewBox="0 0 200 150" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M100 20 L40 130 L160 130 Z" fill="var(--leaf-light)" />
      <path d="M100 20 L100 130" />
      <path d="M100 130 q -20 -40 -34 0 Z" fill="var(--bark-deep)" />
      <path d="M100 20 L120 8 M40 130 L26 140 M160 130 L174 140" />
    </g>
  </svg>
);

/* ---- POSTER on a post (experience) ---- */
export const Poster: React.FC<{ title: string; tint?: string }> = ({ title, tint = 'var(--sky-soft)' }) => (
  <svg viewBox="0 0 160 240" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M80 236 L80 150" />
      <rect x="16" y="18" width="128" height="140" rx="6" fill={tint} />
      <path d="M28 44 L132 44 M28 60 L120 60" strokeWidth={2.5} stroke="var(--ink-soft)" />
      <rect x="28" y="78" width="104" height="56" rx="4" fill="var(--paper)" />
    </g>
    <text x="80" y="36" textAnchor="middle" className="hand"
          style={{ fontSize: 17, fill: 'var(--ink)', fontWeight: 700 }}>{title}</text>
  </svg>
);

/* ---- CAMPFIRE ---- */
export const Campfire: React.FC = () => (
  <svg viewBox="0 0 160 140" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M30 120 L130 100 M40 110 L120 124" stroke="var(--bark)" strokeWidth={7} />
      <motion.g
        style={{ originX: '80px', originY: '100px' }}
        animate={{ scaleY: [1, 1.12, 0.95, 1], rotate: [-2, 2, -2] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M80 40 q -22 28 -16 48 q 6 22 32 22 q 26 -2 24 -28 q 0 -22 -16 -34 q 4 16 -8 22 q 8 -18 -16 -30 Z"
              fill="var(--sun)" stroke={INK} strokeWidth={3.5} />
        <path d="M80 70 q -10 14 -4 26 q 8 12 20 4 q 8 -10 -2 -22 q 2 10 -6 12 q 4 -12 -8 -20 Z"
              fill="var(--bloom)" stroke="none" />
      </motion.g>
    </g>
  </svg>
);

/* ---- SKILL ITEMS (mini icons by the fire) ---- */
export const SkillItem: React.FC<{ kind: 'laptop' | 'notebook' | 'brush' | 'chart' }> = ({ kind }) => {
  const map = {
    laptop: <><rect x="20" y="30" width="60" height="38" rx="4" fill="var(--sky-soft)" /><path d="M14 74 L86 74 L80 68 L20 68 Z" fill="var(--paper-deep)" /></>,
    notebook: <><rect x="28" y="20" width="44" height="60" rx="4" fill="var(--bloom-soft)" /><path d="M38 34 L62 34 M38 48 L62 48 M38 62 L54 62" strokeWidth={2.5} stroke="var(--ink-soft)" /></>,
    brush: <><path d="M30 80 L60 40" strokeWidth={5} /><path d="M58 36 q 14 -10 20 2 q -2 16 -18 12 Z" fill="var(--bloom)" /><path d="M26 84 q -6 6 0 12 q 8 2 10 -6 Z" fill="var(--sun)" /></>,
    chart: <><rect x="20" y="20" width="60" height="60" rx="4" fill="var(--paper-warm)" /><path d="M32 66 L32 50 M48 66 L48 38 M64 66 L64 30" strokeWidth={6} stroke="var(--leaf)" /></>,
  };
  return (
    <svg viewBox="0 0 100 100" style={{ overflow: 'visible' }} aria-hidden>
      <g filter="url(#ink-wobble)" {...s}>{map[kind]}</g>
    </svg>
  );
};

/* ---- CABIN ---- */
export const Cabin: React.FC = () => (
  <svg viewBox="0 0 320 280" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <rect x="60" y="120" width="200" height="140" rx="4" fill="var(--bark)" />
      <path d="M40 124 L160 40 L280 124 Z" fill="var(--bloom-soft)" />
      <path d="M70 150 L250 150 M70 180 L250 180 M70 210 L250 210" stroke="var(--bark-deep)" strokeWidth={2.5} />
      <rect x="120" y="190" width="56" height="70" rx="3" fill="var(--paper-warm)" />
      <rect x="196" y="150" width="44" height="44" rx="3" fill="var(--sun-soft)" />
      <path d="M218 150 L218 194 M196 172 L240 172" strokeWidth={2.5} />
      {/* chimney + smoke */}
      <rect x="210" y="60" width="22" height="34" />
      <motion.path d="M221 56 q 10 -10 0 -22 q -10 -10 0 -22" fill="none" stroke="var(--ink-ghost)"
        strokeWidth={3}
        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }} />
    </g>
  </svg>
);

/* ---- MAILBOX (contact) ---- */
export const Mailbox: React.FC<{ flag?: boolean }> = ({ flag = false }) => (
  <svg viewBox="0 0 140 200" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" {...s}>
      <path d="M66 196 L66 110" strokeWidth={5} />
      <path d="M28 70 q 36 -34 84 0 L112 120 L28 120 Z" fill="var(--sky-soft)" />
      <path d="M28 120 L28 70" />
      <rect x="40" y="96" width="40" height="18" rx="3" fill="var(--paper)" />
      <motion.path d="M112 92 L132 92 L132 64 L112 64"
        fill="var(--bloom)" stroke={INK} strokeWidth={3}
        style={{ originX: '112px', originY: '92px' }}
        animate={{ rotate: flag ? -90 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }} />
    </g>
  </svg>
);
