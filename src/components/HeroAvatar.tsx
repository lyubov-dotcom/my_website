import { useCallback, useEffect, useRef, useState } from 'react'
import '../HeroAvatar.css'

const bronze = `${import.meta.env.BASE_URL}avatar/lyubov-bronze-bust.webp`
const steel = `${import.meta.env.BASE_URL}avatar/lyubov-steel-xray.webp`

function HeroAvatar() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('torch')) return
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--mx', '48%')
    el.style.setProperty('--my', '36%')
    setLit(true)
  }, [])

  const aim = useCallback((clientX: number, clientY: number) => {
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((clientX - r.left) / Math.max(r.width, 1)) * 100
    const y = ((clientY - r.top) / Math.max(r.height, 1)) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }, [])

  return (
    <div className="hero-avatar-stage hero-avatar-stage--splash">
      <div
        ref={stageRef}
        className={`hero-avatar-torch${lit ? ' is-lit' : ''}`}
        onPointerMove={(event) => {
          aim(event.clientX, event.clientY)
          setLit(true)
        }}
        onPointerEnter={(event) => {
          aim(event.clientX, event.clientY)
          setLit(true)
        }}
        onPointerLeave={() => setLit(false)}
      >
        <img className="hero-avatar-photo" src={bronze} alt="Любовь Чуйко" />
        <img className="hero-avatar-xray" src={steel} alt="" aria-hidden="true" />
        <span className="hero-avatar-beam" aria-hidden="true" />
      </div>
    </div>
  )
}

export default HeroAvatar
