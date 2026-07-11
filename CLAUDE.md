# Anvi's Portfolio

React + TypeScript + Vite portfolio site, positioned around product management.
Structure is the original anvisidda.com "walk" design: OpeningScene entry →
walk sections (Greeting, About, Case Studies, Experience, Skills, Contact)
with the folder-dock nav. The NKORA-inspired page (src/sections/Home.tsx +
nkora.css) is kept in the repo but not rendered. Design spec: `design/design.md`.

Copy voice: human and conversational, never LinkedIn/AI-sounding. No
"end-to-end", "passionate", "leverage", "cross-functional", noun-triads, or
invented metrics. Real numbers only (314K views, WEHack 2026 win, 32%
conversion). Target: Summer 2027 PM internships.

## Commands

- `npm run dev` — dev server
- `npm run build` — typecheck + production build
- `npm run lint` — eslint

## Design standards — LOCKED, do not change

### Font: Helvetica only

```css
font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
```

No Google Fonts, no other typefaces, anywhere. Display headlines are bold,
uppercase, tight line-height.

### Color palette: exactly these 6 colors

| Token            | Name         | Hex       |
| ---------------- | ------------ | --------- |
| `--cream`        | Cream        | `#F0F0C9` |
| `--yale-blue`    | Yale Blue    | `#124E78` |
| `--amber-gold`   | Amber Gold   | `#F2BB05` |
| `--dark-garnet`  | Dark Garnet  | `#6E0E0A` |
| `--spicy-orange` | Spicy Orange | `#D74E09` |
| `--olive-green`  | Olive Green  | `#5A5D1E` |

All six must appear on the site. Never substitute, tint-shift, or add colors
beyond white/transparent utility values. Defined as CSS variables in
`src/styles/nkora.css`.

## Fixed assets — use exactly as provided, never regenerate

- `public/dogs/dogs-pair.png` — Anvi's dog artwork (exact original).
- `public/dogs/dog-left.png` / `dog-right.png` — pixel-exact halves of the
  original (green square = golden retriever, orange square = poodle). Display
  side by side on a **white** panel (per Anvi's Frame-1 reference). Never
  redraw, trace, filter, or AI-regenerate this artwork.
- `public/waves/wave-1..4.png` — Anvi's wavy line-art images, used by the
  moving `WaveMarquee` component (SVG stand-ins in exact palette colors render
  until the files are dropped in).
- Archival copies + full asset rules: `design/`.
