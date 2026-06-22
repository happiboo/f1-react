import React from 'react'

export default function DashFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 60,
      background: 'rgba(10, 10, 10, 0.5)'
    }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '2px',
        color: '#ffffff',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <svg width="8" height="11" viewBox="0 0 10 14" fill="none">
          <path d="M5 0L10 3V10L5 14L0 10V3L5 0Z" fill="#DC0000"/>
        </svg>
        SCUDERIA HQ
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '1px',
        textAlign: 'right'
      }}>
        <div>© 2026 Scuderia HQ. All rights reserved.</div>
        <div style={{ marginTop: 2, color: 'rgba(255, 255, 255, 0.5)' }}>
          Designed by <span style={{ color: '#DC0000', fontWeight: 600 }}>Kavin S</span> (REG2024001)
        </div>
      </div>
    </footer>
  )
}
