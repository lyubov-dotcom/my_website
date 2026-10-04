import { useEffect, useRef } from 'react'
import '../HeroAvatar.css'

const asset = (name: string) => `${import.meta.env.BASE_URL}avatar/${name}.webp`

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

function HeroAvatar() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rigRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLImageElement>(null)
  const frontRef = useRef<HTMLImageElement>(null)
  const rightRef = useRef<HTMLImageElement>(null)
  const wireRef = useRef<HTMLImageElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobileMq = window.matchMedia('(max-width: 860px)')
    if (reduce) return

    const onMove = (event: MouseEvent) => {
      if (mobileMq.matches) return
      const stage = stageRef.current
      if (!stage) return
      const box = stage.getBoundingClientRect()
      const cx = box.left + box.width / 2
      const cy = box.top + box.height * 0.42
      target.current = {
        x: clamp((event.clientX - cx) / (window.innerWidth * 0.42), -1, 1),
        y: clamp((event.clientY - cy) / (window.innerHeight * 0.42), -1, 1),
      }
    }

    const started = performance.now()
    let frame = 0

    const apply = (x: number, y: number) => {
      const left = x < 0 ? -x : 0
      const right = x > 0 ? x : 0
      const front = 1 - Math.abs(x)
      if (leftRef.current) leftRef.current.style.opacity = left.toFixed(3)
      if (frontRef.current) frontRef.current.style.opacity = front.toFixed(3)
      if (rightRef.current) rightRef.current.style.opacity = right.toFixed(3)
      if (wireRef.current) {
        wireRef.current.style.opacity = Math.max(0, 0.42 - Math.abs(x) * 0.35).toFixed(3)
      }
      if (rigRef.current) {
        rigRef.current.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`
      }
      if (sheenRef.current) {
        sheenRef.current.style.transform = `translate3d(${(x * 18).toFixed(1)}%, ${(y * 12).toFixed(1)}%, 0)`
      }
    }

    const tick = (now: number) => {
      if (mobileMq.matches) {
        const t = (now - started) / 1000
        target.current = {
          x: Math.sin(t * 0.42) * 0.72,
          y: Math.sin(t * 0.25) * 0.18,
        }
      }
      const nextX = current.current.x + (target.current.x - current.current.x) * 0.12
      const nextY = current.current.y + (target.current.y - current.current.y) * 0.12
      current.current = { x: nextX, y: nextY }
      apply(nextX, nextY)
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
      <div className="hero-avatar-reticle" aria-hidden="true" />
      <div className="hero-avatar-rig" ref={rigRef}>
        <img
          ref={leftRef}
          className="hero-avatar-view"
          src={asset('lyubov-3d-left')}
          alt=""
          aria-hidden="true"
        />
        <img
          ref={frontRef}
          className="hero-avatar-view is-front"
          src={asset('lyubov-3d-front')}
          alt="Любовь Чуйко"
        />
        <img
          ref={rightRef}
          className="hero-avatar-view"
          src={asset('lyubov-3d-right')}
          alt=""
          aria-hidden="true"
        />
        <img
          ref={wireRef}
          className="hero-avatar-view is-wire"
          src={asset('lyubov-3d-wire')}
          alt=""
          aria-hidden="true"
        />
        <span className="hero-avatar-sheen" ref={sheenRef} aria-hidden="true" />
      </div>
      <div className="hero-avatar-shadow" aria-hidden="true" />
    </div>
  )
}

export default HeroAvatar
