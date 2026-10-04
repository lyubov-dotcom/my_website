import { useEffect, useRef } from 'react'
import '../HeroAvatar.css'

const photo = `${import.meta.env.BASE_URL}avatar/lyubov-3d-left.webp`
const metal = `${import.meta.env.BASE_URL}avatar/lyubov-3d-metal.webp`

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

    const splash = stage.closest('.hero-splash') as HTMLElement | null
    const surface = splash ?? stage

    if (mobile.matches) {
      const started = performance.now()
      let frame = 0
      const tick = (now: number) => {
        const t = (now - started) / 1000
        setPos(50 + Math.sin(t * 0.5) * 24, 40 + Math.cos(t * 0.38) * 18, true)
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

    surface.addEventListener('pointerenter', onMove)
    surface.addEventListener('pointermove', onMove)
    surface.addEventListener('pointerleave', onLeave)
    return () => {
      surface.removeEventListener('pointerenter', onMove)
      surface.removeEventListener('pointermove', onMove)
      surface.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-avatar-stage hero-avatar-stage--splash" ref={stageRef}>
      <div className="hero-avatar-rig">
        <img className="hero-avatar-photo" src={photo} alt="Любовь Чуйко" />
        <div className="hero-avatar-metal" ref={layerRef} aria-hidden="true">
          <img src={metal} alt="" />
        </div>
      </div>
    </div>
  )
}

export default HeroAvatar
