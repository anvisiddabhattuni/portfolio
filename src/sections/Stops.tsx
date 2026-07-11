import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/Reveal';
import { MaskedReveal } from '../components/MaskedReveal';
import { RisingWords } from '../components/RisingWords';
import { WatercolorDogPair } from '../doodles/WatercolorDogs';
import { ABOUT, EXPERIENCES, SKILLS, CONTACT, type Experience } from '../content';
import { HEADSHOT } from '../photos';

/* ---------------- STOP 1: ABOUT (editorial) ---------------- */
export const AboutStop: React.FC = () => (
  <section className="cat-section cat-section--a walk-panel" id="about-detail" aria-label="About Anvi">
    <div className="cat-section__inner folder-panel" style={{ '--tab': 'var(--amber)' } as React.CSSProperties}>
      <span className="folder-tab" aria-hidden="true">01 · About</span>
      <Reveal className="cat-head">
        <h2><RisingWords text="Hi there!" /></h2>
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
            <img src={HEADSHOT.src} alt={HEADSHOT.caption} loading="lazy" />
            <figcaption>{HEADSHOT.caption}</figcaption>
          </figure>
          <figure className="about-edit__frame about-edit__frame--dogpic">
            <img src="/dogs/dogs-photo.jpg" alt="Anvi's two dogs" loading="lazy" />
            <figcaption>The tour guides</figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- STOP 2: EXPERIENCE (ledger) ---------------- */
export const ExperienceStop: React.FC = () => {
  const [active, setActive] = useState<Experience | null>(null);
  return (
    <section className="cat-section cat-section--b walk-panel" id="experience-list" aria-label="Experience details">
      <div className="cat-section__inner folder-panel" style={{ '--tab': 'var(--spice)' } as React.CSSProperties}>
        <span className="folder-tab folder-tab--light" aria-hidden="true">03 · Experience</span>
        <Reveal className="cat-head">
          <p className="eyebrow">Where the work happened</p>
          <h2><RisingWords text="My Experience" /></h2>
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
  <section className="cat-section cat-section--c walk-panel" id="skills-detail" aria-label="Skills">
    <div className="cat-section__inner folder-panel" style={{ '--tab': 'var(--garnet)' } as React.CSSProperties}>
      <span className="folder-tab folder-tab--light" aria-hidden="true">04 · Skills</span>
      <Reveal className="cat-head">
        <p className="eyebrow">What I carry on the walk</p>
        <h2><RisingWords text="Skills" /></h2>
        <p className="cat-head__lede">What&apos;s in the bag for this walk, grouped by how the work actually gets done.</p>
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
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [error, setError] = useState('');

  const submitForm = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setError('Add your name, email, and a short message before sending.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('That email doesn’t look right. Mind double-checking it?');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.msg }),
      });
      if (!res.ok) throw new Error(`form endpoint returned ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError(`That didn’t send. Email me directly instead: ${CONTACT.email}`);
    }
  };

  return (
    <section className="cat-section cat-section--d walk-panel" id="contact" aria-label="Contact">
      <div className="cat-section__inner folder-panel" style={{ '--tab': 'var(--amber)' } as React.CSSProperties}>
        <span className="folder-tab" aria-hidden="true">05 · Contact</span>
        <Reveal className="cat-head">
          <p className="eyebrow">The end of the path</p>
          <h2><MaskedReveal>Say hello</MaskedReveal></h2>
        </Reveal>

        <div className="contact-edit">
          <Reveal className="contact-edit__col">
            <p className="contact-edit__lede">
              We made it to the end of the walk. Leave a note below, or reach me
              directly through the links. I read everything.
            </p>
            <div className="contact-edit__links">
              <a className="link-pill" href={`mailto:${CONTACT.email}`}>Email ↗</a>
              <a className="link-pill" href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="link-pill" href={CONTACT.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="link-pill" href={CONTACT.devpost} target="_blank" rel="noreferrer">Devpost ↗</a>
              <a className="link-pill" href={CONTACT.resume} target="_blank" rel="noreferrer">Resume ↗</a>
            </div>
            <div className="contact-edit__dogs" aria-hidden="true">
              <WatercolorDogPair style={{ width: '100%' }} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="contact-edit__form">
            <div className="envelope">
              <span className="envelope__seal" aria-hidden="true">🐾</span>
              {status !== 'sent' ? (
                <div className="mail-form">
                <input
                  placeholder="Your name"
                  aria-label="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Your email"
                  aria-label="Your email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  placeholder="Write a note…"
                  aria-label="Your message"
                  rows={5}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                />
                  {error ? <p className="form-error" role="alert">{error}</p> : null}
                  <button
                    className="btn-ink"
                    type="button"
                    onClick={submitForm}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send it off'}
                  </button>
                </div>
              ) : (
                <motion.p className="thanks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Sent! Thanks for the note, {form.name.split(' ')[0]}. I&apos;ll write back soon.
                </motion.p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
