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
      background: '#000000',
    }}>
      {/* Subtle Jetstream Blue ambient glow */}
      <div style={{
        position: 'absolute', width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,20,137,0.12) 0%, transparent 65%)',
        left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 40px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 48 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1080, margin: '0 auto 56px' }}
        >
          <motion.img
            src="/full.png"
            alt="SF-24 Complete"
            style={{
              width: '100%',
              filter: 'drop-shadow(0 0 60px rgba(0,20,137,0.2)) drop-shadow(0 40px 80px rgba(0,0,0,0.85))',
              y: imgY,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff',
          }}>
            THE SF-24. COMPLETE.
          </h2>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginTop: 16,
          }}>Maranello · 2024 · Formula One World Championship</p>
        </motion.div>
      </div>
    </section>
  )
}
