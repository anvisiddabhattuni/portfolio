import React, { useEffect, useState } from 'react';

const STOPS = [
  { id: 'about', label: 'About' },
  { id: 'case-studies', label: 'Case studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function getWalkRoot(): HTMLElement | null {
  return document.querySelector('.walk');
}

function scrollToSection(id: string) {
  const root = getWalkRoot();
  if (!root) return;

  const tryScroll = (attempts = 0) => {
    const el = document.getElementById(id);
    if (!el) {
      if (attempts < 24) requestAnimationFrame(() => tryScroll(attempts + 1));
      return;
    }
    const offset = el.getBoundingClientRect().top - root.getBoundingClientRect().top;
    root.scrollTo({ top: root.scrollTop + offset, behavior: 'smooth' });
  };

  tryScroll();
}

export const TrailNav: React.FC = () => {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const root = getWalkRoot();
    if (!root) return;

    const compute = () => {
      const walk = getWalkRoot();
      if (!walk) return;

      const rootRect = walk.getBoundingClientRect();
      const mid = rootRect.top + walk.clientHeight * 0.5;
      let current = STOPS[0].id;

      for (const s of STOPS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          current = s.id;
          break;
        }
        if (rect.top <= mid) current = s.id;
      }

      setActive(current);
    };

    compute();
    root.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      root.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <nav className="trail-nav trail-nav--vertical" aria-label="Walk progress">
      {STOPS.map((s) => (
        <button
          key={s.id}
          data-active={active === s.id}
          aria-label={`Go to ${s.label}`}
          title={s.label}
          aria-current={active === s.id ? 'true' : undefined}
          type="button"
          onClick={() => scrollToSection(s.id)}
        >
          <span className="trail-nav__dot" aria-hidden="true" />
          <span className="trail-nav__label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
};
