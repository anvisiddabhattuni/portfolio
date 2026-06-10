import React from 'react';
import { motion } from 'framer-motion';

const INK = 'var(--ink)';

/**
 * The front door — matches the doodle's door with handle, peephole,
 * mail slot and the little wall switch. The inner panel swings open
 * on `open`, revealing a warm glow behind it.
 */
export const FrontDoor: React.FC<{ open: boolean }> = ({ open }) => (
  <svg viewBox="0 0 360 520" style={{ overflow: 'visible' }} aria-hidden>
    {/* glow that spills out when open */}
    <motion.ellipse
      cx="150" cy="300" rx="180" ry="240" fill="url(#doorGlow)"
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 1.6, delay: open ? 0.4 : 0 }}
    />
    <defs>
      <radialGradient id="doorGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--sun-soft)" stopOpacity="0.95" />
        <stop offset="55%" stopColor="var(--paper-warm)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="var(--paper)" stopOpacity="0" />
      </radialGradient>
    </defs>

    <g filter="url(#ink-wobble-soft)" fill="none" stroke={INK}
       strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
      {/* frame */}
      <path d="M40 40 L 40 470 M40 40 L 290 40 L 290 470" />
      {/* threshold */}
      <path d="M20 480 L 310 480 L 304 500 L 28 500 Z" fill="var(--paper-deep)" />

      {/* the door panel — hinged on the left, swings inward */}
      <motion.g
        style={{ originX: '46px', originY: '255px' }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: open ? -78 : 0 }}
        transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <rect x="46" y="48" width="236" height="416" rx="6" fill="var(--paper)" />
        {/* inset panel */}
        <rect x="70" y="74" width="188" height="288" rx="4" />
        {/* mail slot */}
        <rect x="128" y="392" width="72" height="20" rx="3" />
        {/* handle */}
        <circle cx="246" cy="250" r="11" />
        {/* peephole + plate */}
        <circle cx="246" cy="284" r="9" />
        <circle cx="246" cy="284" r="3" fill={INK} />
      </motion.g>

      {/* wall switch to the right */}
      <rect x="318" y="232" width="30" height="48" rx="4" />
      <circle cx="333" cy="256" r="5" />
    </g>
  </svg>
);
