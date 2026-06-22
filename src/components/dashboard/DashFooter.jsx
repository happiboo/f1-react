import React from 'react'

export default function DashFooter() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 60,
      background: 'var(--bg-overlay, rgba(10, 10, 10, 0.5))'
    }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '2px',
        color: 'var(--text-primary, #ffffff)',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <svg width="8" height="11" viewBox="0 0 10 14" fill="none">
          <path d="M5 0L10 3V10L5 14L0 10V3L5 0Z" fill="#DC0000" />
        </svg>
        SCUDERIA HQ
      </div>

      {/* Social Icons */}
      <div style={{ display: 'flex', gap: 16 }}>
        {[
          { name: 'X', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
          { name: 'GitHub', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
          { name: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' }
        ].map(social => (
          <a
            key={social.name}
            href="#"
            style={{
              color: 'var(--text-muted, rgba(255, 255, 255, 0.4))',
              transition: 'color 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#DC0000'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted, rgba(255, 255, 255, 0.4))'}
            aria-label={social.name}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'var(--text-muted, rgba(255, 255, 255, 0.3))',
        letterSpacing: '1px',
        textAlign: 'right'
      }}>
        <div>© 2026 Scuderia HQ. All rights reserved.</div>
        <div style={{ marginTop: 2, color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))' }}>
          Designed by <span style={{ color: '#DC0000', fontWeight: 600 }}>Kavin A</span> (REG:2303717620521025)
        </div>
      </div>
    </footer>
  )
}
