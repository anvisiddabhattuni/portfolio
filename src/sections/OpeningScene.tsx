import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RealDogPair } from '../doodles/RealDogs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PROFILE, CONTACT } from '../content';

/**
 * OpeningScene — the front door.
 * The name, the two dogs waiting at a heavy wooden door, sharp positioning,
 * and one way in. The whole composition is sized off viewport height so it
 * stays centered and fully in frame across layouts. The name animates in on
 * mount (never scroll-triggered) so it is always visible. On enter, every
 * layer "drops" out of frame before the dogs lead you down the portfolio.
 */
const DROP_EASE: [number, number, number, number] = [0.7, 0, 0.2, 1];
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const OpeningScene: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [leaving, setLeaving] = useState(false);
  const reduced = useReducedMotion();

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onEnter(), reduced ? 250 : 1400);
  };

  const drop = (delay: number) => ({
    initial: reduced ? false : { y: 0, opacity: 1 },
    animate: leaving ? { y: '115vh', opacity: reduced ? 0 : 1 } : { y: 0, opacity: 1 },
    transition: { duration: reduced ? 0.2 : 1.15, ease: DROP_EASE, delay },
  });

  // A mount-based line reveal (not scroll-triggered) so the name is guaranteed
  // to be visible the moment the page loads.
  const line = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: '0%' },
    transition: { duration: 0.8, delay, ease: REVEAL_EASE },
  });

  return (
    <section className="door-scene" data-leaving={leaving} aria-label="Front page, enter the portfolio">
      <div className="door-scene__paper" aria-hidden="true" />

      <motion.header className="door-scene__bar" {...drop(0)}>
        <span className="door-scene__brand">Anvi Siddabhattuni</span>
        <span className="door-scene__bar-end">{PROFILE.location}</span>
      </motion.header>

      <div className="door-scene__stage">
        <motion.h1 className="door-scene__title" {...drop(0.08)}>
          <span className="mask-reveal">
            <motion.span className="mask-reveal__inner" {...line(0.15)}>
              Anvi Siddabhattuni&apos;s
            </motion.span>
          </span>
          <span className="door-scene__title-sub">
            <motion.span className="mask-reveal__inner" {...line(0.28)}>Portfolio</motion.span>
          </span>
        </motion.h1>

        <motion.p className="door-scene__positioning" {...drop(0.12)}>
          CS student at UT&nbsp;Dallas. The dogs are ready. Come take a walk through
          everything I&apos;ve built at the intersection of{' '}
          <strong>product</strong>, <strong>AI</strong>, <strong>design</strong> &{' '}
          <strong>engineering</strong>.
        </motion.p>

        {/* the door, with the two dogs waiting at the threshold */}
        <motion.div className="door-scene__doorway" {...drop(0.16)}>
          <span className="door-scene__floor" aria-hidden="true" />
          <span className="door-scene__door-shadow" aria-hidden="true" />
          <div className="door-scene__door">
            <img src="/photos/front-door.png" alt="A heavy wooden door with rows of round windows" />
            <span className="door-scene__door-glow" aria-hidden="true" />
          </div>
          <motion.div
            className="door-scene__dogs"
            aria-hidden="true"
            animate={leaving && !reduced ? { y: -18, scale: 1.04 } : { y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <RealDogPair style={{ width: '100%', height: 'auto' }} />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {!leaving && (
            <motion.div
              className="door-scene__actions"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.7, delay: 0.55, ease: REVEAL_EASE }}
            >
              <button type="button" className="door-scene__enter" onClick={handleEnter}>
                <span className="door-scene__enter-label">Start the walk</span>
                <span className="door-scene__enter-arrow" aria-hidden="true">↓</span>
              </button>
              <a
                className="door-scene__resume"
                href={CONTACT.resume}
                target="_blank"
                rel="noreferrer"
                aria-label="Open résumé (PDF) in a new tab"
              >
                Résumé ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
