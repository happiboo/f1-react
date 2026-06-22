import React, { useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import NotificationPanel from './NotificationPanel'
export default function DashHeader({ user }) {
  const { theme, toggleTheme } = useTheme();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).toUpperCase();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header style={{
      background: 'var(--bg-overlay, rgba(13, 13, 13, 0.75))',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-light, rgba(255, 255, 255, 0.07))',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="24" viewBox="0 0 10 14" fill="none">
          <path d="M5 0L10 3V10L5 14L0 10V3L5 0Z" fill="#DC0000"/>
        </svg>
        <div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: 'var(--text-primary, #ffffff)',
            margin: 0,
            textTransform: 'uppercase'
          }}>
            SCUDERIA HQ
          </h1>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted, rgba(255, 255, 255, 0.4))',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Telemetry & Operations Control HUD
          </span>
        </div>
      </div>

      {/* Date & Time Display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: 'var(--text-secondary, rgba(255,255,255,0.7))'
      }}>
        <span>{formatDate(time)}</span>
        <span style={{ color: '#DC0000' }}>·</span>
        <span>{formatTime(time)}</span>
      </div>

      {/* Student & Admin Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
      }}>
        {/* Student Name & Reg Number */}
        <div style={{ textAlign: 'right', borderRight: '1px solid var(--border-light, rgba(255, 255, 255, 0.1))', paddingRight: 20 }}>
          <div style={{ color: 'var(--text-muted, rgba(255, 255, 255, 0.4))', fontSize: '0.6rem', textTransform: 'uppercase' }}>Operator</div>
          <div style={{ color: 'var(--text-primary, #ffffff)', fontWeight: 600 }}>Kavin S</div>
          <div style={{ color: '#DC0000', fontSize: '0.7rem' }}>REG2024001</div>
        </div>

        {/* User Role */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#00ff66',
            boxShadow: '0 0 8px #00ff66'
          }} />
          <div>
            <div style={{ color: 'var(--text-primary, #ffffff)' }}>{user?.name || 'Administrator'}</div>
            <div style={{ color: 'var(--text-muted, rgba(255, 255, 255, 0.4))', fontSize: '0.65rem' }}>{user?.role || 'Lead Analyst'}</div>
          </div>
        </div>

        {/* Action Icons: Theme Toggle & Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderLeft: '1px solid var(--border-light, rgba(255,255,255,0.1))', paddingLeft: 20 }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary, rgba(255,255,255,0.6))',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: isNotifOpen ? 'var(--text-primary, #ffffff)' : 'var(--text-secondary, rgba(255,255,255,0.6))',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                transition: 'color 0.2s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {/* Badge */}
              <span style={{
                position: 'absolute',
                top: 0,
                right: 2,
                width: 8,
                height: 8,
                background: '#DC0000',
                borderRadius: '50%',
                border: '2px solid var(--color-dark-surface)'
              }}/>
            </button>
            <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  )
}
