import { useRef, useState, useEffect } from 'react'
import { useInView, motion } from 'framer-motion'

const SPECS = [
  { target: 1000,  sfx: '+', label: 'Combined Horsepower' },
  { target: 18000, sfx: '',  label: 'Maximum RPM'        },
  { target: 350,   sfx: '+', label: 'km/h Top Speed'     },
  { target: 798,   sfx: '',  label: 'kg Minimum Weight'  },
]

function CountUp({ target, sfx, started }) {
  const [val, setVal] = useState(0)
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    if (!started) return
    setCounting(true)
    const dur = 2200
    const t0 = performance.now()
    function tick(now) {
      const p    = Math.min((now - t0) / dur, 1)
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      const cur  = Math.floor(ease * target)
      setVal(cur)
      if (p < 1) requestAnimationFrame(tick)
      else { setVal(target); setCounting(false) }
    }
    requestAnimationFrame(tick)
  }, [started, target])

  return (
    <motion.span
      animate={counting ? { color: '#DC0000' } : { color: '#ffffff' }}
      transition={{ duration: 0.25 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 700,
        display: 'block', lineHeight: 1, letterSpacing: '-0.03em',
      }}
    >
      {val >= 1000 ? val.toLocaleString() : val}{sfx}
    </motion.span>
  )
}

export default function Specs() {
  const ref   = useRef()
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <section id="specs" ref={ref} style={{
      padding: '120px 40px',
      background: '#0a0a0a',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient red glow */}
      <div style={{
        position: 'absolute', width: 700, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,0,0,0.07) 0%, transparent 70%)',
        left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Top + bottom rules */}
      <div style={{ position: 'absolute', top: 0, left: 40, right: 40, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 40, right: 40, height: 1, background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 80 }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '4px',
            textTransform: 'uppercase', color: '#DC0000',
            marginBottom: 16,
          }}>
            By the Numbers
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff',
          }}>Technical Specifications</h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 0, maxWidth: 1040,
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          {SPECS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '52px 0 52px',
                paddingRight: i < 3 ? 40 : 0,
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                paddingLeft: i > 0 ? 40 : 0,
              }}
            >
              <CountUp target={s.target} sfx={s.sfx} started={inView} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.56rem', letterSpacing: '2px',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                marginTop: 14, display: 'block',
              }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
