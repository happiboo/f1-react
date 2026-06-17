import { useRef, useState, useEffect } from 'react'
import { useInView, motion } from 'framer-motion'

const SPECS = [
  { target: 1000, sfx: '+', label: 'Combined Horsepower' },
  { target: 18000, sfx: '', label: 'Maximum RPM' },
  { target: 350, sfx: '+', label: 'km/h Top Speed' },
  { target: 798, sfx: '', label: 'kg Minimum Weight' },
]

function CountUp({ target, sfx, started }) {
  const [val, setVal] = useState(0)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (!started) return
    setCounting(true)
    const dur = 2000
    const t0 = performance.now()
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      const cur = Math.floor(eased * target)
      setVal(cur)
      if (p < 1) requestAnimationFrame(tick)
      else { setVal(target); setCounting(false) }
    }
    requestAnimationFrame(tick)
  }, [started, target])

  return (
    <motion.span
      animate={counting ? { color: '#DC0000', textShadow: '0 0 28px rgba(220,0,0,0.3)' } : { color: '#ffffff', textShadow: 'none' }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2.8rem,5vw,4rem)', fontWeight: 700, display: 'block', lineHeight: 1,
      }}
    >
      {val >= 1000 ? val.toLocaleString() : val}{sfx}
    </motion.span>
  )
}

export default function Specs() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <section id="specs" ref={ref} style={{
      padding: '140px 32px',
      background: '#080808',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 80 }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', letterSpacing: '5px',
          textTransform: 'uppercase', color: '#DC0000',
          marginBottom: 14, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 14,
        }}>
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
          By the Numbers
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem,4vw,3.5rem)',
          fontWeight: 700, letterSpacing: '-1px', color: '#ffffff',
        }}>Technical Specifications</h2>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 40, maxWidth: 1000, margin: '0 auto',
      }}>
        {SPECS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center', position: 'relative',
              paddingRight: i < 3 ? 40 : 0,
            }}
          >
            {i < 3 && (
              <div style={{
                position: 'absolute', right: 0, top: '15%', bottom: '15%',
                width: 1, background: 'rgba(255,255,255,0.07)',
              }} />
            )}
            <CountUp target={s.target} sfx={s.sfx} started={inView} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)',
              marginTop: 14, display: 'block',
            }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
