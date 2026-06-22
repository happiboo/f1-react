import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref    = useRef()
  const inView  = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section id="cta" ref={ref} style={{
      padding: '160px 40px',
      position: 'relative', overflow: 'hidden',
      background: '#000000',
    }}>
      {/* Giant FERRARI watermark */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(6rem, 18vw, 18rem)',
        fontWeight: 700, letterSpacing: '-0.04em',
        color: 'rgba(255,255,255,0.022)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none', zIndex: 0,
        userSelect: 'none',
      }}>FERRARI</div>

      {/* Ferrari red ambient glow */}
      <div style={{
        position: 'absolute',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(220,0,0,0.1) 0%, transparent 70%)',
        left: 0, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Left red stripe */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 3, background: '#DC0000',
        boxShadow: '8px 0 40px rgba(220,0,0,0.25)',
        zIndex: 2,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: '#DC0000',
            marginBottom: 24,
          }}
        >
          Witness the Machine
        </motion.p>

        <div style={{ marginBottom: 20 }}>
          {['Experience the', 'Scuderia'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '108%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                  fontWeight: 700, letterSpacing: '-0.02em',
                  color: '#ffffff',
                  lineHeight: 1.04, display: 'block',
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', color: 'rgba(255,255,255,0.45)',
            maxWidth: 420, marginBottom: 52, lineHeight: 1.65, letterSpacing: '-0.01em',
          }}
        >
          Follow the journey from Maranello to the podium —
          every lap, every upgrade, every moment of Italian glory.
        </motion.p>

        {/* Solid Ferrari Red button — the ONE filled CTA */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-block',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.88rem', fontWeight: 600,
            letterSpacing: '0.5px',
            background: '#DC0000',
            color: '#ffffff',
            padding: '18px 52px',
            borderRadius: 0,
            textDecoration: 'none',
            border: '1.5px solid #DC0000',
            transition: 'background 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#b80000'
            e.currentTarget.style.boxShadow = '0 8px 40px rgba(220,0,0,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#DC0000'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Follow the Scuderia
        </motion.a>
      </div>
    </section>
  )
}
