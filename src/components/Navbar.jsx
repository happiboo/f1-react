import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Chassis',    href: '#chassis' },
  { label: 'Power Unit', href: '#power'   },
  { label: 'Specs',      href: '#specs'   },
]

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 80))

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <motion.div
        animate={scrolled ? {
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        } : {
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: '1px solid transparent',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px clamp(20px, 4vw, 40px)',
          gap: 16,
        }}
      >
        {/* Logo wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Ferrari red shield mark */}
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" style={{ flexShrink: 0 }}>
            <path d="M5 0L10 3V10L5 14L0 10V3L5 0Z" fill="#DC0000"/>
          </svg>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(0.58rem, 1.2vw, 0.76rem)',
            fontWeight: 700,
            letterSpacing: 'clamp(1px, 0.4vw, 3px)',
            textTransform: 'uppercase',
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}>
            SCUDERIA FERRARI
          </span>
        </a>

        {/* Nav links + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2.5vw, 36px)', flexShrink: 0 }}>
          {/* Nav links — hidden below 640px */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 28px)' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(0.52rem, 0.8vw, 0.62rem)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA — ghost button, Ferrari red border */}
          <Link
            to="/dashboard"
            className="nav-cta"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem', fontWeight: 500,
              letterSpacing: '0.5px',
              border: '1.5px solid #DC0000',
              color: '#DC0000',
              padding: '8px 20px',
              borderRadius: 0,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#DC0000'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#DC0000'
            }}
          >
            Dashboard HQ
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  )
}
