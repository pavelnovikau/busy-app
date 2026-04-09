import { useState, useMemo } from 'react'
import { getRings, getFeatures, getStakeholders, getSubphases, getFocusPath } from '@lib/data'
import { buildFeaturePositions } from '@lib/ring-geometry'
import RingsDiagram from '@components/viz/RingsDiagram'
import { ZoomableSVG } from '@components/viz/ZoomableSVG'
import ConstellationOverlay from '@components/viz/ConstellationOverlay'
import { FeatureNode } from '@components/viz/FeatureNode'
import { StakeholderNodes } from '@components/viz/StakeholderNodes'
import { SubphaseLabel } from '@components/viz/SubphaseLabel'
import { ConstellationToggle } from '@components/viz/ConstellationToggle'

const rings = getRings()
const features = getFeatures()
const stakeholders = getStakeholders()
const subphases = getSubphases()
const focusPath = getFocusPath()

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

const priorityBadgeColor: Record<string, string> = {
  P0: 'var(--ring-1)',
  P1: 'var(--ring-2)',
  P2: 'var(--ring-3)',
  P3: 'var(--tx-3)',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--tx-3)',
  marginBottom: 'var(--space-2)',
}

const divider: React.CSSProperties = {
  borderTop: '1px solid var(--border)',
  margin: 'var(--space-3) 0',
}

export default function StrategyPage() {
  const [constellationMode, setConstellationMode] = useState(false)
  const [activeStakeholder, setActiveStakeholder] = useState<string | null>(null)

  const featurePositions = useMemo(
    () => buildFeaturePositions(rings, features),
    [],
  )

  const activeRings = useMemo(() => {
    if (!activeStakeholder) return null
    const sh = stakeholders.find((s) => s.id === activeStakeholder)
    return sh ? new Set(sh.rings as string[]) : null
  }, [activeStakeholder])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '210px 1fr',
        gap: 'var(--space-5)',
        alignItems: 'start',
        paddingTop: 'var(--space-4)',
      }}
    >
      {/* ── Left sidebar ── */}
      <div
        style={{
          position: 'sticky',
          top: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Focus constellation toggle */}
        <ConstellationToggle
          active={constellationMode}
          onToggle={() => {
            setConstellationMode((prev) => !prev)
            setActiveStakeholder(null)
          }}
        />

        <div style={divider} />

        {/* Stakeholders */}
        <div style={{ marginBottom: 'var(--space-1)' }}>
          <div style={sectionLabel}>Стейкхолдеры</div>
          {stakeholders.map((sh) => {
            const active = activeStakeholder === sh.id
            return (
              <button
                key={sh.id}
                title={sh.role}
                onClick={() => {
                  setActiveStakeholder(active ? null : sh.id)
                  setConstellationMode(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  width: '100%',
                  padding: '5px var(--space-2)',
                  background: active ? 'var(--surface-2)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-fast)',
                }}
              >
                <span style={{ fontSize: 12, color: active ? ringColorVar.r1 : 'var(--tx-2)', width: 14 }}>
                  {sh.emoji}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      color: active ? 'var(--tx)' : 'var(--tx-2)',
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {sh.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 10,
                      color: 'var(--tx-3)',
                      lineHeight: 1.2,
                    }}
                  >
                    {sh.role}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    fontWeight: 700,
                    color: priorityBadgeColor[sh.priority] ?? 'var(--tx-3)',
                    background: 'var(--surface)',
                    border: `1px solid ${priorityBadgeColor[sh.priority] ?? 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '1px 4px',
                    flexShrink: 0,
                  }}
                >
                  {sh.priority}
                </span>
              </button>
            )
          })}
        </div>

        <div style={divider} />

        {/* Ring legend */}
        <div style={{ marginBottom: 'var(--space-1)' }}>
          <div style={sectionLabel}>Кольца</div>
          {rings.map((ring) => (
            <div
              key={ring.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)',
                padding: '3px var(--space-1)',
              }}
            >
              {/* Ring color indicator */}
              <svg width={14} height={14} style={{ flexShrink: 0, marginTop: 2 }}>
                <circle
                  cx={7}
                  cy={7}
                  r={5}
                  fill="none"
                  stroke={ringColorVar[ring.id]}
                  strokeWidth={1.5}
                />
              </svg>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: ringColorVar[ring.id],
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  Ring {ring.id.replace('r', '')} · {ring.short}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 9.5,
                    color: 'var(--tx-3)',
                    lineHeight: 1.3,
                  }}
                >
                  {ring.sub}
                </div>
                {ring.gate && (
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 8.5,
                      color: ringColorVar[ring.id],
                      marginTop: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {ring.gate}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={divider} />

        {/* Subphase legend */}
        <div>
          <div style={sectionLabel}>Подфазы</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: '2px var(--space-1)' }}>
              <svg width={10} height={10}>
                <circle cx={5} cy={5} r={4} fill="var(--ring-1)" />
              </svg>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10.5, color: 'var(--tx-2)' }}>
                1.0 / 2.0 — основной цикл
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: '2px var(--space-1)' }}>
              <svg width={10} height={10}>
                <circle cx={5} cy={5} r={3.5} fill="var(--bg)" stroke="var(--ring-1)" strokeWidth={1.5} />
              </svg>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10.5, color: 'var(--tx-2)' }}>
                1.5 / 2.5 — расширение цикла
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main diagram ── */}
      <div style={{ width: '100%', aspectRatio: '1200 / 960' }}>
        <ZoomableSVG>
          <RingsDiagram focusMode={constellationMode}>
            {features.map((feature) => {
              const pos = featurePositions.get(feature.id)
              if (!pos) return null
              const key = `${feature.ring}:${feature.id}`
              const isAnchor = focusPath.anchors.includes(key)
              const isConstellation = focusPath.nodes.includes(key)
              const outOfStakeholderScope = activeRings !== null && !activeRings.has(feature.ring)
              return (
                <FeatureNode
                  key={feature.id}
                  feature={feature}
                  x={pos.x}
                  y={pos.y}
                  isAnchor={isAnchor}
                  isConstellation={isConstellation}
                  dimmed={
                    (constellationMode && !isConstellation) ||
                    (!constellationMode && outOfStakeholderScope)
                  }
                />
              )
            })}

            <StakeholderNodes
              stakeholders={stakeholders}
              dimmed={constellationMode}
            />
            <SubphaseLabel subphases={subphases} />
            <ConstellationOverlay
              active={constellationMode}
              featurePositions={featurePositions}
            />
          </RingsDiagram>
        </ZoomableSVG>
      </div>
    </div>
  )
}
