export default function Footer() {
  return (
    <footer style={{
      background: '#000000',
      padding: '64px 40px 40px',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: 48, marginBottom: 64,
      }}>
        {/* Navigation */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', fontWeight: 600,
            color: '#ffffff', marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>Navigation</p>
          {['Chassis', 'Power Unit', 'Aerodynamics', 'Specifications', 'Features'].map(l => (
            <a key={l} href="#" style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px', fontWeight: 400,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '-0.01em',
              marginBottom: 16,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >{l}</a>
          ))}
        </div>

        {/* The Machine */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', fontWeight: 600,
            color: '#ffffff', marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>The Machine</p>
          {['SF-24 Overview', 'Technical Specs', 'Design Philosophy', 'Maranello Factory', 'Ferrari.com'].map(l => (
            <a key={l} href="#" style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px', fontWeight: 400,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '-0.01em',
              marginBottom: 16,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#ffffff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >{l}</a>
          ))}
        </div>

        {/* Maranello */}
        <div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', fontWeight: 600,
            color: '#ffffff', marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>Maranello</p>
          <address style={{ fontStyle: 'normal' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px', fontWeight: 400,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '-0.01em',
              lineHeight: 1.7, marginBottom: 24,
            }}>
              Via Abetone Inferiore 4<br />
              41053 Maranello MO<br />
              Italy
            </p>
          </address>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
          }}>Scuderia Ferrari S.p.A.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 28,
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase',
          color: '#ffffff',
        }}>
          SCUDERIA FERRARI SF-24
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '1px',
        }}>© 2026 Scuderia Ferrari S.p.A. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms'].map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)',
              letterSpacing: '1px', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.22)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
