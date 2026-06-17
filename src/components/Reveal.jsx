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
