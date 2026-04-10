import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getRings, getFeatures, getStakeholders, getSubphases, getFocusPath } from '@lib/data'
import { buildFeaturePositions, CX, CY } from '@lib/ring-geometry'
import RingsDiagram from '@components/viz/RingsDiagram'
import { ZoomableSVG } from '@components/viz/ZoomableSVG'
import ConstellationOverlay from '@components/viz/ConstellationOverlay'
import { FeatureNode } from '@components/viz/FeatureNode'
import { SubphaseLabel } from '@components/viz/SubphaseLabel'
import { ConstellationToggle } from '@components/viz/ConstellationToggle'
import PageHeader from '@components/layout/PageHeader'
import type { Feature } from '@data/types'
import { useIsCompact } from '@lib/useIsCompact'

const rings = getRings()
const features = getFeatures()
const stakeholders = getStakeholders()
const subphases = getSubphases()
const focusPath = getFocusPath()

const ringColorVar: Record<string, string> = {
  r0: 'var(--ring-0)', r1: 'var(--ring-1)', r2: 'var(--ring-2)', r3: 'var(--ring-3)',
}

const priorityBadgeColor: Record<string, string> = {
  P0: 'var(--color-danger)',
  P1: 'var(--color-warning)',
  P2: 'var(--color-info)',
  P3: 'var(--sl)',
}

const priorityLabel: Record<string, string> = {
  '●': 'P0 — критично',
  '◐': 'P1 — важно',
  '○': 'P2 — желательно',
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
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

const floatPanel: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)',
  backdropFilter: 'blur(12px)',
  boxShadow: 'var(--shadow-md)',
}


interface TooltipInfo { feature: Feature; x: number; y: number }

function FeatureTooltipLayer({ feature, x, y }: TooltipInfo) {
  const ddx = x - CX
  const ddy = y - CY
  const dist = Math.sqrt(ddx * ddx + ddy * ddy)
  const cosA = dist > 0 ? ddx / dist : 0
  const color = ringColorVar[feature.ring] ?? 'var(--ring-0)'
  const ringNum = feature.ring.replace('r', '')
  const tooltipW = 160
  const tooltipX = x + (cosA >= 0 ? 12 : -(12 + tooltipW))
  const tooltipH = feature.description ? 64 : 38
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      style={{ pointerEvents: 'none' }}
    >
      <rect
        x={tooltipX}
        y={y - 22}
        width={tooltipW}
        height={tooltipH}
        rx={4}
        fill="var(--bg)"
        stroke={color}
        strokeWidth={0.8}
        style={{ filter: 'var(--drop-shadow-sm)' }}
      />
      <text x={tooltipX + 7} y={y - 8} textAnchor="start"
        fontFamily="'Geist Mono Variable', monospace" fontSize={8.5} fontWeight={700} fill={color}
        style={{ pointerEvents: 'none' }}>
        Ring {ringNum}{feature.phase ? ` · Phase ${feature.phase}` : ''}
      </text>
      <text x={tooltipX + 7} y={y + 6} textAnchor="start"
        fontFamily="'Geist Mono Variable', monospace" fontSize={8} fill="var(--tx-3)"
        style={{ pointerEvents: 'none' }}>
        {feature.priority}{feature.problemCluster ? `  cluster ${feature.problemCluster}` : ''}
      </text>
      {feature.description && (
        <foreignObject x={tooltipX + 7} y={y + 13} width={tooltipW - 14} height={30}
          style={{ pointerEvents: 'none' }}>
          <div style={{
            fontFamily: "'Geist Variable', sans-serif",
            fontSize: 7.5,
            color: 'var(--tx-2)',
            lineHeight: 1.4,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {feature.description}
          </div>
        </foreignObject>
      )}
    </motion.g>
  )
}

export default function StrategyPage() {
  const isCompact = useIsCompact()
  const [constellationMode, setConstellationMode] = useState(false)
  const [activeStakeholder, setActiveStakeholder] = useState<string | null>(null)
  const [activeRing, setActiveRing] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const featurePositions = useMemo(
    () => buildFeaturePositions(rings, features),
    [],
  )

  const activeRings = useMemo(() => {
    if (!activeStakeholder) return null
    const sh = stakeholders.find((s) => s.id === activeStakeholder)
    return sh ? new Set(sh.rings as string[]) : null
  }, [activeStakeholder])

  const handleFeatureSelect = (f: Feature) => {
    setSelectedFeature((prev) => prev?.id === f.id ? null : f)
  }

  const selectedRing = selectedFeature ? rings.find((r) => r.id === selectedFeature.ring) : null
  const showSidebar = !isCompact || sidebarOpen

  return (
    // Fixed overlay: full viewport, behind floating panels (z-index 30+) and nav (z-index 50)
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        overflow: 'hidden',
      }}
      onClick={() => setSelectedFeature(null)}
    >
      {/* ── Full-bleed diagram ── */}
      <ZoomableSVG>
        <RingsDiagram focusMode={constellationMode} activeRing={activeRing}>
          {features.map((feature) => {
            const pos = featurePositions.get(feature.id)
            if (!pos) return null
            const key = `${feature.ring}:${feature.id}`
            const isAnchor = focusPath.anchors.includes(key)
            const isConstellation = focusPath.nodes.includes(key)
            const outOfStakeholderScope = activeRings !== null && !activeRings.has(feature.ring)
            const outOfRingScope = activeRing !== null && feature.ring !== activeRing
            return (
              <FeatureNode
                key={feature.id}
                feature={feature}
                x={pos.x}
                y={pos.y}
                isAnchor={isAnchor}
                isConstellation={isConstellation}
                showLabel={
                  !isCompact ||
                  isAnchor ||
                  selectedFeature?.id === feature.id ||
                  (constellationMode && isConstellation) ||
                  activeRing === feature.ring
                }
                selected={selectedFeature?.id === feature.id}
                onSelect={handleFeatureSelect}
                onHover={setTooltipInfo}
                dimmed={
                  (constellationMode && !isConstellation) ||
                  (!constellationMode && (outOfStakeholderScope || outOfRingScope))
                }
              />
            )
          })}

          <SubphaseLabel subphases={subphases} />
          <ConstellationOverlay
            active={constellationMode}
            featurePositions={featurePositions}
          />

          {/* Tooltip layer — rendered last so it's always on top of all nodes */}
          <AnimatePresence>
            {tooltipInfo && <FeatureTooltipLayer {...tooltipInfo} />}
          </AnimatePresence>
        </RingsDiagram>
      </ZoomableSVG>

      {/* ── Focus Constellation — top-right floating button ── */}
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
          active={constellationMode}
          onToggle={() => {
            setConstellationMode((prev) => !prev)
            setActiveStakeholder(null)
            setActiveRing(null)
          }}
        />
      </div>

      {isCompact && (
        <div
          style={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 40,
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            style={{
              ...floatPanel,
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--tx)',
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            {sidebarOpen ? 'Закрыть' : 'Панель'}
          </button>
        </div>
      )}

      {/* ── Left floating sidebar ── */}
      {isCompact && showSidebar && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 24,
            background: 'color-mix(in srgb, var(--overlay) 32%, transparent)',
          }}
        />
      )}
      {showSidebar && (
        <div
          style={{
            ...floatPanel,
            position: 'fixed',
            top: 12,
            left: 12,
            width: isCompact ? 'min(280px, calc(100vw - 24px))' : 210,
            maxHeight: isCompact ? 'calc(100svh - 108px)' : 'calc(100svh - 80px)',
            overflowY: 'auto',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            zIndex: 30,
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
        <PageHeader
          eyebrow="BUSY BAR"
          title="Стратегия"
          description="4 кольца · стейкхолдеры · фокусный контур"
          marginBottom="var(--space-3)"
          descriptionMaxWidth={220}
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
                  setActiveRing(null)
                  if (isCompact) setSidebarOpen(false)
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
                    fontSize: 10,
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

        {/* Pain points for selected stakeholder */}
        <AnimatePresence>
          {activeStakeholder && (() => {
            const sh = stakeholders.find((s) => s.id === activeStakeholder)
            if (!sh?.painPoints?.length) return null
            return (
              <motion.div
                key={activeStakeholder}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    margin: 'var(--space-2) 0',
                    padding: 'var(--space-3)',
                    background: 'var(--surface-2)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ ...sectionLabel, marginBottom: 'var(--space-2)' }}>Боли</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {sh.painPoints.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--tx-3)', fontSize: 'var(--text-xs)', marginTop: 2, flexShrink: 0 }}>—</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-2)', lineHeight: 1.6 }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        <div style={divider} />

        {/* Ring legend */}
        <div style={{ marginBottom: 'var(--space-1)' }}>
          <div style={sectionLabel}>Кольца</div>
          {rings.map((ring) => {
            const isActive = activeRing === ring.id
            const isInactive = activeRing !== null && !isActive
            return (
              <button
                key={ring.id}
                onClick={() => {
                  setActiveRing(isActive ? null : ring.id)
                  setActiveStakeholder(null)
                  setConstellationMode(false)
                  if (isCompact) setSidebarOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-2)',
                  width: '100%',
                  padding: '4px var(--space-1)',
                  background: isActive ? 'var(--surface-2)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  opacity: isInactive ? 0.4 : 1,
                  transition: 'var(--transition-fast)',
                }}
              >
                <svg width={14} height={14} style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle
                    cx={7}
                    cy={7}
                    r={5}
                    fill="none"
                    stroke={ringColorVar[ring.id]}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </svg>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: ringColorVar[ring.id],
                      fontWeight: 600,
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Ring {ring.id.replace('r', '')} · {ring.short}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--tx-3)',
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {ring.sub}
                  </div>
                  {ring.gate && isActive && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: ringColorVar[ring.id],
                        marginTop: 2,
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {ring.gate}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
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
      )}

      {/* ── Right floating feature detail panel ── */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.15 }}
            style={{
              ...floatPanel,
              position: 'fixed',
              top: isCompact ? 'auto' : 132,
              bottom: isCompact ? 84 : 'auto',
              right: 12,
              left: isCompact ? 12 : 'auto',
              width: isCompact ? 'auto' : 248,
              border: `1px solid ${ringColorVar[selectedFeature.ring] ?? 'var(--border)'}`,
              padding: 'var(--space-3)',
              zIndex: 30,
              pointerEvents: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedFeature(null)}
              style={{
                position: 'absolute',
                top: 6,
                right: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: 'var(--tx-3)',
                lineHeight: 1,
                padding: 2,
              }}
            >
              ×
            </button>

            {/* Feature ID */}
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

            {/* Feature name */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--tx)',
                lineHeight: 1.3,
                marginBottom: 'var(--space-3)',
                paddingRight: 16,
              }}
            >
              {selectedFeature.short}
            </div>

            {/* Description */}
            {selectedFeature.description && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--tx-2)',
                  lineHeight: 1.55,
                  margin: '0 0 var(--space-3)',
                }}
              >
                {selectedFeature.description}
              </p>
            )}

            <div style={divider} />

            {/* Meta rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <MetaRow label="Ring">
                <span style={{ color: ringColorVar[selectedFeature.ring] }}>
                  {selectedRing?.short ?? selectedFeature.ring}
                </span>
              </MetaRow>
              {selectedFeature.phase && (
                <MetaRow label="Phase">Phase {selectedFeature.phase}</MetaRow>
              )}
              <MetaRow label="Priority">
                {selectedFeature.priority} {priorityLabel[selectedFeature.priority] ?? ''}
              </MetaRow>
              {selectedFeature.problemCluster && (
                <MetaRow label="Cluster">Cluster {selectedFeature.problemCluster}</MetaRow>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--tx-3)',
          minWidth: 48,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--tx-2)' }}>
        {children}
      </span>
    </div>
  )
}
