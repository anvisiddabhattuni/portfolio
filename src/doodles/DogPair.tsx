import React from 'react';
import { motion } from 'framer-motion';
import { BigDog } from './BigDog';
import { SmallDog } from './SmallDog';

interface DogPairProps {
  /** gentle idle bob when standing/sitting at a stop */
  walking?: boolean;
  lookAtUser?: boolean;
  scale?: number;
}

/**
 * The two dogs side by side, each holding their own leash in their mouth.
 * The leashes trail off to the left (toward the unseen owner / the path
 * already walked). This is the recurring "guide" element.
 */
export const DogPair: React.FC<DogPairProps> = ({ walking = false, lookAtUser = false, scale = 1 }) => {
  const bob = walking
    ? { y: [0, -6, 0, -4, 0] }
    : { y: [0, -2, 0] };
  const bobDur = walking ? 0.9 : 4;

  return (
    <div style={{ position: 'relative', width: 420 * scale, height: 300 * scale }}>
      {/* leashes drawn as one SVG layer behind the dogs */}
      <svg viewBox="0 0 420 300" style={{ position: 'absolute', inset: 0, overflow: 'visible' }} aria-hidden>
        <g filter="url(#ink-wobble)" fill="none" stroke="var(--ink)" strokeWidth={4} strokeLinecap="round">
          {/* big dog leash from collar trailing left */}
          <motion.path
            d="M150 168 q -40 30 -78 38 q -30 6 -54 -6"
            animate={walking ? { d: [
              'M150 168 q -40 30 -78 38 q -30 6 -54 -6',
              'M150 170 q -42 26 -80 40 q -30 8 -54 -2',
              'M150 168 q -40 30 -78 38 q -30 6 -54 -6',
            ] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* small dog leash */}
          <motion.path
            d="M286 196 q -30 26 -70 30 q -26 4 -42 -2"
            animate={walking ? { d: [
              'M286 196 q -30 26 -70 30 q -26 4 -42 -2',
              'M286 198 q -32 22 -72 32 q -26 6 -42 2',
              'M286 196 q -30 26 -70 30 q -26 4 -42 -2',
            ] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          />
        </g>
      </svg>

      {/* Big dog */}
      <motion.div
        style={{ position: 'absolute', left: 0, bottom: 0, width: 230 * scale }}
        animate={bob}
        transition={{ duration: bobDur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BigDog pose={walking ? 'walk' : 'sit'} wag lookAtUser={lookAtUser} />
      </motion.div>

      {/* Small dog */}
      <motion.div
        style={{ position: 'absolute', left: 175 * scale, bottom: 0, width: 175 * scale }}
        animate={bob}
        transition={{ duration: bobDur, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
      >
        <SmallDog pose={walking ? 'walk' : 'sit'} wag lookAtUser={lookAtUser} />
      </motion.div>
    </div>
  );
};
