export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(0,0,0,0.07)',
      padding: '52px 32px 36px',
      background: '#fff',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '3px', textTransform: 'uppercase',
        }}>
          SCUDERIA <span style={{ color: '#DC0000' }}>FERRARI</span> SF-24
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem', color: '#9ca3af', letterSpacing: '1px',
        }}>© 2026 Scuderia Ferrari S.p.A. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Ferrari.com'].map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem', color: '#9ca3af',
              letterSpacing: '1px', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#DC0000'}
              onMouseLeave={e => e.target.style.color = '#9ca3af'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
