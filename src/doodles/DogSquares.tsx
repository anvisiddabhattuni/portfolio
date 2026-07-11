import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * DogSquares — the two crayon doodle squares from the reference image:
 *  - GoldenDogSquare: amber-gold square, floppy-eared golden pup
 *  - PoodleDogSquare: yale-blue square, cloud-fluff white poodle
 * Drawn as SVG so they scale crisply, with a two-stage turbulence filter
 * (a slow wobble + a fine grain) that gives every edge a waxy crayon bite.
 * Eyes blink on a lazy loop unless the visitor prefers reduced motion.
 */

const CrayonFilter: React.FC<{ id: string }> = ({ id }) => (
  <filter id={id} x="-8%" y="-8%" width="116%" height="116%">
    {/* big slow wobble: the hand that drew the square */}
    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="wobble" />
    <feDisplacementMap in="SourceGraphic" in2="wobble" scale="7" result="drawn" />
    {/* fine grain: the tooth of the paper */}
    <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="3" result="grain" />
    <feDisplacementMap in="drawn" in2="grain" scale="2.6" />
  </filter>
);

/** Both eyes blink together — a fur-toned lid isn't needed since we scale the pupils. */
const Blink: React.FC<{ children: React.ReactNode; cy: number; on: boolean; delay?: number }> = ({
  children,
  cy,
  on,
  delay = 0,
}) => (
  <motion.g
    style={{ transformOrigin: `130px ${cy}px`, transformBox: 'view-box' as const }}
    animate={on ? { scaleY: [1, 1, 0.08, 1, 1] } : { scaleY: 1 }}
    transition={{ duration: 4.6, times: [0, 0.9, 0.94, 0.98, 1], repeat: Infinity, ease: 'linear', delay }}
  >
    {children}
  </motion.g>
);

export const GoldenDogSquare: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 260 260" className={className} style={{ overflow: 'visible', ...style }} role="img" aria-label="Crayon doodle of a golden dog on an amber square">
      <defs>
        <CrayonFilter id="crayon-gold" />
      </defs>
      <g filter="url(#crayon-gold)">
        {/* the amber square */}
        <rect x="16" y="16" width="228" height="228" rx="26" fill="#f2bb05" />
        <rect x="24" y="24" width="212" height="212" rx="22" fill="none" stroke="#c79a02" strokeWidth="3" opacity="0.35" />

        {/* floppy ears (behind the face) */}
        <path d="M64 96 C 36 108, 30 176, 52 196 C 72 214, 92 196, 92 172 L 92 112 Z" fill="#eeb63e" />
        <path d="M196 96 C 224 108, 230 176, 208 196 C 188 214, 168 196, 168 172 L 168 112 Z" fill="#eeb63e" />
        {/* inner ear shading */}
        <path d="M60 120 C 48 140, 50 172, 60 186" fill="none" stroke="#c79a02" strokeWidth="6" strokeLinecap="round" opacity="0.55" />
        <path d="M200 120 C 212 140, 210 172, 200 186" fill="none" stroke="#c79a02" strokeWidth="6" strokeLinecap="round" opacity="0.55" />

        {/* head: dome + muzzle as one soft mass */}
        <path
          d="M130 52
             C 90 52, 62 82, 60 122
             C 58 158, 76 196, 130 198
             C 184 196, 202 158, 200 122
             C 198 82, 170 52, 130 52 Z"
          fill="#f7d75f"
        />
        {/* muzzle highlight */}
        <ellipse cx="130" cy="164" rx="44" ry="30" fill="#fbe58a" opacity="0.8" />

        {/* eyes */}
        <Blink cy={124} on={!reduced}>
          <ellipse cx="100" cy="124" rx="9.5" ry="12" fill="#241307" />
          <ellipse cx="160" cy="124" rx="9.5" ry="12" fill="#241307" />
          <circle cx="103" cy="119" r="2.6" fill="#fbe58a" />
          <circle cx="163" cy="119" r="2.6" fill="#fbe58a" />
        </Blink>

        {/* nose + mouth */}
        <path d="M114 150 Q 130 142, 146 150 Q 148 166, 130 168 Q 112 166, 114 150 Z" fill="#241307" />
        <path d="M130 168 L 130 180 M 130 180 Q 118 190, 108 182 M 130 180 Q 142 190, 152 182" fill="none" stroke="#241307" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export const PoodleDogSquare: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 260 260" className={className} style={{ overflow: 'visible', ...style }} role="img" aria-label="Crayon doodle of a white poodle on a yale blue square">
      <defs>
        <CrayonFilter id="crayon-blue" />
      </defs>
      <g filter="url(#crayon-blue)">
        {/* the yale blue square */}
        <rect x="16" y="16" width="228" height="228" rx="26" fill="#124e78" />
        <rect x="24" y="24" width="212" height="212" rx="22" fill="none" stroke="#0c3a5b" strokeWidth="3" opacity="0.5" />

        {/* cloud of curls: overlapping puffs build the fluffy head */}
        <g fill="#fbfaec">
          <circle cx="86" cy="92" r="30" />
          <circle cx="130" cy="76" r="34" />
          <circle cx="174" cy="92" r="30" />
          <circle cx="62" cy="140" r="28" />
          <circle cx="198" cy="140" r="28" />
          <circle cx="76" cy="182" r="26" />
          <circle cx="184" cy="182" r="26" />
          <ellipse cx="130" cy="146" rx="76" ry="66" />
        </g>

        {/* curl shading, soft grey strokes like the reference */}
        <path d="M62 128 C 54 142, 54 160, 62 172" fill="none" stroke="#c8c4b2" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        <path d="M198 128 C 206 142, 206 160, 198 172" fill="none" stroke="#c8c4b2" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        <path d="M96 66 C 104 60, 116 58, 124 60" fill="none" stroke="#e2dfcd" strokeWidth="5" strokeLinecap="round" opacity="0.9" />

        {/* eyes */}
        <Blink cy={136} on={!reduced} delay={1.4}>
          <ellipse cx="103" cy="136" rx="9" ry="11" fill="#17110b" />
          <ellipse cx="157" cy="136" rx="9" ry="11" fill="#17110b" />
          <circle cx="106" cy="131" r="2.4" fill="#fbfaec" />
          <circle cx="160" cy="131" r="2.4" fill="#fbfaec" />
        </Blink>

        {/* nose + mouth */}
        <path d="M118 156 Q 130 150, 142 156 Q 143 168, 130 170 Q 117 168, 118 156 Z" fill="#17110b" />
        <path d="M130 170 L 130 180 M 130 180 Q 121 187, 113 181 M 130 180 Q 139 187, 147 181" fill="none" stroke="#17110b" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};
