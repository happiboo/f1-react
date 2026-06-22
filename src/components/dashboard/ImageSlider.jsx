import React, { useState, useEffect } from 'react';
import './dashboard-animations.css';

export default function ImageSlider() {
  const images = [
    {
      src: '/main.png',
      caption: 'SF-24 Track Testing - Circuit de Barcelona-Catalunya'
    },
    {
      src: '/engine.png',
      caption: '066/12 Power Unit - Thermal Stress Analysis'
    },
    {
      src: '/full.png',
      caption: 'Aerodynamic Profile - Wind Tunnel Simulation'
    },
    {
      src: '/frame.png',
      caption: 'Carbon Fibre Monocoque - Structural Integrity Check'
    },
    {
      src: '/Gemini_Generated_Image_hi5ovshi5ovshi5o.png',
      caption: 'Scuderia Ferrari Team - Maranello Headquarters'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section 
      style={{ marginBottom: 40 }}
      className="anim-fade-in-up"
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.65rem',
        color: 'var(--text-muted, rgba(255, 255, 255, 0.3))',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: 16
      }}>
        Telemetry Visual Database
      </div>

      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          background: 'var(--color-dark, #0a0a0a)',
          border: '1px solid var(--border-light, rgba(255, 255, 255, 0.05))',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={image.src} 
              alt={image.caption} 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        ))}

        {/* Overlay styling for caption */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 30px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 10
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: '#DC0000',
              marginBottom: 4,
              fontWeight: 600
            }}>
              LOG 0{currentIndex + 1} // 0{images.length}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#ffffff',
              fontWeight: 500
            }}>
              {images[currentIndex].caption}
            </div>
          </div>
          
          {/* Controls */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              onClick={goToPrev}
              className="btn-transition"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#DC0000';
                e.currentTarget.style.borderColor = '#DC0000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              &lt;
            </button>
            <button 
              onClick={goToNext}
              className="btn-transition"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#DC0000';
                e.currentTarget.style.borderColor = '#DC0000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              &gt;
            </button>
          </div>
        </div>
        
        {/* Progress Dots */}
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          gap: 6,
          zIndex: 10
        }}>
          {images.map((_, idx) => (
            <div 
              key={idx}
              style={{
                width: 30,
                height: 3,
                background: idx === currentIndex ? '#DC0000' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
