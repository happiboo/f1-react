import React from 'react'

export default function WelcomeSection() {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      marginBottom: 40
    }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(220, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
        border: '1px solid rgba(220, 0, 0, 0.2)',
        padding: '32px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '6rem',
          fontWeight: 800,
          color: 'rgba(255, 255, 255, 0.02)',
          lineHeight: 0.8,
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          SF24
        </div>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '2.5rem',
          fontWeight: 600,
          color: '#ffffff',
          marginBottom: 12,
          letterSpacing: '-0.02em',
        }}>
          Welcome to the Scuderia HQ Control Panel.
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: 700,
          lineHeight: 1.6,
          fontSize: '1rem'
        }}>
          You have successfully authenticated into the Scuderia Ferrari SF-24 Operations & Telemetry HUD. Here you can inspect vehicle performance metrics, register updates, review active system modules, and control diagnostics.
        </p>
      </div>

      {/* Description, Vision, Mission Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20
      }}>
        {/* Description */}
        <div style={{
          background: 'rgba(13, 13, 13, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: '#DC0000',
            letterSpacing: '2.5px',
            textTransform: 'uppercase'
          }}>
            Project Description
          </span>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            color: '#ffffff',
            fontWeight: 500
          }}>
            Integrated Simulation & Telemetry
          </h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.85rem',
            lineHeight: 1.6
          }}>
            This HUD platform manages the configuration matrix, engine simulation inputs, and wind-tunnel analytics dashboard for the Formula 1 2026 Scuderia Ferrari racing chassis.
          </p>
        </div>

        {/* Vision */}
        <div style={{
          background: 'rgba(13, 13, 13, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: '#DC0000',
            letterSpacing: '2.5px',
            textTransform: 'uppercase'
          }}>
            Vision
          </span>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            color: '#ffffff',
            fontWeight: 500
          }}>
            Precision Engineering at Scale
          </h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.85rem',
            lineHeight: 1.6
          }}>
            To combine cutting-edge software with Maranello's legendary hardware craftsmanship, redefining how motorsport telemetry data is visualised, processed, and optimized.
          </p>
        </div>

        {/* Mission */}
        <div style={{
          background: 'rgba(13, 13, 13, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: '#DC0000',
            letterSpacing: '2.5px',
            textTransform: 'uppercase'
          }}>
            Mission
          </span>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            color: '#ffffff',
            fontWeight: 500
          }}>
            Pinnacle of Performance
          </h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.85rem',
            lineHeight: 1.6
          }}>
            Empowering Ferrari trackside engineers and factory simulation coordinators to perform instant verification, diagnostics, and strategic adjustments with zero latency.
          </p>
        </div>
      </div>
    </section>
  )
}
