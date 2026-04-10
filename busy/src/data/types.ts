// ── Primitives ─────────────────────────────────────────────────────

export type RingId = 'r0' | 'r1' | 'r2' | 'r3';

export type Phase = '1.0' | '1.5' | '2.0' | '2.5';

export type RoadmapPhaseId = 'p0' | 'p1.0' | 'p1.5' | 'p2.0' | 'p2.5' | 'p3';

export type Priority = '●' | '◐' | '○';

export type StakeholderPriority = 'P0' | 'P1' | 'P2' | 'P3';

export type ProblemCluster = 'A' | 'B' | 'C' | 'D' | 'E';

export type EdgeType = 'local' | 'bridge';

// ── Ring ───────────────────────────────────────────────────────────

export interface Ring {
  id: RingId;
  label: string;
  short: string;
  sub: string;
  radiusPx: number;
  gate: string | null;
}

// ── Feature ───────────────────────────────────────────────────────

export interface Feature {
  id: string;
  short: string;
  description: string;
  ring: RingId;
  phase: Phase | null;
  priority: Priority;
  problemCluster: ProblemCluster | null;
}

// ── Stakeholder ───────────────────────────────────────────────────

export interface Stakeholder {
  id: string;
  emoji: string;
  name: string;
  role: string;
  priority: StakeholderPriority;
  rings: RingId[];
  angleDeg: number;
  painPoints: string[];
}

// ── Focus Constellation ───────────────────────────────────────────

export interface ConstellationEdge {
  from: string;
  to: string;
  type: EdgeType;
}

export interface FocusPath {
  title: string;
  subtitle: string;
  anchors: string[];
  anchorLabels: Record<string, string>;
  nodes: string[];
  edges: ConstellationEdge[];
  stakeholders: string[];
}

// ── Subphase Annotation ───────────────────────────────────────────

export interface SubphaseAngleDeg {
  start: number;
  end: number;
}

export interface Subphase {
  ring: RingId;
  code: Phase;
  label: string;
  angleDeg: SubphaseAngleDeg;
}

// ── Roadmap ───────────────────────────────────────────────────────

export interface Milestone {
  label: string;
  date: string | null;
}

export interface AjtbdForces {
  push:    string   // pain/push force: what drives user away from status quo
  pull:    string   // pull force: what attracts toward new solution
  anxiety: string   // anxiety: what makes them hesitate
  habit:   string   // habit/inertia: what existing behavior they must leave
}

export interface AjtbdData {
  stakeholders: string[]  // stakeholder IDs from stakeholders.json
  job:          string    // the core job statement
  forces:       AjtbdForces
}

export interface RoadmapPhase {
  id: RoadmapPhaseId;
  ring: RingId;
  label: string;
  horizon: string;
  monthsRange: [number, number];
  intro: string;
  outcome?: string;
  uniqueFeatures?: string[];
  whyDifferent?: string;
  gate: string | null;
  circuitBreakers: string[];
  prototypeIds: string[];
  milestones: Milestone[];
  ajtbd: AjtbdData;
}

// ── Prototype ─────────────────────────────────────────────────────

export interface Prototype {
  id: string;
  title: string;
  description: string;
  roadmapPhaseId: RoadmapPhaseId;
  featureId?: string | null;
  ring: RingId;
  phase: string;       // roadmap phase: '1.0' | '1.5' | '2.0' | '2.5' | '3'
  stakeholders: string[];
}

// ── Insights ──────────────────────────────────────────────────────

export interface InsightCard {
  title: string;
  tag: string;
  tagLabel: string;
  body: string;
  ringRefs?: string[];
}

export interface InsightGroup {
  id: string;
  category: string;
  heading: string;
  cards: InsightCard[];
}
