import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATS = [
  { title: 'Hybrid Power Unit', body: 'The Ferrari 066/12 fuses turbocharged V6 with two MGUs, recovering and deploying energy continuously — mechanical brutality meets electrical intelligence.' },
  { title: 'Aerospace Carbon Fibre', body: 'Every structural element — monocoque, wings, floor — machined from autoclave-cured carbon fibre to sub-millimetre precision at Maranello.' },
  { title: 'Ground Effect Aero', body: 'Venturi tunnels beneath the floor create enormous downforce with minimal drag — fast, efficient, and devastating through high-speed corners.' },
  { title: 'Carbon Ceramic Brakes', body: 'Brembo discs enduring 1,000°C. From 300 km/h to standstill in 2.5 seconds — over 5G of deceleration below 800 kg.' },
  { title: 'Real-Time Telemetry', body: '300+ sensors, 150 km of wiring, 1,500 live data channels streamed to Maranello every lap — the engineers race as hard as the driver.' },
  { title: 'Adaptive Suspension', body: 'Hydraulic pull-rod front, pushrod rear — fine-tuned for every circuit, every corner, responding faster than any human can perceive.' },
]

function Card({ feat, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: '1.5px solid #001489',
        paddingTop: 24,
        cursor: 'default',
      }}
    >
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1rem', fontWeight: 600,
        letterSpacing: '-0.01em',
        marginBottom: 12, color: '#000000',
      }}>{feat.title}</h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.88rem', color: 'rgba(0,0,0,0.5)',
        lineHeight: 1.68, letterSpacing: '-0.01em',
      }}>{feat.body}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="features" ref={ref} style={{ padding: '100px 40px 120px', background: '#ffffff' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 64 }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
          color: '#001489', marginBottom: 16,
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
          fontSize: '18px', color: 'rgba(0,0,0,0.45)',
          marginTop: 14, maxWidth: 400, lineHeight: 1.5, letterSpacing: '-0.01em',
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
