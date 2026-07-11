import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PROFILE, CONTACT } from '../content';

/**
 * OpeningScene — two crayon dog squares dancing side to side on cream.
 * On enter, the squares split to opposite edges of the screen (the gold one
 * left, the blue one right), the title lifts away, and the walk begins.
 */
const SPLIT_EASE: [number, number, number, number] = [0.7, 0, 0.2, 1];
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const OpeningScene: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [leaving, setLeaving] = useState(false);
  const reduced = useReducedMotion();

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => onEnter(), reduced ? 250 : 1300);
  };

  /* the side-to-side dance: sway + bob + tilt, the two squares in
     opposite phase so they read as partners, not clones */
  const dance = (dir: 1 | -1, delay: number) =>
    reduced
      ? {}
      : {
          x: [0, -12 * dir, 0, 12 * dir, 0],
          y: [0, -10, 0, -10, 0],
          rotate: [0, -4 * dir, 0, 4 * dir, 0],
          transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const, delay },
        };

  /* the split: each square exits through its own side of the viewport */
  const split = (dir: 1 | -1, delay: number) =>
    reduced
      ? { opacity: 0, transition: { duration: 0.2 } }
      : {
          x: `${120 * dir}vw`,
          rotate: 28 * dir,
          scale: 1.12,
          transition: { duration: 1.15, ease: SPLIT_EASE, delay },
        };

  const line = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: '0%' },
    transition: { duration: 0.8, delay, ease: REVEAL_EASE },
  });

  const lift = (delay: number) => ({
    animate: leaving ? { y: -70, opacity: 0 } : { y: 0, opacity: 1 },
    transition: { duration: reduced ? 0.2 : 0.9, ease: SPLIT_EASE, delay },
  });

  return (
    <section className="door-scene" data-leaving={leaving} aria-label="Front page, enter the portfolio">
      <div className="door-scene__paper" aria-hidden="true" />

      <motion.header className="door-scene__bar" {...lift(0.05)}>
        <span className="door-scene__brand">Anvi Siddabhattuni</span>
        <span className="door-scene__bar-end">
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          {' · '}
          <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
          {' · '}
          <a href={CONTACT.devpost} target="_blank" rel="noreferrer">Devpost</a>
        </span>
      </motion.header>

      <div className="door-scene__stage">
        <motion.h1 className="door-scene__title" {...lift(0)}>
          <span className="mask-reveal">
            <motion.span className="mask-reveal__inner" {...line(0.15)}>
              Anvi Siddabhattuni
            </motion.span>
          </span>
          <span className="door-scene__title-sub">
            <motion.span className="mask-reveal__inner" {...line(0.28)}>
              Product Management — the Portfolio
            </motion.span>
          </span>
        </motion.h1>

        <motion.p className="door-scene__positioning" {...lift(0.04)}>
          {PROFILE.positioning} The dogs will show you the rest.
        </motion.p>

        {/* the two dancing squares — they split to opposite ends on enter */}
        <div className="door-scene__squares" aria-hidden={leaving}>
          <motion.div
            className="door-scene__square door-scene__square--gold"
            animate={leaving ? split(-1, 0) : dance(-1, 0)}
          >
            <img
              className="door-scene__dog"
              src="/dogs/entry-golden.png"
              alt="Watercolor drawing of a golden retriever with a red collar"
              draggable={false}
            />
            <span className="door-scene__square-shadow" aria-hidden="true" />
          </motion.div>
          <motion.div
            className="door-scene__square door-scene__square--blue"
            animate={leaving ? split(1, 0.06) : dance(1, 1.2)}
          >
            <img
              className="door-scene__dog"
              src="/dogs/entry-poodle.png"
              alt="Watercolor drawing of a white poodle with a blue collar"
              draggable={false}
            />
            <span className="door-scene__square-shadow" aria-hidden="true" />
          </motion.div>
        </div>

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
                <span className="door-scene__enter-label">Step inside</span>
                <span className="door-scene__enter-arrow" aria-hidden="true">→</span>
              </button>
              <a
                className="door-scene__resume"
                href={CONTACT.resume}
                target="_blank"
                rel="noreferrer"
                aria-label="Open resume (PDF) in a new tab"
              >
                Resume ↗
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
