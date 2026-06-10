import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Polaroid } from '../doodles/Polaroid';
import { MaskedReveal } from '../components/MaskedReveal';
import { DOG_PHOTOS, TRAVEL_PHOTOS, type Photo } from '../photos';

const WALL: Photo[] = [...DOG_PHOTOS, ...TRAVEL_PHOTOS];

// gentle, repeating tilt pattern so the wall feels hand-pinned, not gridded
const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5, 1, -3.5];

export const TravelsStop: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + WALL.length) % WALL.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close, step]);

  return (
    <section className="gallery-panel walk-panel" id="travels" aria-label="Travels — a wall of photos">
      <div className="gallery__graphics" aria-hidden="true">
        <motion.div
          className="gallery__ribbon gallery__ribbon--a"
          animate={{ x: ['-15%', '8%', '-15%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="gallery__ribbon gallery__ribbon--b"
          animate={{ x: ['8%', '-14%', '8%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="gallery__intro">
        <p className="eyebrow">A wall of postcards</p>
        <h2><MaskedReveal>Travels</MaskedReveal></h2>
        <p className="lede">
          Photos from the road — Italy, Spain, the Canadian Rockies, a few islands, and the two dogs
          who started all the walking. Tap any photo to look closer.
        </p>
        <span className="gallery__hint" aria-hidden="true">Scroll down to wander ↓</span>
      </div>

      <div className="gallery__wall" role="list">
        {WALL.map((photo, i) => (
          <div className="gallery__cell" role="listitem" key={photo.src}>
            <Polaroid
              photo={photo}
              tilt={TILTS[i % TILTS.length]}
              onClick={() => setActive(i)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            onClick={close}
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <button className="lightbox__close" type="button" onClick={close} aria-label="Close">×</button>
            <button
              className="lightbox__nav lightbox__nav--prev"
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous photo"
            >‹</button>
            <motion.figure
              className="lightbox__figure"
              onClick={(e) => e.stopPropagation()}
              key={WALL[active].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <img src={WALL[active].src} alt={`${WALL[active].caption} — ${WALL[active].place}`} />
              <figcaption>
                <strong>{WALL[active].caption}</strong>
                <span>{WALL[active].place}</span>
              </figcaption>
            </motion.figure>
            <button
              className="lightbox__nav lightbox__nav--next"
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next photo"
            >›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
