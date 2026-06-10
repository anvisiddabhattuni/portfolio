import React from 'react';
import { motion } from 'framer-motion';

const INK = 'var(--ink)';

/* ---------------- BUSH ---------------- */
export const Bush: React.FC<{ flowers?: boolean }> = ({ flowers = false }) => (
  <svg viewBox="0 0 180 110" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)">
      <path d="M20 100 q -14 -34 16 -42 q 0 -34 40 -30 q 24 -22 52 0 q 36 -2 32 34 q 22 16 4 38 Z"
            fill="var(--leaf)" stroke={INK} strokeWidth={4} strokeLinejoin="round" opacity={0.9} />
      <path d="M44 76 q 8 -10 18 -8 M92 60 q 10 -8 22 -2" fill="none" stroke="var(--leaf-deep)" strokeWidth={2.5} />
      {flowers && (
        <>
          <Bloom x={56} y={58} c="var(--bloom)" />
          <Bloom x={110} y={50} c="var(--sun)" />
          <Bloom x={84} y={70} c="var(--bloom-soft)" />
        </>
      )}
    </g>
  </svg>
);

/* ---------------- FLOWER ---------------- */
const Bloom: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => (
  <g transform={`translate(${x},${y})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="0" cy="-7" rx="4" ry="7" fill={c} stroke={INK} strokeWidth={1.6}
               transform={`rotate(${a})`} />
    ))}
    <circle cx="0" cy="0" r="3.4" fill="var(--sun)" stroke={INK} strokeWidth={1.4} />
  </g>
);

export const Flower: React.FC<{ color?: string }> = ({ color = 'var(--bloom)' }) => (
  <svg viewBox="0 0 60 90" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)">
      <path d="M30 88 q -4 -40 0 -52" fill="none" stroke="var(--leaf-deep)" strokeWidth={3.5} strokeLinecap="round" />
      <path d="M30 64 q -14 -4 -16 -16 M30 56 q 14 -2 18 -12" fill="none" stroke="var(--leaf-deep)" strokeWidth={3} />
      <Bloom x={30} y={26} c={color} />
    </g>
  </svg>
);

/* ---------------- CLOUD (drifts) ---------------- */
export const Cloud: React.FC<{ scale?: number; dur?: number; delay?: number }> = ({ scale = 1, dur = 60, delay = 0 }) => (
  <motion.svg
    viewBox="0 0 220 90" width={220 * scale} style={{ overflow: 'visible' }} aria-hidden
    animate={{ x: ['-10%', '10%', '-10%'] }}
    transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <path d="M30 70 q -26 -2 -20 -26 q -6 -22 22 -22 q 6 -24 38 -18 q 18 -22 48 -8 q 30 -8 36 20 q 28 0 22 28 q 8 22 -22 24 Z"
          fill="#ffffff" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" filter="url(#ink-wobble-soft)" opacity={0.95} />
  </motion.svg>
);

/* ---------------- BIRD (little M shape) ---------------- */
export const Bird: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg viewBox="0 0 60 30" width={size} style={{ overflow: 'visible' }} aria-hidden>
    <motion.g
      animate={{ scaleY: [1, 0.7, 1] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ originY: '15px' }}
    >
      <path d="M4 18 q 14 -16 26 -2 q 12 -14 26 2" fill="none" stroke={INK}
            strokeWidth={3} strokeLinecap="round" filter="url(#ink-wobble)" />
    </motion.g>
  </svg>
);

/* ---------------- GRASS TUFT ---------------- */
export const Grass: React.FC = () => (
  <svg viewBox="0 0 60 40" style={{ overflow: 'visible' }} aria-hidden>
    <g filter="url(#ink-wobble)" fill="none" stroke="var(--leaf-deep)" strokeWidth={3} strokeLinecap="round">
      <path d="M30 40 q -8 -22 -14 -30 M30 40 q 0 -26 0 -34 M30 40 q 8 -22 14 -30" />
    </g>
  </svg>
);

/* ---------------- GROUND LINE ---------------- */
export const GroundLine: React.FC<{ width?: number }> = ({ width = 1600 }) => (
  <svg viewBox={`0 0 ${width} 40`} width="100%" style={{ display: 'block' }} aria-hidden preserveAspectRatio="none">
    <path d={`M0 20 Q ${width * 0.25} 8 ${width * 0.5} 22 T ${width} 16`}
          fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" filter="url(#ink-wobble-soft)" />
  </svg>
);
