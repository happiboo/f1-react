import React from 'react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'Aerodynamics Simulation',
      items: [
        'Real-time Computational Fluid Dynamics (CFD) model processing',
        'Wind-tunnel drag-coefficient data injection',
        'Active Aero DRS flap position and yaw-angle correction simulator'
      ]
    },
    {
      title: '066/12 Power Unit Telemetry',
      items: [
        'MGU-K and MGU-H state of charge and thermal logs tracking',
        'Turbocharger RPM limiter and compression mapping configuration',
        'Combustion chamber chamber pressure diagnostics'
      ]
    },
    {
      title: 'Chassis & Suspension Tuning',
      items: [
        'Pre-preg carbon fibre monocoque load-cell monitoring',
        'Push-rod suspension height and damper curve overlays',
        'Real-time tire degradation and carcass temperature readings'
      ]
    }
  ]

  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'var(--text-muted, rgba(255, 255, 255, 0.3))',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        System Features
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20
      }}>
        {features.map((group, idx) => (
          <div
            key={group.title}
            className="anim-zoom-in card-hover"
            style={{
              animationDelay: `${idx * 0.15}s`,
              background: 'var(--bg-card, rgba(13, 13, 13, 0.8))',
              border: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
              padding: 24,
            }}
          >
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.1rem',
              color: 'var(--text-primary, #ffffff)',
              fontWeight: 500,
              marginBottom: 16,
              borderBottom: '1px solid var(--border-light, rgba(255, 255, 255, 0.04))',
              paddingBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <svg className="anim-rotate" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              {group.title}
            </h3>

            <ul style={{
              margin: 0,
              padding: 0,
              listStyleType: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              {group.items.map((item, index) => (
                <li
                  key={index}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary, rgba(255, 255, 255, 0.6))',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12
                  }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#DC0000',
                    marginTop: 6,
                    flexShrink: 0
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
