import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot — snappy
  const dotX = useSpring(mx, { stiffness: 900, damping: 35 })
  const dotY = useSpring(my, { stiffness: 900, damping: 35 })

  // Ring — lagging
  const ringX = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.4 })
  const ringY = useSpring(my, { stiffness: 110, damping: 18, mass: 0.4 })

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = e => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)

    const over = e => {
      if (e.target.closest('a, button, [data-hover]')) setHovered(true)
    }
    const out = e => {
      if (e.target.closest('a, button, [data-hover]')) setHovered(false)
    }
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      {/* Red dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: hovered ? 10 : 6,
          height: hovered ? 10 : 6,
          borderRadius: '50%',
          background: '#DC0000',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s',
          boxShadow: '0 0 8px rgba(220,0,0,0.6)',
        }}
      />
      {/* Lagging ring */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
          borderRadius: '50%',
          border: hovered ? '1px solid rgba(220,0,0,0.7)' : '1px solid rgba(220,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.25s, height 0.25s, border-color 0.2s',
        }}
      />
    </>
  )
}
