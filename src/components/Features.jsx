import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATS = [
  { title: 'Hybrid Power Unit',     body: 'The Ferrari 066/12 fuses turbocharged V6 with two MGUs, recovering and deploying energy continuously — mechanical brutality meets electrical intelligence.' },
  { title: 'Aerospace Carbon Fibre', body: 'Every structural element — monocoque, wings, floor — machined from autoclave-cured carbon fibre to sub-millimetre precision at Maranello.' },
  { title: 'Ground Effect Aero',     body: 'Venturi tunnels beneath the floor create enormous downforce with minimal drag — fast, efficient, and devastating through high-speed corners.' },
  { title: 'Carbon Ceramic Brakes',  body: 'Brembo discs enduring 1,000°C. From 300 km/h to standstill in 2.5 seconds — over 5G of deceleration below 800 kg.' },
  { title: 'Real-Time Telemetry',    body: '300+ sensors, 150 km of wiring, 1,500 live data channels streamed to Maranello every lap — the engineers race as hard as the driver.' },
  { title: 'Adaptive Suspension',    body: 'Hydraulic pull-rod front, pushrod rear — fine-tuned for every circuit, every corner, responding faster than any human can perceive.' },
]

function Card({ feat, i, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `2px solid ${hovered ? '#DC0000' : 'rgba(220,0,0,0.4)'}`,
        paddingTop: 24,
        paddingBottom: 28,
        paddingLeft: hovered ? 16 : 0,
        paddingRight: hovered ? 16 : 0,
        background: hovered ? '#0d0d0d' : 'transparent',
        transition: 'background 0.3s ease, border-color 0.25s ease, padding 0.3s ease',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* Arrow — slides in on hover */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute', top: 28, right: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem', color: '#DC0000',
          letterSpacing: 0,
        }}
      >
        →
      </motion.span>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1rem', fontWeight: 600,
        letterSpacing: '-0.01em',
        marginBottom: 12,
        color: hovered ? '#ffffff' : '#000000',
        transition: 'color 0.3s ease',
      }}>{feat.title}</h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.88rem',
        color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        lineHeight: 1.68, letterSpacing: '-0.01em',
        transition: 'color 0.3s ease',
      }}>{feat.body}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref    = useRef()
  const inView  = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="features" ref={ref} style={{ padding: '100px 40px 120px', background: '#ffffff' }}>
      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.65 }}
        style={{ marginBottom: 64 }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
          color: '#DC0000', marginBottom: 16,
        }}>
          What Makes It Extraordinary
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.02em', color: '#000000',
        }}>Engineered to the Limit</h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '18px', color: 'rgba(0,0,0,0.4)',
          marginTop: 14, maxWidth: 400, lineHeight: 1.55, letterSpacing: '-0.01em',
        }}>
          Six systems. One singular purpose. The fastest corner of physics.
        </p>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '48px 40px', maxWidth: 1100,
      }}>
        {FEATS.map((f, i) => <Card key={i} feat={f} i={i} inView={inView} />)}
      </div>
    </section>
  )
}
