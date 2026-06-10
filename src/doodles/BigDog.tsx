import React from 'react';
import { motion } from 'framer-motion';

interface DogProps {
  /** 'sit' | 'stand' | 'walk' — controls leg & body posture */
  pose?: 'sit' | 'walk';
  /** trigger a blink loop */
  blink?: boolean;
  /** wag the tail */
  wag?: boolean;
  /** look toward the viewer (eyes shift) */
  lookAtUser?: boolean;
  /** walk cycle phase for leg motion, 0..1 */
  className?: string;
}

const INK = 'var(--ink)';
const STROKE = 5.5;

/**
 * The big fluffy dog — based on the user's left dog:
 * floppy soft ears, round muzzle, little tongue, fluffy sitting body.
 * Drawn around a 360x420 viewBox, baseline at the bottom.
 */
export const BigDog: React.FC<DogProps> = ({
  pose = 'sit',
  blink = true,
  wag = true,
  lookAtUser = false,
  className,
}) => {
  const eyeShift = lookAtUser ? 1.5 : 0;

  return (
    <svg
      viewBox="0 0 360 420"
      className={className}
      style={{ overflow: 'visible' }}
      role="img"
      aria-label="A fluffy dog waiting to go for a walk"
    >
      <g filter="url(#ink-wobble)" fill="none" stroke={INK} strokeWidth={STROKE}
         strokeLinecap="round" strokeLinejoin="round">

        {/* ---- TAIL (wags) ---- */}
        <motion.path
          d="M64 318 C 24 312, 8 338, 18 372 C 24 392, 44 392, 52 372"
          style={{ originX: '60px', originY: '320px' }}
          animate={wag ? { rotate: [-7, 9, -7] } : { rotate: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ---- BODY: fluffy sitting haunch ---- */}
        {pose === 'sit' ? (
          <>
            {/* haunch / seated body */}
            <path d="M96 214
                     C 70 250, 64 300, 78 344
                     C 86 372, 120 386, 168 384
                     C 214 382, 252 364, 256 320
                     C 260 276, 246 236, 214 214 Z" />
            {/* fluffy chest scallops */}
            <path d="M132 250 q -10 16 2 30 q -14 10 -4 28 q -12 12 0 28" stroke="var(--ink-soft)" strokeWidth="3.5" />
            {/* front legs */}
            <path d="M150 350 C 148 366, 148 378, 150 386" />
            <path d="M150 386 q 16 6 30 0" />
            <path d="M196 350 C 198 366, 200 378, 200 386" />
            <path d="M200 386 q 16 6 30 -1" />
            {/* paw toes */}
            <path d="M158 384 l 0 6 M168 386 l 0 6" stroke="var(--ink-soft)" strokeWidth="3" />
            <path d="M208 384 l 0 6 M218 386 l 0 6" stroke="var(--ink-soft)" strokeWidth="3" />
          </>
        ) : (
          <>
            {/* walking body — more horizontal */}
            <path d="M92 232
                     C 70 248, 66 296, 84 330
                     C 100 356, 150 360, 196 356
                     C 240 352, 262 330, 260 296
                     C 258 258, 240 232, 210 220 Z" />
            {/* trotting legs */}
            <motion.path d="M120 348 q -6 18 -2 30" stroke={INK} strokeWidth={STROKE}
              animate={{ rotate: [8, -12, 8] }} style={{ originX: '120px', originY: '348px' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M220 348 q 6 18 2 30" stroke={INK} strokeWidth={STROKE}
              animate={{ rotate: [-12, 8, -12] }} style={{ originX: '220px', originY: '348px' }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }} />
          </>
        )}

        {/* ---- HEAD ---- */}
        <g>
          {/* LEFT floppy ear — drawn BEHIND head, hangs down */}
          <motion.path
            d="M118 158
               C 86 150, 58 168, 58 204
               C 58 232, 74 250, 96 244
               C 114 238, 122 210, 124 178 Z"
            fill="var(--paper)"
            style={{ originX: '116px', originY: '162px' }}
            animate={{ rotate: [0, -3, 0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* RIGHT floppy ear */}
          <motion.path
            d="M222 158
               C 254 148, 284 166, 284 204
               C 284 232, 266 250, 244 244
               C 226 238, 218 210, 216 178 Z"
            fill="var(--paper)"
            style={{ originX: '224px', originY: '162px' }}
            animate={{ rotate: [0, 3, 0, -2, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* skull / face outline — round, soft (over ears) */}
          <path d="M122 156
                   C 104 162, 98 186, 106 208
                   C 116 234, 146 248, 176 246
                   C 208 244, 232 224, 234 196
                   C 236 170, 222 152, 198 147
                   C 176 143, 140 146, 122 156 Z"
                fill="var(--paper)" />

          {/* fluffy top tuft */}
          <path d="M150 150 q 8 -14 22 -12 q 6 -12 22 -6"
                stroke="var(--ink-soft)" strokeWidth="4" />

          {/* EYES */}
          <motion.g
            animate={blink ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
            transition={{ duration: 4, times: [0, 0.92, 0.95, 0.98, 1], repeat: Infinity }}
            style={{ originY: '190px' }}
          >
            <ellipse cx={152 + eyeShift} cy="190" rx="5.5" ry="7" fill={INK} stroke="none" />
            <ellipse cx={194 + eyeShift} cy="190" rx="5.5" ry="7" fill={INK} stroke="none" />
            {/* eye sparkle */}
            <circle cx={150 + eyeShift} cy="187" r="1.6" fill="var(--paper)" stroke="none" />
            <circle cx={192 + eyeShift} cy="187" r="1.6" fill="var(--paper)" stroke="none" />
          </motion.g>

          {/* nose */}
          <path d="M167 204 q 8 -2 12 2 q 0 8 -6 9 q -8 0 -8 -7 q 0 -3 2 -4 Z"
                fill={INK} stroke="none" />
          {/* little tongue */}
          <path d="M167 218 q 4 14 12 14 q 8 0 8 -12 q -10 4 -20 -2 Z"
                fill="var(--bloom)" stroke="var(--ink-soft)" strokeWidth="2.5" />
          {/* mouth */}
          <path d="M155 212 q 18 10 36 0" strokeWidth="3.5" />
        </g>

        {/* ---- COLLAR (on the neck, below the head) ---- */}
        <path d="M132 252 q 46 22 96 0" stroke="var(--ink)" strokeWidth="6" />
        <circle cx="180" cy="266" r="4.5" fill="var(--ink)" stroke="none" />
      </g>
    </svg>
  );
};
