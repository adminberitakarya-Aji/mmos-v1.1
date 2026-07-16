/**
 * MMOS Runtime Planner — Contracts (Interfaces)
 *
 * Interface definitions for planner components.
 */

// Re-export all types
export * from "./types";

// Re-export only constants that don't conflict with types
export {
  PlannerStage,
  PlannerStatus,
  OptimizationLevel,
  ResolutionType,
  DefaultPlanningOptions,
  DefaultParallelism,
  DefaultTimeout,
  MaximumGraphDepth,
  MaximumNodeCount,
  PlannerStages,
  PlannerStatuses,
  OptimizationLevels,
  ResolutionTypes,
} from "./constants";

import type {
  ExecutionPlan,
  ExecutionNode,
  ExecutionEdge,
  DependencyGraph,
  PlanningContext,
  PlanningResult,
  PlanningMetadata,
  PlanningStatistics,
  ResolutionResult,
  ResolvedNode,
  OptimizationResult,
  PlanningOptions,
} from "./types";

import type {
  OptimizationLevel,
} from "./constants";

export interface Planner {
  plan(context: PlanningContext, options?: PlanningOptions): Promise<PlanningResult>;
  validate(plan: ExecutionPlan): Promise<ValidationResult>;
  optimize(plan: ExecutionPlan, options?: OptimizationOptions): Promise<OptimizationResult>;
}

export interface Optimizer {
  optimize(plan: ExecutionPlan, options?: OptimizationOptions): Promise<OptimizationResult>;
  optimizeGraph(graph: DependencyGraph, options?: OptimizationOptions): Promise<DependencyGraph>;
  optimizeParallelism(plan: ExecutionPlan, options?: OptimizationOptions): Promise<ExecutionPlan>;
  flattenDependencies(graph: DependencyGraph): DependencyGraph;
}

export interface Resolver {
  resolveDependencies(context: PlanningContext): Promise<ResolutionResult>;
  resolveAgents(nodes: ExecutionNode[], availableAgents: Map<string, AgentInfo>): Promise<ResolutionResult>;
  resolveCapabilities(nodes: ExecutionNode[], availableCapabilities: Map<string, CapabilityInfo>): Promise<ResolutionResult>;
  resolveArtifacts(nodes: ExecutionNode[]): Promise<ResolutionResult>;
  resolveMemory(nodes: ExecutionNode[], availableMemory: MemoryInfo[]): Promise<ResolutionResult>;
}

export interface ExecutionPlanBuilder {
  build(context: PlanningContext, options?: PlanningOptions): Promise<ExecutionPlan>;
  addNode(node: ExecutionNode): this;
  addEdge(edge: ExecutionEdge): this;
  setMetadata(metadata: PlanningMetadata): this;
  setStatistics(statistics: PlanningStatistics): this;
}

export interface DependencyResolver {
  resolve(graph: DependencyGraph): Promise<ResolutionResult>;
  detectCycles(graph: DependencyGraph): string[][];
  topologicalSort(graph: DependencyGraph): string[];
  findRoots(graph: DependencyGraph): string[];
  findLeaves(graph: DependencyGraph): string[];
}

export interface AgentResolver {
  resolve(node: ExecutionNode, availableAgents: Map<string, AgentInfo>): Promise<ResolvedNode>;
  findBestMatch(requirements: AgentRequirements, candidates: AgentInfo[]): AgentInfo | null;
  scoreAgent(node: ExecutionNode, agent: AgentInfo): number;
}

export interface CapabilityResolver {
  resolve(node: ExecutionNode, availableCapabilities: Map<string, CapabilityInfo>): Promise<ResolvedNode>;
  findBestMatch(requirements: CapabilityRequirements, candidates: CapabilityInfo[]): CapabilityInfo | null;
  scoreCapability(node: ExecutionNode, capability: CapabilityInfo): number;
}

export interface WorkflowExpander {
  expand(workflowId: string, context: PlanningContext): Promise<ExecutionNode[]>;
  expandTask(taskId: string, context: PlanningContext): Promise<ExecutionNode>;
  getWorkflowTasks(workflowId: string): Promise<string[]>;
}

export interface PlanValidator {
  validate(plan: ExecutionPlan): Promise<ValidationResult>;
  validateGraph(graph: DependencyGraph): ValidationResult;
  validateNode(node: ExecutionNode, context: PlanningContext): ValidationResult;
  validateEdge(edge: ExecutionEdge, graph: DependencyGraph): ValidationResult;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  code: string;
  message: string;
  nodeId?: string;
  edgeId?: string;
  severity: "error" | "critical";
}

export interface ValidationWarning {
  code: string;
  message: string;
  nodeId?: string;
  edgeId?: string;
  severity: "low" | "medium" | "high";
}

export interface OptimizationOptions {
  level?: OptimizationLevel;
  preserveSemantics?: boolean;
  maxIterations?: number;
  targetMetrics?: OptimizationTargetMetrics;
}

export interface OptimizationTargetMetrics {
  maxDurationMs?: number;
  maxCost?: number;
  minParallelism?: number;
  maxRiskScore?: number;
}

export interface AgentRequirements {
  role?: string;
  capabilities?: string[];
  model?: string;
  minVersion?: string;
  metadata?: Record<string, unknown>;
}

export interface CapabilityRequirements {
  category?: string;
  name?: string;
  version?: string;
  configuration?: Record<string, unknown>;
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

export interface MemoryInfo {
  id: string;
  type: string;
  scope: string;
  capacity?: number;
}