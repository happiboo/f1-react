import React from 'react'

export default function DashHeader({ user }) {
  return (
    <header style={{
      background: 'rgba(13, 13, 13, 0.75)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="24" viewBox="0 0 10 14" fill="none">
          <path d="M5 0L10 3V10L5 14L0 10V3L5 0Z" fill="#DC0000"/>
        </svg>
        <div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#ffffff',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            SCUDERIA HQ
          </h1>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Telemetry & Operations Control HUD
          </span>
        </div>
      </div>

      {/* Student & Admin Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
      }}>
        {/* Student Name & Reg Number */}
        <div style={{ textAlign: 'right', borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: 20 }}>
          <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.6rem', textTransform: 'uppercase' }}>Operator</div>
          <div style={{ color: '#ffffff', fontWeight: 600 }}>Kavin S</div>
          <div style={{ color: '#DC0000', fontSize: '0.7rem' }}>REG2024001</div>
        </div>

        {/* User Role */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#00ff66',
            boxShadow: '0 0 8px #00ff66'
          }} />
          <div>
            <div style={{ color: '#ffffff' }}>{user?.name || 'Administrator'}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.65rem' }}>{user?.role || 'Lead Analyst'}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
