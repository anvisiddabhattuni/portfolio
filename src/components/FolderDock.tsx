import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion';
import { useState, useEffect } from 'react';
import { scrollToSection } from '../lib/scroll';

/**
 * FolderDock — the filing cabinet's drawer.
 * A macOS-style dock (mouse-proximity magnification on a spring), but every
 * item is a manila folder in one of the site's five colors. Hovering a folder
 * magnifies it, lifts its label, and cracks the folder open so the paper
 * inside peeks out. Clicking files you into that section.
 */

interface FolderDef {
  id: string;
  label: string;
  /** folder front / folder back (darker) */
  base: string;
  dark: string;
  href?: string;
}

const FOLDERS: FolderDef[] = [
  { id: 'about', label: 'About', base: '#f2bb05', dark: '#c79a02' },
  { id: 'case-studies', label: 'Work', base: '#124e78', dark: '#0c3a5b' },
  { id: 'experience', label: 'Experience', base: '#d74e09', dark: '#a33a06' },
  { id: 'skills', label: 'Skills', base: '#6e0e0a', dark: '#4a0906' },
  { id: 'contact', label: 'Contact', base: '#124e78', dark: '#0c3a5b' },
];

const SPRING: SpringOptions = { mass: 0.1, stiffness: 170, damping: 14 };
const BASE_W = 46;
const MAG_W = 82;
const DISTANCE = 140;

const FolderIcon: React.FC<{ base: string; dark: string }> = ({ base, dark }) => (
  <svg viewBox="0 0 48 40" className="folder-dock__svg" aria-hidden="true">
    {/* back panel with tab */}
    <path
      d="M4 6 h13 a3 3 0 0 1 2.5 1.4 L22 11 h20 a3 3 0 0 1 3 3 v20 a3 3 0 0 1 -3 3 H4 a3 3 0 0 1 -3 -3 V9 a3 3 0 0 1 3 -6 z"
      fill={dark}
    />
    {/* paper peeking out — slides up on hover via CSS */}
    <g className="folder-dock__paper">
      <rect x="8" y="6" width="30" height="22" rx="2" fill="#fbfaec" transform="rotate(-3 23 17)" />
      <line x1="12" y1="12" x2="32" y2="10.6" stroke="#a97f63" strokeWidth="1.4" />
      <line x1="12" y1="16" x2="32" y2="14.6" stroke="#a97f63" strokeWidth="1.4" />
      <line x1="12" y1="20" x2="26" y2="19" stroke="#a97f63" strokeWidth="1.4" />
    </g>
    {/* front panel — tips open on hover via CSS */}
    <path
      className="folder-dock__front"
      d="M2.5 16 h43 a2.5 2.5 0 0 1 2.4 3.1 l-4 16 a3 3 0 0 1 -2.9 2.3 H7 a3 3 0 0 1 -2.9 -2.3 l-4 -16 A2.5 2.5 0 0 1 2.5 16 z"
      fill={base}
      stroke={dark}
      strokeWidth="1"
    />
  </svg>
);

const FolderItem: React.FC<{
  folder: FolderDef;
  mouseX: MotionValue<number>;
  active: boolean;
  onSelect: (f: FolderDef) => void;
}> = ({ folder, mouseX, active, onSelect }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const widthRaw = useTransform(distance, [-DISTANCE, 0, DISTANCE], [BASE_W, MAG_W, BASE_W]);
  const width = useSpring(widthRaw, SPRING);

  return (
    <motion.button
      ref={ref}
      type="button"
      className="folder-dock__item"
      data-active={active}
      style={{ width }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onSelect(folder)}
      aria-label={folder.href ? `Open ${folder.label}` : `Go to ${folder.label}`}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="folder-dock__label"
            initial={{ opacity: 0, y: 4, x: '-50%' }}
            animate={{ opacity: 1, y: -8, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            transition={{ duration: 0.18 }}
            role="tooltip"
          >
            {folder.label}
          </motion.span>
        )}
      </AnimatePresence>
      <FolderIcon base={folder.base} dark={folder.dark} />
      <span className="folder-dock__dot" aria-hidden="true" />
    </motion.button>
  );
};

export const FolderDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState('about');

  /* track which section the walk is currently on, same rule as TrailNav */
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.walk');
    if (!root) return;

    const compute = () => {
      const rootRect = root.getBoundingClientRect();
      const mid = rootRect.top + root.clientHeight * 0.5;
      let current = FOLDERS[0].id;
      for (const f of FOLDERS) {
        const el = document.getElementById(f.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) { current = f.id; break; }
        if (rect.top <= mid) current = f.id;
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

  const handleSelect = (f: FolderDef) => {
    if (f.href) {
      window.open(f.href, '_blank', 'noopener,noreferrer');
      return;
    }
    scrollToSection(f.id);
  };

  return (
    <nav className="folder-dock" aria-label="Filing cabinet navigation">
      <motion.div
        className="folder-dock__panel"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        role="toolbar"
        aria-label="Section folders"
      >
        {FOLDERS.map((f) => (
          <FolderItem
            key={f.id}
            folder={f}
            mouseX={mouseX}
            active={active === f.id}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>
      <span className="folder-dock__drawer" aria-hidden="true" />
    </nav>
  );
};
