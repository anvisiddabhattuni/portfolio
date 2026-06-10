import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { MaskedReveal } from '../components/MaskedReveal';
import { RealDogPair } from '../doodles/RealDogs';
import { ABOUT, EXPERIENCES, SKILLS, CONTACT, type Experience } from '../content';
import { HEADSHOT } from '../photos';

/* ---------------- STOP 1: ABOUT (editorial) ---------------- */
export const AboutStop: React.FC = () => (
  <section className="cat-section cat-section--a walk-panel" id="about" aria-label="About Anvi">
    <div className="cat-section__inner">
      <Reveal className="cat-head">
        <p className="eyebrow">First rest stop</p>
        <h2><MaskedReveal>About</MaskedReveal></h2>
      </Reveal>

      <div className="about-edit__grid">
        <div className="about-edit__col">
          <Reveal delay={0.05}>
            <p className="about-edit__lede">{ABOUT.intro}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="about-edit__facts">
              <div className="about-edit__row">
                <dt>Background</dt>
                <dd>{ABOUT.background}</dd>
              </div>
              <div className="about-edit__row">
                <dt>Walking toward</dt>
                <dd>{ABOUT.goals}</dd>
              </div>
              <div className="about-edit__row">
                <dt>Focus areas</dt>
                <dd className="about-edit__tags">
                  {ABOUT.interests.map((i) => <span key={i}>{i}</span>)}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="about-edit__media">
          <figure className="about-edit__frame about-edit__frame--headshot">
            <img src={HEADSHOT.src} alt={`${HEADSHOT.caption} — ${HEADSHOT.place}`} loading="lazy" />
            <figcaption>{HEADSHOT.caption} — {HEADSHOT.place}</figcaption>
          </figure>
          <div className="about-edit__dogs" aria-hidden="true">
            <RealDogPair style={{ width: '100%', height: 'auto' }} />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- STOP 2: EXPERIENCE (ledger) ---------------- */
export const ExperienceStop: React.FC = () => {
  const [active, setActive] = useState<Experience | null>(null);
  return (
    <section className="cat-section cat-section--b walk-panel" id="experience" aria-label="Experience">
      <div className="cat-section__inner">
        <Reveal className="cat-head">
          <p className="eyebrow">Further down the trail</p>
          <h2><MaskedReveal>Experience</MaskedReveal></h2>
          <p className="cat-head__lede">
            The teams, programs, and communities where the work shipped. Open any entry for the details.
          </p>
        </Reveal>

        <ol className="ledger">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.05}>
              <li className="ledger__item">
                <button
                  className="ledger__row"
                  type="button"
                  onClick={() => setActive(e)}
                  aria-label={`Open ${e.title}`}
                >
                  <span className="ledger__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ledger__title">{e.title}</span>
                  <span className="ledger__role">
                    {e.role}
                    <em className="ledger__date">{e.timeframe}</em>
                  </span>
                  <span className="ledger__arrow" aria-hidden="true">→</span>
                </button>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="scrim"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 520 }}
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <button className="modal__close" type="button" onClick={() => setActive(null)} aria-label="Close">×</button>
              <p className="modal__kicker">{active.timeframe}</p>
              <h3>{active.title}</h3>
              <p className="tagline">{active.role}</p>
              <p className="modal__body">{active.blurb}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ---------------- STOP 3: SKILLS (grouped set) ---------------- */
export const SkillsStop: React.FC = () => (
  <section className="cat-section cat-section--c walk-panel" id="skills" aria-label="Skills">
    <div className="cat-section__inner">
      <Reveal className="cat-head">
        <p className="eyebrow">What I carry on the walk</p>
        <h2><MaskedReveal>Skills</MaskedReveal></h2>
        <p className="cat-head__lede">What&apos;s in the bag for this walk — grouped by how the work actually gets done.</p>
      </Reveal>

      <div className="skillset">
        {SKILLS.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06}>
            <div className="skillset__group">
              <h3 className="skillset__title">
                <span className="skillset__n">{String(i + 1).padStart(2, '0')}</span>
                {g.title}
              </h3>
              <ul className="skillset__list">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- STOP 4: CONTACT (editorial) ---------------- */
export const ContactStop: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [error, setError] = useState('');

  const submitForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setError('Add your name, email, and a short message before sending.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <section className="cat-section cat-section--d walk-panel" id="contact" aria-label="Contact">
      <div className="cat-section__inner">
        <Reveal className="cat-head">
          <p className="eyebrow">The end of the path</p>
          <h2><MaskedReveal>Say hello</MaskedReveal></h2>
        </Reveal>

        <div className="contact-edit">
          <Reveal className="contact-edit__col">
            <p className="contact-edit__lede">
              We made it to the end of the walk. Leave a note below, or reach me
              directly through the links — I read everything.
            </p>
            <div className="contact-edit__links">
              <a className="link-pill" href={`mailto:${CONTACT.email}`}>Email ↗</a>
              <a className="link-pill" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="link-pill" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="link-pill" href={CONTACT.devpost} target="_blank" rel="noreferrer">Devpost ↗</a>
              <a className="link-pill" href={CONTACT.resume} target="_blank" rel="noreferrer">Resume ↗</a>
            </div>
            <div className="contact-edit__dogs" aria-hidden="true">
              <RealDogPair style={{ width: '100%', height: 'auto' }} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="contact-edit__form">
            {!sent ? (
              <div className="mail-form">
                <input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Your email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  placeholder="Write a note…"
                  rows={5}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                />
                {error ? <p className="form-error">{error}</p> : null}
                <button className="btn-ink" type="button" onClick={submitForm}>Send it off</button>
              </div>
            ) : (
              <motion.p className="thanks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                Message staged. Hook this button to Formspree, Resend, or your own endpoint to make it live.
              </motion.p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
