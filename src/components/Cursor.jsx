import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 })
  const dotX = useSpring(mx, { stiffness: 800, damping: 40 })
  const dotY = useSpring(my, { stiffness: 800, damping: 40 })
  const scale = useMotionValue(1)
  const ringScale = useMotionValue(1)

  useEffect(() => {
    const move = e => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)

    const over = e => {
      if (e.target.closest('a, button, [data-hover]')) {
        scale.set(2.2)
        ringScale.set(1.4)
      }
    }
    const out = e => {
      if (e.target.closest('a, button, [data-hover]')) {
        scale.set(1)
        ringScale.set(1)
      }
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
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#000000',
          pointerEvents: 'none',
          zIndex: 99999,
          scale,
        }}
      />
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: sx, y: sy,
          translateX: '-50%', translateY: '-50%',
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1px solid rgba(0,20,137,0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
          scale: ringScale,
        }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      />
    </>
  )
}
