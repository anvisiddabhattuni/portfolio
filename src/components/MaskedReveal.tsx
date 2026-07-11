import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useWalkScrollRoot } from '../hooks/useWalkScrollRoot';

interface MaskedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * MaskedReveal — clip-based headline reveal.
 * Uses the `.walk` scroll container as the viewport root when present,
 * so titles actually appear when scrolling inside the portfolio.
 */
export const MaskedReveal: React.FC<MaskedRevealProps> = ({ children, className, delay = 0 }) => {
  const reduced = useReducedMotion();
  const { ref: scrollRoot, ready: scrollReady } = useWalkScrollRoot();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    root: scrollReady ? scrollRoot : undefined,
    amount: 0.15,
  });
  const show = reduced || isInView;

  return (
    <span ref={ref} className={`mask-reveal ${className ?? ''}`}>
      <motion.span
        className="mask-reveal__inner"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: '100%' }}
        animate={show ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};
