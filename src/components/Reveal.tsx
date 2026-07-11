import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useWalkScrollRoot } from '../hooks/useWalkScrollRoot';

export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, y = 28, className, style }) => {
  const reduced = useReducedMotion();
  const { ref: scrollRoot, ready: scrollReady } = useWalkScrollRoot();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    root: scrollReady ? scrollRoot : undefined,
    amount: 0.12,
  });
  const show = reduced || isInView;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
