import { motion } from 'motion/react'
import ringsData from '@data/rings.json'
import subphasesData from '@data/subphases.json'
import { CX, CY, RING_RADII } from '@lib/ring-geometry'
import type { Ring, Subphase } from '@data/types'

const rings = ringsData as Ring[]
const subphases = subphasesData as Subphase[]

interface Props {
  children?: React.ReactNode
  focusMode?: boolean
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/** Radial line from inner to outer radius at a given angle */
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

export default function RingsDiagram({ children, focusMode = false }: Props) {
  return (
    <svg viewBox="0 0 1200 960" className="w-full h-full">
      {/* Ring circles */}
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
            transition={{
              delay: index * 0.15,
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        )
      })}

      {/* Ring fills — separate layer so stroke draws on top */}
      {rings.map((ring, index) => {
        const r = RING_RADII[ring.id] ?? 0
        // In focus mode, dim non-constellation rings
        const fillOpacity = focusMode ? 0.05 : 0.15
        return (
          <motion.circle
            key={`${ring.id}-fill`}
            cx={CX}
            cy={CY}
            r={r}
            fill={RING_DIM_COLORS[index]}
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: fillOpacity }}
            transition={{
              delay: index * 0.15 + 0.3,
              duration: 0.6,
            }}
          />
        )
      })}

      {/* Ring labels — positioned above each ring */}
      {rings.map((ring, index) => {
        const r = RING_RADII[ring.id] ?? 0
        // Place label at top of ring, slightly outside
        const labelY = CY - r - 10
        return (
          <motion.g
            key={`${ring.id}-label`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
          >
            <text
              x={CX}
              y={labelY}
              textAnchor="middle"
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={11}
              fill={RING_COLORS[index]}
              fontWeight={600}
            >
              {ring.short}
            </text>
            <text
              x={CX}
              y={labelY + 13}
              textAnchor="middle"
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={9}
              fill={RING_COLORS[index]}
              opacity={0.7}
            >
              {ring.sub}
            </text>
          </motion.g>
        )
      })}

      {/* Gate labels — small text near ring stroke */}
      {rings.map((ring, index) => {
        if (!ring.gate) return null
        const r = RING_RADII[ring.id] ?? 0
        // Position gate label at bottom-right of ring
        const gateAngle = degToRad(160)
        const gx = CX + r * Math.cos(gateAngle)
        const gy = CY + r * Math.sin(gateAngle)
        return (
          <motion.text
            key={`${ring.id}-gate`}
            x={gx}
            y={gy - 6}
            textAnchor="middle"
            fontFamily="'Geist Mono Variable', monospace"
            fontSize={8}
            fill={RING_COLORS[index]}
            opacity={0.6}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
          >
            {ring.gate}
          </motion.text>
        )
      })}

      {/* Subphase divider lines */}
      {subphases.map((sp) => {
        const ring = rings.find((r) => r.id === sp.ring)
        if (!ring) return null
        const r = RING_RADII[ring.id] ?? 0
        const rInner = r - 20
        const rOuter = r + 20

        // Draw divider at the start angle of this subphase
        const line = dividerLine(sp.angleDeg.start, rInner, rOuter)
        return (
          <motion.line
            key={`divider-${sp.code}-start`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          />
        )
      })}

      {/* Subphase labels */}
      {subphases.map((sp) => {
        const r = RING_RADII[sp.ring] ?? 0
        const midDeg = (sp.angleDeg.start + sp.angleDeg.end) / 2
        const labelR = r + 30
        const rad = degToRad(midDeg)
        const lx = CX + labelR * Math.cos(rad)
        const ly = CY + labelR * Math.sin(rad)
        const ringColor =
          sp.ring === 'r1' ? 'var(--ring-1)' : 'var(--ring-2)'
        return (
          <motion.text
            key={`sp-label-${sp.code}`}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="'Geist Mono Variable', monospace"
            fontSize={9}
            fill={ringColor}
            opacity={0.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            {sp.code} {sp.label}
          </motion.text>
        )
      })}

      {children}
    </svg>
  )
}
