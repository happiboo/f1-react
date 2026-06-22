import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const MARQUEE_TEXT = 'SF-24 · MARANELLO · 2024 · SCUDERIA FERRARI · FORMULA ONE · '

export default function Showcase() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.07, 1.02, 1.07])

  return (
    <section ref={ref} style={{
      minHeight: '75vh', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Full-bleed photo */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/main.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.52) saturate(0.7)',
        scale,
      }} />

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.15) 60%, rgba(10,10,10,0.7) 100%)',
      }} />

      {/* Ferrari red left edge accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, background: '#DC0000',
        zIndex: 4,
        boxShadow: '8px 0 40px rgba(220,0,0,0.2)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'left', padding: '90px 40px', width: '100%' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.56rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: '#DC0000',
            marginBottom: 24,
          }}
        >
          Every Component · Precision Built
        </motion.p>

        {/* Per-line staggered headline */}
        {['Engineering in', 'its Entirety'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '108%', opacity: 0 }}
              animate={inView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 0.95, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)',
                fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.04,
                color: '#ffffff', display: 'block',
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px', color: 'rgba(255,255,255,0.48)',
            maxWidth: 460, lineHeight: 1.68, letterSpacing: '-0.01em',
            marginTop: 22,
          }}
        >
          From carbon-ceramic brake discs and Pirelli compounds to the hand-stitched
          Alcantara steering wheel — every component designed, manufactured and tested at Maranello.
        </motion.p>
      </div>

      {/* Bottom marquee band */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#DC0000', overflow: 'hidden',
        height: 36, display: 'flex', alignItems: 'center',
        zIndex: 5,
      }}>
        <div className="marquee-track" style={{ whiteSpace: 'nowrap' }}>
          {(MARQUEE_TEXT + MARQUEE_TEXT).split('').map((ch, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.58rem', letterSpacing: '3px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)',
            }}>{ch}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
