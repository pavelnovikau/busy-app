import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getRings, getFeatures, getRoadmap, getFocusPath } from '@lib/data'
import { ConstellationToggle } from '@components/viz/ConstellationToggle'
import type { Feature, RingId } from '@data/types'
import { useIsCompact } from '@lib/useIsCompact'

const rings = getRings()
const features = getFeatures()
const phases = getRoadmap()
const focusPath = getFocusPath()

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

const ringLabel: Record<string, string> = {
  r0: 'Core', r1: 'Software', r2: 'Platform', r3: 'Ecosystem',
}

const priorityColor: Record<string, string> = {
  '●': 'var(--tx)',
  '◐': 'var(--tx-2)',
  '○': 'var(--tx-3)',
}

const priorityLabel: Record<string, string> = {
  '●': 'P0 — критично',
  '◐': 'P1 — важно',
  '○': 'P2 — желательно',
}

function getPhaseFeatures(ringId: RingId, phaseCode: string | null): Feature[] {
  if (phaseCode === null) {
    return features.filter((f) => f.ring === ringId && f.phase === null)
  }
  return features.filter((f) => f.ring === ringId && f.phase === phaseCode)
}

// Focus constellation feature keys: "ring:id"
const focusKeys = new Set(focusPath.nodes)

export default function RoadmapPage() {
  const isCompact = useIsCompact()
  const [focusMode, setFocusMode] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  const ringMeta = useMemo(
    () => Object.fromEntries(rings.map((r) => [r.id, r])),
    [],
  )

  const phaseFeaturesMap = useMemo(() => {
    const map: Record<string, Feature[]> = {}
    for (const p of phases) {
      const phaseCode = p.id === 'p0' || p.id === 'p3' ? null : p.id.replace('p', '')
      map[p.id] = getPhaseFeatures(p.ring, phaseCode)
    }
    return map
  }, [])

  const handleFeatureClick = (f: Feature) => {
    setSelectedFeature((prev) => prev?.id === f.id ? null : f)
  }

  const selectedRing = selectedFeature ? ringMeta[selectedFeature.ring] : null

  return (
    <div style={{ maxWidth: 980, textAlign: 'left' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: isCompact ? 'wrap' : 'nowrap',
          gap: 'var(--space-4)',
          padding: 'var(--space-4) 0 var(--space-6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--tx)',
              margin: 0,
            }}
          >
            Роадмап
          </h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--tx-3)' }}>
            4 кольца · 6 фаз · сейчас → 36 мес
          </span>
        </div>

        <ConstellationToggle
          active={focusMode}
          onToggle={() => {
            setFocusMode((prev) => !prev)
            setSelectedFeature(null)
          }}
        />
      </div>

      {/* ── Gantt timeline ── */}
      <div style={{ marginBottom: 'var(--space-8)', overflowX: 'auto' }}>
        {/* Month axis */}
        <div style={{ position: 'relative', paddingBottom: 'var(--space-2)', minWidth: isCompact ? 640 : undefined }}>
          {/* Axis labels */}
          <div style={{ display: 'flex', marginBottom: 'var(--space-2)', paddingLeft: 72 }}>
            {[0, 6, 12, 18, 24, 30, 36].map((m) => (
              <div
                key={m}
                style={{
                  flex: m === 36 ? '0 0 auto' : '6 0 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--tx-3)',
                  letterSpacing: '0.06em',
                }}
              >
                {m === 0 ? 'сейчас' : `${m}м`}
              </div>
            ))}
          </div>

          {/* Gantt bars */}
          {phases.map((phase) => {
            const [start, end] = phase.monthsRange
            const color = ringColorVar[phase.ring]
            const leftPct = (start / 36) * 100
            const widthPct = Math.max((end - start) / 36 * 100, 2)
            const label = phase.label.split(' — ')[1] ?? phase.label
            return (
              <div
                key={phase.id}
                style={{ display: 'flex', alignItems: 'center', marginBottom: 6, gap: 0 }}
              >
                {/* Ring label */}
                <div
                  style={{
                    width: 68,
                    flexShrink: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    color,
                    textAlign: 'right',
                    paddingRight: 8,
                    letterSpacing: '0.05em',
                  }}
                >
                  {phase.id === 'p0' ? 'R0' : phase.id.replace('p', 'P')}
                </div>

                {/* Bar track */}
                <div style={{ flex: 1, position: 'relative', height: 28 }}>
                  {/* Background track */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '7px 0',
                      background: 'var(--surface-2)',
                      borderRadius: 2,
                    }}
                  />
                  {/* Grid lines at 6m intervals */}
                  {[1/6, 2/6, 3/6, 4/6, 5/6].map((f) => (
                    <div
                      key={f}
                      style={{
                        position: 'absolute',
                        left: `${f * 100}%`,
                        top: 0,
                        bottom: 0,
                        width: 1,
                        background: 'var(--border)',
                      }}
                    />
                  ))}
                  {/* Colored bar */}
                  <div
                    style={{
                      position: 'absolute',
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      top: 4,
                      bottom: 4,
                      background: `color-mix(in oklch, ${color} 30%, var(--surface))`,
                      border: `1px solid ${color}`,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 7,
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        fontWeight: 600,
                        color,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Phase list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {phases.map((phase, index) => {
          const color = ringColorVar[phase.ring]
          const feats = phaseFeaturesMap[phase.id] ?? []
          const prevPhase = phases[index - 1]
          const showGate = index > 0 && phase.gate != null

          return (
            <div key={phase.id}>
              {/* Gate checkpoint */}
              {showGate && (
                <div style={{ padding: 'var(--space-3) 0 var(--space-2)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'stretch',
                      gap: 'var(--space-3)',
                      padding: '10px 14px',
                      background: `color-mix(in oklch, ${ringColorVar[prevPhase?.ring ?? 'r0']} 7%, var(--surface))`,
                      border: `1px solid color-mix(in oklch, ${ringColorVar[prevPhase?.ring ?? 'r0']} 35%, var(--border))`,
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    {/* Left accent bar */}
                    <div
                      style={{
                        width: 3,
                        borderRadius: 2,
                        background: ringColorVar[prevPhase?.ring ?? 'r0'],
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: ringColorVar[prevPhase?.ring ?? 'r0'],
                          marginBottom: 4,
                        }}
                      >
                        ◆ Gate — переход в {phase.label.split(' — ')[0]}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'var(--tx)',
                          lineHeight: 1.4,
                        }}
                      >
                        {phase.gate}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Phase section */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                style={{
                  paddingLeft: 0,
                  paddingBottom: 'var(--space-5)',
                }}
              >
                {/* Phase header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-3)',
                    paddingTop: 'var(--space-4)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color,
                    }}
                  >
                    Ring {phase.ring.replace('r', '')} · {ringLabel[phase.ring]}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--tx)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {phase.label.split(' — ')[1] ?? phase.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--tx-3)',
                    }}
                  >
                    {phase.horizon}
                  </span>
                </div>

                {/* Intro */}
                {phase.intro && (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 13,
                      color: 'var(--tx-2)',
                      lineHeight: 1.65,
                      margin: '0 0 var(--space-4)',
                      maxWidth: 680,
                    }}
                  >
                    {phase.intro}
                  </p>
                )}

                {(phase.outcome || phase.uniqueFeatures?.length || phase.whyDifferent) && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isCompact ? '1fr' : 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-4)',
                      maxWidth: 860,
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--surface)',
                        border: `1px solid color-mix(in srgb, ${color} 22%, var(--border))`,
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-4)',
                        boxShadow: 'var(--shadow-xs)',
                      }}
                    >
                      {phase.outcome && (
                        <>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              color,
                              marginBottom: 6,
                            }}
                          >
                            Что меняется на этом этапе
                          </div>
                          <p
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: 13,
                              color: 'var(--tx)',
                              lineHeight: 1.6,
                              margin: phase.uniqueFeatures?.length ? '0 0 var(--space-3)' : 0,
                            }}
                          >
                            {phase.outcome}
                          </p>
                        </>
                      )}

                      {phase.uniqueFeatures?.length ? (
                        <>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              color: 'var(--tx-3)',
                              marginBottom: 8,
                            }}
                          >
                            Уникально у BUSY
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {phase.uniqueFeatures.map((point, pointIndex) => (
                              <div key={pointIndex} style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                                <span style={{ color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>◆</span>
                                <span
                                  style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: 13,
                                    color: 'var(--tx-2)',
                                    lineHeight: 1.55,
                                  }}
                                >
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>

                    {phase.whyDifferent && (
                      <div
                        style={{
                          background: `color-mix(in srgb, ${color} 6%, var(--surface))`,
                          border: `1px solid color-mix(in srgb, ${color} 28%, var(--border))`,
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--space-4)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color,
                            marginBottom: 8,
                          }}
                        >
                          Почему это не commodity
                        </div>
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                            color: 'var(--tx)',
                            lineHeight: 1.62,
                            margin: 0,
                          }}
                        >
                          {phase.whyDifferent}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                {feats.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-2)',
                      marginBottom: phase.circuitBreakers.length > 0 ? 'var(--space-4)' : 0,
                    }}
                  >
                    {feats.map((f) => {
                      const key = `${f.ring}:${f.id}`
                      const isOnPath = focusKeys.has(key)
                      const dimmed = focusMode && !isOnPath
                      const highlighted = focusMode && isOnPath
                      const isSelected = selectedFeature?.id === f.id
                      return (
                        <motion.button
                          key={f.id}
                          type="button"
                          animate={{ opacity: dimmed ? 0.25 : 1 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleFeatureClick(f)}
                          aria-pressed={isSelected}
                          aria-label={`${f.id}. ${f.short}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '5px 10px',
                            background: isSelected ? color + '18' : 'var(--surface)',
                            border: `1px solid ${isSelected ? color : highlighted ? color : 'var(--border)'}`,
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s, background 0.15s',
                            textAlign: 'left',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 11,
                              fontWeight: 700,
                              color,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {f.id}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: 13,
                              color: 'var(--tx)',
                            }}
                          >
                            {f.short}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-sans)',
                              fontSize: 13,
                              color: priorityColor[f.priority] ?? 'var(--tx-3)',
                              marginLeft: 2,
                            }}
                          >
                            {f.priority}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                {/* Circuit breakers */}
                {phase.circuitBreakers.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {phase.circuitBreakers.map((cb, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--space-2)',
                          padding: '8px 12px',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                        }}
                      >
                        <span style={{ fontSize: 11, flexShrink: 0, marginTop: 2, color: 'var(--tx-3)' }}>⚠</span>
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                            color: 'var(--tx-2)',
                            lineHeight: 1.5,
                          }}
                        >
                          {cb}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Feature detail panel */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              bottom: isCompact ? 84 : 24,
              left: isCompact ? 12 : '50%',
              right: isCompact ? 12 : 'auto',
              transform: isCompact ? 'none' : 'translateX(-50%)',
              width: isCompact ? 'auto' : 420,
              background: 'var(--surface)',
              border: `1px solid ${ringColorVar[selectedFeature.ring] ?? 'var(--border)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
            }}
          >
            <button
              onClick={() => setSelectedFeature(null)}
              style={{
                position: 'absolute',
                top: 8,
                right: 10,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                color: 'var(--tx-3)',
                lineHeight: 1,
                padding: 2,
              }}
            >
              ×
            </button>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                color: ringColorVar[selectedFeature.ring],
                letterSpacing: '0.08em',
                marginBottom: 4,
              }}
            >
              {selectedFeature.id}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--tx)',
                marginBottom: 'var(--space-3)',
                paddingRight: 20,
              }}
            >
              {selectedFeature.short}
            </div>

            {selectedFeature.description && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: 'var(--tx-2)',
                  lineHeight: 1.55,
                  margin: '0 0 var(--space-3)',
                }}
              >
                {selectedFeature.description}
              </p>
            )}

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <PanelMeta label="Ring" value={selectedRing?.short ?? selectedFeature.ring} color={ringColorVar[selectedFeature.ring]} />
              {selectedFeature.phase && <PanelMeta label="Phase" value={`Phase ${selectedFeature.phase}`} />}
              <PanelMeta label="Priority" value={priorityLabel[selectedFeature.priority] ?? ''} />
              {selectedFeature.problemCluster && <PanelMeta label="Cluster" value={`Cluster ${selectedFeature.problemCluster}`} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PanelMeta({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--tx-3)', marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: color ?? 'var(--tx-2)' }}>
        {value}
      </div>
    </div>
  )
}
