import React, { useState } from 'react'

export default function RegistrationForm() {
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    dob: '',
    address: ''
  }

  const [formData, setFormData] = useState(initialFormState)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Basic Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.gender || !formData.dob || !formData.address) {
      setErrorMsg('Please populate all required telemetry registry fields.')
      return
    }

    setSubmittedData({ ...formData })
    // Log registration in simulation
    console.log('Telemetry Operator Registered:', formData)
  }

  const handleReset = () => {
    setFormData(initialFormState)
    setSubmittedData(null)
    setErrorMsg('')
  }

  return (
    <section id="registration-section" style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        Operator Registration Matrix
      </div>

      <div style={{
        background: 'rgba(13, 13, 13, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '32px 40px',
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {errorMsg && (
            <div style={{
              background: 'rgba(220, 0, 0, 0.1)',
              border: '1px solid #DC0000',
              padding: '12px 16px',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem'
            }}>
              {errorMsg}
            </div>
          )}

          {submittedData && (
            <div style={{
              background: 'rgba(0, 255, 102, 0.1)',
              border: '1px solid #00ff66',
              padding: '16px',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <div style={{ color: '#00ff66', fontWeight: 600 }}>REGISTRATION SUCCESSFUL: COMPONENT LOADED</div>
              <div>Name: {submittedData.name}</div>
              <div>Email: {submittedData.email}</div>
              <div>Access Token: SECURE_TOKEN_{Math.floor(Math.random() * 89999 + 10000)}</div>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20
          }}>
            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>Secure Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="operator@ferrari.it"
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+39 0536 949111"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>Chassis Key (Password)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                style={inputStyle}
              />
            </div>

            {/* Gender */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>Gender Identity</label>
              <div style={{ display: 'flex', gap: 16, height: 44, alignItems: 'center' }}>
                {['Male', 'Female', 'Other'].map(option => (
                  <label key={option} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}>
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      style={{
                        accentColor: '#DC0000',
                        cursor: 'none'
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase'
              }}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'uppercase'
            }}>Operations Base (Address)</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Via Abetone Inferiore 4, Maranello, Italy"
              rows="3"
              style={{ ...inputStyle, height: 'auto', resize: 'vertical' }}
            />
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'flex-end',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: 24,
            marginTop: 8
          }}>
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '1px',
                padding: '12px 24px',
                transition: 'all 0.2s',
                outline: 'none',
                cursor: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#ffffff'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              RESET TELEMETRY
            </button>
            <button
              type="submit"
              style={{
                background: '#DC0000',
                border: 'none',
                color: '#ffffff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '12px 32px',
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
              SUBMIT OPERATOR
            </button>
          </div>
        </form>
      </div>
    </section>
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
