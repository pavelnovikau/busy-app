import { useMemo } from 'react'
import roadmapData from '@data/roadmap.json'
import prototypesData from '@data/prototypes.json'
import type { RoadmapPhase, Prototype } from '@data/types'
import { PhaseSection } from '@components/roadmap/PhaseSection'
import { GateDivider } from '@components/roadmap/GateDivider'
import { CircuitBreaker } from '@components/roadmap/CircuitBreaker'
import { PrototypeSlot } from '@components/roadmap/PrototypeSlot'
import { FocusHeatmap } from '@components/proto/FocusHeatmap'
import { AIFocusMentor } from '@components/proto/AIFocusMentor'
import { EnergyPrediction } from '@components/proto/EnergyPrediction'
import { TeamFlowDashboard } from '@components/proto/TeamFlowDashboard'
import { FocusProfile } from '@components/proto/FocusProfile'
import { BodyDoublingRoom } from '@components/proto/BodyDoublingRoom'

const phases = roadmapData as RoadmapPhase[]
const prototypes = prototypesData as Prototype[]

export default function RoadmapPage() {
  const protoLookup = useMemo(
    () => new Map(prototypes.map((p) => [p.id, p])),
    [],
  )

  const protoComponents: Record<string, React.ComponentType> = useMemo(() => ({
    'focus-heatmap': FocusHeatmap,
    'ai-focus-mentor': AIFocusMentor,
    'energy-prediction': EnergyPrediction,
    'team-flow-dashboard': TeamFlowDashboard,
    'focus-profile': FocusProfile,
    'body-doubling-room': BodyDoublingRoom,
  }), [])

  return (
    <div>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0',
          marginBottom: 'var(--space-6)',
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
          Roadmap
        </h1>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--tx-3)',
          }}
        >
          4 rings · 6 phases · 18–36 months
        </span>
      </div>

      {/* Phase list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {phases.map((phase, index) => {
          const prevPhase = phases[index - 1]
          const showGate = index > 0 && phase.gate != null

          return (
            <div key={phase.id}>
              {showGate && (
                <GateDivider
                  gate={phase.gate!}
                  fromRing={prevPhase?.ring ?? 'r0'}
                  toRing={phase.ring}
                />
              )}

              <PhaseSection phase={phase}>
                {/* Circuit breakers — full width row */}
                {phase.circuitBreakers.length > 0 && (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-2)',
                    }}
                  >
                    {phase.circuitBreakers.map((cb, i) => (
                      <CircuitBreaker key={i} text={cb} />
                    ))}
                  </div>
                )}

                {/* Prototype slots */}
                {phase.prototypeIds.map((pid) => {
                  const proto = protoLookup.get(pid)
                  if (!proto) return null
                  return (
                    <PrototypeSlot
                      key={pid}
                      prototypeId={pid}
                      title={proto.title}
                      ring={proto.ring}
                      PreviewComponent={protoComponents[pid]}
                    />
                  )
                })}
              </PhaseSection>
            </div>
          )
        })}
      </div>
    </div>
  )
}
