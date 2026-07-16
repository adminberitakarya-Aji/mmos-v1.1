/**
 * MMOS Runtime Planner — Error Classes
 *
 * Custom error types for planner operations.
 */

export class PlannerError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly nodeId?: string,
    public readonly recoverable = false,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "PlannerError";
    Object.setPrototypeOf(this, PlannerError.prototype);
  }
}

export class PlanningValidationError extends PlannerError {
  constructor(
    message: string,
    nodeId?: string,
    public readonly violations: ValidationViolation[] = [],
    details?: Record<string, unknown>,
  ) {
    super(message, "PLANNING_VALIDATION_ERROR", nodeId, true, details);
    this.name = "PlanningValidationError";
    Object.setPrototypeOf(this, PlanningValidationError.prototype);
  }
}

export class DependencyResolutionError extends PlannerError {
  constructor(
    message: string,
    nodeId?: string,
    public readonly unresolvedDependencies: string[] = [],
    public readonly conflicts: ResolutionConflict[] = [],
    details?: Record<string, unknown>,
  ) {
    super(message, "DEPENDENCY_RESOLUTION_ERROR", nodeId, true, details);
    this.name = "DependencyResolutionError";
    Object.setPrototypeOf(this, DependencyResolutionError.prototype);
  }
}

export class CircularDependencyError extends PlannerError {
  constructor(
    message: string,
    public readonly cycle: string[],
    nodeId?: string,
    details?: Record<string, unknown>,
  ) {
    super(message, "CIRCULAR_DEPENDENCY_ERROR", nodeId, false, details);
    this.name = "CircularDependencyError";
    Object.setPrototypeOf(this, CircularDependencyError.prototype);
  }
}

export class AgentResolutionError extends PlannerError {
  constructor(
    message: string,
    nodeId?: string,
    public readonly requestedAgent?: string,
    public readonly availableAgents: string[] = [],
    details?: Record<string, unknown>,
  ) {
    super(message, "AGENT_RESOLUTION_ERROR", nodeId, true, details);
    this.name = "AgentResolutionError";
    Object.setPrototypeOf(this, AgentResolutionError.prototype);
  }
}

export class CapabilityResolutionError extends PlannerError {
  constructor(
    message: string,
    nodeId?: string,
    public readonly requestedCapability?: string,
    public readonly availableCapabilities: string[] = [],
    details?: Record<string, unknown>,
  ) {
    super(message, "CAPABILITY_RESOLUTION_ERROR", nodeId, true, details);
    this.name = "CapabilityResolutionError";
    Object.setPrototypeOf(this, CapabilityResolutionError.prototype);
  }
}

export class WorkflowExpansionError extends PlannerError {
  constructor(
    message: string,
    nodeId?: string,
    public readonly workflowId?: string,
    public readonly failedTask?: string,
    details?: Record<string, unknown>,
  ) {
    super(message, "WORKFLOW_EXPANSION_ERROR", nodeId, true, details);
    this.name = "WorkflowExpansionError";
    Object.setPrototypeOf(this, WorkflowExpansionError.prototype);
  }
}

export class OptimizationError extends PlannerError {
  constructor(
    message: string,
    nodeId?: string,
    public readonly optimizationType?: string,
    public readonly failedStep?: string,
    details?: Record<string, unknown>,
  ) {
    super(message, "OPTIMIZATION_ERROR", nodeId, true, details);
    this.name = "OptimizationError";
    Object.setPrototypeOf(this, OptimizationError.prototype);
  }
}

export class ExecutionPlanError extends PlannerError {
  constructor(
    message: string,
    public readonly planId?: string,
    nodeId?: string,
    public readonly executionPhase?: "planning" | "resolution" | "optimization" | "validation",
    details?: Record<string, unknown>,
  ) {
    super(message, "EXECUTION_PLAN_ERROR", nodeId, false, details);
    this.name = "ExecutionPlanError";
    Object.setPrototypeOf(this, ExecutionPlanError.prototype);
  }
}

export interface ValidationViolation {
  code: string;
  message: string;
  path: string;
  severity: "error" | "warning" | "critical";
}

export interface ResolutionConflict {
  nodeId: string;
  candidates: string[];
  reason: string;
  severity: "warning" | "error";
}