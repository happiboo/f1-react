import React from 'react'

export default function ServicesSection() {
  const services = [
    {
      title: 'Continuous Dyno Diagnostics',
      desc: 'Automated motor performance curves, back-pressure simulation, and mechanical loss analysis directly from the dyno cell in Maranello.'
    },
    {
      title: 'Aerodynamic Drag Profile Calibration',
      desc: 'Multi-variable regression models mapping ride-height variations and bodywork updates to aerodynamic efficiency profiles.'
    },
    {
      title: 'Trackside Strategy & Simulations',
      desc: 'Predictive Monte Carlo race simulators mapping fuel management levels, safety car variables, and optimal pit window operations.'
    },
    {
      title: 'Structural Non-Destructive Testing',
      desc: 'High-frequency ultrasonic scans and component stress mappings of used carbon-composite suspension components.'
    }
  ]

  return (
    <section id="services-section" style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'var(--text-muted, rgba(255, 255, 255, 0.3))',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        Operations Services
      </div>

      <div style={{
        background: 'var(--bg-card, rgba(13, 13, 13, 0.8))',
        border: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
        padding: '32px 40px',
      }}>
        <ol style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 28
        }}>
          {services.map((service, index) => (
            <li
              key={service.title}
              className="anim-fade-in-up card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                position: 'relative',
                animationDelay: `${index * 0.15}s`,
                padding: '16px 20px',
                borderLeft: '2px solid transparent',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                {/* Ordered List Index Label */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#DC0000',
                  background: 'rgba(220, 0, 0, 0.08)',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(220, 0, 0, 0.2)'
                }}>
                  0{index + 1}
                </div>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.1rem',
                  color: 'var(--text-primary, #ffffff)',
                  fontWeight: 500
                }}>
                  {service.title}
                </h3>
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
                lineHeight: 1.6,
                paddingLeft: 36
              }}>
                {service.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
