import { motion } from "motion/react"
import { stakeholderPosition } from "@lib/ring-geometry"
import type { Stakeholder } from "@data/types"

interface Props {
  stakeholders: Stakeholder[]
  dimmed?: boolean
}

function StakeholderNodes({ stakeholders, dimmed = false }: Props) {
  return (
    <>
      {stakeholders.map((s, i) => {
        const pos = stakeholderPosition(s.angleDeg)
        return (
          <motion.g
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: dimmed ? 0.2 : 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            {/* Outer circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={18}
              fill="var(--bg)"
              stroke="var(--tx-3)"
              strokeWidth={1.5}
            />

            {/* Emoji centered */}
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: 14,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {s.emoji}
            </text>

            {/* Name label below */}
            <text
              x={pos.x}
              y={pos.y + 30}
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
              {s.name}
            </text>
          </motion.g>
        )
      })}
    </>
  )
}

export { StakeholderNodes }
