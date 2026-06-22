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
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.length < 3) error = 'Name must be at least 3 characters';
        else if (!/^[a-zA-Z\s]*$/.test(value)) error = 'Name can only contain letters and spaces';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone is required';
        else if (!/^\+?\d{10,15}$/.test(value.replace(/[\s-]/g, ''))) error = 'Invalid phone number format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) error = 'Must contain uppercase, lowercase, and digit';
        break;
      case 'gender':
        if (!value) error = 'Gender selection is required';
        break;
      case 'dob':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const dobDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - dobDate.getFullYear();
          const m = today.getMonth() - dobDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
          if (age < 13) error = 'Must be at least 13 years old';
        }
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        else if (value.length < 10) error = 'Address must be at least 10 characters';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGlobalError('')

    // Validate all
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGlobalError('Please resolve validation errors before submitting.');
      return;
    }

    setErrors({});
    setSubmittedData({ ...formData })
    // Log registration in simulation
    console.log('Telemetry Operator Registered:', formData)
  }

  const handleReset = () => {
    setFormData(initialFormState)
    setSubmittedData(null)
    setErrors({})
    setGlobalError('')
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
        background: 'var(--bg-card, rgba(13, 13, 13, 0.8))',
        border: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
        padding: '32px 40px',
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {globalError && (
            <div className="anim-fade-in-up" style={{
              background: 'rgba(220, 0, 0, 0.1)',
              border: '1px solid #DC0000',
              padding: '12px 16px',
              color: 'var(--text-primary, #ffffff)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem'
            }}>
              {globalError}
            </div>
          )}

          {submittedData && (
            <div className="anim-fade-in-up" style={{
              background: 'rgba(0, 255, 102, 0.1)',
              border: '1px solid #00ff66',
              padding: '16px',
              color: 'var(--text-primary, #ffffff)',
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
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
                textTransform: 'uppercase'
              }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                style={{ ...inputStyle, borderColor: errors.name ? '#DC0000' : 'var(--border-light)' }}
              />
              {errors.name && <span className="anim-fade-in-up" style={errorStyle}>{errors.name}</span>}
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
                textTransform: 'uppercase'
              }}>Secure Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="operator@ferrari.it"
                style={{ ...inputStyle, borderColor: errors.email ? '#DC0000' : 'var(--border-light)' }}
              />
              {errors.email && <span className="anim-fade-in-up" style={errorStyle}>{errors.email}</span>}
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
                textTransform: 'uppercase'
              }}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+39 0536 949111"
                style={{ ...inputStyle, borderColor: errors.phone ? '#DC0000' : 'var(--border-light)' }}
              />
              {errors.phone && <span className="anim-fade-in-up" style={errorStyle}>{errors.phone}</span>}
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
                textTransform: 'uppercase'
              }}>Chassis Key (Password)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                style={{ ...inputStyle, borderColor: errors.password ? '#DC0000' : 'var(--border-light)' }}
              />
              {errors.password && <span className="anim-fade-in-up" style={errorStyle}>{errors.password}</span>}
            </div>

            {/* Gender */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
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
                    color: 'var(--text-secondary, rgba(255, 255, 255, 0.8))',
                  }}>
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleChange}
                      style={{
                        accentColor: '#DC0000',
                        cursor: 'pointer'
                      }}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.gender && <span className="anim-fade-in-up" style={errorStyle}>{errors.gender}</span>}
            </div>

            {/* Date of Birth */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
                textTransform: 'uppercase'
              }}>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{ ...inputStyle, borderColor: errors.dob ? '#DC0000' : 'var(--border-light)' }}
              />
              {errors.dob && <span className="anim-fade-in-up" style={errorStyle}>{errors.dob}</span>}
            </div>
          </div>

          {/* Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--text-secondary, rgba(255, 255, 255, 0.5))',
              textTransform: 'uppercase'
            }}>Operations Base (Address)</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Via Abetone Inferiore 4, Maranello, Italy"
              rows="3"
              style={{ ...inputStyle, height: 'auto', resize: 'vertical', borderColor: errors.address ? '#DC0000' : 'var(--border-light)' }}
            />
            {errors.address && <span className="anim-fade-in-up" style={errorStyle}>{errors.address}</span>}
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
              className="btn-transition"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-light, rgba(255, 255, 255, 0.2))',
                color: 'var(--text-primary, #ffffff)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '1px',
                padding: '12px 24px',
                outline: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--text-primary, #ffffff)'
                e.currentTarget.style.background = 'var(--bg-card, rgba(255, 255, 255, 0.05))'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-light, rgba(255, 255, 255, 0.2))'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              RESET TELEMETRY
            </button>
            <button
              type="submit"
              className="btn-transition"
              style={{
                background: '#DC0000',
                border: 'none',
                color: '#ffffff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '12px 32px',
                outline: 'none',
                cursor: 'pointer'
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
  background: 'var(--bg-card, rgba(0, 0, 0, 0.6))',
  border: '1px solid var(--border-light, rgba(255, 255, 255, 0.1))',
  borderRadius: 0,
  padding: '12px 16px',
  color: 'var(--text-primary, #ffffff)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.85rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  width: '100%',
  boxSizing: 'border-box'
}

const errorStyle = {
  color: '#DC0000',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.75rem',
  marginTop: '4px'
}
