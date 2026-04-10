import { motion, AnimatePresence } from 'motion/react'
import focusPathData from '@data/focus-path.json'
import { constellationEdgePath } from '@lib/ring-geometry'
import type { FocusPath } from '@data/types'

const focusPath = focusPathData as FocusPath

interface Props {
  active: boolean
  featurePositions: Map<string, { x: number; y: number }>
}

export default function ConstellationOverlay({
  active,
  featurePositions,
}: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.g
          key="constellation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Edges */}
          {focusPath.edges.map((edge, i) => {
            const d = constellationEdgePath(
              edge.from,
              edge.to,
              featurePositions,
            )
            if (!d) return null

            const isLocal = edge.type === 'local'
            return (
              <motion.path
                key={`edge-${edge.from}-${edge.to}`}
                d={d}
                fill="none"
                stroke={
                  isLocal
                    ? 'var(--constellation-edge-local)'
                    : 'var(--constellation-edge-bridge)'
                }
                strokeWidth={isLocal ? 1.5 : 2.5}
                strokeDasharray={isLocal ? '4 3' : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
              />
            )
          })}

          {/* Anchor nodes — pulsing circles */}
          {focusPath.anchors.map((anchorKey, i) => {
            const featureId = anchorKey.split(':')[1]
            const pos = featurePositions.get(featureId)
            if (!pos) return null

            const totalEdgeDelay = focusPath.edges.length * 0.1 + 0.4
            return (
              <motion.circle
                key={`anchor-${anchorKey}`}
                cx={pos.x}
                cy={pos.y}
                r={6}
                fill="var(--constellation-anchor)"
                stroke="var(--constellation-anchor)"
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: 1,
                }}
                transition={{
                  delay: totalEdgeDelay + i * 0.08,
                  scale: {
                    delay: totalEdgeDelay + i * 0.08,
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  opacity: {
                    delay: totalEdgeDelay + i * 0.08,
                    duration: 0.3,
                  },
                }}
              />
            )
          })}

          {/* Anchor labels — appear after edges */}
          {focusPath.anchors.map((anchorKey, i) => {
            const featureId = anchorKey.split(':')[1]
            const pos = featurePositions.get(featureId)
            const label = focusPath.anchorLabels[anchorKey]
            if (!pos || !label) return null

            const totalEdgeDelay = focusPath.edges.length * 0.1 + 0.4
            return (
              <motion.text
                key={`anchor-label-${anchorKey}`}
                x={pos.x}
                y={pos.y - 14}
                textAnchor="middle"
                fontFamily="'Geist Mono Variable', monospace"
                fontSize={10}
                fontWeight={600}
                fill="var(--constellation-anchor)"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: totalEdgeDelay + 0.3 + i * 0.08,
                  duration: 0.4,
                }}
              >
                {label}
              </motion.text>
            )
          })}
        </motion.g>
      )}
    </AnimatePresence>
  )
}
