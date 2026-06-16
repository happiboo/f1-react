import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { label: 'Chassis', href: '#chassis' },
  { label: 'Power Unit', href: '#power' },
  { label: 'Specs', href: '#specs' },
]

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 60))

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ position: 'fixed', top: 14, left: 0, right: 0, zIndex: 1000, padding: '0 20px' }}
    >
      <motion.div
        animate={scrolled ? {
          maxWidth: 860, background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 100, padding: '10px 28px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        } : {
          maxWidth: '100%', background: 'transparent',
          border: '1px solid transparent',
          borderRadius: 0, padding: '14px 32px',
          boxShadow: 'none',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: '#DC0000',
            borderRadius: 5, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '0.85rem',
          }}>🐎</div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
          }}>
            SCUDERIA <span style={{ color: '#DC0000' }}>FERRARI</span>
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.66rem', letterSpacing: '1.5px',
              textTransform: 'uppercase', color: '#6b7280',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#0a0a0a'}
              onMouseLeave={e => e.target.style.color = '#6b7280'}
            >{l.label}</a>
          ))}
          <a href="#cta" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            background: '#DC0000', color: '#fff',
            padding: '8px 18px', borderRadius: 100,
          }}>Experience</a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
