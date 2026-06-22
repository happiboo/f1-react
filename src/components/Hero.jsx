import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Per-word reveal for main headline
const wordReveal = {
  hidden: { y: '108%', opacity: 0 },
  show:   { y: '0%',   opacity: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
}
const fadeBlurIn = {
  hidden: { opacity: 0, filter: 'blur(6px)', y: 10 },
  show:   { opacity: 1, filter: 'blur(0px)', y: 0,  transition: { duration: 0.85, ease: 'easeOut' } },
}
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

const HEADLINE_WORDS = ['SF', '—', '24']

export default function Hero({ ready }) {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY   = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const contentOp  = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(175deg, #0a0a0a 0%, #1a1520 30%, #716e85 70%, #a9a6b8 90%, #d6d4de 100%)',
      }}
    >
      {/* Grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />

      {/* Ferrari Red speed-line accent — right edge */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: 3, background: '#DC0000',
        zIndex: 4,
        boxShadow: '-8px 0 40px rgba(220,0,0,0.25)',
      }} />

      {/* F1 Car — pushed to right so text area stays dark and readable */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/frame.png')",
          backgroundSize: '54%',
          backgroundPosition: '78% 50%',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'luminosity',
          opacity: 0.85,
          y: imgY,
          scale: imgScale,
          zIndex: 2,
        }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={ready ? { opacity: 0.85, scale: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />

      {/* Left-side text-protection gradient — keeps headline zone always dark */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.3) 60%, transparent 80%)',
        zIndex: 3, pointerEvents: 'none',
      }} />

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)',
        zIndex: 3, pointerEvents: 'none',
      }} />

      {/* Eyebrow — below navbar so it never overlaps */}
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          position: 'absolute',
          top: 'clamp(72px, 8vw, 90px)',
          left: 'clamp(20px, 4vw, 40px)',
          color: 'rgba(255,255,255,0.4)',
          zIndex: 5,
        }}
      >
        Scuderia Ferrari · SF-24 · Maranello
      </motion.p>

      {/* Main content — bottom-left anchored */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 'clamp(32px, 5vw, 56px)',
          left: 'clamp(20px, 4vw, 40px)',
          right: 'clamp(20px, 4vw, 60px)',
          zIndex: 5,
          y: contentY, opacity: contentOp,
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
        >
          {/* Monumental per-word headline — contracts properly on small screens */}
          <div style={{
            display: 'flex',
            gap: '0.15em',
            marginBottom: 8,
            alignItems: 'baseline',
            flexWrap: 'wrap',
          }}>
            {HEADLINE_WORDS.map((word, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span
                  variants={wordReveal}
                  style={{
                    display: 'block',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(42px, 10vw, 148px)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: word === '\u2014' ? '#DC0000' : '#ffffff',
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Sub-headline */}
          <div style={{ overflow: 'hidden', marginBottom: 'clamp(16px, 2.5vw, 28px)' }}>
            <motion.p
              variants={wordReveal}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(14px, 2.2vw, 32px)',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Born from Carbon. Built for Victory.
            </motion.p>
          </div>

          {/* Body copy — blur-in */}
          <motion.p
            variants={fadeBlurIn}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(13px, 1.1vw, 17px)',
              lineHeight: 1.65,
              letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.48)',
              maxWidth: 'min(400px, 100%)',
              marginBottom: 'clamp(20px, 3vw, 36px)',
            }}
          >
            7.5 kilometres of woven carbon fibre. A 43 kg monocoque machined to 0.1 mm.
            The obsession of ten thousand engineers, distilled into one machine.
          </motion.p>

          {/* Ghost links */}
          <motion.div variants={fadeBlurIn} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#build"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.5px',
                border: '1.5px solid #DC0000',
                color: '#ffffff',
                background: 'rgba(220,0,0,0.12)',
                padding: '13px 28px',
                borderRadius: 0,
                transition: 'background 0.25s, border-color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,0,0,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,0,0,0.12)' }}
            >
              Explore the Machine
            </a>
            <a
              href="#specs"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.5px',
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.65)',
                padding: '13px 28px',
                borderRadius: 0,
                transition: 'border-color 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            >
              Specifications
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — bottom right */}
      <motion.div
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        variants={fadeBlurIn}
        style={{
          position: 'absolute', bottom: 32, right: 52,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 5,
        }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.5rem', letterSpacing: '3px',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        }}>Scroll to assemble</p>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
          style={{
            width: 1, height: 48,
            background: 'linear-gradient(#DC0000, transparent)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>
    </section>
  )
}
