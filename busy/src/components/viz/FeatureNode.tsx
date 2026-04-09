import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { Feature } from "@data/types"

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

const priorityLabel: Record<string, string> = {
  "\u25cf": "must have",
  "\u25d0": "should have",
  "\u25cb": "nice to have",
}

function FeatureNode({
  feature,
  x,
  y,
  isAnchor = false,
  isConstellation = false,
  dimmed = false,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const r = isAnchor ? 8 : 5
  const color = ringColorVar[feature.ring] ?? "var(--ring-0)"
  const ringNum = feature.ring.replace("r", "")

  return (
    <motion.g
      style={{ cursor: "pointer" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: dimmed ? 0.2 : 1,
        scale: 1,
      }}
      whileHover={{ scale: 1.4 }}
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
          r={r + 4}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Main dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={r}
        fill={color}
        filter={isConstellation ? `url(#glow-${feature.id})` : undefined}
      />

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Background rect */}
            <rect
              x={x - 80}
              y={y - 56}
              width={160}
              height={46}
              rx={6}
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            {/* Feature ID + name */}
            <text
              x={x}
              y={y - 38}
              textAnchor="middle"
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={10}
              fontWeight={600}
              fill={color}
            >
              [{feature.id}] {feature.short}
            </text>
            {/* Ring + Phase */}
            <text
              x={x}
              y={y - 25}
              textAnchor="middle"
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={9}
              fill="var(--tx-3)"
            >
              Ring {ringNum} {"\u00b7"} Phase {feature.phase ?? "\u2014"} {"\u00b7"} {feature.priority} {priorityLabel[feature.priority] ?? ""}
            </text>
            {/* Problem cluster if present */}
            {feature.problemCluster && (
              <text
                x={x}
                y={y - 13}
                textAnchor="middle"
                fontFamily="'Geist Mono Variable', monospace"
                fontSize={9}
                fill="var(--tx-3)"
              >
                [{feature.problemCluster}] Cluster
              </text>
            )}
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  )
}

export { FeatureNode }
