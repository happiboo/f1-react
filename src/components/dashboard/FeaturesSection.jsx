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
        color: 'rgba(255, 255, 255, 0.3)',
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
        {features.map((group) => (
          <div
            key={group.title}
            style={{
              background: 'rgba(13, 13, 13, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: 24,
            }}
          >
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.1rem',
              color: '#ffffff',
              fontWeight: 500,
              marginBottom: 16,
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              paddingBottom: 10
            }}>
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
                    color: 'rgba(255, 255, 255, 0.6)',
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
