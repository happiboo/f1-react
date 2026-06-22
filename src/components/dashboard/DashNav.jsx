import React from 'react'
import { Link } from 'react-router-dom'

export default function DashNav({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'services', label: 'Services' },
    { id: 'reports', label: 'Reports' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav style={{
      width: 260,
      background: 'rgba(10, 10, 10, 0.95)',
      borderRight: '1px solid rgba(255, 255, 255, 0.07)',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - 81px)',
      position: 'sticky',
      top: 81,
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: 'rgba(255, 255, 255, 0.3)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          paddingLeft: 12,
          marginBottom: 12
        }}>
          Navigation
        </div>

        {/* Home option (redirect to public site) */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.6)',
          transition: 'all 0.2s',
          borderLeft: '2px solid transparent'
        }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#DC0000' }}>00.</span>
          Home (Public)
        </Link>

        {menuItems.map((item, index) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: isActive ? 'rgba(220, 0, 0, 0.08)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '2px solid #DC0000' : '2px solid transparent',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s',
                outline: 'none',
                cursor: 'none'
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                color: isActive ? '#DC0000' : 'rgba(255, 255, 255, 0.3)'
              }}>
                0{index + 1}.
              </span>
              {item.label}
            </button>
          )
        })}
      </div>

      <button
        onClick={onLogout}
        style={{
          background: 'transparent',
          border: '1px solid rgba(220, 0, 0, 0.3)',
          color: '#DC0000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '12px 16px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          width: '100%',
          transition: 'all 0.2s',
          outline: 'none',
          cursor: 'none'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#DC0000'
          e.currentTarget.style.color = '#ffffff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#DC0000'
        }}
      >
        Exit HUD (Logout)
      </button>
    </nav>
  )
}
