# Ferrari SF-24 — Glassy Dark Retheme + Animation Fix

**Date:** 2026-06-17  
**Status:** Approved  

---

## Goal

Transform the mostly-white Ferrari SF-24 site into a dark, glassy, minimal experience. The Hero section stays white (skeleton car on white creates intentional contrast). Every section after the BuildScroll animation goes dark. The broken frame-sequence animation is replaced with video time-scrubbing using the existing `f1_seekable.mp4` asset.

---

## Design Tokens

These values are applied inline (the project uses inline styles, not CSS variables). No new CSS layer is introduced.

| Token | Value | Purpose |
|---|---|---|
| `BG_DARK` | `#080808` | All dark section backgrounds |
| `BG_SURFACE` | `#111111` | Slightly elevated dark surface |
| `GLASS_BG` | `rgba(255,255,255,0.04)` | Glass card background |
| `GLASS_BLUR` | `blur(20px)` | Glass backdrop-filter |
| `GLASS_BORDER` | `rgba(255,255,255,0.08)` | Glass border |
| `GLASS_BORDER_HOVER` | `rgba(220,0,0,0.25)` | Glass hover border |
| `TEXT_PRIMARY` | `#ffffff` | All headings |
| `TEXT_MUTED` | `rgba(255,255,255,0.45)` | Body / secondary text |
| `TEXT_FAINT` | `rgba(255,255,255,0.30)` | Labels, tags |
| `ACCENT` | `#DC0000` | Ferrari red — unchanged throughout |
| `DIVIDER` | `rgba(255,255,255,0.07)` | Section borders, stat dividers |

---

## Component Changes

### `index.css`
- `body` background: `#080808`
- Scrollbar track: `#111111`
- Scrollbar thumb: `#DC0000` (unchanged)
- `::selection`: `rgba(220,0,0,0.2)`

### `Loader.jsx`
- Background: `#080808`
- Spinner border: `rgba(255,255,255,0.08)`, top: `#DC0000`
- Brand text `SF · 24`: `#ffffff`
- Subtitle: `rgba(255,255,255,0.4)`
- Progress bar track: `rgba(255,255,255,0.08)`

### `Navbar.jsx`
- Scrolled state: dark glass — `rgba(8,8,8,0.80)` bg + `blur(28px)` + `rgba(255,255,255,0.07)` border
- Nav link default: `rgba(255,255,255,0.45)`, hover: `rgba(255,255,255,0.9)`
- Brand wordmark: `#ffffff`
- CTA pill: unchanged (`#DC0000`)

### `Hero.jsx` — No changes
White background stays. Skeleton car (`frame.png`) on white is the intentional contrast before the dark world begins.

### `BuildScroll.jsx` — Animation overhaul

**Replace JPEG frame sequence with video scrubbing:**

1. Remove all `Image` preloading logic and the `framesRef` / `loadedCount` state.
2. Add a `videoRef` pointing to a hidden `<video>` element that loads `/f1_seekable.mp4` with `preload="auto"` and `muted playsInline`.
3. On scroll: `video.currentTime = progress * video.duration`
4. Draw to canvas via `video.onseeked` callback: `ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch)` — same cover-crop math as before.
5. Show canvas once video has enough data (`video.readyState >= 2` / `canplay` event). Use a simple opacity transition.
6. Loading state: show a minimal dark screen with the red progress line while `readyState < 2`. No percentage counter needed — video buffers quickly.

Spec cards, Timeline, scroll hint, progress bar, vignette overlay — all unchanged visually.

### `CompSection.jsx`
- Section background: `#080808`
- Heading text: `#ffffff`
- Body text: `rgba(255,255,255,0.50)`
- Tag line color: `#DC0000` (unchanged)
- Stat value text: `#ffffff`
- Stat label text: `rgba(255,255,255,0.35)`
- Stat border-left: `rgba(220,0,0,0.30)`
- Background glow radial: `rgba(220,0,0,0.06)` (slightly more visible on dark)

### `Showcase.jsx`
- Remove the white-to-transparent gradient overlay entirely.
- Replace with dark-edge vignette: `linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 25%, transparent 75%, rgba(8,8,8,0.5) 100%)`
- Heading: `#ffffff`
- Body: `rgba(255,255,255,0.60)`
- Tag / decorative lines: `#DC0000` (unchanged)

### `Specs.jsx`
- Section background: `#080808`
- Section heading: `#ffffff`
- CountUp numbers: `#ffffff` at rest, animate to `#DC0000` mid-count (already implemented)
- Stat labels: `rgba(255,255,255,0.40)`
- Dividers between stat columns: `rgba(255,255,255,0.07)`
- Section borders (top/bottom): `rgba(255,255,255,0.06)`

### `Features.jsx`
- Section background: `#080808`
- Section heading: `#ffffff`
- Section subheading/body: `rgba(255,255,255,0.45)`
- Card background: `rgba(255,255,255,0.04)` + `blur(20px)` + `rgba(255,255,255,0.07)` border
- Card hover: border → `rgba(220,0,0,0.25)`, box-shadow → `0 8px 32px rgba(0,0,0,0.4)`
- Card title: `#ffffff`
- Card body: `rgba(255,255,255,0.50)`
- Icon pill: `rgba(220,0,0,0.12)` bg, `rgba(220,0,0,0.20)` border
- Replace emoji icons with inline SVG paths (Heroicons outline style, 20×20):
  - ⚡ → bolt svg
  - 🔬 → beaker svg
  - 💨 → wind/cloud svg
  - 🔴 → circle-stack svg (brakes)
  - 📡 → signal svg
  - 🏎 → adjustments-horizontal svg

### `Reveal.jsx`
- Already dark — minor tweak only
- Red glow radial: `rgba(220,0,0,0.18)` → `rgba(220,0,0,0.22)`

### `CTA.jsx`
- Background: `#080808`
- Heading: `#ffffff`
- Body: `rgba(255,255,255,0.55)`
- Red glow radial: `rgba(220,0,0,0.07)` (same relative to dark bg)
- CTA button: unchanged

### `Footer.jsx`
- Background: `#080808`
- Top border: `rgba(255,255,255,0.06)`
- Brand wordmark: `#ffffff`
- Copyright text: `rgba(255,255,255,0.30)`
- Nav links default: `rgba(255,255,255,0.30)`, hover: `#DC0000`
- No image — footer stays text-only

---

## Animation Architecture (BuildScroll video scrubbing)

```
videoRef    <video src="/f1_seekable.mp4" muted preload="auto" playsInline>
canvasRef   <canvas> — full viewport, position absolute

On mount:
  video.addEventListener('canplay', () => setIsReady(true))
  video.addEventListener('error', () => setHasError(true))

On scroll (scrollYProgress.change):
  progress → video.currentTime = progress * video.duration
  video.onseeked = () => triggerDraw()

triggerDraw():
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch)  // same cover-crop
```

Key detail: `onseeked` is reassigned on each scroll event (not addEventListener) so only the latest seek triggers a draw — avoids queuing stale frames when the user scrolls fast.

---

## What Does NOT Change

- All Framer Motion entrance animations (stagger, lineReveal, fadeUp)
- Typography system (Space Grotesk, JetBrains Mono, Archivo)
- Ferrari red accent `#DC0000`
- Hero section (stays white)
- BuildScroll spec cards, timeline, vignette
- CompSection layout and 3D hover effects
- Reveal section (already correct)
- CTA button style
- Custom cursor (Cursor.jsx)
