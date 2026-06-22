import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeBlurUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '108%' },
  show:   { y: '0%',  transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
}
const imgReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  show:   { clipPath: 'inset(0 0% 0 0)',   opacity: 1, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } },
}
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function CompSection({ id, tag, title, body, stats, img, imgSide = 'left', accent }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  // accent = near-black bg for dramatic sections
  const bg           = accent ? '#0a0a0a' : '#ffffff'
  const textColor    = accent ? '#ffffff' : '#000000'
  const subtextColor = accent ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const tagColor     = accent ? '#DC0000' : '#DC0000'
  const tagLineColor = accent ? 'rgba(220,0,0,0.4)' : 'rgba(220,0,0,0.3)'
  const statBorderColor = accent ? 'rgba(220,0,0,0.35)' : 'rgba(220,0,0,0.2)'
  const statLabelColor  = accent ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'

  const imgBlock = (
    <motion.div
      variants={imgReveal}
      style={{ flex: '1 1 40%', padding: 'clamp(32px, 5vw, 60px) clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img
        src={img}
        alt={title}
        style={{
          width: '100%', maxWidth: 560,
          filter: accent
            ? 'drop-shadow(0 32px 80px rgba(220,0,0,0.15)) drop-shadow(0 0 120px rgba(0,0,0,0.9))'
            : 'drop-shadow(0 32px 64px rgba(0,0,0,0.18))',
        }}
      />
    </motion.div>
  )

  const textBlock = (
    <motion.div
      variants={stagger}
      style={{ flex: '1 1 50%', padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)' }}
    >
      <motion.p variants={fadeBlurUp} style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
        color: tagColor, marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 24, height: 1.5, background: tagLineColor, display: 'inline-block' }} />
        {tag}
      </motion.p>

      <div style={{ marginBottom: 24 }}>
        {title.split('\n').map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2 variants={lineReveal} style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.04,
              color: textColor,
            }}>{line}</motion.h2>
          </div>
        ))}
      </div>

      <motion.p variants={fadeBlurUp} style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '18px', color: subtextColor,
        lineHeight: 1.72, maxWidth: 440, marginBottom: 44,
        letterSpacing: '-0.01em',
      }}>{body}</motion.p>

      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeBlurUp} style={{
            borderLeft: `2px solid ${statBorderColor}`,
            paddingLeft: 16,
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.8rem', fontWeight: 700, display: 'block',
              lineHeight: 1.1, letterSpacing: '-0.02em', color: textColor,
            }}>{s.val}</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.55rem', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: statLabelColor, marginTop: 5, display: 'block',
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
        padding: '60px 0',
        background: bg,
      }}
      className="comp-section"
    >
      {/* Accent section: subtle Ferrari red ambient light */}
      {accent && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(220,0,0,0.06) 0%, transparent 70%)',
        }} />
      )}
      {imgSide === 'left' ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
    </motion.section>
  )
}
