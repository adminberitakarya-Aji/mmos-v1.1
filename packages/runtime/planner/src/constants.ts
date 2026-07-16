/**
 * MMOS Runtime Planner — Constants & Enums
 *
 * Shared constants, enums, and default values for the planner.
 */

import type { PlanningOptions } from "./types";

export enum PlannerStage {
  INITIALIZING = "initializing",
  ANALYZING = "analyzing",
  RESOLVING = "resolving",
  BUILDING = "building",
  OPTIMIZING = "optimizing",
  VALIDATING = "validating",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum PlannerStatus {
  IDLE = "idle",
  PLANNING = "planning",
  OPTIMIZING = "optimizing",
  VALIDATING = "validating",
  COMPLETE = "complete",
  ERROR = "error",
}

export enum OptimizationLevel {
  NONE = "none",
  BASIC = "basic",
  STANDARD = "standard",
  AGGRESSIVE = "aggressive",
  MAXIMUM = "maximum",
}

export enum ResolutionType {
  EXACT = "exact",
  FUZZY = "fuzzy",
  SEMANTIC = "semantic",
  CAPABILITY_BASED = "capability-based",
  LOAD_BALANCED = "load-balanced",
  AFFINITY_BASED = "affinity-based",
}

export const DefaultParallelism = 10;
export const DefaultTimeout = 300_000; // 5 minutes
export const MaximumGraphDepth = 100;
export const MaximumNodeCount = 10_000;

export const DefaultPlanningOptions: Required<PlanningOptions> = {
  constraints: {
    maxDepth: MaximumGraphDepth,
    maxNodes: MaximumNodeCount,
    maxParallelism: DefaultParallelism,
    timeout: DefaultTimeout,
    requiredAgents: [],
    requiredCapabilities: [],
    forbiddenNodes: [],
  },
  preferences: {
    optimizationLevel: OptimizationLevel.STANDARD,
    preferParallelism: true,
    preferLocality: true,
    costWeight: 0.3,
    latencyWeight: 0.4,
    reliabilityWeight: 0.3,
  },
  validateOnly: false,
  generateAlternatives: false,
  maxAlternatives: 3,
};

export const PlannerStages = Object.values(PlannerStage);
export const PlannerStatuses = Object.values(PlannerStatus);
export const OptimizationLevels = Object.values(OptimizationLevel);
export const ResolutionTypes = Object.values(ResolutionType);
