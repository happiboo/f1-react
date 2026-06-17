import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Heroicons outline SVG paths (24×24 viewBox)
const ICONS = {
  bolt: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  cube: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
  wind: 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3',
  stop: 'M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z',
  signal: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z',
  sliders: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
}

function Icon({ name }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#DC0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[name]} />
    </svg>
  )
}

const FEATS = [
  { icon: 'bolt', title: 'Hybrid Power Unit', body: 'The Ferrari 066/12 fuses turbocharged V6 with two MGUs, recovering and deploying energy continuously — mechanical brutality meets electrical intelligence.' },
  { icon: 'cube', title: 'Aerospace Carbon Fibre', body: 'Every structural element — monocoque, wings, floor — machined from autoclave-cured carbon fibre to sub-millimetre precision at Maranello.' },
  { icon: 'wind', title: 'Ground Effect Aero', body: 'Venturi tunnels beneath the floor create enormous downforce with minimal drag — fast, efficient, and devastating through high-speed corners.' },
  { icon: 'stop', title: 'Carbon Ceramic Brakes', body: 'Brembo discs enduring 1,000°C. From 300 km/h to standstill in 2.5 seconds — over 5G of deceleration below 800 kg.' },
  { icon: 'signal', title: 'Real-Time Telemetry', body: '300+ sensors, 150 km of wiring, 1,500 live data channels streamed to Maranello every lap — the engineers race as hard as the driver.' },
  { icon: 'sliders', title: 'Adaptive Suspension', body: 'Hydraulic pull-rod front, pushrod rear — fine-tuned for every circuit, every corner, responding faster than any human can perceive.' },
]

function Card({ feat, i, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: 32,
        boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(220,0,0,0.25)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        background: 'rgba(220,0,0,0.12)', border: '1px solid rgba(220,0,0,0.20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18,
      }}>
        <Icon name={feat.icon} />
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1rem', fontWeight: 600, marginBottom: 10, color: '#ffffff',
      }}>{feat.title}</h3>
      <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.50)', lineHeight: 1.65 }}>{feat.body}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="features" ref={ref} style={{ padding: '80px 32px 140px', background: '#080808' }}>
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
          fontWeight: 700, letterSpacing: '-1px', color: '#ffffff',
        }}>Engineered to the Limit</h2>
        <p style={{
          fontSize: '0.97rem', color: 'rgba(255,255,255,0.45)',
          marginTop: 14, maxWidth: 440, margin: '14px auto 0',
        }}>
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
