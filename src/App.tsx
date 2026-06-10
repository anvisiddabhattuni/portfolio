import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InkDefs } from './doodles/InkDefs';
import { OpeningScene } from './sections/OpeningScene';
import { Greeting, CaseStudies } from './sections/Pathway';
import { AboutStop, ExperienceStop, SkillsStop, ContactStop } from './sections/Stops';
import { TrailNav } from './components/TrailNav';
import './styles/global.css';
import './styles/lander.css';
import './styles/walk.css';
import './styles/stops.css';
import './styles/pathway.css';
import './styles/travels.css';

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
      <a className="skip-link" href="#about" onClick={() => setEntered(true)}>Skip to the walk</a>

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
          <Greeting />
          <AboutStop />
          <CaseStudies />
          <ExperienceStop />
          <SkillsStop />
          <ContactStop />
        </motion.main>
      )}
    </div>
  );
}
