import { useEffect, useRef, type CSSProperties } from 'react'
import '../HeroAvatar.css'

const src = `${import.meta.env.BASE_URL}avatar/lyubov.webp`

const eyes = [
  { key: 'l', x: 38.4, y: 35.6 },
  { key: 'r', x: 63.6, y: 35.6 },
] as const

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

function HeroAvatar() {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const eyeRefs = useRef<Array<HTMLImageElement | null>>([])
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 860px)').matches
    if (reduce || mobile) return

    const onMove = (event: MouseEvent) => {
      const stage = stageRef.current
      if (!stage) return
      const box = stage.getBoundingClientRect()
      const cx = box.left + box.width / 2
      const cy = box.top + box.height / 2
      target.current = {
        x: clamp((event.clientX - cx) / (window.innerWidth * 0.45), -1, 1),
        y: clamp((event.clientY - cy) / (window.innerHeight * 0.45), -1, 1),
      }
    }

    let frame = 0
    const tick = () => {
      const nextX = current.current.x + (target.current.x - current.current.x) * 0.14
      const nextY = current.current.y + (target.current.y - current.current.y) * 0.14
      current.current = { x: nextX, y: nextY }

      const card = cardRef.current
      if (card) {
        card.style.transform = `rotateX(${(-nextY * 16).toFixed(2)}deg) rotateY(${(nextX * 22).toFixed(2)}deg) translate3d(${(nextX * 14).toFixed(2)}px, ${(nextY * 10).toFixed(2)}px, 0)`
      }
      eyeRefs.current.forEach((eye) => {
        if (!eye) return
        eye.style.transform = `translate3d(${(nextX * 9).toFixed(2)}px, ${(nextY * 6.5).toFixed(2)}px, 0)`
      })

      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="hero-avatar-stage" ref={stageRef}>
      <div className="hero-avatar" ref={cardRef}>
        <img className="hero-avatar-photo" src={src} alt="Любовь Чуйко" />
        {eyes.map((eye, index) => (
          <span
            key={eye.key}
            className="hero-avatar-eye"
            style={{ '--ex': `${eye.x}%`, '--ey': `${eye.y}%` } as CSSProperties}
          >
            <img
              ref={(node) => {
                eyeRefs.current[index] = node
              }}
              src={src}
              alt=""
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default HeroAvatar
