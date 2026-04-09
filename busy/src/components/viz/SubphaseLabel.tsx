import { motion } from "motion/react"
import { subphasePosition } from "@lib/ring-geometry"
import type { Subphase } from "@data/types"

interface Props {
  subphases: Subphase[]
}

function SubphaseLabel({ subphases }: Props) {
  return (
    <>
      {subphases.map((sp, i) => {
        const pos = subphasePosition(sp)
        return (
          <motion.g
            key={`${sp.ring}-${sp.code}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            {/* Tick dot marker */}
            <circle
              cx={pos.x}
              cy={pos.y - 14}
              r={2}
              fill="var(--tx-3)"
            />

            {/* Code (bold) */}
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="auto"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                fill: "var(--tx-3)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {sp.code}
            </text>

            {/* Label */}
            <text
              x={pos.x}
              y={pos.y + 13}
              textAnchor="middle"
              dominantBaseline="auto"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                fill: "var(--tx-3)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {sp.label}
            </text>
          </motion.g>
        )
      })}
    </>
  )
}

export { SubphaseLabel }
