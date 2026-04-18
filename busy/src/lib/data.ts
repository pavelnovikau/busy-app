/**
 * Thin data access layer.
 * Wraps static JSON imports so callers don't depend on import paths
 * and future migration to fetch/loaders only changes this file.
 */

import ringsRaw from '@data/rings.json'
import featuresRaw from '@data/features.json'
import stakeholdersRaw from '@data/stakeholders.json'
import focusPathRaw from '@data/focus-path.json'
import subphasesRaw from '@data/subphases.json'
import roadmapRaw from '@data/roadmap.json'
import prototypesRaw from '@data/prototypes.json'
import insightsRaw from '@data/insights.json'
import simpleStoryRaw from '@data/simple-story.json'

import type {
  Ring, Feature, Stakeholder, FocusPath,
  Subphase, RoadmapPhase, Prototype, InsightGroup, SimpleChapter,
} from '@data/types'

type PrototypeSeed = Omit<Prototype, 'ring' | 'phase'> & Partial<Pick<Prototype, 'ring' | 'phase'>>

const rings = ringsRaw as Ring[]
const features = featuresRaw as Feature[]
const stakeholders = stakeholdersRaw as Stakeholder[]
const focusPath = focusPathRaw as FocusPath
const subphases = subphasesRaw as Subphase[]
const roadmap = roadmapRaw as RoadmapPhase[]
const prototypeSeeds = prototypesRaw as PrototypeSeed[]
const insights = insightsRaw as InsightGroup[]
const simpleStory = simpleStoryRaw as SimpleChapter[]

const roadmapById = new Map(roadmap.map((phase) => [phase.id, phase]))
const featureById = new Map(features.map((feature) => [feature.id, feature]))

function phaseCodeFromRoadmapPhaseId(phaseId: RoadmapPhase['id']): string {
  if (phaseId === 'p0') return '0'
  if (phaseId === 'p3') return '3'
  return phaseId.replace('p', '')
}

function resolvePrototype(seed: PrototypeSeed): Prototype {
  const roadmapPhase = roadmapById.get(seed.roadmapPhaseId)
  const feature = seed.featureId ? featureById.get(seed.featureId) : null

  return {
    ...seed,
    ring: feature?.ring ?? roadmapPhase?.ring ?? seed.ring ?? 'r0',
    phase: roadmapPhase ? phaseCodeFromRoadmapPhaseId(roadmapPhase.id) : seed.phase ?? '0',
  }
}

const prototypes = prototypeSeeds.map(resolvePrototype)
const prototypeIdsByRoadmapPhase = new Map(
  roadmap.map((phase) => [
    phase.id,
    prototypes
      .filter((prototype) => prototype.roadmapPhaseId === phase.id)
      .map((prototype) => prototype.id),
  ]),
)

export function getRings(): Ring[] { return rings }
export function getFeatures(): Feature[] { return features }
export function getStakeholders(): Stakeholder[] { return stakeholders }
export function getFocusPath(): FocusPath { return focusPath }
export function getSubphases(): Subphase[] { return subphases }
export function getRoadmap(): RoadmapPhase[] {
  return roadmap.map((phase) => ({
    ...phase,
    prototypeIds: prototypeIdsByRoadmapPhase.get(phase.id) ?? phase.prototypeIds,
  }))
}
export function getPrototypes(): Prototype[] { return prototypes }
export function getInsights(): InsightGroup[] { return insights }
export function getSimpleStory(): SimpleChapter[] { return simpleStory }
