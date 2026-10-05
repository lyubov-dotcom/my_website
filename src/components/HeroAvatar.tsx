import { useCallback, useEffect, useRef, useState } from 'react'
import '../HeroAvatar.css'

const bronze = `${import.meta.env.BASE_URL}avatar/lyubov-bronze-bust.webp?v=flat-match`
const steel = `${import.meta.env.BASE_URL}avatar/lyubov-steel-xray.webp?v=flat-match`

type HitMap = {
  data: Uint8ClampedArray
  width: number
  height: number
}

function parseObjectPos(value: string, container: number, size: number) {
  const raw = value.trim()
  if (raw === 'center') return (container - size) / 2
  if (raw === 'left' || raw === 'top') return 0
  if (raw === 'right' || raw === 'bottom') return container - size
  if (raw.endsWith('%')) return (container - size) * (Number.parseFloat(raw) / 100)
  const px = Number.parseFloat(raw)
  return Number.isFinite(px) ? px : (container - size) / 2
}

function sampleAlpha(map: HitMap, nx: number, ny: number) {
  const x = Math.min(map.width - 1, Math.max(0, Math.floor(nx * map.width)))
  const y = Math.min(map.height - 1, Math.max(0, Math.floor(ny * map.height)))
  return map.data[(y * map.width + x) * 4 + 3]
}

function HeroAvatar() {
  const stageRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const hitRef = useRef<HitMap | null>(null)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    const source = new Image()
    source.src = bronze
    source.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = source.naturalWidth
      canvas.height = source.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(source, 0, 0)
      hitRef.current = {
        data: ctx.getImageData(0, 0, canvas.width, canvas.height).data,
        width: canvas.width,
        height: canvas.height,
      }
    }
  }, [])

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('torch')) return
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--mx', '46%')
    el.style.setProperty('--my', '56%')
    setLit(true)
  }, [])

  const overSilhouette = useCallback((clientX: number, clientY: number) => {
    const el = stageRef.current
    const photo = photoRef.current
    const map = hitRef.current
    if (!el || !photo || !map) return false

    const box = el.getBoundingClientRect()
    const scale = Math.min(box.width / map.width, box.height / map.height)
    const drawW = map.width * scale
    const drawH = map.height * scale
    const [posXToken, posYToken] = getComputedStyle(photo).objectPosition.split(/\s+/)
    const posX = parseObjectPos(posXToken ?? 'right', box.width, drawW)
    const posY = parseObjectPos(posYToken ?? 'bottom', box.height, drawH)

    const x = clientX - box.left - posX
    const y = clientY - box.top - posY
    if (x < 0 || y < 0 || x > drawW || y > drawH) return false

    return sampleAlpha(map, x / drawW, y / drawH) > 24
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

  const track = (clientX: number, clientY: number) => {
    if (!overSilhouette(clientX, clientY)) {
      setLit(false)
      return
    }
    aim(clientX, clientY)
    setLit(true)
  }

  return (
    <div className="hero-avatar-stage hero-avatar-stage--splash">
      <div
        ref={stageRef}
        className={`hero-avatar-torch${lit ? ' is-lit' : ''}`}
        onPointerMove={(event) => track(event.clientX, event.clientY)}
        onPointerEnter={(event) => track(event.clientX, event.clientY)}
        onPointerLeave={() => setLit(false)}
      >
        <img ref={photoRef} className="hero-avatar-photo" src={bronze} alt="Любовь Чуйко" />
        <img className="hero-avatar-xray" src={steel} alt="" aria-hidden="true" />
        <span className="hero-avatar-beam" aria-hidden="true" />
      </div>
    </div>
  )
}

export default HeroAvatar
