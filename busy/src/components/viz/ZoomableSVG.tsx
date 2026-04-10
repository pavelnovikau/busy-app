import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CX, CY } from '@lib/ring-geometry'

const VB_H = 960 // fixed vertical extent — all ring content always visible

interface Transform {
  scale: number
  panX: number
  panY: number
}

interface Props {
  children: React.ReactNode
}

export function ZoomableSVG({ children }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [t, setT] = useState<Transform>({ scale: 1, panX: 0, panY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ clientX: 0, clientY: 0, panX: 0, panY: 0 })

  // Dynamic viewBox: height fixed at VB_H, width adapts to container
  const [vbW, setVbW] = useState(1200)
  const vbX = CX - vbW / 2 // keep rings centered horizontally

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const update = () => {
      const { clientWidth: w, clientHeight: h } = el
      if (w > 0 && h > 0) setVbW((w / h) * VB_H)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Uniform scale factor: VB_H / container_height  (same for x and y with no letterboxing)
  const toSVG = (el: SVGSVGElement, clientX: number, clientY: number) => {
    const rect = el.getBoundingClientRect()
    const factor = VB_H / rect.height
    return {
      sx: vbX + (clientX - rect.left) * factor,
      sy: (clientY - rect.top) * factor,
      factor,
    }
  }

  const svgTransform = `translate(${CX * (1 - t.scale) + t.panX} ${CY * (1 - t.scale) + t.panY}) scale(${t.scale})`

  // Non-passive wheel listener
  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08
      const { sx: mx, sy: my } = toSVG(el, e.clientX, e.clientY)
      setT(prev => {
        const newScale = Math.max(0.25, Math.min(8, prev.scale * factor))
        return {
          scale: newScale,
          panX: (mx - CX) * (prev.scale - newScale) + prev.panX,
          panY: (my - CY) * (prev.scale - newScale) + prev.panY,
        }
      })
    }

    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vbX])

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return
    setIsDragging(true)
    dragStart.current = { clientX: e.clientX, clientY: e.clientY, panX: t.panX, panY: t.panY }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.clientX
    const dy = e.clientY - dragStart.current.clientY
    if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return
    const el = svgRef.current
    if (!el) return
    const { factor } = toSVG(el, 0, 0)
    setT(prev => ({
      ...prev,
      panX: dragStart.current.panX + dx * factor,
      panY: dragStart.current.panY + dy * factor,
    }))
  }

  const stopDrag = () => setIsDragging(false)

  const reset = () => setT({ scale: 1, panX: 0, panY: 0 })
  const zoomIn = () => setT(prev => ({ ...prev, scale: Math.min(8, prev.scale * 1.2) }))
  const zoomOut = () => setT(prev => ({ ...prev, scale: Math.max(0.25, prev.scale / 1.2) }))
  const pct = Math.round(t.scale * 100)

  const slot = typeof document !== 'undefined' ? document.getElementById('nav-zoom-slot') : null

  const controls = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
      }}
    >
      <button onClick={zoomOut} style={btnStyle}>−</button>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--tx-3)',
          minWidth: 32,
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {pct}%
      </span>
      <button onClick={zoomIn} style={btnStyle}>+</button>
      <button onClick={reset} title="Reset zoom" style={{ ...btnStyle, marginLeft: 2 }}>
        ↺
      </button>
    </div>
  )

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        viewBox={`${vbX.toFixed(1)} 0 ${vbW.toFixed(1)} ${VB_H}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <defs>
          {/* Shared glow filter for constellation nodes — referenced as url(#glow-constellation) */}
          <filter id="glow-constellation" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x={vbX} y="0" width={vbW} height={VB_H} fill="var(--bg)" />
        <g transform={svgTransform}>
          {children}
        </g>
      </svg>

      {slot ? createPortal(controls, slot) : (
        <div style={{ position: 'absolute', bottom: 'var(--space-2)', right: 'var(--space-2)' }}>
          {controls}
        </div>
      )}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  fontWeight: 600,
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--tx-2)',
  cursor: 'pointer',
  padding: 0,
  lineHeight: 1,
}
