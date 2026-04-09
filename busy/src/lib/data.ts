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

import type {
  Ring, Feature, Stakeholder, FocusPath,
  Subphase, RoadmapPhase, Prototype, InsightGroup,
} from '@data/types'

export function getRings(): Ring[]           { return ringsRaw as Ring[] }
export function getFeatures(): Feature[]     { return featuresRaw as Feature[] }
export function getStakeholders(): Stakeholder[] { return stakeholdersRaw as Stakeholder[] }
export function getFocusPath(): FocusPath    { return focusPathRaw as FocusPath }
export function getSubphases(): Subphase[]   { return subphasesRaw as Subphase[] }
export function getRoadmap(): RoadmapPhase[] { return roadmapRaw as RoadmapPhase[] }
export function getPrototypes(): Prototype[] { return prototypesRaw as Prototype[] }
export function getInsights(): InsightGroup[]{ return insightsRaw as InsightGroup[] }
