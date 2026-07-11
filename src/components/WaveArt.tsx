/* ============================================================
   WaveArt — SVG stand-ins for Anvi's hand-drawn wavy line art.
   Rendered ONLY while the original image files are missing from
   public/waves/wave-N.png (see design/design.md). Uses the exact
   locked palette colors; depth comes from opacity only.
   ============================================================ */

const PALETTE = {
  orange: '#d74e09',
  amber: '#f2bb05',
  olive: '#5a5d1e',
  garnet: '#6e0e0a',
} as const;

export type WaveVariant = 1 | 2 | 3 | 4;

const VARIANT_COLOR: Record<WaveVariant, string> = {
  1: PALETTE.orange,
  2: PALETTE.amber,
  3: PALETTE.olive,
  4: PALETTE.garnet,
};

/**
 * One flowing ribbon built from many closely-spaced vertical strokes
 * that sway together — echoing the hand-drawn line-flow reference.
 */
export function WaveArt({ variant, bare = false }: { variant: WaveVariant; bare?: boolean }) {
  const color = VARIANT_COLOR[variant];
  const lines = 44;
  const phase = variant * 1.3;
  const paths: React.ReactNode[] = [];

  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const x = 8 + t * 284;
    // shared sway so neighbouring strokes flow as one mass
    const a1 = 46 * Math.sin(phase + t * 2.4);
    const a2 = 52 * Math.sin(phase + 1.9 + t * 2.9);
    const a3 = 40 * Math.sin(phase + 3.6 + t * 2.1);
    const d = [
      `M ${x} -12`,
      `C ${x + a1} 78, ${x - a1 * 0.7} 130, ${x + a2 * 0.5} 200`,
      `C ${x + a2} 268, ${x - a3 * 0.8} 320, ${x + a3 * 0.4} 432`,
    ].join(' ');
    paths.push(
      <path
        key={i}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={3.4}
        strokeLinecap="round"
        opacity={0.55 + 0.45 * Math.abs(Math.sin(i * 0.7 + phase))}
      />,
    );
  }

  return (
    <svg
      className="wave-art"
      viewBox="0 0 300 420"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Flowing wave line art"
    >
      {!bare && <rect width="300" height="420" fill="#ffffff" />}
      {paths}
    </svg>
  );
}
