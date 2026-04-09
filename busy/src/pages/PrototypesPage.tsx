import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import prototypesData from '@data/prototypes.json'
import type { Prototype } from '@data/types'
import { FocusHeatmap } from '@components/proto/FocusHeatmap'
import { AIFocusMentor } from '@components/proto/AIFocusMentor'
import { EnergyPrediction } from '@components/proto/EnergyPrediction'
import { TeamFlowDashboard } from '@components/proto/TeamFlowDashboard'
import { FocusProfile } from '@components/proto/FocusProfile'
import { BodyDoublingRoom } from '@components/proto/BodyDoublingRoom'

const prototypes = prototypesData as Prototype[]

const ringLabel: Record<string, string> = {
  r0: 'Ring 0 · Core',
  r1: 'Ring 1 · Software',
  r2: 'Ring 2 · Platform',
  r3: 'Ring 3 · Ecosystem',
}

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)',
  r1: 'var(--ring-1)',
  r2: 'var(--ring-2)',
  r3: 'var(--ring-3)',
}

const ringDimVar: Record<string, string> = {
  r0: 'var(--ring-0-dim)',
  r1: 'var(--ring-1-dim)',
  r2: 'var(--ring-2-dim)',
  r3: 'var(--ring-3-dim)',
}

const protoComponents: Record<string, React.ComponentType> = {
  'focus-heatmap': FocusHeatmap,
  'ai-focus-mentor': AIFocusMentor,
  'energy-prediction': EnergyPrediction,
  'team-flow-dashboard': TeamFlowDashboard,
  'focus-profile': FocusProfile,
  'body-doubling-room': BodyDoublingRoom,
}

const ALL_RINGS = ['r0', 'r1', 'r2', 'r3'] as const
const RING_FILTER_LABELS: Record<string, string> = {
  r0: 'Ring 0', r1: 'Ring 1', r2: 'Ring 2', r3: 'Ring 3',
}

export default function PrototypesPage() {
  const [activeRing, setActiveRing] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = activeRing
    ? prototypes.filter((p) => p.ring === activeRing)
    : prototypes

  return (
    <div>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
          marginBottom: 'var(--space-5)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--tx)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 600,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Prototypes
        </h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)' }}>
          {prototypes.length} screens
        </span>
      </div>

      {/* Ring filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <button
          onClick={() => setActiveRing(null)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-2)',
            background: activeRing === null ? 'var(--tx)' : 'transparent',
            color: activeRing === null ? 'var(--bg)' : 'var(--tx-2)',
            cursor: 'pointer',
          }}
        >
          All
        </button>
        {ALL_RINGS.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRing(activeRing === r ? null : r)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${activeRing === r ? ringColorVar[r] : 'var(--border)'}`,
              background: activeRing === r ? ringDimVar[r] : 'transparent',
              color: activeRing === r ? ringColorVar[r] : 'var(--tx-3)',
              cursor: 'pointer',
            }}
          >
            {RING_FILTER_LABELS[r]}
          </button>
        ))}
      </div>

      {/* Prototype grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-5)',
        }}
      >
        {filtered.map((proto, i) => {
          const Component = protoComponents[proto.id]
          if (!Component) return null
          const ringColor = ringColorVar[proto.ring]
          const ringDim = ringDimVar[proto.ring]

          return (
            <motion.div
              key={proto.id}
              layoutId={`proto-card-${proto.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
              onClick={() => setExpanded(expanded === proto.id ? null : proto.id)}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--surface)',
                cursor: 'pointer',
              }}
            >
              {/* Ring label strip */}
              <div
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: ringDim,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: ringColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {ringLabel[proto.ring]}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--tx-3)',
                  }}
                >
                  {proto.id}
                </span>
              </div>

              {/* Component preview */}
              <div
                style={{
                  overflow: 'hidden',
                  maxHeight: expanded === proto.id ? 'none' : 320,
                  transition: 'max-height var(--transition-slow)',
                }}
              >
                <Component />
              </div>

              {/* Footer: title + description */}
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    color: 'var(--tx)',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {proto.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--tx-3)',
                    lineHeight: 1.4,
                  }}
                >
                  {proto.description}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (() => {
          const proto = prototypes.find((p) => p.id === expanded)
          const Component = proto ? protoComponents[proto.id] : null
          if (!proto || !Component) return null
          return (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'oklch(0 0 0 / 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                padding: 'var(--space-6)',
              }}
            >
              <motion.div
                layoutId={`proto-card-${proto.id}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  maxWidth: 500,
                  width: '100%',
                }}
              >
                <Component />
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
