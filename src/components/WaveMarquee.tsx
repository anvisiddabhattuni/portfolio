/* ============================================================
   WaveMarquee — the moving strip of Anvi's wavy artwork,
   mirroring NKORA's scrolling illustration band. Each panel
   tries the real image at public/waves/wave-N.png first and
   falls back to the exact-palette SVG stand-in until the
   original files are dropped in (see design/design.md).
   ============================================================ */
import { useState } from 'react';
import { WaveArt, type WaveVariant } from './WaveArt';

const VARIANTS: WaveVariant[] = [1, 2, 3, 4];

function WavePanel({ variant }: { variant: WaveVariant }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className="wave-panel">
      {missing ? (
        <WaveArt variant={variant} />
      ) : (
        <img
          src={`/waves/wave-${variant}.png`}
          alt="Hand-drawn flowing wave artwork"
          draggable={false}
          onError={() => setMissing(true)}
        />
      )}
    </div>
  );
}

export function WaveMarquee() {
  // Sequence rendered twice so the -50% keyframe loops seamlessly.
  const train = [...VARIANTS, ...VARIANTS];
  return (
    <div className="wave-marquee" aria-hidden="true">
      <div className="wave-marquee__train">
        {[0, 1].map((half) => (
          <div className="wave-marquee__half" key={half}>
            {train.map((v, i) => (
              <WavePanel key={`${half}-${i}`} variant={v} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
