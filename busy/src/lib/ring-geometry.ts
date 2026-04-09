import type { Ring, Feature, Subphase } from '@data/types'

// ── SVG canvas constants (match strategy.html) ──────────────────────
export const CX = 600
export const CY = 480
export const STK_R = 490

// Ring radii keyed by ring id
export const RING_RADII: Record<string, number> = {
  r0: 72,
  r1: 175,
  r2: 285,
  r3: 390,
}

// ── Subphase angle ranges (degrees) ────────────────────────────────
// r1: 1.0 = [-90, 60], 1.5 = [60, 210]
// r2: 2.0 = [-90, 90], 2.5 = [90, 270]
const PHASE_RANGES: Record<string, { start: number; end: number }> = {
  '1.0': { start: -90, end: 60 },
  '1.5': { start: 60, end: 210 },
  '2.0': { start: -90, end: 90 },
  '2.5': { start: 90, end: 270 },
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function polar(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

// ── featureAngle ───────────────────────────────────────────────────
/**
 * Returns the angle (radians) for a feature within its ring.
 * Phase-grouped features (r1, r2) cluster within their subphase arc.
 * r0 and r3 features distribute evenly around the full circle.
 */
export function featureAngle(
  featureId: string,
  allRingFeatures: Feature[],
): number {
  const feature = allRingFeatures.find((f) => f.id === featureId)
  if (!feature) return 0

  const ringFeatures = allRingFeatures.filter((f) => f.ring === feature.ring)

  if (feature.phase && PHASE_RANGES[feature.phase]) {
    // Phased ring (r1 or r2): cluster within subphase arc
    const range = PHASE_RANGES[feature.phase]
    const phaseFeatures = ringFeatures.filter((f) => f.phase === feature.phase)
    const idx = phaseFeatures.findIndex((f) => f.id === featureId)
    const count = phaseFeatures.length

    // Distribute evenly within the arc, with padding at edges
    const spanDeg = range.end - range.start
    const padDeg = spanDeg / (count + 1)
    const angleDeg = range.start + padDeg * (idx + 1)
    return degToRad(angleDeg)
  }

  // r0 / r3: distribute evenly around full circle
  const idx = ringFeatures.findIndex((f) => f.id === featureId)
  const count = ringFeatures.length
  const angleDeg = (360 / count) * idx - 90 // start from top
  return degToRad(angleDeg)
}

// ── featurePosition ────────────────────────────────────────────────
export function featurePosition(
  featureId: string,
  allRingFeatures: Feature[],
  ringId: string,
): { x: number; y: number } {
  const angle = featureAngle(featureId, allRingFeatures)
  const r = RING_RADII[ringId] ?? 0
  return polar(CX, CY, r, angle)
}

// ── stakeholderPosition ────────────────────────────────────────────
export function stakeholderPosition(
  angleDeg: number,
  radius: number = STK_R,
): { x: number; y: number } {
  return polar(CX, CY, radius, degToRad(angleDeg))
}

// ── subphasePosition ───────────────────────────────────────────────
export function subphasePosition(subphase: Subphase): {
  x: number
  y: number
  angle: number
} {
  const midDeg =
    (subphase.angleDeg.start + subphase.angleDeg.end) / 2
  const r = RING_RADII[subphase.ring] ?? 0
  const pos = polar(CX, CY, r, degToRad(midDeg))
  return { ...pos, angle: midDeg }
}

// ── constellationEdgePath ──────────────────────────────────────────
/**
 * Returns an SVG path `d` string connecting two feature nodes.
 * - Local edge (same ring): arc following ring curvature
 * - Bridge edge (cross-ring): gentle quadratic bezier
 */
export function constellationEdgePath(
  fromId: string,
  toId: string,
  featurePositions: Map<string, { x: number; y: number }>,
): string {
  // fromId/toId are like "r0:0.1" — extract ring and feature id
  const fromRing = fromId.split(':')[0]
  const toRing = toId.split(':')[0]
  const from = featurePositions.get(fromId.split(':')[1])
  const to = featurePositions.get(toId.split(':')[1])

  if (!from || !to) return ''

  const sameRing = fromRing === toRing

  if (sameRing) {
    // Arc path along the ring curvature
    const r = RING_RADII[fromRing] ?? 0
    const dx = to.x - from.x
    const dy = to.y - from.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    // Use large arc flag = 0 (short arc), sweep = 1
    // If the chord is longer than the radius, use a larger sweep
    const largeArc = dist > r ? 1 : 0
    return `M ${from.x} ${from.y} A ${r} ${r} 0 ${largeArc} 1 ${to.x} ${to.y}`
  }

  // Bridge edge: quadratic bezier curving toward center
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  // Pull control point toward center for a gentle curve
  const cx = mx + (CX - mx) * 0.3
  const cy = my + (CY - my) * 0.3
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

// ── buildFeaturePositions ──────────────────────────────────────────
/**
 * Pre-computes positions for all features.
 * Returns Map keyed by feature id (e.g. "0.1", "1.9").
 */
export function buildFeaturePositions(
  _rings: Ring[],
  features: Feature[],
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  for (const feature of features) {
    const pos = featurePosition(feature.id, features, feature.ring)
    positions.set(feature.id, pos)
  }

  return positions
}
