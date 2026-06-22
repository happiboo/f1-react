import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHARS = ['S', 'F', '—', '2', '4']

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    let p = 0
    const t = setInterval(() => {
      p += Math.random() * 7 + 2
      if (p >= 100) { p = 100; clearInterval(t) }
      setProgress(Math.min(p, 100))
    }, 70)

    const finish = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setExit(true)
        setTimeout(() => { setDone(true); onDone?.() }, 750)
      }, 400)
    }, 1700)

    return () => { clearInterval(t); clearTimeout(finish) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#000000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          animate={exit ? { clipPath: 'inset(100% 0 0 0)' } : { clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Scan lines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
            zIndex: 0,
          }} />

          {/* Ferrari red ambient glow */}
          <div style={{
            position: 'absolute',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,0,0,0.08) 0%, transparent 70%)',
            left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            {/* Animated wordmark — per-char reveal */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 40, overflow: 'hidden' }}>
              {CHARS.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    display: 'block',
                    lineHeight: 1,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.58rem', letterSpacing: '4px',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                marginBottom: 36,
              }}
            >
              Scuderia Ferrari · Initialising
            </motion.p>

            {/* Rev counter bar */}
            <div style={{ width: 240, height: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', margin: '0 auto 12px' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
                style={{ height: '100%', background: '#DC0000', transformOrigin: '0 0' }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              animate={{ opacity: progress < 100 ? 1 : 0 }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.52rem', letterSpacing: '2px',
                color: 'rgba(220,0,0,0.7)',
              }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
