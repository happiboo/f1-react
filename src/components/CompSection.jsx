import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '108%' },
  show: { y: '0%', transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

export default function CompSection({ id, tag, title, body, stats, img, imgSide = 'left', accent }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  // accent = Stratosphere bg, else Cloud bg
  const bg = accent ? '#716e85' : '#ffffff'
  const textColor = accent ? '#ffffff' : '#000000'
  const subtextColor = accent ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'
  const tagColor = accent ? 'rgba(255,255,255,0.55)' : '#001489'
  const tagLineColor = accent ? 'rgba(255,255,255,0.3)' : 'rgba(0,20,137,0.3)'
  const statBorderColor = accent ? 'rgba(255,255,255,0.25)' : 'rgba(0,20,137,0.2)'
  const statLabelColor = accent ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'

  const imgBlock = (
    <motion.div
      variants={fadeUp}
      style={{ flex: 1, padding: '60px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img
        src={img}
        alt={title}
        style={{
          width: '100%', maxWidth: 560,
          filter: accent
            ? 'drop-shadow(0 32px 64px rgba(0,0,0,0.3))'
            : 'drop-shadow(0 32px 64px rgba(0,0,0,0.18))',
        }}
      />
    </motion.div>
  )

  const textBlock = (
    <motion.div
      variants={stagger}
      style={{ flex: 1, padding: '80px 80px' }}
    >
      <motion.p variants={fadeUp} style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
        color: tagColor, marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ width: 24, height: 1, background: tagLineColor, display: 'inline-block' }} />
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

      <motion.p variants={fadeUp} style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '18px', color: subtextColor,
        lineHeight: 1.72, maxWidth: 440, marginBottom: 44,
        letterSpacing: '-0.01em',
      }}>{body}</motion.p>

      <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} style={{
            borderLeft: `1.5px solid ${statBorderColor}`, paddingLeft: 16,
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
        padding: '80px 0',
        background: bg,
      }}
    >
      {imgSide === 'left' ? <>{imgBlock}{textBlock}</> : <>{textBlock}{imgBlock}</>}
    </motion.section>
  )
}
