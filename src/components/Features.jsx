import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATS = [
  { icon: '⚡', title: 'Hybrid Power Unit', body: 'The Ferrari 066/12 fuses turbocharged V6 with two MGUs, recovering and deploying energy continuously — mechanical brutality meets electrical intelligence.' },
  { icon: '🔬', title: 'Aerospace Carbon Fibre', body: 'Every structural element — monocoque, wings, floor — machined from autoclave-cured carbon fibre to sub-millimetre precision at Maranello.' },
  { icon: '💨', title: 'Ground Effect Aero', body: 'Venturi tunnels beneath the floor create enormous downforce with minimal drag — fast, efficient, and devastating through high-speed corners.' },
  { icon: '🔴', title: 'Carbon Ceramic Brakes', body: 'Brembo discs enduring 1,000°C. From 300 km/h to standstill in 2.5 seconds — over 5G of deceleration below 800 kg.' },
  { icon: '📡', title: 'Real-Time Telemetry', body: '300+ sensors, 150 km of wiring, 1,500 live data channels streamed to Maranello every lap — the engineers race as hard as the driver.' },
  { icon: '🏎', title: 'Adaptive Suspension', body: 'Hydraulic pull-rod front, pushrod rear — fine-tuned for every circuit, every corner, responding faster than any human can perceive.' },
]

function Card({ feat, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      data-hover
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 10,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(220,0,0,0.18)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)'
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        background: 'rgba(220,0,0,0.07)', border: '1px solid rgba(220,0,0,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.25rem', marginBottom: 18,
      }}>{feat.icon}</div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1rem', fontWeight: 600, marginBottom: 10, color: '#0a0a0a',
      }}>{feat.title}</h3>
      <p style={{ fontSize: '0.86rem', color: '#6b7280', lineHeight: 1.65 }}>{feat.body}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="features" ref={ref} style={{ padding: '80px 32px 140px', background: '#fafafa' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#DC0000', marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        }}>
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
          What Makes It Extraordinary
          <span style={{ width: 32, height: 1, background: 'rgba(220,0,0,0.4)', display: 'inline-block' }} />
        </p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem,4vw,3.5rem)',
          fontWeight: 700, letterSpacing: '-1px', color: '#0a0a0a',
        }}>Engineered to the Limit</h2>
        <p style={{ fontSize: '0.97rem', color: '#9ca3af', marginTop: 14, maxWidth: 440, margin: '14px auto 0' }}>
          Six systems. One singular purpose. The fastest corner of physics.
        </p>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: 16, maxWidth: 1100, margin: '0 auto',
      }}>
        {FEATS.map((f, i) => <Card key={i} feat={f} i={i} inView={inView} />)}
      </div>
    </section>
  )
}
