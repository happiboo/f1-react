import React from 'react'

export default function StatsGrid() {
  const stats = [
    { label: 'Total Users', value: '14,809', trend: '+12.4%', detail: 'Platform Registrations' },
    { label: 'Active Users', value: '1,492', trend: '+8.3%', detail: 'Telemetry Engineers Online' },
    { label: 'Revenue', value: '€49.2M', trend: '+18.1%', detail: 'Motorsport Budget Allocation' },
    { label: 'Transactions', value: '102,894', trend: 'Stable', detail: 'Sensor Telemetry/sec' },
    { label: 'Notifications', value: '18', trend: 'High Priority', detail: 'Active Trackside Alerts' },
    { label: 'Pending Tasks', value: '7', trend: 'Next 24h', detail: 'Chassis Checks & Calibrations' },
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
        Operational Stats
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20
      }}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              background: 'rgba(13, 13, 13, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              position: 'relative'
            }}
          >
            {/* Top Border Glow for accents */}
            {i % 3 === 0 && (
              <div style={{
                position: 'absolute',
                top: -1,
                left: 0,
                right: 0,
                height: 2,
                background: '#DC0000',
                boxShadow: '0 2px 10px rgba(220, 0, 0, 0.5)'
              }} />
            )}

            <div>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.4)',
                fontWeight: 500
              }}>
                {stat.label}
              </span>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 600,
                color: '#ffffff',
                marginTop: 6,
                letterSpacing: '-0.01em'
              }}>
                {stat.value}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.03)',
              paddingTop: 12
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>{stat.detail}</span>
              <span style={{
                color: stat.trend.startsWith('+') ? '#00ff66' : stat.trend === 'Stable' ? '#ffffff' : '#DC0000',
                fontWeight: 600
              }}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
