import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Feature } from "@data/types"
import { CX, CY } from "@lib/ring-geometry"

interface Props {
  feature: Feature
  x: number
  y: number
  isAnchor?: boolean
  isConstellation?: boolean
  dimmed?: boolean
}

const ringColorVar: Record<string, string> = {
  r0: "var(--ring-0)",
  r1: "var(--ring-1)",
  r2: "var(--ring-2)",
  r3: "var(--ring-3)",
}

const DOT_R = 5.5
const LABEL_OFFSET = 22

function FeatureNode({
  feature,
  x,
  y,
  isAnchor = false,
  isConstellation = false,
  dimmed = false,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const color = ringColorVar[feature.ring] ?? "var(--ring-0)"
  const ringNum = feature.ring.replace("r", "")

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

  // Tooltip card offset
  const tooltipX = x + (cosA >= 0 ? r + 6 : -(r + 6 + 120))

  return (
    <motion.g
      style={{ cursor: "pointer" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: dimmed ? 0.12 : 1, scale: 1 }}
      whileHover={{ scale: 1.25 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow filter for constellation nodes */}
      {isConstellation && (
        <defs>
          <filter id={`glow-${feature.id}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

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

      {/* Main dot — secondary phase: hollow (bg fill + color stroke) */}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={isSecondary ? "var(--bg)" : color}
        stroke={color}
        strokeWidth={isSecondary ? 1.5 : 0}
        filter={isConstellation ? `url(#glow-${feature.id})` : undefined}
      />

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

      {/* Hover tooltip — extra ring/phase/priority info */}
      <AnimatePresence>
        {hovered && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <rect
              x={tooltipX}
              y={y - 20}
              width={120}
              height={38}
              rx={4}
              fill="var(--surface)"
              stroke={color}
              strokeWidth={0.8}
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))" }}
            />
            <text
              x={tooltipX + 7}
              y={y - 6}
              textAnchor="start"
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={8.5}
              fontWeight={700}
              fill={color}
              style={{ pointerEvents: "none" }}
            >
              Ring {ringNum}{feature.phase ? ` · Phase ${feature.phase}` : ""}
            </text>
            <text
              x={tooltipX + 7}
              y={y + 9}
              textAnchor="start"
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={8}
              fill="var(--tx-3)"
              style={{ pointerEvents: "none" }}
            >
              {feature.priority}
              {feature.problemCluster ? `  cluster ${feature.problemCluster}` : ""}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  )
}

export { FeatureNode }
