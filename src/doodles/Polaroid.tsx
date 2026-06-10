import React from 'react';
import { motion } from 'framer-motion';
import type { Photo } from '../photos';

interface PolaroidProps {
  photo: Photo;
  /** resting tilt in degrees */
  tilt?: number;
  /** a bit of torn-tape at the top */
  tape?: boolean;
  /** width in px (the frame scales with it) */
  width?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  eager?: boolean;
}

/**
 * Polaroid — a taped, hand-placed photo that matches the storybook ink look.
 * The image sits in a paper frame with a handwritten caption underneath.
 */
export const Polaroid: React.FC<PolaroidProps> = ({
  photo, tilt = 0, tape = true, width, className, style, onClick, eager,
}) => {
  const Tag = onClick ? motion.button : motion.div;
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`polaroid polaroid--${photo.orientation} ${className ?? ''}`}
      onClick={onClick}
      aria-label={onClick ? `View photo: ${photo.caption}, ${photo.place}` : undefined}
      style={{ ['--tilt' as string]: `${tilt}deg`, width, ...style }}
      initial={{ opacity: 0, y: 18, rotate: tilt * 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={onClick ? { rotate: 0, y: -8, scale: 1.03, zIndex: 5 } : { rotate: 0, y: -6, scale: 1.02 }}
    >
      {tape && <span className="polaroid__tape" aria-hidden="true" />}
      <span className="polaroid__photo">
        <img src={photo.src} alt={`${photo.caption} — ${photo.place}`} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
      </span>
      <span className="polaroid__caption">
        <span className="polaroid__title">{photo.caption}</span>
        <span className="polaroid__place">{photo.place}</span>
      </span>
    </Tag>
  );
};
