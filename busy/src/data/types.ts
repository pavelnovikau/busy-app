// ── Primitives ─────────────────────────────────────────────────────

export type RingId = 'r0' | 'r1' | 'r2' | 'r3';

export type Phase = '1.0' | '1.5' | '2.0' | '2.5';

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

export interface RoadmapPhase {
  id: string;
  ring: RingId;
  label: string;
  horizon: string;
  monthsRange: [number, number];
  gate: string | null;
  circuitBreakers: string[];
  prototypeIds: string[];
  milestones: Milestone[];
}

// ── Prototype ─────────────────────────────────────────────────────

export interface Prototype {
  id: string;
  title: string;
  description: string;
  ring: RingId;
  stakeholders: string[];
}

// ── Insights ──────────────────────────────────────────────────────

export interface InsightCard {
  title: string;
  tag: string;
  tagLabel: string;
  body: string;
}

export interface InsightGroup {
  id: string;
  category: string;
  heading: string;
  cards: InsightCard[];
}
