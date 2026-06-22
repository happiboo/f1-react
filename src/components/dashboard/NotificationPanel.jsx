import React, { useState } from 'react';
import './dashboard-animations.css';

export default function NotificationPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      message: 'MGU-K Thermal Limit Exceeded in Sector 3',
      time: 'Just now'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Chassis aerodynamic pressure dropping on front-wing endplate',
      time: '2 mins ago'
    },
    {
      id: 3,
      type: 'info',
      message: 'Track telemetry sync complete. 1.2GB downloaded.',
      time: '15 mins ago'
    },
    {
      id: 4,
      type: 'update',
      message: 'ECU Firmware v2.14.8 ready for deployment.',
      time: '1 hour ago'
    }
  ]);

  if (!isOpen) return null;

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeStyle = (type) => {
    switch(type) {
      case 'critical': return { color: '#DC0000', label: 'CRITICAL' };
      case 'warning': return { color: '#FFB800', label: 'WARNING' };
      case 'update': return { color: '#00E5FF', label: 'UPDATE' };
      default: return { color: '#00FF66', label: 'INFO' };
    }
  };

  return (
    <div 
      className="anim-slide-in-down"
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: 10,
        width: 380,
        background: 'var(--bg-overlay, rgba(13, 13, 13, 0.95))',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-light, rgba(255, 255, 255, 0.1))',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        zIndex: 1000,
        cursor: 'auto'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-primary, #ffffff)'
        }}>
          System Alerts
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={() => setNotifications([])}
            style={{
              background: 'none', border: 'none', color: 'var(--text-muted, rgba(255,255,255,0.4))',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary, #ffffff)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted, rgba(255,255,255,0.4))'}
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#DC0000',
              fontFamily: "'Inter', sans-serif", fontSize: '1rem',
              cursor: 'pointer', lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <div style={{
            padding: 40, textAlign: 'center',
            color: 'var(--text-muted, rgba(255,255,255,0.3))',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem'
          }}>
            No active alerts in queue.
          </div>
        ) : (
          notifications.map(notif => {
            const style = getTypeStyle(notif.type);
            return (
              <div 
                key={notif.id}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-light, rgba(255, 255, 255, 0.03))',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card, rgba(255,255,255,0.03))'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: style.color,
                  boxShadow: `0 0 8px ${style.color}`,
                  marginTop: 6, flexShrink: 0
                }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem', color: style.color,
                    letterSpacing: '1px', marginBottom: 4
                  }}>
                    {style.label} &middot; {notif.time}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem', color: 'var(--text-secondary, rgba(255,255,255,0.8))',
                    lineHeight: 1.4
                  }}>
                    {notif.message}
                  </div>
                </div>

                <button 
                  onClick={() => handleDismiss(notif.id)}
                  style={{
                    background: 'none', border: 'none', 
                    color: 'var(--text-muted, rgba(255,255,255,0.2))',
                    cursor: 'pointer', fontSize: '1rem'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#DC0000'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted, rgba(255,255,255,0.2))'}
                >
                  &times;
                </button>
              </div>
            );
          })
        )}
      </div>
      
      {/* Footer */}
      <div style={{
        padding: '10px 20px',
        background: 'var(--bg-card, rgba(0,0,0,0.3))',
        textAlign: 'center'
      }}>
        <a href="#" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem', color: 'var(--text-muted, rgba(255,255,255,0.4))',
          textDecoration: 'underline'
        }}>
          View Full Telemetry Log
        </a>
      </div>
    </div>
  );
}
