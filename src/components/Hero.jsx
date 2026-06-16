import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}
const lineReveal = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero({ ready }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6], [0.18, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#fff',
    }}>
      {/* Skeleton background image */}
      <motion.div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/frame.png')",
        backgroundSize: '68%', backgroundPosition: 'center 58%',
        backgroundRepeat: 'no-repeat',
        y: imgY, opacity: imgOpacity,
        filter: 'grayscale(20%) contrast(1.05)',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Content */}
      <motion.div
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', y: textY, opacity: textOpacity }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          style={{ padding: '0 32px', maxWidth: 1000, margin: '0 auto' }}
        >
          <motion.p variants={item} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.62rem', letterSpacing: '6px',
            textTransform: 'uppercase', color: '#DC0000',
            marginBottom: 28,
          }}>
            Scuderia Ferrari · SF-24 · Costruttori
          </motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 6 }}>
            <motion.h1
              variants={lineReveal}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(4.5rem, 10vw, 9.5rem)',
                fontWeight: 700, lineHeight: 0.9,
                letterSpacing: '-3px', color: '#0a0a0a',
              }}
            >BORN FROM</motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 32 }}>
            <motion.h1
              variants={lineReveal}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(4.5rem, 10vw, 9.5rem)',
                fontWeight: 200, lineHeight: 0.9,
                letterSpacing: '10px', color: 'rgba(10,10,10,0.35)',
              }}
            >CARBON</motion.h1>
          </div>

          <motion.p variants={item} style={{
            fontSize: '1rem', color: '#6b7280', lineHeight: 1.82,
            maxWidth: 500, margin: '0 auto 44px',
          }}>
            What you see is the skeleton — 7.5 kilometres of woven carbon fibre,
            a 43 kg monocoque, and the obsession of ten thousand engineers.
            Every championship begins here.
          </motion.p>

          <motion.div variants={item} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#build" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.78rem', fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase',
              background: '#DC0000', color: '#fff',
              padding: '14px 36px', borderRadius: 4,
              boxShadow: '0 0 28px rgba(220,0,0,0.22)',
              transition: 'box-shadow 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.target.style.boxShadow = '0 0 44px rgba(220,0,0,0.4)'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.boxShadow = '0 0 28px rgba(220,0,0,0.22)'; e.target.style.transform = 'translateY(0)' }}
            >Build the Machine</a>
            <a href="#specs" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.78rem', fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase',
              background: 'transparent', color: '#0a0a0a',
              padding: '14px 36px', borderRadius: 4,
              border: '1px solid rgba(0,0,0,0.15)',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(0,0,0,0.4)'; e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(0,0,0,0.15)'; e.target.style.transform = 'translateY(0)' }}
            >Specifications</a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        variants={item}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem', letterSpacing: '4px',
          textTransform: 'uppercase', color: '#9ca3af',
        }}>Scroll to assemble</p>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
          style={{
            width: 1, height: 42, background: 'linear-gradient(#DC0000, transparent)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    </section>
  )
}
