import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const MARQUEE_TEXT = 'SF-24 · COMPLETE · MARANELLO · 2024 · FORMULA ONE WORLD CHAMPIONSHIP · '

export default function Reveal() {
  const ref    = useRef()
  const inView  = useInView(ref, { once: true, margin: '-20% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={ref} id="reveal" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      background: '#000000',
    }}>
      {/* Scan lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
        zIndex: 1,
      }} />

      {/* Dual glow: Ferrari red + Jetstream Blue */}
      <div style={{
        position: 'absolute',
        width: 900, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(220,0,0,0.12) 0%, transparent 65%)',
        left: '50%', top: '40%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,20,137,0.08) 0%, transparent 65%)',
        left: '50%', top: '60%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* "FERRARI" watermark */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(8rem, 20vw, 20rem)',
        fontWeight: 700, letterSpacing: '-0.04em',
        color: 'rgba(255,255,255,0.018)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none', zIndex: 1,
        userSelect: 'none',
      }}>FERRARI</div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 40px 48px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Car reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 56, filter: 'blur(12px)' }}
          animate={inView ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1060, margin: '0 auto 52px', width: '100%' }}
        >
          <motion.img
            src="/full.png"
            alt="SF-24 Complete"
            style={{
              width: '100%',
              filter: 'drop-shadow(0 0 80px rgba(220,0,0,0.18)) drop-shadow(0 0 30px rgba(0,20,137,0.12)) drop-shadow(0 50px 100px rgba(0,0,0,0.9))',
              y: imgY,
            }}
          />
        </motion.div>

        {/* Per-word headline */}
        <div style={{ display: 'flex', gap: '0.25em', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {['THE', 'SF-24.', 'COMPLETE.'].map((word, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'block',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 5vw, 5rem)',
                  fontWeight: 700, letterSpacing: '-0.02em',
                  color: word === 'SF-24.' ? '#DC0000' : '#ffffff',
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
          }}
        >
          Maranello · 2024 · Formula One World Championship
        </motion.p>
      </div>

      {/* Ferrari red marquee band at bottom */}
      <div style={{
        width: '100%', background: '#DC0000', overflow: 'hidden',
        height: 36, display: 'flex', alignItems: 'center',
        zIndex: 5, flexShrink: 0,
      }}>
        <div className="marquee-track" style={{ whiteSpace: 'nowrap', animationDuration: '22s' }}>
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
