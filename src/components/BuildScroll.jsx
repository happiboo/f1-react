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

  // ── Scroll: seek video then redraw on seeked
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setProgress(p)

    const video = videoRef.current
    if (video && video.duration) {
      // Overwrite onseeked each time — only the latest seek triggers a draw
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
