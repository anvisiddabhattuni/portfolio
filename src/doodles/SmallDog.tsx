import React from 'react';
import { motion } from 'framer-motion';

interface DogProps {
  pose?: 'sit' | 'walk';
  blink?: boolean;
  wag?: boolean;
  lookAtUser?: boolean;
  className?: string;
}

const INK = 'var(--ink)';
const STROKE = 5;

/**
 * The small curly dog — based on the user's right dog:
 * a fluffy bichon/poodle with a scalloped curly coat, tiny tongue.
 * viewBox 280x340, baseline at bottom.
 */
export const SmallDog: React.FC<DogProps> = ({
  pose = 'sit',
  blink = true,
  wag = true,
  lookAtUser = false,
  className,
}) => {
  const eyeShift = lookAtUser ? 1.2 : 0;

  // scalloped fluffy outline helper segments are baked into the path below
  return (
    <svg
      viewBox="0 0 280 340"
      className={className}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label="A small curly dog waiting to go for a walk"
    >
      <g filter="url(#ink-wobble)" fill="none" stroke={INK} strokeWidth={STROKE}
         strokeLinecap="round" strokeLinejoin="round">

        {/* ---- TAIL ---- */}
        <motion.path
          d="M70 232 q -26 -6 -34 14 q -6 16 10 22 q 14 4 20 -10"
          style={{ originX: '66px', originY: '234px' }}
          animate={wag ? { rotate: [-8, 10, -8] } : { rotate: 0 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ---- BODY: scalloped curly fluff ---- */}
        <path d="M96 168
                 q -14 6 -16 22 q -16 4 -12 22 q -14 8 -8 24 q -10 12 4 22
                 q 8 18 30 22 q 30 8 58 2 q 26 -4 34 -24
                 q 14 -8 8 -26 q 12 -10 2 -26 q 8 -16 -6 -26
                 q -2 -18 -22 -20 q -16 -12 -36 -6 q -22 -2 -36 14 Z" />

        {/* curly tummy scallops */}
        <path d="M104 252 q 8 8 0 16 q 10 6 2 16 q 10 6 2 14"
              stroke="var(--ink-soft)" strokeWidth="3" />

        {/* front legs + paws */}
        {pose === 'sit' ? (
          <>
            <path d="M110 296 q -2 12 0 20 q 14 6 26 0" />
            <path d="M150 296 q 0 12 2 20 q 14 6 26 -1" />
            <path d="M116 314 l0 5 M126 316 l0 5" stroke="var(--ink-soft)" strokeWidth="2.5" />
            <path d="M158 314 l0 5 M168 316 l0 5" stroke="var(--ink-soft)" strokeWidth="2.5" />
          </>
        ) : (
          <>
            <motion.path d="M112 296 q -4 14 -2 22"
              animate={{ rotate: [6, -10, 6] }} style={{ originX: '112px', originY: '296px' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M162 296 q 4 14 2 22"
              animate={{ rotate: [-10, 6, -10] }} style={{ originX: '162px', originY: '296px' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }} />
          </>
        )}

        {/* ---- HEAD: big curly puff ---- */}
        <g>
          <path d="M104 96
                   q -16 0 -22 16 q -16 6 -12 24 q -8 14 6 24
                   q 6 18 28 22 q 24 8 46 0 q 22 -6 26 -24
                   q 14 -10 4 -26 q 6 -16 -10 -22 q -6 -16 -26 -16
                   q -18 -10 -40 2 Z" fill="var(--paper)" />

          {/* fluffy curl bumps around the head */}
          <path d="M96 104 q 6 -8 16 -6 M150 96 q 8 -6 18 0 M82 132 q -8 6 -4 16 M186 130 q 10 4 8 16"
                stroke="var(--ink-soft)" strokeWidth="3.5" />

          {/* EYES */}
          <motion.g
            animate={blink ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
            transition={{ duration: 3.6, times: [0, 0.9, 0.94, 0.97, 1], repeat: Infinity, delay: 0.5 }}
            style={{ originY: '150px' }}
          >
            <ellipse cx={118 + eyeShift} cy="150" rx="5" ry="6.5" fill={INK} stroke="none" />
            <ellipse cx={158 + eyeShift} cy="150" rx="5" ry="6.5" fill={INK} stroke="none" />
            <circle cx={116 + eyeShift} cy="147" r="1.4" fill="var(--paper)" stroke="none" />
            <circle cx={156 + eyeShift} cy="147" r="1.4" fill="var(--paper)" stroke="none" />
          </motion.g>

          {/* nose */}
          <path d="M132 162 q 7 -2 11 2 q 0 7 -5 8 q -7 0 -7 -6 q 0 -3 1 -4 Z"
                fill={INK} stroke="none" />
          {/* tiny tongue */}
          <path d="M134 174 q 3 11 9 11 q 7 0 7 -10 q -8 3 -16 -1 Z"
                fill="var(--bloom)" stroke="var(--ink-soft)" strokeWidth="2" />
          <path d="M124 170 q 14 8 28 0" strokeWidth="3" />
        </g>

        {/* ---- COLLAR (below the chin, on the neck) ---- */}
        <path d="M108 196 q 34 16 66 0" stroke="var(--ink)" strokeWidth="5" />
        <circle cx="141" cy="206" r="3.6" fill="var(--ink)" stroke="none" />
      </g>
    </svg>
  );
};
