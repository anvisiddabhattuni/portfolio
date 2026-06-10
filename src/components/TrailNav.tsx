import React, { useEffect, useState } from 'react';

const STOPS = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const TrailNav: React.FC = () => {
  const [active, setActive] = useState('projects');

  useEffect(() => {
    const root = document.querySelector('.walk');
    if (!root) return;

    // Vertical flow: active section is the one that spans the viewport midpoint.
    const compute = () => {
      const mid = window.innerHeight * 0.5;
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
          aria-current={active === s.id ? 'true' : undefined}
          type="button"
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span className="trail-nav__dot" aria-hidden="true" />
          <span className="trail-nav__label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
};
