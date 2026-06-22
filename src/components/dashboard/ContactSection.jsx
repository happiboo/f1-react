import React from 'react'

export default function ContactSection() {
  const contactInfo = [
    { label: 'Operations Email', val: 'support.hq@ferrari.it', link: 'mailto:support.hq@ferrari.it' },
    { label: 'Engineering Hotline', val: '+39 0536 949111', link: 'tel:+390536949111' },
    { label: 'Factory Address', val: 'Via Abetone Inferiore 4, 41053 Maranello MO, Italy', link: '#' }
  ]

  const socials = [
    { name: 'X / Twitter', url: 'https://twitter.com/ScuderiaFerrari' },
    { name: 'GitHub Source', url: 'https://github.com/ItzFaLL3n/f1-react' },
    { name: 'Instagram Feed', url: 'https://instagram.com/scuderiaferrari' },
    { name: 'Official Web', url: 'https://ferrari.com' }
  ]

  return (
    <section id="contact-section" style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        HQ Operations Contacts
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20
      }}>
        {/* Main Contacts */}
        <div style={{
          background: 'rgba(13, 13, 13, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.1rem',
            color: '#ffffff',
            fontWeight: 500,
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            paddingBottom: 10
          }}>
            Maranello Control
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {contactInfo.map(item => (
              <div key={item.label}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {item.label}
                </div>
                <a
                  href={item.link}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#DC0000'}
                  onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
                >
                  {item.val}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div style={{
          background: 'rgba(13, 13, 13, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.1rem',
            color: '#ffffff',
            fontWeight: 500,
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            paddingBottom: 10
          }}>
            Digital Operations
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
            height: '100%',
            alignContent: 'start'
          }}>
            {socials.map(soc => (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '12px 16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#DC0000'
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.background = 'rgba(220, 0, 0, 0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <span style={{ color: '#DC0000' }}>▶</span> {soc.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
