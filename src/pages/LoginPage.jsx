import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!username || !password) {
      setErrorMsg('All authorization credentials must be provided.')
      return
    }

    const success = login(username, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setErrorMsg('INVALID ACCESS KEY. Authentication denied.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }} className="scanlines">
      {/* Background visual cue */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(220,0,0,0.08) 0%, rgba(0,0,0,0) 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: 420,
        background: 'rgba(13, 13, 13, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(30px)',
        padding: '48px 40px',
        position: 'relative',
        zIndex: 1,
        boxSizing: 'border-box'
      }}>
        {/* Top glowing red line */}
        <div style={{
          position: 'absolute',
          top: -1,
          left: 0,
          right: 0,
          height: 3,
          background: '#DC0000',
          boxShadow: '0 2px 15px rgba(220, 0, 0, 0.6)'
        }} />

        {/* Logo and Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
          <svg width="24" height="34" viewBox="0 0 10 14" fill="none" style={{ marginBottom: 16 }}>
            <path d="M5 0L10 3V10L5 14L0 10V3L5 0Z" fill="#DC0000"/>
          </svg>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '3px',
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: 0
          }}>
            SCUDERIA HQ
          </h2>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginTop: 6
          }}>
            Operations Telemetry HUD Gate
          </span>
        </div>

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {errorMsg && (
            <div style={{
              background: 'rgba(220, 0, 0, 0.1)',
              border: '1px solid #DC0000',
              padding: '12px 16px',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              {errorMsg}
            </div>
          )}

          {/* Username Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Username / Operator ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              style={inputStyle}
            />
          </div>

          {/* Password Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Chassis Access Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="e.g. ferrari2026"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#DC0000',
              border: 'none',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '1.5px',
              padding: '14px 20px',
              width: '100%',
              marginTop: 12,
              transition: 'all 0.2s',
              outline: 'none',
              cursor: 'none'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#ff1a1a'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(220, 0, 0, 0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#DC0000'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            AUTHORIZE CONNECTION
          </button>

          {/* Back Home link */}
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link to="/" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
            >
              ◀ Return to Public Showcase
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  background: 'rgba(0, 0, 0, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  padding: '12px 16px',
  color: '#ffffff',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.85rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  width: '100%',
  boxSizing: 'border-box'
}
