# Design System — Anvi's Portfolio (July 2026 redesign)

Single source of truth for the visual direction. Everything in this folder was
provided by Anvi on 2026-07-09. **Do not deviate from these assets, colors, or
the font.**

## Layout reference

Heavy layout inspiration from **NKORA** (https://nkora.co.uk/). A saved copy of
the page is in [`nkora-layout-reference.html`](nkora-layout-reference.html).
Key structural beats to mirror:

1. Fixed top bar — links on one side, wordmark centered/prominent.
2. Full-viewport hero with a huge uppercase display headline and a pill
   "wander in" style CTA with a down arrow.
3. Alternating full-bleed color sections (50/50 text + image splits).
4. A slideshow/scroller row of cards.
5. Giant stacked uppercase words section (NKORA's "HUMAN / INDEPENDENT / CRAFTED").
6. A continuously **moving marquee** strip of illustrations.
7. Cream call-to-action band ("Wander in OR Reach out") + colored footer with
   pill links and a huge headline.

## Color palette — exactly these 6, no substitutions

| Name         | Hex       | Usage notes                                  |
| ------------ | --------- | -------------------------------------------- |
| Cream        | `#F0F0C9` | Light backgrounds, text on dark sections     |
| Yale Blue    | `#124E78` | Section background / accents                 |
| Amber Gold   | `#F2BB05` | Buttons, highlights, wave art                |
| Dark Garnet  | `#6E0E0A` | Dark sections, primary dark text             |
| Spicy Orange | `#D74E09` | Section background, wave art, dog square (R) |
| Olive Green  | `#5A5D1E` | Section background, wave art, dog square (L) |

Cream, Yale Blue, Amber Gold, Dark Garnet, and Spicy Orange come from Anvi's
palette reference image. Olive Green is sampled directly from the green square
in `dogs-pair-original.png` (the sixth required color). Use **all six** on the
site. Do not add, remove, or adjust any of them.

## Typography

**Helvetica only.** Font stack:

```css
font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
```

No Google Fonts, no serif display faces, no substitutions. Display headlines
are uppercase, tight line-height, bold.

## Dog artwork — use the exact file, never redraw

- `dogs-pair-original.png` — the exact image Anvi provided (1536×1024).
  Two crayon-textured squares: olive-green square with a yellow golden
  retriever (left), spicy-orange square with a white poodle (right).
- `dog-left.png` / `dog-right.png` — the original split into two: pure
  pixel crops of each square's exact bounding box via `sips` (598×572 and
  602×572), zero repainting. Runtime copies live at `public/dogs/`.
- `frame1-dogs-embedded.png` — the transparent dog-pair image embedded inside
  `Frame 1.svg`, extracted verbatim; the home hero crops its two squares
  using the SVG's own pattern transforms. Runtime copy:
  `public/dogs/frame1-dogs.png`.
- Per Anvi's Figma "Frame 1" reference: the two dogs sit side by side on a
  **white panel**. The image background is a faint baked-in near-white
  checkerboard, which disappears on white — always place these on white.
- **Never** recreate, regenerate, trace, or filter this artwork.

## Wavy artwork — moving component

Anvi provided four hand-drawn line-flow wave images (in the design chat):

1. Spicy-orange wave field on white (portrait)
2. Orange/gold large flowing composition on white
3. Gold/amber vertical wave ribbon
4. Olive/dark-gold wave mass

The original image files were not saved to disk, so the site currently renders
SVG wave art in the exact palette colors as a stand-in inside the moving
marquee component. **When the original files are available, drop them in as:**

```
public/waves/wave-1.png
public/waves/wave-2.png
public/waves/wave-3.png
public/waves/wave-4.png
```

The `WaveMarquee` component picks them up automatically (it falls back to the
SVG stand-ins only while a file is missing). Keep this folder's `waves/` dir as
the archival copy of the originals.
