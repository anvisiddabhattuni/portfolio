import React from 'react';

/**
 * Global SVG defs: a "pencil/ink wobble" filter that gives every
 * vector a subtle hand-drawn imperfection, plus a soft paper-ink texture.
 * Rendered once near the root.
 */
export const InkDefs: React.FC = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
    <defs>
      {/* gentle organic wobble — the soul of the hand-drawn look */}
      <filter id="ink-wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="ink-wobble-strong" x="-8%" y="-8%" width="116%" height="116%">
        <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="13" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* very subtle for big shapes like the door / ground */}
      <filter id="ink-wobble-soft" x="-4%" y="-4%" width="108%" height="108%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);
