import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SpatialPhotoProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

/**
 * SpatialPhoto — a framed photo with real depth. The card tilts toward
 * the cursor, the photo floats a layer above the frame, and a soft
 * glare tracks the pointer. Reduced motion gets the plain photo.
 */
export const SpatialPhoto: React.FC<SpatialPhotoProps> = ({ src, alt, caption, className }) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springy = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), springy);
  const rotateY = useSpring(useTransform(px, [0, 1], [-11, 11]), springy);
  const glareX = useTransform(px, [0, 1], ['18%', '82%']);
  const glareY = useTransform(py, [0, 1], ['14%', '86%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0) 58%)`;

  const track = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const rest = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (reduced) {
    return (
      <figure className={className} ref={ref as React.RefObject<HTMLElement>}>
        <img src={src} alt={alt} loading="lazy" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure
      className={`spatial ${className ?? ''}`}
      ref={ref as React.RefObject<HTMLElement>}
      onMouseMove={track}
      onMouseLeave={rest}
    >
      <motion.div
        className="spatial__card"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <motion.img src={src} alt={alt} loading="lazy" style={{ z: 34 }} />
        <motion.span className="spatial__glare" aria-hidden="true" style={{ background: glare }} />
      </motion.div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
};
