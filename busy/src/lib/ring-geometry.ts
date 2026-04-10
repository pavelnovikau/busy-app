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
 * Distributes ALL features in a ring evenly around the full circle,
 * matching the reference strategy.html. Phase is visual-only (dot style),
 * not positional.
 */
export function featureAngle(
  featureId: string,
  allRingFeatures: Feature[],
): number {
  const feature = allRingFeatures.find((f) => f.id === featureId)
  if (!feature) return 0

  const ringFeatures = allRingFeatures.filter((f) => f.ring === feature.ring)
  const idx = ringFeatures.findIndex((f) => f.id === featureId)
  const count = ringFeatures.length

  // Even distribution starting from top (−90°)
  const angleDeg = (360 / count) * idx - 90
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
/**
 * Returns position for a subphase label.
 * labelOffset: extra px beyond ring radius (use ~38 for label placement outside ring).
 * Also returns cosA/sinA for text-anchor calculation.
 */
export function subphasePosition(
  subphase: Subphase,
  labelOffset = 0,
): {
  x: number
  y: number
  angle: number
  cosA: number
  sinA: number
} {
  const midDeg = (subphase.angleDeg.start + subphase.angleDeg.end) / 2
  const r = (RING_RADII[subphase.ring] ?? 0) + labelOffset
  const rad = degToRad(midDeg)
  const cosA = Math.cos(rad)
  const sinA = Math.sin(rad)
  return {
    x: CX + r * cosA,
    y: CY + r * sinA,
    angle: midDeg,
    cosA,
    sinA,
  }
}

// ── constellationEdgePath ──────────────────────────────────────────
export function constellationEdgePath(
  fromId: string,
  toId: string,
  featurePositions: Map<string, { x: number; y: number }>,
): string {
  const fromRing = fromId.split(':')[0]
  const toRing = toId.split(':')[0]
  const from = featurePositions.get(fromId.split(':')[1])
  const to = featurePositions.get(toId.split(':')[1])

  if (!from || !to) return ''

  const sameRing = fromRing === toRing

  if (sameRing) {
    const r = RING_RADII[fromRing] ?? 0
    // Compute angles of both nodes from center
    const aFrom = Math.atan2(from.y - CY, from.x - CX)
    const aTo = Math.atan2(to.y - CY, to.x - CX)
    // Normalise difference to [-π, π] so we always take the shorter arc
    let dAngle = aTo - aFrom
    if (dAngle >  Math.PI) dAngle -= 2 * Math.PI
    if (dAngle < -Math.PI) dAngle += 2 * Math.PI
    // Control point: 20% outside ring radius at the arc midpoint angle
    const aMid = aFrom + dAngle / 2
    const bulge = r * 1.20
    const ctrlX = CX + bulge * Math.cos(aMid)
    const ctrlY = CY + bulge * Math.sin(aMid)
    return `M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`
  }

  // Bridge (cross-ring): curve toward center to avoid crossings
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  const cpX = midX + (CX - midX) * 0.4
  const cpY = midY + (CY - midY) * 0.4
  return `M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`
}

// ── buildFeaturePositions ──────────────────────────────────────────
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
