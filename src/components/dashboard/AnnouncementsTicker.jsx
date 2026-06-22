import React from 'react'

export default function AnnouncementsTicker() {
  const updates = [
    'ALERT: Wind-tunnel telemetry calibration completed for SF-24 chassis upgrade B.',
    'INFO: Charles Leclerc completed 48 simulated laps at Circuit de Barcelona-Catalunya (P1 pace).',
    'WARNING: Chassis composite batch #SF24-C92 reporting minor load deflection (Re-scan ordered).',
    'UPDATE: Power unit thermal mapping adjusted. Fuel injection timing modified by +0.2ms.',
    'NOTICE: Trackside server cluster synchronizing database with Maranello HQ.'
  ]

  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        Latest Updates & Notifications
      </div>

      <div style={{
        background: 'rgba(10, 10, 10, 0.9)',
        border: '1px solid rgba(220, 0, 0, 0.3)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        position: 'relative'
      }}>
        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(220, 0, 0, 0.1)',
          padding: '4px 10px',
          borderRight: '1px solid rgba(220, 0, 0, 0.2)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          color: '#DC0000',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          whiteSpace: 'nowrap'
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#DC0000',
            animation: 'pulse 1.5s infinite',
            display: 'inline-block'
          }} />
          Live Feed
        </div>

        {/* CSS for custom styling or animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse {
            0% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.3; transform: scale(0.9); }
          }
        `}} />

        {/* Marquee Element */}
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="5"
          onMouseOver={(e) => e.currentTarget.stop()}
          onMouseOut={(e) => e.currentTarget.start()}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            color: '#ffffff',
            margin: 0,
            cursor: 'none'
          }}
        >
          {updates.join(' \u00A0\u00A0\u00A0\u00A0\u25C6\u00A0\u00A0\u00A0\u00A0 ')}
        </marquee>
      </div>
    </section>
  )
}
