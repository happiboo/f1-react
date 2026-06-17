import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function Showcase() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.02, 1.06])

  return (
    <section ref={ref} style={{
      minHeight: '70vh', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Full-bleed photo */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/main.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.42) saturate(0.6)',
        scale,
      }} />

      {/* Stratosphere atmospheric overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(113,110,133,0.45) 0%, rgba(113,110,133,0.1) 35%, rgba(113,110,133,0.1) 65%, rgba(113,110,133,0.5) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'left', padding: '90px 40px', width: '100%' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
            marginBottom: 24,
          }}
        >
          Every Component · Precision Built
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
            fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.04,
            color: '#ffffff', marginBottom: 20, maxWidth: 700,
          }}
        >
          Engineering in<br />its Entirety
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', color: 'rgba(255,255,255,0.55)',
            maxWidth: 480, lineHeight: 1.68, letterSpacing: '-0.01em',
          }}
        >
          From carbon-ceramic brake discs and Pirelli compounds to the hand-stitched
          Alcantara steering wheel — every component designed, manufactured and tested at Maranello.
        </motion.p>
      </div>
    </section>
  )
}
