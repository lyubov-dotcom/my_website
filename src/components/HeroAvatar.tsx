import { useEffect, useRef } from 'react'
import '../HeroAvatar.css'

const photo = `${import.meta.env.BASE_URL}avatar/lyubov-3d-left.webp`
const blueprint = `${import.meta.env.BASE_URL}avatar/lyubov-3d-left-blueprint.webp`

function HeroAvatar() {
  const stageRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const layer = layerRef.current
    if (!stage || !layer) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 860px)')

    const setPos = (x: number, y: number, hot: boolean) => {
      layer.style.setProperty('--mx', `${x}%`)
      layer.style.setProperty('--my', `${y}%`)
      stage.classList.toggle('is-hot', hot)
    }

    if (reduce) return

    if (mobile.matches) {
      const started = performance.now()
      let frame = 0
      const tick = (now: number) => {
        const t = (now - started) / 1000
        setPos(50 + Math.sin(t * 0.65) * 26, 40 + Math.cos(t * 0.48) * 14, true)
        frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
      return () => window.cancelAnimationFrame(frame)
    }

    const onMove = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect()
      const x = ((event.clientX - box.left) / box.width) * 100
      const y = ((event.clientY - box.top) / box.height) * 100
      setPos(x, y, true)
    }
    const onLeave = () => stage.classList.remove('is-hot')

    stage.addEventListener('pointerenter', onMove)
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      stage.removeEventListener('pointerenter', onMove)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-avatar-stage" ref={stageRef}>
      <div className="hero-avatar-rig">
        <img className="hero-avatar-photo" src={photo} alt="Любовь Чуйко" />
        <div className="hero-avatar-blueprint" ref={layerRef} aria-hidden="true">
          <img src={blueprint} alt="" />
          <span className="hero-avatar-lens" />
        </div>
      </div>
      <div className="hero-avatar-shadow" aria-hidden="true" />
    </div>
  )
}

export default HeroAvatar
