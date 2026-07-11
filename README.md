# 🐾 Take a Walk Through My Work

A portfolio that isn't a portfolio with doodles on it — it's a peaceful walk with two
hand-drawn dogs that happens to reveal the work along the way. The dogs are the guides;
the portfolio is the destination.

Built with **React + TypeScript + Vite + Framer Motion**, with every illustration
drawn as hand-styled **SVG** (no images, infinitely scalable, themeable).

---

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Open the URL Vite prints (usually http://localhost:5173).

---

## The experience

1. **Opening** — empty paper, the two dogs sit by a front door, "Take a walk through my work."
   A bouncing prompt invites you to ring the bell.
2. **Door opens** — light spills out, the forest appears beyond, the camera pushes through,
   the dogs stand up, tails wag, and they walk into the world.
3. **The walk** — five stops along a winding path:
   - **About** — a wooden storybook sign + bench
   - **Projects** — a clearing of clickable doodle objects -> premium case-study modals
   - **Experience** — a trail lined with posters
   - **Skills** — a campfire ringed with skill items
   - **Contact** — a cozy cabin with a working mailbox form

---

## Where to put YOUR content

Everything lives in **`src/content.ts`** — edit this one file and the whole walk updates:

| What | Edit |
|------|------|
| Name, intro, interests, background, goals | `ABOUT` |
| Project case studies | `PROJECTS` |
| Experience posters (ACM, KTP, Beats by Dre, etc.) | `EXPERIENCES` |
| Skills around the campfire | `SKILLS` |
| LinkedIn / GitHub / resume links | `CONTACT` |

- **Profile photo:** in `src/sections/Stops.tsx`, the About card uses a placeholder "A" circle.
  Replace that `<div>` with an `<img src="/me.jpg" />` (drop the file in `/public`).
- **Resume:** set `CONTACT.resume` to a real PDF path (e.g. `/resume.pdf` in `/public`).
- **Project screenshots:** in the project modal, the `.shot` placeholder is where real
  screenshots go — swap in `<img>` tags.
- **Contact form:** submissions post to `/api/contact`, which sends through Resend. Set
  `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in your deployment
  environment. See `.env.example` for the expected names.

---

## The dogs & doodle system (reusable)

```
src/doodles/
  InkDefs.tsx     <- the hand-drawn "wobble" SVG filters (the soul of the look)
  BigDog.tsx      <- fluffy floppy-eared dog: pose 'sit'|'walk', blink, wag, lookAtUser
  SmallDog.tsx    <- curly bichon, same animatable props
  DogPair.tsx     <- both dogs + leashes together (the recurring guide element)
  Nature.tsx      <- Tree, Bush, Flower, Cloud, Bird, Grass, GroundLine
  Props.tsx       <- WoodSign, Bench, Lantern, Stump, Birdhouse, Tent, Poster,
                     Campfire, SkillItem, Cabin, Mailbox
  FrontDoor.tsx   <- the opening door that swings & glows
```

Each dog accepts:

```tsx
<BigDog pose="walk" blink wag lookAtUser />
```

To add a new project object, drop a new shape in `Props.tsx`, then reference it in
`PROJECTS[].object` and the map in `ProjObject`.

---

## Motion & accessibility

- Gentle, organic motion only — swaying trees, drifting clouds, occasional birds,
  blinking dogs, wagging tails. No harsh bounces or generic transitions.
- **prefers-reduced-motion** is respected throughout (`src/hooks/useReducedMotion.ts`):
  the door opens instantly, idle loops calm down, reveals fade without movement.
- Keyboard accessible: skip link, focusable objects, ARIA labels, trail-marker nav.
- Sections are **lazy-loaded** (`React.lazy`) so the opening scene paints instantly.

---

## Tech notes

- Fonts: Caveat (handwriting), Gloria Hallelujah (marker), Fraunces (body) via Google Fonts.
- Palette is CSS variables in `src/styles/global.css` — change `--ink` / `--paper` /
  the nature accents to re-theme the entire world at once.
- Paper grain + ink-wobble give the "animated storybook meets premium portfolio" feel.

Made with hand-drawn love.
