import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getRings, getFeatures, getRoadmap, getFocusPath } from '@lib/data'
import { ConstellationToggle } from '@components/viz/ConstellationToggle'
import PageHeader from '@components/layout/PageHeader'
import type { Feature, RingId } from '@data/types'
import { useIsCompact } from '@lib/useIsCompact'

const rings = getRings()
const features = getFeatures()
const phases = getRoadmap()
const focusPath = getFocusPath()

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
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

const STAKEHOLDER_EMOJI: Record<string, { emoji: string; label: string }> = {
  fw:   { emoji: '◉', label: 'Focus Worker' },
  fam:  { emoji: '♥', label: 'Семья' },
  col:  { emoji: '◆', label: 'Коллеги' },
  dev:  { emoji: '⌘', label: 'Developer' },
  lead: { emoji: '◈', label: 'Руководитель' },
  sh:   { emoji: '⌂', label: 'Smart Home' },
  str:  { emoji: '◎', label: 'Стример' },
  it:   { emoji: '⚙', label: 'IT Manager' },
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
  const [openPhases, setOpenPhases] = useState<Set<string>>(() => new Set(['p0']))

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

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
    <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'left' }}>
      <PageHeader
        title="ROADMAP"
        meta="4 кольца · 6 фаз · сейчас → 36 мес"
        marginBottom="var(--space-6)"
      />

      {/* ── Floating focus toggle ── */}
      <div
        style={{
          position: 'fixed',
          top: 68,
          right: 16,
          zIndex: 40,
          pointerEvents: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
                  fontSize: 'var(--text-xs)',
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
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--tx-3)',
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
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
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
                        color: 'var(--tx-2)',
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
          const isOpen = openPhases.has(phase.id)
          const phaseLabel = phase.label.split(' — ')[1] ?? phase.label

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
            >

              {/* Accordion card */}
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-2)',
                  background: 'var(--surface)',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-base), background var(--transition-base)',
                }}
              >
                {/* ── Collapsed summary row (always visible) ── */}
                <button
                  type="button"
                  onClick={() => togglePhase(phase.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: isCompact ? 'var(--space-3) var(--space-3)' : 'var(--space-3) var(--space-4)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {/* Ring pill */}
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color,
                      background: `color-mix(in srgb, ${color} 12%, var(--surface))`,
                      border: `1px solid color-mix(in srgb, ${color} 30%, var(--border))`,
                      borderRadius: 'var(--radius-full)',
                      padding: '2px 8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    R{phase.ring.replace('r', '')}
                  </span>

                  {/* Phase name */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: isCompact ? 13 : 14,
                      fontWeight: 700,
                      color: 'var(--tx)',
                      letterSpacing: '0.02em',
                      flexShrink: 0,
                    }}
                  >
                    {phaseLabel}
                  </span>

                  {/* Horizon */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--tx-3)',
                      flexShrink: 0,
                    }}
                  >
                    {phase.horizon}
                  </span>

                  {/* Outcome snippet — fills available space, truncates */}
                  {phase.outcome && !isOpen && (
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        color: 'var(--tx-3)',
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {phase.outcome}
                    </span>
                  )}


                  {/* Spacer when open (outcome shown inside body instead) */}
                  {isOpen && <span style={{ flex: 1 }} />}

                  {/* Stakeholder icons — collapsed */}
                  <span style={{ display: 'flex', gap: 'var(--space-1)', marginLeft: 'auto', marginRight: 'var(--space-2)', flexShrink: 0 }}>
                    {phase.ajtbd.stakeholders.map(id => {
                      const s = STAKEHOLDER_EMOJI[id]
                      if (!s) return null
                      return (
                        <span
                          key={id}
                          title={s.label}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 22,
                            height: 22,
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--bg-2)',
                            border: '1px solid var(--border)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--tx-2)',
                            flexShrink: 0,
                          }}
                        >
                          {s.emoji}
                        </span>
                      )
                    })}
                  </span>

                  {/* Chevron */}
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      color: 'var(--tx-3)',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-base)',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    ›
                  </span>
                </button>

                {/* ── Expanded body ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: isCompact
                            ? 'var(--space-1) var(--space-3) var(--space-4)'
                            : 'var(--space-1) var(--space-4) var(--space-4)',
                          borderTop: '1px solid var(--border)',
                        }}
                      >
                        {/* Gate metric — promoted to top of expanded body */}
                        {phase.gate && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-2)',
                              padding: '8px 12px',
                              marginBottom: 'var(--space-4)',
                              marginTop: 'var(--space-3)',
                              background: 'var(--surface)',
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius-md)',
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--tx-3)', flexShrink: 0 }}>
                              Gate
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--tx)', lineHeight: 1.4 }}>
                              {phase.gate}
                            </span>
                          </div>
                        )}

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

                        {/* ── AJTBD block ── */}
                        <div style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-4)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--space-3)',
                          marginBottom: 'var(--space-4)',
                          maxWidth: 860,
                        }}>
                          {/* Header row: label + stakeholder icons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--tx-3)',
                            }}>
                              Работа
                            </span>
                            <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                            <span style={{ display: 'flex', gap: 'var(--space-1)' }}>
                              {phase.ajtbd.stakeholders.map(id => {
                                const s = STAKEHOLDER_EMOJI[id]
                                if (!s) return null
                                return (
                                  <span
                                    key={id}
                                    title={s.label}
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: 24,
                                      height: 24,
                                      borderRadius: 'var(--radius-full)',
                                      background: 'var(--bg-2)',
                                      border: '1px solid var(--border)',
                                      fontSize: 12,
                                      color: 'var(--tx-2)',
                                    }}
                                  >
                                    {s.emoji}
                                  </span>
                                )
                              })}
                            </span>
                          </div>

                          {/* Job statement */}
                          <p style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: isCompact ? 13 : 14,
                            fontWeight: 500,
                            color: 'var(--tx)',
                            lineHeight: 1.5,
                            margin: 0,
                            fontStyle: 'italic',
                          }}>
                            «{phase.ajtbd.job}»
                          </p>

                          {/* 4 forces */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
                            gap: 'var(--space-2)',
                          }}>
                            {([
                              { key: 'push',    icon: '↑', label: 'Боль',      value: phase.ajtbd.forces.push    },
                              { key: 'pull',    icon: '→', label: 'Притяжение', value: phase.ajtbd.forces.pull    },
                              { key: 'anxiety', icon: '⚡', label: 'Тревога',   value: phase.ajtbd.forces.anxiety },
                              { key: 'habit',   icon: '↺', label: 'Привычка',  value: phase.ajtbd.forces.habit   },
                            ] as const).map(({ key, icon, label, value }) => (
                              <div key={key} style={{
                                display: 'flex',
                                gap: 'var(--space-2)',
                                alignItems: 'flex-start',
                              }}>
                                <span style={{
                                  flexShrink: 0,
                                  width: 20,
                                  height: 20,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 'var(--radius-sm)',
                                  background: 'var(--bg-2)',
                                  fontSize: 'var(--text-xs)',
                                  color: 'var(--tx-2)',
                                  marginTop: 1,
                                }}>
                                  {icon}
                                </span>
                                <div>
                                  <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: 'var(--tx-3)',
                                    display: 'block',
                                  }}>
                                    {label}
                                  </span>
                                  <span style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: isCompact ? 12 : 13,
                                    color: 'var(--tx-2)',
                                    lineHeight: 1.45,
                                  }}>
                                    {value}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

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
                                border: '1px solid var(--border)',
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
                                      color: 'var(--tx-3)',
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
                                        <span style={{ color: 'var(--tx-3)', fontSize: 'var(--text-xs)', marginTop: 2, flexShrink: 0 }}>◆</span>
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
                                  background: 'var(--surface)',
                                  border: '1px solid var(--border)',
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
                                    color: 'var(--tx-3)',
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
                                    background: isSelected ? 'var(--surface-2)' : 'var(--surface)',
                                    border: `1px solid ${isSelected || highlighted ? 'var(--border-2)' : 'var(--border)'}`,
                                    borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.15s, background 0.15s',
                                    textAlign: 'left',
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: 'var(--text-xs)',
                                      fontWeight: 700,
                                      color: 'var(--tx-3)',
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
                                <span style={{ fontSize: 'var(--text-xs)', flexShrink: 0, marginTop: 2, color: 'var(--tx-3)' }}>⚠</span>
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
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
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
              border: '1px solid var(--border)',
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
                color: 'var(--tx-3)',
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
              <PanelMeta label="Ring" value={selectedRing?.short ?? selectedFeature.ring} />
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
