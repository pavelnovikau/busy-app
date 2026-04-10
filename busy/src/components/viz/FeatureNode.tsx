import { useState } from "react"
import { motion } from "motion/react"
import type { Feature } from "@data/types"
import { CX, CY } from "@lib/ring-geometry"

interface Props {
  feature: Feature
  x: number
  y: number
  isAnchor?: boolean
  isConstellation?: boolean
  showLabel?: boolean
  dimmed?: boolean
  selected?: boolean
  onSelect?: (feature: Feature) => void
  onHover?: (info: { feature: Feature; x: number; y: number } | null) => void
}

const ringColorVar: Record<string, string> = {
  r0: "var(--ring-0)",
  r1: "var(--ring-1)",
  r2: "var(--ring-2)",
  r3: "var(--ring-3)",
}

const DOT_R = 5.5        // feature dot radius (SVG units, matches ring geometry)
const LABEL_OFFSET = 22  // px offset from dot center to label baseline

function FeatureNode({
  feature,
  x,
  y,
  isAnchor = false,
  isConstellation = false,
  showLabel = true,
  dimmed = false,
  selected = false,
  onSelect,
  onHover,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const color = ringColorVar[feature.ring] ?? "var(--ring-0)"

  // Label direction: radially outward from center
  const ddx = x - CX
  const ddy = y - CY
  const dist = Math.sqrt(ddx * ddx + ddy * ddy)
  const cosA = dist > 0 ? ddx / dist : 0
  const sinA = dist > 0 ? ddy / dist : 0

  // Label position: LABEL_OFFSET px beyond dot, radially
  const lx = x + LABEL_OFFSET * cosA
  const ly = y + LABEL_OFFSET * sinA

  // Text anchor based on horizontal side
  const anchor: React.SVGAttributes<SVGTextElement>["textAnchor"] =
    cosA > 0.25 ? "start" : cosA < -0.25 ? "end" : "middle"

  // Vertical nudge for 2-line label (id + name)
  const nameDy = sinA > 0.2 ? 12 : sinA < -0.2 ? -4 : 8
  const idDy = nameDy - 11

  // Secondary phase (1.5, 2.5): hollow dot with colored outline
  const isSecondary = feature.phase === "1.5" || feature.phase === "2.5"
  const r = isAnchor ? 8 : DOT_R

  const handleSelect = () => onSelect?.(feature)

  const handleKeyDown: React.KeyboardEventHandler<SVGGElement> = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    handleSelect()
  }

  return (
    <motion.g
      style={{ cursor: "pointer", outline: "none" }}
      initial={false}
      animate={{ opacity: dimmed ? 0.12 : 1 }}
      transition={{ duration: 0.3 }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${feature.id}. ${feature.short}`}
      onMouseEnter={() => { setHovered(true); onHover?.({ feature, x, y }) }}
      onMouseLeave={() => { setHovered(false); onHover?.(null) }}
      onClick={(e) => { e.stopPropagation(); handleSelect() }}
      onKeyDown={handleKeyDown}
    >
      {/* Anchor pulse ring */}
      {isAnchor && (
        <motion.circle
          cx={x}
          cy={y}
          r={r + 5}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Selection ring */}
      {selected && (
        <circle
          cx={x}
          cy={y}
          r={r + 6}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="3 2"
          opacity={0.9}
        />
      )}

      {/* Main dot — secondary phase: hollow (bg fill + color stroke) */}
      <motion.circle
        cx={x}
        cy={y}
        animate={{ r: hovered ? r * 1.5 : r }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        fill={isSecondary ? "var(--bg)" : color}
        stroke={color}
        strokeWidth={isSecondary ? 1.5 : 0}
        filter={isConstellation ? `url(#glow-constellation)` : undefined}
      />

      {(showLabel || hovered) && (
        <>
          {/* Persistent label line 1: feature id */}
          <text
            x={lx}
            y={ly + idDy}
            textAnchor={anchor}
            fontFamily="'Geist Mono Variable', monospace"
            fontSize={8}
            fontWeight={700}
            fill={isSecondary ? "var(--tx-2)" : color}
            opacity={isSecondary ? 0.72 : 1}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {feature.id}
          </text>

          {/* Persistent label line 2: short name */}
          <text
            x={lx}
            y={ly + nameDy}
            textAnchor={anchor}
            fontFamily="'Geist Variable', sans-serif"
            fontSize={8.5}
            fill="var(--tx-2)"
            opacity={isSecondary ? 0.72 : 0.92}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {feature.short}
          </text>
        </>
      )}

    </motion.g>
  )
}

export { FeatureNode }
