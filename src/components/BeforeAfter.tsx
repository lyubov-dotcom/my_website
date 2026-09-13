import { useCallback, useRef, useState } from 'react'

type Props = {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  alt: string
  className?: string
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Легаси',
  afterLabel = 'Новый',
  alt,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(50)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromClientX(e.clientX)
  }
  const stop = () => {
    dragging.current = false
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(0, p - 3))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(100, p + 3))
    }
  }

  return (
    <div
      className={`ba ${className}`.trim()}
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerLeave={stop}
    >
      <img className="ba-img" src={after} alt={`${alt} — ${afterLabel}`} draggable={false} loading="lazy" />
      <img
        className="ba-img ba-overlay"
        src={before}
        alt={`${alt} — ${beforeLabel}`}
        draggable={false}
        loading="lazy"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="ba-tag ba-tag--left" style={{ opacity: pos > 12 ? 1 : 0 }}>{beforeLabel}</span>
      <span className="ba-tag ba-tag--right" style={{ opacity: pos < 88 ? 1 : 0 }}>{afterLabel}</span>

      <div
        className="ba-divider"
        style={{ left: `${pos}%` }}
        role="slider"
        aria-label={`Сравнение до и после: ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <span className="ba-handle" aria-hidden="true">
          <span className="ba-arrow">‹</span>
          <span className="ba-arrow">›</span>
        </span>
      </div>
    </div>
  )
}
