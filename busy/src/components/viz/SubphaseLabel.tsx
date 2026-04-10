import { motion } from "motion/react"
import { subphasePosition } from "@lib/ring-geometry"
import type { Subphase } from "@data/types"

interface Props {
  subphases: Subphase[]
}

// How far beyond ring radius to place the label
const LABEL_OFFSET = 40

const ringColorVar: Record<string, string> = {
  r1: "var(--ring-1)",
  r2: "var(--ring-2)",
}

function SubphaseLabel({ subphases }: Props) {
  return (
    <>
      {subphases.map((sp, i) => {
        const pos = subphasePosition(sp, LABEL_OFFSET)
        const anchor: React.SVGAttributes<SVGTextElement>["textAnchor"] =
          pos.cosA > 0.25 ? "start" : pos.cosA < -0.25 ? "end" : "middle"
        const color = ringColorVar[sp.ring] ?? "var(--tx-3)"

        return (
          <motion.g
            key={`${sp.ring}-${sp.code}`}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {/* Phase code: bold monospace, ring color */}
            <text
              x={pos.x}
              y={pos.y}
              textAnchor={anchor}
              fontFamily="'Geist Mono Variable', monospace"
              fontSize={9.5}
              fontWeight={700}
              fill={color}
              opacity={0.85}
              style={{ letterSpacing: "0.14em" }}
            >
              {sp.code}
            </text>

            {/* Phase label: slightly larger, tx-2 color */}
            <text
              x={pos.x}
              y={pos.y + 15}
              textAnchor={anchor}
              fontFamily="'Geist Variable', sans-serif"
              fontSize={12}
              fontWeight={600}
              fill="var(--tx-2)"
              opacity={0.88}
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
