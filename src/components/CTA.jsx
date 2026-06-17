import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section id="cta" ref={ref} style={{
      padding: '140px 40px',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #716e85 0%, #9a97a8 50%, #c4c2cf 100%)',
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
            marginBottom: 24,
          }}
        >
          Witness the Machine
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
            fontWeight: 700, letterSpacing: '-0.02em',
            color: '#ffffff', marginBottom: 20, lineHeight: 1.04,
          }}
        >
          Experience the<br />Scuderia
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', color: 'rgba(255,255,255,0.62)',
            maxWidth: 420, marginBottom: 48, lineHeight: 1.65, letterSpacing: '-0.01em',
          }}
        >
          Follow the journey from Maranello to the podium —
          every lap, every upgrade, every moment of Italian glory.
        </motion.p>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'inline-block',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem', fontWeight: 500,
            letterSpacing: '0.5px',
            border: '1.5px solid rgba(255,255,255,0.75)',
            color: '#ffffff',
            padding: '16px 44px',
            borderRadius: 0,
            textDecoration: 'none',
            transition: 'border-color 0.25s, background 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#ffffff'
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          Follow the Scuderia
        </motion.a>
      </div>
    </section>
  )
}
