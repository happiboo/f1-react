import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section id="cta" ref={ref} style={{
      padding: '160px 32px', textAlign: 'center',
      position: 'relative', overflow: 'hidden', background: '#fff',
    }}>
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,0,0,0.05) 0%, transparent 70%)',
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
            color: '#0a0a0a', marginBottom: 20,
          }}
        >
          Experience the<br /><span style={{ color: '#DC0000' }}>Scuderia</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '1rem', color: '#6b7280',
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
