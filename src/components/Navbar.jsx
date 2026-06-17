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

  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 80))

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <motion.div
        animate={scrolled ? {
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        } : {
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: '1px solid transparent',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 40px',
        }}
      >
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: scrolled ? '#000000' : '#ffffff',
            transition: 'color 0.35s',
          }}>
            SCUDERIA FERRARI
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem', letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: scrolled ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = scrolled ? '#000000' : '#ffffff'}
              onMouseLeave={e => e.target.style.color = scrolled ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)'}
            >{l.label}</a>
          ))}
          <a href="#cta" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.72rem', fontWeight: 500,
            letterSpacing: '0.5px',
            border: scrolled ? '1.5px solid #001489' : '1.5px solid rgba(255,255,255,0.6)',
            color: scrolled ? '#001489' : '#ffffff',
            padding: '8px 20px',
            borderRadius: 0,
            transition: 'border-color 0.35s, color 0.35s',
          }}>Experience</a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
