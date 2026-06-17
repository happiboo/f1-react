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
      {/* Dark edge vignette only — no white overlay */}
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
