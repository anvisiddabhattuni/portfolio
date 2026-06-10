import { useState, lazy, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InkDefs } from './doodles/InkDefs';
import { OpeningScene } from './sections/OpeningScene';
import { Pathway } from './sections/Pathway';
import { TrailNav } from './components/TrailNav';
import './styles/global.css';
import './styles/lander.css';
import './styles/walk.css';
import './styles/stops.css';
import './styles/pathway.css';
import './styles/travels.css';

const Stops = lazy(() =>
  import('./sections/Stops').then((m) => ({
    default: () => (
      <>
        <m.AboutStop />
        <m.ExperienceStop />
        <m.SkillsStop />
        <m.ContactStop />
      </>
    ),
  }))
);

export default function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) {
      window.scrollTo({ top: 0 });
    }
  }, [entered]);

  return (
    <div className="paper-grain">
      <InkDefs />
      <a className="skip-link" href="#projects" onClick={() => setEntered(true)}>Skip to the work</a>

      {!entered ? (
        <OpeningScene onEnter={() => setEntered(true)} />
      ) : (
        <motion.main
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="walk"
        >
          <TrailNav />
          <Pathway />

          <Suspense fallback={<section className="walk-panel walk-panel--placeholder" aria-hidden="true" />}>
            <Stops />
          </Suspense>
        </motion.main>
      )}
    </div>
  );
}
