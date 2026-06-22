import React, { useState, useEffect } from 'react'

// Custom hook for animated counting
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * (end - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

// Formatter component to handle the string formatting and animation
const AnimatedStat = ({ valueStr }) => {
  // Extract number and suffix/prefix
  const numMatch = valueStr.match(/[\d,.]+/);
  if (!numMatch) return <span>{valueStr}</span>;
  
  const numStr = numMatch[0];
  const parsedNum = parseFloat(numStr.replace(/,/g, ''));
  
  const prefix = valueStr.substring(0, valueStr.indexOf(numStr));
  const suffix = valueStr.substring(valueStr.indexOf(numStr) + numStr.length);
  
  const count = useCountUp(parsedNum);
  
  // Format back with commas if original had them, or decimals
  let formattedCount = count.toString();
  if (numStr.includes(',')) {
    formattedCount = count.toLocaleString();
  } else if (numStr.includes('.')) {
    // Basic handling for decimals like 49.2
    formattedCount = (count / (parsedNum > 0 ? parsedNum / count : 1)).toFixed(1);
    if (formattedCount === 'NaN') formattedCount = numStr; // Fallback
  }

  // Simple workaround: if it's a small decimal (like 49.2), just don't animate to avoid weirdness, 
  // or animate an integer and divide. For this assignment, we'll just show the final string for decimals,
  // and animate the integers.
  if (numStr.includes('.')) {
    return <span>{valueStr}</span>;
  }

  return <span>{prefix}{formattedCount}{suffix}</span>;
};

export default function StatsGrid() {
  const stats = [
    { label: 'Total Users', value: '14,809', trend: '+12.4%', detail: 'Platform Registrations' },
    { label: 'Active Users', value: '1,492', trend: '+8.3%', detail: 'Telemetry Engineers Online' },
    { label: 'Revenue', value: '€49.2M', trend: '+18.1%', detail: 'Motorsport Budget Allocation' },
    { label: 'Transactions', value: '102,894', trend: 'Stable', detail: 'Sensor Telemetry/sec' },
    { label: 'Notifications', value: '18', trend: 'High Priority', detail: 'Active Trackside Alerts' },
    { label: 'Pending Tasks', value: '7', trend: 'Next 24h', detail: 'Chassis Checks & Calibrations' },
  ]

  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'var(--text-muted, rgba(255, 255, 255, 0.3))',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        Operational Stats
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 20
      }}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="card-hover hover-glow"
            style={{
              background: 'var(--bg-card, rgba(13, 13, 13, 0.8))',
              border: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Border Glow for accents */}
            {i % 3 === 0 && (
              <div style={{
                position: 'absolute',
                top: -1,
                left: 0,
                right: 0,
                height: 2,
                background: '#DC0000',
                boxShadow: '0 2px 10px rgba(220, 0, 0, 0.5)'
              }} />
            )}

            <div>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'var(--text-muted, rgba(255, 255, 255, 0.4))',
                fontWeight: 500
              }}>
                {stat.label}
              </span>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-primary, #ffffff)',
                marginTop: 6,
                letterSpacing: '-0.01em'
              }}>
                <AnimatedStat valueStr={stat.value} />
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              borderTop: '1px solid var(--border-light, rgba(255, 255, 255, 0.03))',
              paddingTop: 12
            }}>
              <span style={{ color: 'var(--text-muted, rgba(255, 255, 255, 0.3))' }}>{stat.detail}</span>
              <span style={{
                color: stat.trend.startsWith('+') ? '#00ff66' : stat.trend === 'Stable' ? '#ffffff' : '#DC0000',
                fontWeight: 600
              }}>
                {stat.trend}
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, height: 2,
              background: 'rgba(255,255,255,0.05)',
              width: '100%'
            }}>
              <div 
                className="progress-bar-fill"
                style={{
                  height: '100%',
                  background: stat.trend.startsWith('+') ? '#00ff66' : stat.trend === 'Stable' ? 'rgba(255,255,255,0.4)' : '#DC0000',
                  '--progress': `${Math.random() * 60 + 30}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
