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
const RING_DIM_COLORS = [
  'var(--ring-0-dim)',
  'var(--ring-1-dim)',
  'var(--ring-2-dim)',
  'var(--ring-3-dim)',
]

interface Props {
  children?: React.ReactNode
  focusMode?: boolean
}

/**
 * Renders ring circles, fills, dividers, and CORE label.
 * Does NOT own the <svg> element — that lives in ZoomableSVG.
 * Returns a React Fragment.
 */
export default function RingsDiagram({ children, focusMode = false }: Props) {
  return (
    <>
      {/* Ring fills (dim backgrounds) */}
      {rings.map((ring, index) => {
        const r = RING_RADII[ring.id] ?? 0
        return (
          <motion.circle
            key={`${ring.id}-fill`}
            cx={CX}
            cy={CY}
            r={r}
            fill={RING_DIM_COLORS[index]}
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: focusMode ? 0.04 : 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        )
      })}

      {/* Ring stroke circles */}
      {rings.map((ring, index) => {
        const r = RING_RADII[ring.id] ?? 0
        return (
          <motion.circle
            key={ring.id}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke={RING_COLORS[index]}
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
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
            initial={{ opacity: 0 }}
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
