import { motion } from 'motion/react'
import ringsData from '@data/rings.json'
import subphasesData from '@data/subphases.json'
import { CX, CY, RING_RADII } from '@lib/ring-geometry'
import type { Ring, Subphase } from '@data/types'

const rings = ringsData as Ring[]

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function dividerLine(angleDeg: number, rInner: number, rOuter: number) {
  const rad = degToRad(angleDeg)
  return {
    x1: CX + rInner * Math.cos(rad),
    y1: CY + rInner * Math.sin(rad),
    x2: CX + rOuter * Math.cos(rad),
    y2: CY + rOuter * Math.sin(rad),
  }
}

const RING_COLORS = ['var(--ring-0)', 'var(--ring-1)', 'var(--ring-2)', 'var(--ring-3)']

// Stroke widths — keep in sync with --stroke-ring / --stroke-ring-active tokens in tokens.css
const STROKE_RING = 1.5
const STROKE_RING_ACTIVE = 3

interface Props {
  children?: React.ReactNode
  focusMode?: boolean
  activeRing?: string | null
}

/**
 * Renders ring circles, fills, dividers, and CORE label.
 * Does NOT own the <svg> element — that lives in ZoomableSVG.
 * Returns a React Fragment.
 */
export default function RingsDiagram({ children, focusMode = false, activeRing }: Props) {
  return (
    <>

      {/* Ring stroke circles */}
      {rings.map((ring, index) => {
        const r = RING_RADII[ring.id] ?? 0
        const isActive = activeRing === ring.id
        const isInactive = activeRing != null && !isActive
        return (
          <motion.circle
            key={ring.id}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke={RING_COLORS[index]}
            initial={false}
            animate={{
              pathLength: 1,
              opacity: isInactive ? 0.2 : 1,
              strokeWidth: isActive ? STROKE_RING_ACTIVE : STROKE_RING,
            }}
            transition={{
              pathLength: { delay: index * 0.12, duration: 0.7, ease: 'easeOut' },
              opacity: { duration: 0.25 },
              strokeWidth: { duration: 0.2 },
            }}
          />
        )
      })}

      {/* Subphase divider lines */}
      {(subphasesData as Subphase[]).map((sp) => {
        const r = RING_RADII[sp.ring] ?? 0
        const line = dividerLine(sp.angleDeg.start, r - 22, r + 22)
        return (
          <motion.line
            key={`divider-${sp.code}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--border-2)"
            strokeWidth={1}
            strokeDasharray="3 3"
            initial={false}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          />
        )
      })}

      {/* CORE center label */}
      {!focusMode && (
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fontFamily="'Geist Mono Variable', monospace"
          fontSize={10}
          fontWeight={700}
          letterSpacing={1.5}
          fill="var(--tx-2)"
          opacity={0.45}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          CORE
        </text>
      )}

      {children}
    </>
  )
}
