/**
 * MMOS Runtime Planner — Type Definitions
 *
 * Core types for execution planning, dependency resolution, and workflow optimization.
 */

import type {
  PlannerStage,
  OptimizationLevel,
} from "./constants";

export interface ExecutionPlan {
  id: string;
  name: string;
  version: string;
  graph: DependencyGraph;
  metadata: PlanningMetadata;
  statistics: PlanningStatistics;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutionNode {
  id: string;
  name: string;
  type: NodeType;
  agentId?: string;
  capabilityId?: string;
  workflowId?: string;
  taskId?: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  configuration: Record<string, unknown>;
  dependencies: string[];
  dependents: string[];
  parallelGroup?: string;
  retryPolicy?: RetryPolicy;
  timeout?: number;
  metadata: Record<string, unknown>;
}

export type NodeType = "agent" | "capability" | "workflow" | "task" | "parallel" | "conditional" | "custom";

export interface ExecutionEdge {
  from: string;
  to: string;
  type: EdgeType;
  condition?: string;
  metadata: Record<string, unknown>;
}

export type EdgeType = "sequence" | "parallel" | "conditional" | "data" | "control";

export interface DependencyGraph {
  nodes: Map<string, ExecutionNode>;
  edges: ExecutionEdge[];
  roots: string[];
  leaves: string[];
  cycles: string[][];
  topologicalOrder: string[];
}

export interface PlanningContext {
  compositionId: string;
  workflowId?: string;
  availableAgents: Map<string, AgentInfo>;
  availableCapabilities: Map<string, CapabilityInfo>;
  availableWorkflows: Map<string, WorkflowInfo>;
  availableMemory: MemoryInfo[];
  constraints: PlanningConstraints;
  preferences: PlanningPreferences;
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: string;
  metadata: Record<string, unknown>;
}

export interface CapabilityInfo {
  id: string;
  name: string;
  category: string;
  description?: string;
  configuration?: Record<string, unknown>;
}

export interface WorkflowInfo {
  id: string;
  name: string;
  version: string;
  tasks: string[];
  metadata: Record<string, unknown>;
}

export interface MemoryInfo {
  id: string;
  type: string;
  scope: string;
  capacity?: number;
}

export interface PlanningConstraints {
  maxDepth: number;
  maxNodes: number;
  maxParallelism: number;
  timeout: number;
  requiredAgents?: string[];
  requiredCapabilities?: string[];
  forbiddenNodes?: string[];
}

export interface PlanningPreferences {
  optimizationLevel: OptimizationLevel;
  preferParallelism: boolean;
  preferLocality: boolean;
  costWeight: number;
  latencyWeight: number;
  reliabilityWeight: number;
}

export interface PlanningResult {
  plan: ExecutionPlan;
  warnings: PlanningWarning[];
  errors: PlanningError[];
  alternatives: ExecutionPlan[];
}

export interface PlanningWarning {
  code: string;
  message: string;
  nodeId?: string;
  severity: "low" | "medium" | "high";
}

export interface PlanningError {
  code: string;
  message: string;
  nodeId?: string;
  recoverable: boolean;
}

export interface PlanningOptions {
  constraints?: Partial<PlanningConstraints>;
  preferences?: Partial<PlanningPreferences>;
  validateOnly?: boolean;
  generateAlternatives?: boolean;
  maxAlternatives?: number;
}

export interface PlanningMetadata {
  plannerVersion: string;
  plannerStage: PlannerStage;
  planningDurationMs: number;
  nodesPlanned: number;
  edgesPlanned: number;
  optimizationApplied: OptimizationType[];
  options: PlanningOptions;
}

export interface PlanningStatistics {
  totalNodes: number;
  parallelGroups: number;
  sequentialChains: number;
  maxDepth: number;
  estimatedDurationMs: number;
  estimatedCost: number;
  riskScore: number;
}

export interface ParallelGroup {
  id: string;
  nodes: string[];
  strategy: ParallelStrategy;
  estimatedDurationMs: number;
}

export type ParallelStrategy = "all" | "race" | "majority" | "first-success";

export interface ResolutionResult {
  resolved: boolean;
  nodes: Map<string, ResolvedNode>;
  unresolved: string[];
  conflicts: ResolutionConflict[];
  warnings: string[];
}

export interface ResolvedNode {
  nodeId: string;
  targetId: string;
  targetType: "agent" | "capability" | "workflow" | "memory" | "custom";
  confidence: number;
  alternatives: AlternativeTarget[];
}

export interface AlternativeTarget {
  targetId: string;
  targetType: "agent" | "capability" | "workflow" | "memory";
  confidence: number;
  reason: string;
}

export interface ResolutionConflict {
  nodeId: string;
  candidates: string[];
  reason: string;
  severity: "warning" | "error";
}

export interface OptimizationResult {
  plan: ExecutionPlan;
  improvements: OptimizationImprovement[];
  metrics: OptimizationMetrics;
}

export interface OptimizationImprovement {
  type: OptimizationType;
  description: string;
  nodesAffected: string[];
  estimatedGain: number;
  confidence: number;
}

export type OptimizationType =
  | "parallelize"
  | "deduplicate"
  | "reorder"
  | "batch"
  | "cache"
  | "prefetch"
  | "fusion"
  | "pruning";

export interface OptimizationMetrics {
  originalDurationMs: number;
  optimizedDurationMs: number;
  durationReductionPercent: number;
  originalCost: number;
  optimizedCost: number;
  costReductionPercent: number;
  parallelismIncrease: number;
}

export interface RetryPolicy {
  maxAttempts: number;
  backoffMs: number;
  backoffMultiplier: number;
  maxBackoffMs: number;
  retryableErrors?: string[];
}
