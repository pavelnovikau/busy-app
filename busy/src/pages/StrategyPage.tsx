import { useState, useMemo } from 'react'
import ringsData from '@data/rings.json'
import featuresData from '@data/features.json'
import stakeholdersData from '@data/stakeholders.json'
import subphasesData from '@data/subphases.json'
import focusPathData from '@data/focus-path.json'
import { buildFeaturePositions } from '@lib/ring-geometry'
import RingsDiagram from '@components/viz/RingsDiagram'
import ConstellationOverlay from '@components/viz/ConstellationOverlay'
import { FeatureNode } from '@components/viz/FeatureNode'
import { StakeholderNodes } from '@components/viz/StakeholderNodes'
import { SubphaseLabel } from '@components/viz/SubphaseLabel'
import { ConstellationToggle } from '@components/viz/ConstellationToggle'
import type { Ring, Feature, Stakeholder, Subphase, FocusPath } from '@data/types'

const rings = ringsData as Ring[]
const features = featuresData as Feature[]
const stakeholders = stakeholdersData as Stakeholder[]
const subphases = subphasesData as Subphase[]
const focusPath = focusPathData as FocusPath

export default function StrategyPage() {
  const [constellationMode, setConstellationMode] = useState(false)

  const featurePositions = useMemo(
    () => buildFeaturePositions(rings, features),
    [],
  )

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
            fontFamily: "var(--font-mono)",
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
          onToggle={() => setConstellationMode((prev) => !prev)}
        />
      </div>

      {/* SVG visualization */}
      <div style={{ width: '100%', aspectRatio: '1200 / 960' }}>
        <RingsDiagram focusMode={constellationMode}>
          {/* Feature nodes */}
          {features.map((feature) => {
            const pos = featurePositions.get(feature.id)
            if (!pos) return null
            const key = `${feature.ring}:${feature.id}`
            const isAnchor = focusPath.anchors.includes(key)
            const isConstellation = focusPath.nodes.includes(key)
            return (
              <FeatureNode
                key={feature.id}
                feature={feature}
                x={pos.x}
                y={pos.y}
                isAnchor={isAnchor}
                isConstellation={isConstellation}
                dimmed={constellationMode && !isConstellation}
              />
            )
          })}

          {/* Stakeholders */}
          <StakeholderNodes
            stakeholders={stakeholders}
            dimmed={constellationMode}
          />

          {/* Subphase labels */}
          <SubphaseLabel subphases={subphases} />

          {/* Constellation overlay */}
          <ConstellationOverlay
            active={constellationMode}
            featurePositions={featurePositions}
          />
        </RingsDiagram>
      </div>
    </div>
  )
}
