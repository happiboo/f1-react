import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let p = 0
    const t = setInterval(() => {
      p += Math.random() * 9
      if (p >= 100) { p = 100; clearInterval(t) }
      setProgress(Math.min(p, 100))
    }, 90)

    const finish = setTimeout(() => {
      setProgress(100)
      setTimeout(() => { setDone(true); onDone?.() }, 600)
    }, 1800)

    return () => { clearInterval(t); clearTimeout(finish) }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#ffffff',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 24,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              border: '1.5px solid rgba(0,0,0,0.08)',
              borderTopColor: '#001489',
            }}
          />
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.88rem', fontWeight: 700,
            letterSpacing: '6px', textTransform: 'uppercase', color: '#000000',
          }}>
            SF · 24
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
          }}>
            Assembling the machine
          </p>
          <div style={{ width: 160, height: 1, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
              style={{ height: '100%', background: '#001489' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
