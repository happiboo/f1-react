import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const lineReveal = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
}
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

export default function Hero({ ready }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.55], [0.22, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #716e85 0%, #a9a6b8 40%, #d6d4de 65%, #ffffff 100%)',
    }}>
      {/* F1 car silhouette — atmospheric center element */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/frame.png')",
        backgroundSize: '60%',
        backgroundPosition: 'center 52%',
        backgroundRepeat: 'no-repeat',
        filter: 'grayscale(30%) contrast(1.1)',
        y: imgY, opacity: imgOpacity,
      }} />

      {/* Eyebrow — top-left label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'absolute', top: 32, left: 40,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', letterSpacing: '4px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
          zIndex: 3,
        }}
      >
        Scuderia Ferrari · SF-24 · Maranello
      </motion.p>

      {/* Main content — bottom-left anchored per Heart Aerospace layout grammar */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 56, left: 40,
          zIndex: 2,
          y: contentY, opacity: contentOpacity,
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          {/* Monumental display headline */}
          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <motion.h1
              variants={lineReveal}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(72px, 11vw, 156px)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >SF-24</motion.h1>
          </div>

          {/* Sub-headline */}
          <div style={{ overflow: 'hidden', marginBottom: 28 }}>
            <motion.p
              variants={lineReveal}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(22px, 3.2vw, 46px)',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.82)',
              }}
            >Born from Carbon.</motion.p>
          </div>

          {/* Body copy */}
          <motion.p
            variants={fadeIn}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 420,
              marginBottom: 32,
            }}
          >
            7.5 kilometres of woven carbon fibre. A 43 kg monocoque machined to 0.1 mm.
            The obsession of ten thousand engineers, engineered into one machine.
          </motion.p>

          {/* Ghost outlined links */}
          <motion.div variants={fadeIn} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#build"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem', fontWeight: 500,
                letterSpacing: '0.5px',
                border: '1.5px solid rgba(255,255,255,0.7)',
                color: '#ffffff',
                padding: '13px 28px',
                borderRadius: 0,
                transition: 'border-color 0.25s, background 0.25s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ffffff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'
                e.currentTarget.style.background = 'transparent'
              }}
            >Explore the Machine</a>
            <a
              href="#specs"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem', fontWeight: 500,
                letterSpacing: '0.5px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.75)',
                padding: '13px 28px',
                borderRadius: 0,
                transition: 'border-color 0.25s, color 0.25s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                e.currentTarget.style.color = '#ffffff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
              }}
            >Specifications</a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — bottom center */}
      <motion.div
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        variants={fadeIn}
        style={{
          position: 'absolute', bottom: 32, right: 40,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 3,
        }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.55rem', letterSpacing: '3px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        }}>Scroll to assemble</p>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
          style={{
            width: 1, height: 48,
            background: 'linear-gradient(#ffffff, transparent)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    </section>
  )
}
