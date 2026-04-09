import { useState, useMemo } from 'react'
import { getRings, getFeatures, getStakeholders, getSubphases, getFocusPath } from '@lib/data'
import { buildFeaturePositions } from '@lib/ring-geometry'
import RingsDiagram from '@components/viz/RingsDiagram'
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
const ringDimVar: Record<string, string> = {
  r0: 'var(--ring-0-dim)', r1: 'var(--ring-1-dim)', r2: 'var(--ring-2-dim)', r3: 'var(--ring-3-dim)',
}

export default function StrategyPage() {
  const [constellationMode, setConstellationMode] = useState(false)
  const [activeStakeholder, setActiveStakeholder] = useState<string | null>(null)

  const featurePositions = useMemo(
    () => buildFeaturePositions(rings, features),
    [],
  )

  // Rings accessible to the selected stakeholder
  const activeRings = useMemo(() => {
    if (!activeStakeholder) return null
    const sh = stakeholders.find((s) => s.id === activeStakeholder)
    return sh ? new Set(sh.rings as string[]) : null
  }, [activeStakeholder])

  return (
    <div>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) 0',
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
          Strategy
        </h1>
        <ConstellationToggle
          active={constellationMode}
          onToggle={() => {
            setConstellationMode((prev) => !prev)
            setActiveStakeholder(null)
          }}
        />
      </div>

      {/* SVG visualization */}
      <div style={{ width: '100%', aspectRatio: '1200 / 960' }}>
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
      </div>

      {/* ── Contextual controls ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-4)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Ring legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          {rings.map((ring) => (
            <div
              key={ring.id}
              style={{
                flex: '1 1 200px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                padding: 'var(--space-3) var(--space-4)',
                background: 'var(--surface)',
                border: `1px solid var(--border)`,
                borderLeft: `3px solid ${ringColorVar[ring.id]}`,
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: ringColorVar[ring.id],
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {ring.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--tx)',
                  }}
                >
                  {ring.short}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--tx-3)',
                  lineHeight: 1.4,
                }}
              >
                {ring.sub}
              </div>
              {ring.gate && (
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: ringColorVar[ring.id],
                    background: ringDimVar[ring.id],
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    marginTop: 'var(--space-1)',
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                  }}
                >
                  {ring.gate}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stakeholder filter */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--tx-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 'var(--space-2)',
            }}
          >
            Stakeholder view
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <button
              onClick={() => setActiveStakeholder(null)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-2)',
                background: activeStakeholder === null ? 'var(--tx)' : 'transparent',
                color: activeStakeholder === null ? 'var(--bg)' : 'var(--tx-2)',
                cursor: 'pointer',
              }}
            >
              All
            </button>
            {stakeholders.map((sh) => (
              <button
                key={sh.id}
                title={sh.role}
                onClick={() => {
                  setActiveStakeholder(activeStakeholder === sh.id ? null : sh.id)
                  setConstellationMode(false)
                }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${activeStakeholder === sh.id ? 'var(--color-primary)' : 'var(--border)'}`,
                  background: activeStakeholder === sh.id ? 'var(--ring-1-dim)' : 'transparent',
                  color: activeStakeholder === sh.id ? 'var(--color-primary)' : 'var(--tx-3)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                }}
              >
                {sh.emoji} {sh.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
