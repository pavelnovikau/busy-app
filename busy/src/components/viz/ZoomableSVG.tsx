import { useRef, useState, useEffect } from 'react'
import { CX, CY } from '@lib/ring-geometry'

const VB_W = 1200
const VB_H = 960

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

  // SVG group transform: scale around (CX, CY), then translate by pan
  const svgTransform = `translate(${CX * (1 - t.scale) + t.panX} ${CY * (1 - t.scale) + t.panY}) scale(${t.scale})`

  // Non-passive wheel listener so we can preventDefault
  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.13 : 1 / 1.13
      const rect = el.getBoundingClientRect()
      // Mouse position in SVG viewBox coords
      const mx = (e.clientX - rect.left) * (VB_W / rect.width)
      const my = (e.clientY - rect.top) * (VB_H / rect.height)
      setT(prev => {
        const newScale = Math.max(0.25, Math.min(8, prev.scale * factor))
        return {
          scale: newScale,
          // Keep the point under the cursor fixed in place
          panX: (mx - CX) * (prev.scale - newScale) + prev.panX,
          panY: (my - CY) * (prev.scale - newScale) + prev.panY,
        }
      })
    }

    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    // Only pan on left click, not on feature node clicks
    if (e.button !== 0) return
    setIsDragging(true)
    dragStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: t.panX,
      panY: t.panY,
    }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return
    const el = svgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scaleX = VB_W / rect.width
    const scaleY = VB_H / rect.height
    setT(prev => ({
      ...prev,
      panX: dragStart.current.panX + (e.clientX - dragStart.current.clientX) * scaleX,
      panY: dragStart.current.panY + (e.clientY - dragStart.current.clientY) * scaleY,
    }))
  }

  const stopDrag = () => setIsDragging(false)

  const reset = () => setT({ scale: 1, panX: 0, panY: 0 })
  const zoomIn = () => setT(prev => ({ ...prev, scale: Math.min(8, prev.scale * 1.2) }))
  const zoomOut = () => setT(prev => ({ ...prev, scale: Math.max(0.25, prev.scale / 1.2) }))

  const pct = Math.round(t.scale * 100)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
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
        {/* Static background — outside transform so it always fills viewport */}
        <rect x="0" y="0" width={VB_W} height={VB_H} fill="var(--bg)" />

        {/* Zoomable / pannable content */}
        <g transform={svgTransform}>
          {children}
        </g>
      </svg>

      {/* Zoom controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-2)',
          right: 'var(--space-2)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '3px 6px',
        }}
      >
        <button onClick={zoomOut} style={btnStyle}>−</button>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--tx-3)',
            minWidth: 30,
            textAlign: 'center',
          }}
        >
          {pct}%
        </span>
        <button onClick={zoomIn} style={btnStyle}>+</button>
        <button
          onClick={reset}
          title="Reset zoom"
          style={{ ...btnStyle, marginLeft: 2, fontSize: 11 }}
        >
          ↺
        </button>
      </div>
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
