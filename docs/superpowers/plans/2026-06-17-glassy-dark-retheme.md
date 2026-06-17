# Ferrari SF-24 — Glassy Dark Retheme + Animation Fix

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the site to a dark glass aesthetic (Hero stays white) and replace the broken JPEG frame sequence with a smooth video-scrubbing animation using the existing `f1_seekable.mp4`.

**Architecture:** All styling is done via React inline styles — no CSS framework, no new dependencies. The BuildScroll component swaps its `Image[]` preload loop for a single hidden `<video>` element; `video.currentTime` is set on scroll, and `video.onseeked` triggers a canvas draw. All other components receive colour/background token updates only.

**Tech Stack:** React 19, Framer Motion 12, Vite 8. No test framework — verification is visual via `npm run dev`.

## Global Constraints

- Ferrari red accent: `#DC0000` — never change this value
- Hero section (`Hero.jsx`): no changes — stays white
- Typography system unchanged: Space Grotesk, JetBrains Mono, Archivo
- All Framer Motion entrance animations preserved as-is
- No new npm dependencies
- Video asset: `/f1_seekable.mp4` (already in `/public`)

---

## File Map

| File | Change type |
|---|---|
| `src/index.css` | Body bg, scrollbar, selection colour |
| `src/components/Loader.jsx` | Dark theme |
| `src/components/Navbar.jsx` | Dark glass on scroll |
| `src/components/BuildScroll.jsx` | Full animation rewrite (video scrubbing) |
| `src/components/CompSection.jsx` | Dark theme |
| `src/components/Showcase.jsx` | Remove white overlay |
| `src/components/Specs.jsx` | Dark theme |
| `src/components/Features.jsx` | Dark theme + SVG icons |
| `src/components/Reveal.jsx` | Glow tweak |
| `src/components/CTA.jsx` | Dark theme |
| `src/components/Footer.jsx` | Dark theme, no image |

---

## Task 1: Global styles + Loader + Navbar

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Loader.jsx`
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Produces: dark baseline so all subsequent sections inherit the correct body background

- [ ] **Step 1: Update `src/index.css`**

Replace the full file content:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Archivo:ital,wght@0,300;0,400;0,500;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; }
body {
  background: #080808;
  color: #ffffff;
  font-family: 'Archivo', sans-serif;
  overflow-x: hidden;
  cursor: none;
  -webkit-font-smoothing: antialiased;
}
#root { width: 100%; }
::selection { background: rgba(220,0,0,0.2); }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #111111; }
::-webkit-scrollbar-thumb { background: #DC0000; border-radius: 2px; }
a { text-decoration: none; color: inherit; }
img { display: block; max-width: 100%; }
@media (max-width: 768px) { body { cursor: auto; } }
```

- [ ] **Step 2: Update `src/components/Loader.jsx`**

Replace the full file content:

```jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let p = 0
    const t = setInterval(() => {
      p += Math.random() * 9
      if (p >= 100) { p = 100; clearInterval(t) }
      setProgress(Math.min(p, 100))
    }, 90)

    const finish = setTimeout(() => {
      setProgress(100)
      setTimeout(() => { setDone(true); onDone?.() }, 600)
    }, 1800)

    return () => { clearInterval(t); clearTimeout(finish) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080808',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 24,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.08)',
              borderTopColor: '#DC0000',
            }}
          />
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem', fontWeight: 700,
            letterSpacing: '6px', textTransform: 'uppercase', color: '#ffffff',
          }}>
            SF · 24
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          }}>
            Assembling the machine
          </p>
          <div style={{ width: 160, height: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 1, overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              style={{ height: '100%', background: '#DC0000', borderRadius: 1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Update `src/components/Navbar.jsx`**

Replace the full file content:

```jsx
import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { label: 'Chassis', href: '#chassis' },
  { label: 'Power Unit', href: '#power' },
  { label: 'Specs', href: '#specs' },
]

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60))

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ position: 'fixed', top: 14, left: 0, right: 0, zIndex: 1000, padding: '0 20px' }}
    >
      <motion.div
        animate={scrolled ? {
          maxWidth: 860, background: 'rgba(8,8,8,0.80)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 100, padding: '10px 28px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        } : {
          maxWidth: '100%', background: 'transparent',
          border: '1px solid transparent',
          borderRadius: 0, padding: '14px 32px',
          boxShadow: 'none',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: '#DC0000',
            borderRadius: 5, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '0.85rem',
          }}>🐎</div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: '#ffffff',
          }}>
            SCUDERIA <span style={{ color: '#DC0000' }}>FERRARI</span>
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.66rem', letterSpacing: '1.5px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
            >{l.label}</a>
          ))}
          <a href="#cta" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            background: '#DC0000', color: '#fff',
            padding: '8px 18px', borderRadius: 100,
          }}>Experience</a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
```

- [ ] **Step 4: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173`. Check:
- Page background is dark `#080808` ✓
- Loader shows dark background with white text ✓
- Navbar on scroll becomes dark glass (scroll down briefly) ✓
- Hero section is still white ✓

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/Loader.jsx src/components/Navbar.jsx
git commit -m "feat: dark theme baseline — index.css, Loader, Navbar"
```

---

## Task 2: BuildScroll — video scrubbing animation

**Files:**
- Modify: `src/components/BuildScroll.jsx`

**Interfaces:**
- Consumes: `/f1_seekable.mp4` (already in `/public`)
- Produces: scroll-driven canvas animation drawing video frames; same spec cards and timeline as before

- [ ] **Step 1: Replace `src/components/BuildScroll.jsx`**

Replace the full file content:

```jsx
import { useRef, useEffect, useState, useCallback } from 'react'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'

// ─── Config ───────────────────────────────────────────────────────────────────
const SPECS = [
  {
    show: 0.05, hide: 0.28, side: 'left',
    label: '01 / Chassis',
    title: 'The Monocoque',
    desc: 'Carbon fibre survival cell. Machined to 0.1 mm tolerance — lighter than a suitcase, stronger than a vault.',
    stats: [
      { val: '43', unit: 'kg', label: 'Total Weight' },
      { val: '7.5', unit: 'km', label: 'Carbon Fibre' },
    ],
  },
  {
    show: 0.30, hide: 0.52, side: 'right',
    label: '02 / Power Unit',
    title: 'Ferrari 066/12',
    desc: '1.6L turbocharged V6 + MGU-K + MGU-H. Over 1,000 combined horsepower. Italian thunder, precisely contained.',
    stats: [
      { val: '1000+', unit: 'hp', label: 'Combined Output' },
      { val: '18k', unit: 'rpm', label: 'Redline' },
    ],
  },
  {
    show: 0.55, hide: 0.76, side: 'left',
    label: '03 / Aerodynamics',
    title: 'Born to Slice',
    desc: '1,000+ CFD simulations. Ground-effect venturi tunnels generate 3.5× the car\'s weight in downforce.',
    stats: [
      { val: '3.5×', unit: '', label: 'Downforce Ratio' },
      { val: '1000+', unit: '', label: 'CFD Sims' },
    ],
  },
  {
    show: 0.78, hide: 0.98, side: 'right',
    label: '04 / The Machine',
    title: 'SF-24 Complete',
    desc: '798 kg of engineering obsession. 0–300 in 8.5 s. A crimson weapon forged in Maranello.',
    stats: [
      { val: '350', unit: 'km/h', label: 'Top Speed' },
      { val: '798', unit: 'kg', label: 'Total Mass' },
    ],
  },
]

// ─── Spec Card ─────────────────────────────────────────────────────────────────
function SpecCard({ spec }) {
  const isLeft = spec.side === 'left'
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isLeft ? -20 : 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        bottom: '10vh',
        [isLeft ? 'left' : 'right']: 'clamp(16px, 4vw, 60px)',
        width: 'clamp(260px, 28vw, 360px)',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        background: 'rgba(10, 10, 10, 0.55)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #DC0000, #ff4040)' }} />
        <div style={{ padding: '20px 24px 24px' }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '3px',
            textTransform: 'uppercase', color: '#DC0000', marginBottom: 10,
          }}>
            {spec.label}
          </p>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#ffffff', marginBottom: 10,
          }}>
            {spec.title}
          </h3>
          <p style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7, marginBottom: 20,
          }}>
            {spec.desc}
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16,
          }}>
            {spec.stats.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700,
                  color: '#ffffff', lineHeight: 1, letterSpacing: '-0.03em',
                }}>
                  {s.val}
                  {s.unit && (
                    <span style={{ fontSize: '0.65em', color: '#DC0000', marginLeft: 2 }}>
                      {s.unit}
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.55rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                  marginTop: 4,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Progress Timeline ─────────────────────────────────────────────────────────
function Timeline({ progress }) {
  return (
    <div style={{
      position: 'absolute',
      right: 'clamp(12px, 3vw, 32px)',
      top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 0, zIndex: 20,
    }}>
      {SPECS.map((spec, i) => {
        const segStart = spec.show
        const segEnd = spec.hide
        const segProgress = Math.max(0, Math.min(1, (progress - segStart) / (segEnd - segStart)))
        const isActive = progress >= spec.show && progress < spec.hide
        const isPast = progress >= spec.hide

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isPast || isActive ? '#DC0000' : 'rgba(255,255,255,0.2)',
                boxShadow: isActive ? '0 0 0 4px rgba(220,0,0,0.2)' : '0 0 0 0px rgba(220,0,0,0)',
              }}
              transition={{ duration: 0.35 }}
              style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0 }}
            />
            {i < SPECS.length - 1 && (
              <div style={{ width: 1.5, height: 40, background: 'rgba(255,255,255,0.1)', position: 'relative', margin: '4px 0' }}>
                <motion.div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    background: '#DC0000',
                    height: `${isActive ? segProgress * 100 : isPast ? 100 : 0}%`,
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function BuildScroll() {
  const sectionRef = useRef()
  const canvasRef = useRef()
  const videoRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [visibleCard, setVisibleCard] = useState(-1)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // ── Draw current video frame to canvas
  const triggerDraw = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    const dpr = window.devicePixelRatio || 1
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr
      canvas.height = ch * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const fw = video.videoWidth
    const fh = video.videoHeight
    if (!fw || !fh) return

    const fRatio = fw / fh
    const cRatio = cw / ch
    let sx, sy, sw, sh
    if (cRatio > fRatio) {
      sw = fw; sh = fw / cRatio; sx = 0; sy = (fh - sh) / 2
    } else {
      sh = fh; sw = fh * cRatio; sx = (fw - sw) / 2; sy = 0
    }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch)
  }, [])

  // ── Setup video: mark ready and draw frame 0 on canplay
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onCanPlay = () => {
      setIsReady(true)
      triggerDraw()
    }
    video.addEventListener('canplay', onCanPlay)
    return () => video.removeEventListener('canplay', onCanPlay)
  }, [triggerDraw])

  // ── Scroll: seek video and redraw on seeked
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setProgress(p)

    const video = videoRef.current
    if (video && video.duration) {
      // Overwrite onseeked each time so only the latest seek triggers a draw
      video.onseeked = triggerDraw
      video.currentTime = p * video.duration
    }

    const active = SPECS.findIndex(s => p >= s.show && p < s.hide)
    setVisibleCard(active)
  })

  // ── Resize: redraw at new dimensions
  useEffect(() => {
    const onResize = () => triggerDraw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [triggerDraw])

  return (
    <section
      id="build"
      ref={sectionRef}
      style={{ height: '520vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%', overflow: 'hidden',
        background: '#080808',
      }}>

        {/* Hidden video source */}
        <video
          ref={videoRef}
          src="/f1_seekable.mp4"
          muted
          playsInline
          preload="auto"
          style={{ display: 'none' }}
        />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Loading state */}
        {!isReady && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#080808', zIndex: 5,
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem', letterSpacing: '3px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
              marginBottom: 20,
            }}>
              Loading
            </p>
            <motion.div
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
              style={{ width: 180, height: 1.5, background: '#DC0000', borderRadius: 2, originX: 0 }}
            />
          </div>
        )}

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(8,8,8,0.6) 100%),
            linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 15%, transparent 75%, rgba(8,8,8,0.8) 100%)
          `,
        }} />

        {/* Top label */}
        <div style={{
          position: 'absolute', top: 32, left: 'clamp(16px, 4vw, 60px)',
          zIndex: 20, pointerEvents: 'none',
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '3px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
          }}>
            SF-24 · Anatomy
          </p>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: '#DC0000', transformOrigin: '0 0', zIndex: 30,
            scaleX: scrollYProgress,
          }}
        />

        {/* Spec cards */}
        <AnimatePresence mode="wait">
          {visibleCard >= 0 && (
            <SpecCard key={visibleCard} spec={SPECS[visibleCard]} />
          )}
        </AnimatePresence>

        {/* Timeline */}
        <Timeline progress={progress} />

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: progress < 0.04 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            pointerEvents: 'none', zIndex: 20,
          }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.55rem', letterSpacing: '2.5px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
          }}>
            Scroll to build
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 24, background: 'rgba(220,0,0,0.6)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Scroll into the BuildScroll section. Check:
- Canvas shows the video immediately when the section loads (no long loading bar) ✓
- Scrolling forward advances the car build animation smoothly ✓
- Scrolling backward reverses it ✓
- Spec cards appear/disappear at the right scroll positions ✓
- Timeline dots fill correctly ✓

- [ ] **Step 3: Commit**

```bash
git add src/components/BuildScroll.jsx
git commit -m "feat: replace JPEG frame sequence with video scrubbing in BuildScroll"
```

---

## Task 3: CompSection + Showcase dark theme

**Files:**
- Modify: `src/components/CompSection.jsx`
- Modify: `src/components/Showcase.jsx`

**Interfaces:**
- Produces: dark post-scroll sections with white typography and glass-style stat panels

- [ ] **Step 1: Update `src/components/CompSection.jsx`**

Replace the full file content:

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '108%' },
  show: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function CompSection({ id, tag, title, body, stats, img, imgSide = 'left', accent }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const imgBlock = (
    <motion.div
      variants={fadeUp}
      style={{ flex: 1, padding: '60px 48px', display: 'flex', alignItems: 'center' }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <motion.img
        src={img}
        alt={title}
        style={{
          width: '100%', maxWidth: 580,
          borderRadius: 8,
          filter: accent
            ? 'drop-shadow(0 24px 56px rgba(220,0,0,0.22))'
            : 'drop-shadow(0 24px 56px rgba(0,0,0,0.5))',
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ rotateY: imgSide === 'left' ? 4 : -4, rotateX: -2 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </motion.div>
  )

  const textBlock = (
    <motion.div
      variants={stagger}
      style={{ flex: 1, padding: '60px 80px' }}
    >
      <motion.p variants={fadeUp} style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.58rem', letterSpacing: '5px', textTransform: 'uppercase',
        color: '#DC0000', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 26, height: 1, background: '#DC0000', display: 'inline-block' }} />
        {tag}
      </motion.p>

      <div style={{ marginBottom: 22 }}>
        {title.split('\n').map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2 variants={lineReveal} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.4rem, 4vw, 4.2rem)',
              fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.04,
              color: '#ffffff',
            }}>{line}</motion.h2>
          </div>
        ))}
      </div>

      <motion.p variants={fadeUp} style={{
        fontSize: '0.97rem', color: 'rgba(255,255,255,0.50)',
        lineHeight: 1.85, maxWidth: 450, marginBottom: 40,
      }}>{body}</motion.p>

      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} style={{
            borderLeft: '2px solid rgba(220,0,0,0.30)', paddingLeft: 14,
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.75rem', fontWeight: 700, display: 'block', lineHeight: 1.1, color: '#ffffff',
            }}>{s.val}</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.58rem', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)', marginTop: 4, display: 'block',
            }}>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        flexDirection: imgSide === 'left' ? 'row' : 'row-reverse',
        position: 'relative', overflow: 'hidden',
        padding: '80px 0',
        background: '#080808',
      }}
    >
      <div style={{
        position: 'absolute',
        [imgSide === 'left' ? 'right' : 'left']: '-15%',
        top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,0,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {imgSide === 'left' ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
    </motion.section>
  )
}
```

- [ ] **Step 2: Update `src/components/Showcase.jsx`**

Replace the full file content:

```jsx
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Showcase() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08])

  return (
    <section ref={ref} style={{
      minHeight: '70vh', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <motion.div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/main.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.35) saturate(0.7)',
        scale,
      }} />
      {/* Dark edge vignette — no white overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 25%, transparent 75%, rgba(8,8,8,0.55) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '90px 32px' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '5px',
            textTransform: 'uppercase', color: '#DC0000',
            marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          }}
        >
          <span style={{ width: 28, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
          Every Component · Precision Built
          <span style={{ width: 28, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem,5.5vw,5.5rem)',
            fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.08,
            color: '#ffffff', marginBottom: 20,
          }}
        >
          Engineering in<br />its <span style={{ color: '#DC0000' }}>Entirety</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.60)', maxWidth: 560, margin: '0 auto', lineHeight: 1.78 }}
        >
          From carbon-ceramic brake discs and Pirelli compounds to the hand-stitched
          Alcantara steering wheel — every component designed, manufactured and tested at Maranello.
        </motion.p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Scroll past the BuildScroll section. Check:
- CompSection Chassis: dark background, white heading, muted white body, red-bordered stats ✓
- CompSection Power Unit: same dark theme ✓
- Showcase: car image visible (not washed out), white heading, dark edge vignette ✓

- [ ] **Step 4: Commit**

```bash
git add src/components/CompSection.jsx src/components/Showcase.jsx
git commit -m "feat: dark theme for CompSection and Showcase"
```

---

## Task 4: Specs + Features dark theme + SVG icons

**Files:**
- Modify: `src/components/Specs.jsx`
- Modify: `src/components/Features.jsx`

**Interfaces:**
- Produces: dark stats section with white count-up numbers; dark feature grid with glass cards and SVG icons

- [ ] **Step 1: Update `src/components/Specs.jsx`**

Replace the full file content:

```jsx
import { useRef, useState, useEffect } from 'react'
import { useInView, motion } from 'framer-motion'

const SPECS = [
  { target: 1000, sfx: '+', label: 'Combined Horsepower' },
  { target: 18000, sfx: '', label: 'Maximum RPM' },
  { target: 350, sfx: '+', label: 'km/h Top Speed' },
  { target: 798, sfx: '', label: 'kg Minimum Weight' },
]

function CountUp({ target, sfx, started }) {
  const [val, setVal] = useState(0)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (!started) return
    setCounting(true)
    const dur = 2000
    const t0 = performance.now()
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      const cur = Math.floor(eased * target)
      setVal(cur)
      if (p < 1) requestAnimationFrame(tick)
      else { setVal(target); setCounting(false) }
    }
    requestAnimationFrame(tick)
  }, [started, target])

  return (
    <motion.span
      animate={counting ? { color: '#DC0000', textShadow: '0 0 28px rgba(220,0,0,0.3)' } : { color: '#ffffff', textShadow: 'none' }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2.8rem,5vw,4rem)', fontWeight: 700, display: 'block', lineHeight: 1,
      }}
    >
      {val >= 1000 ? val.toLocaleString() : val}{sfx}
    </motion.span>
  )
}

export default function Specs() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <section id="specs" ref={ref} style={{
      padding: '140px 32px',
      background: '#080808',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 80 }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#DC0000',
          marginBottom: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 14,
        }}>
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
          By the Numbers
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem,4vw,3.5rem)',
          fontWeight: 700, letterSpacing: '-1px', color: '#ffffff',
        }}>Technical Specifications</h2>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 40, maxWidth: 1000, margin: '0 auto',
      }}>
        {SPECS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center', position: 'relative',
              paddingRight: i < 3 ? 40 : 0,
            }}
          >
            {i < 3 && (
              <div style={{
                position: 'absolute', right: 0, top: '15%', bottom: '15%',
                width: 1, background: 'rgba(255,255,255,0.07)',
              }} />
            )}
            <CountUp target={s.target} sfx={s.sfx} started={inView} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)',
              marginTop: 14, display: 'block',
            }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update `src/components/Features.jsx`**

Replace the full file content:

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Heroicons outline SVG paths (24×24 viewBox)
const ICONS = {
  bolt: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  cube: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
  wind: 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3',
  stop: 'M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z',
  signal: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z',
  sliders: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
}

function Icon({ name }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#DC0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[name]} />
    </svg>
  )
}

const FEATS = [
  { icon: 'bolt', title: 'Hybrid Power Unit', body: 'The Ferrari 066/12 fuses turbocharged V6 with two MGUs, recovering and deploying energy continuously — mechanical brutality meets electrical intelligence.' },
  { icon: 'cube', title: 'Aerospace Carbon Fibre', body: 'Every structural element — monocoque, wings, floor — machined from autoclave-cured carbon fibre to sub-millimetre precision at Maranello.' },
  { icon: 'wind', title: 'Ground Effect Aero', body: 'Venturi tunnels beneath the floor create enormous downforce with minimal drag — fast, efficient, and devastating through high-speed corners.' },
  { icon: 'stop', title: 'Carbon Ceramic Brakes', body: 'Brembo discs enduring 1,000°C. From 300 km/h to standstill in 2.5 seconds — over 5G of deceleration below 800 kg.' },
  { icon: 'signal', title: 'Real-Time Telemetry', body: '300+ sensors, 150 km of wiring, 1,500 live data channels streamed to Maranello every lap — the engineers race as hard as the driver.' },
  { icon: 'sliders', title: 'Adaptive Suspension', body: 'Hydraulic pull-rod front, pushrod rear — fine-tuned for every circuit, every corner, responding faster than any human can perceive.' },
]

function Card({ feat, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(220,0,0,0.25)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        background: 'rgba(220,0,0,0.12)', border: '1px solid rgba(220,0,0,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18,
      }}>
        <Icon name={feat.icon} />
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1rem', fontWeight: 600, marginBottom: 10, color: '#ffffff',
      }}>{feat.title}</h3>
      <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.50)', lineHeight: 1.65 }}>{feat.body}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="features" ref={ref} style={{ padding: '80px 32px 140px', background: '#080808' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#DC0000', marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        }}>
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
          What Makes It Extraordinary
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem,4vw,3.5rem)',
          fontWeight: 700, letterSpacing: '-1px', color: '#ffffff',
        }}>Engineered to the Limit</h2>
        <p style={{
          fontSize: '0.97rem', color: 'rgba(255,255,255,0.45)',
          marginTop: 14, maxWidth: 440, margin: '14px auto 0',
        }}>
          Six systems. One singular purpose. The fastest corner of physics.
        </p>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: 16, maxWidth: 1100, margin: '0 auto',
      }}>
        {FEATS.map((f, i) => <Card key={i} feat={f} i={i} inView={inView} />)}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Scroll to the Specs and Features sections. Check:
- Specs: dark background, count-up numbers animate white → red → white ✓
- Dividers between stat columns are faint white lines ✓
- Features: dark background, glass cards with subtle border ✓
- Hovering a card changes border to red tint ✓
- Icon pills are visible (red stroke SVG on dark red-tinted bg) ✓
- No emoji icons anywhere in the grid ✓

- [ ] **Step 4: Commit**

```bash
git add src/components/Specs.jsx src/components/Features.jsx
git commit -m "feat: dark theme + SVG icons for Specs and Features"
```

---

## Task 5: Reveal + CTA + Footer dark theme

**Files:**
- Modify: `src/components/Reveal.jsx`
- Modify: `src/components/CTA.jsx`
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Produces: complete dark bottom of the page; footer is minimal text-only

- [ ] **Step 1: Update `src/components/Reveal.jsx`**

Replace the full file content:

```jsx
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Reveal() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section ref={ref} id="reveal" style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      background: '#0a0a0a',
    }}>
      {/* Red glow — slightly stronger */}
      <div style={{
        position: 'absolute', width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,0,0,0.22) 0%, transparent 65%)',
        left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 32px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 60 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1080, margin: '0 auto 60px' }}
        >
          <motion.img
            src="/full.png"
            alt="SF-24 Complete"
            style={{
              width: '100%',
              filter: 'drop-shadow(0 0 80px rgba(220,0,0,0.35)) drop-shadow(0 40px 100px rgba(0,0,0,0.8))',
              y: imgY,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem,5vw,5rem)',
            fontWeight: 700, letterSpacing: '-1px', color: '#fff',
          }}>
            THE <span style={{ color: '#DC0000' }}>SF-24</span>. COMPLETE.
          </h2>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '5px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
            marginTop: 14,
          }}>Maranello · 2024 · Formula One World Championship</p>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update `src/components/CTA.jsx`**

Replace the full file content:

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section id="cta" ref={ref} style={{
      padding: '160px 32px', textAlign: 'center',
      position: 'relative', overflow: 'hidden', background: '#080808',
    }}>
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,0,0,0.07) 0%, transparent 70%)',
        left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '5px',
            textTransform: 'uppercase', color: '#DC0000',
            marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
          }}
        >
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.35)', display: 'inline-block' }} />
          Witness the Machine
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.35)', display: 'inline-block' }} />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem,5.5vw,5.5rem)',
            fontWeight: 700, letterSpacing: '-1.5px',
            color: '#ffffff', marginBottom: 20,
          }}
        >
          Experience the<br /><span style={{ color: '#DC0000' }}>Scuderia</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.55)',
            maxWidth: 440, margin: '0 auto 48px', lineHeight: 1.78,
          }}
        >
          Follow the journey from Maranello to the podium —
          every lap, every upgrade, every moment of Italian glory.
        </motion.p>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2, boxShadow: '0 0 44px rgba(220,0,0,0.4)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.85rem', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            background: '#DC0000', color: '#fff',
            padding: '17px 52px', borderRadius: 4,
            boxShadow: '0 0 28px rgba(220,0,0,0.22)',
            textDecoration: 'none',
          }}
        >
          Follow the Scuderia
        </motion.a>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Update `src/components/Footer.jsx`**

Replace the full file content:

```jsx
export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '52px 32px 36px',
      background: '#080808',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase',
          color: '#ffffff',
        }}>
          SCUDERIA <span style={{ color: '#DC0000' }}>FERRARI</span> SF-24
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', color: 'rgba(255,255,255,0.30)', letterSpacing: '1px',
        }}>© 2026 Scuderia Ferrari S.p.A. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Ferrari.com'].map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', color: 'rgba(255,255,255,0.30)',
              letterSpacing: '1px', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#DC0000'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.30)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Final full-page verification**

```bash
npm run dev
```

Scroll the entire page top to bottom. Verify:
- Loader: dark ✓
- Navbar: dark glass on scroll ✓
- Hero: white, unchanged ✓
- BuildScroll: video plays on scroll, smooth frame seeking ✓
- CompSection ×2: dark, white text, red-bordered stats ✓
- Showcase: car image clear, dark vignette edges, white text ✓
- Specs: dark, count-up animations work ✓
- Features: dark, glass cards, SVG icons, hover effects ✓
- Reveal: full car on dark, red glow more prominent ✓
- CTA: dark, button unchanged ✓
- Footer: dark, text only, no image ✓

- [ ] **Step 5: Commit**

```bash
git add src/components/Reveal.jsx src/components/CTA.jsx src/components/Footer.jsx
git commit -m "feat: dark theme for Reveal, CTA, Footer — completes full retheme"
```
