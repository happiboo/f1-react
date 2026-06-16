import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '108%' },
  show: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function CompSection({ id, tag, title, body, stats, img, imgSide = 'left', accent }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const imgBlock = (
    <motion.div
      variants={fadeUp}
      style={{ flex: 1, padding: '60px 48px', display: 'flex', alignItems: 'center' }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      <motion.img
        src={img}
        alt={title}
        style={{
          width: '100%', maxWidth: 580,
          borderRadius: 8,
          filter: accent ? `drop-shadow(0 24px 56px rgba(220,0,0,0.16))` : `drop-shadow(0 24px 56px rgba(0,0,0,0.14))`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ rotateY: imgSide === 'left' ? 4 : -4, rotateX: -2 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </motion.div>
  )

  const textBlock = (
    <motion.div
      variants={stagger}
      style={{ flex: 1, padding: '60px 80px' }}
    >
      <motion.p variants={fadeUp} style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.58rem', letterSpacing: '5px', textTransform: 'uppercase',
        color: '#DC0000', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 26, height: 1, background: '#DC0000', display: 'inline-block' }} />
        {tag}
      </motion.p>

      <div style={{ marginBottom: 22 }}>
        {title.split('\n').map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2 variants={lineReveal} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.4rem, 4vw, 4.2rem)',
              fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.04,
              color: '#0a0a0a',
            }}>{line}</motion.h2>
          </div>
        ))}
      </div>

      <motion.p variants={fadeUp} style={{
        fontSize: '0.97rem', color: '#6b7280',
        lineHeight: 1.85, maxWidth: 450, marginBottom: 40,
      }}>{body}</motion.p>

      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} style={{
            borderLeft: '2px solid rgba(220,0,0,0.25)', paddingLeft: 14,
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.75rem', fontWeight: 700, display: 'block', lineHeight: 1.1, color: '#0a0a0a',
            }}>{s.val}</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.58rem', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#9ca3af', marginTop: 4, display: 'block',
            }}>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        flexDirection: imgSide === 'left' ? 'row' : 'row-reverse',
        position: 'relative', overflow: 'hidden',
        padding: '80px 0',
        background: '#fff',
      }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        [imgSide === 'left' ? 'right' : 'left']: '-15%',
        top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,0,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {imgSide === 'left' ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
    </motion.section>
  )
}
