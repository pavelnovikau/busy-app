import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getPrototypes } from '@lib/data'
import type { Prototype } from '@data/types'
import { FocusHeatmap } from '@components/proto/FocusHeatmap'
import { AIFocusMentor } from '@components/proto/AIFocusMentor'
import { EnergyPrediction } from '@components/proto/EnergyPrediction'
import { TeamFlowDashboard } from '@components/proto/TeamFlowDashboard'
import { FocusProfile } from '@components/proto/FocusProfile'
import { BodyDoublingRoom } from '@components/proto/BodyDoublingRoom'
import { AICoachChat } from '@components/proto/AICoachChat'
import { FocusProfilePage } from '@components/proto/FocusProfilePage'
import { useIsCompact } from '@lib/useIsCompact'

const prototypes = getPrototypes()

const ringLabel: Record<string, string> = {
  r0: 'Ring 0 · Core',
  r1: 'Ring 1 · Software',
  r2: 'Ring 2 · Platform',
  r3: 'Ring 3 · Ecosystem',
}

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

const ringDimVar: Record<string, string> = {
  r0: 'var(--ring-0-dim)', r1: 'var(--ring-1-dim)', r2: 'var(--ring-2-dim)', r3: 'var(--ring-3-dim)',
}

const phaseLabel: Record<string, string> = {
  '1.0': 'Фаза 1.0',
  '1.5': 'Фаза 1.5',
  '2.0': 'Фаза 2.0',
  '2.5': 'Фаза 2.5',
  '3':   'Фаза 3',
}

const stakeholderLabel: Record<string, string> = {
  fw: 'Focus Worker', dev: 'Developer', sh: 'Smart Home',
  str: 'Стример', it: 'IT Manager', lead: 'Руководитель',
  fam: 'Семья', col: 'Коллеги',
}

const protoComponents: Record<string, React.ComponentType> = {
  'focus-heatmap': FocusHeatmap,
  'ai-focus-mentor': AIFocusMentor,
  'energy-prediction': EnergyPrediction,
  'team-flow-dashboard': TeamFlowDashboard,
  'focus-profile': FocusProfile,
  'body-doubling-room': BodyDoublingRoom,
  'ai-coach-chat': AICoachChat,
  'focus-profile-page': FocusProfilePage,
}

// All unique stakeholders that appear in prototypes
const allStakeholders = [...new Set(prototypes.flatMap((p) => p.stakeholders))]
const allPhases = [...new Set(prototypes.map((p) => p.phase))].sort()
const allRings = [...new Set(prototypes.map((p) => p.ring))].sort()

type FilterChipProps = {
  label: string
  active: boolean
  color?: string
  dimColor?: string
  onClick: () => void
}

function FilterChip({ label, active, color, dimColor, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${active && color ? color : 'var(--border)'}`,
        background: active ? (dimColor ?? 'var(--surface-2)') : 'transparent',
        color: active ? (color ?? 'var(--tx)') : 'var(--tx-3)',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
      }}
    >
      {label}
    </button>
  )
}

export default function PrototypesPage() {
  const isCompact = useIsCompact()
  const [activeRing, setActiveRing] = useState<string | null>(null)
  const [activePhase, setActivePhase] = useState<string | null>(null)
  const [activeStakeholder, setActiveStakeholder] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = prototypes.filter((p: Prototype) => {
    if (activeRing && p.ring !== activeRing) return false
    if (activePhase && p.phase !== activePhase) return false
    if (activeStakeholder && !p.stakeholders.includes(activeStakeholder)) return false
    return true
  })

  return (
    <div style={{ textAlign: 'left' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
          marginBottom: 'var(--space-4)',
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
          Прототипы
        </h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)' }}>
          {filtered.length}/{prototypes.length} экранов
        </span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {/* Ring filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 60 }}>Кольцо</span>
          <FilterChip label="Все" active={activeRing === null} onClick={() => setActiveRing(null)} />
          {allRings.map((r) => (
            <FilterChip
              key={r}
              label={`Кольцо ${r.replace('r', '')}`}
              active={activeRing === r}
              color={ringColorVar[r]}
              dimColor={ringDimVar[r]}
              onClick={() => setActiveRing(activeRing === r ? null : r)}
            />
          ))}
        </div>

        {/* Phase filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 60 }}>Фаза</span>
          <FilterChip label="Все" active={activePhase === null} onClick={() => setActivePhase(null)} />
          {allPhases.map((ph) => (
            <FilterChip
              key={ph}
              label={phaseLabel[ph] ?? `Фаза ${ph}`}
              active={activePhase === ph}
              onClick={() => setActivePhase(activePhase === ph ? null : ph)}
            />
          ))}
        </div>

        {/* Stakeholder filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', width: 60 }}>Кто</span>
          <FilterChip label="Все" active={activeStakeholder === null} onClick={() => setActiveStakeholder(null)} />
          {allStakeholders.map((s) => (
            <FilterChip
              key={s}
              label={stakeholderLabel[s] ?? s}
              active={activeStakeholder === s}
              onClick={() => setActiveStakeholder(activeStakeholder === s ? null : s)}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              padding: 'var(--space-12)',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              color: 'var(--tx-3)',
            }}
          >
            Нет экранов для выбранных фильтров
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            style={{
              display: 'grid',
              gridTemplateColumns: isCompact ? '1fr' : 'repeat(auto-fit, minmax(340px, 1fr))',
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
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: 'var(--surface)',
                  }}
                >
                  {/* Top strip: ring + phase */}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)' }}>
                        {phaseLabel[proto.phase] ?? proto.phase}
                      </span>
                      {proto.stakeholders.map((s) => (
                        <span
                          key={s}
                          title={stakeholderLabel[s]}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 9,
                            color: 'var(--tx-3)',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-full)',
                            padding: '1px 6px',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div style={{ overflow: 'hidden', maxHeight: 320 }}>
                    <Component />
                  </div>

                  {/* Footer */}
                  <div style={{ padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--tx)', marginBottom: 'var(--space-1)' }}>
                      {proto.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-3)', lineHeight: 1.4 }}>
                      {proto.description}
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded(proto.id)}
                      style={{
                        marginTop: 'var(--space-3)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: ringColor,
                        background: 'transparent',
                        border: `1px solid ${ringColor}`,
                        borderRadius: 'var(--radius-full)',
                        padding: '6px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      Открыть
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (() => {
          const proto = prototypes.find((p: Prototype) => p.id === expanded)
          const Component = proto ? protoComponents[proto.id] : null
          if (!proto || !Component) return null
          return (
            <motion.div
              key="overlay"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--overlay)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 120,
                padding: isCompact ? 'var(--space-3)' : 'var(--space-6)',
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
                  maxWidth: 520,
                  width: '100%',
                  maxHeight: 'calc(100svh - 24px)',
                  overflowY: 'auto',
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
