/**
 * MMOS Composition — type definitions.
 *
 * Shape is derived from `schemas/composition.schema.json` (the canonical
 * MMOS v1.1 spec). Cross-schema references use lightweight object shapes
 * (not the full domain types) so the Composition package can stay at the
 * root of the composition graph without importing from sibling packages.
 */

export type MmosStatus =
  | "draft"
  | "active"
  | "inactive"
  | "pending"
  | "queued"
  | "running"
  | "paused"
  | "completed"
  | "failed"
  | "cancelled"
  | "timeout"
  | "archived"
  | "deleted";

export type SchedulerStrategy = "fifo" | "priority" | "round-robin" | "fair-share";

export type DispatcherStrategy = "least-load" | "round-robin" | "sticky" | "random";

export type BackoffStrategy = "fixed" | "linear" | "exponential";

/** Lightweight identifier reference — matches `schemas/common/reference.schema.json`. */
export interface Reference {
  id: string;
  type?: string;
  name?: string;
  version?: string;
  uri?: string;
}

/** Matches `schemas/common/metadata.schema.json`. */
export interface ObjectMetadata {
  name?: string;
  description?: string;
  version?: string;
  owner?: Reference;
  createdBy?: Reference;
  updatedBy?: Reference;
  createdAt?: string;
  updatedAt?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  tags?: string[];
  attributes?: Record<string, unknown>;
}

/** Shape of `runtime` block in a composition — see `schemas/runtime.schema.json`. */
export interface CompositionRuntime {
  engine: string;
  scheduler: {
    strategy: SchedulerStrategy;
    maxConcurrency?: number;
  };
  dispatcher: {
    strategy: DispatcherStrategy;
    workerSelection?: "automatic" | "manual";
  };
  executor?: {
    maxWorkers?: number;
    timeout?: number;
    retryPolicy?: {
      maxAttempts?: number;
      backoff?: BackoffStrategy;
    };
  };
  eventBus?: {
    enabled?: boolean;
    provider?: string;
  };
  memory?: Reference;
  providers?: Reference[];
  logging?: {
    level?: "trace" | "debug" | "info" | "warn" | "error";
    structured?: boolean;
  };
  monitoring?: {
    enabled?: boolean;
    metrics?: boolean;
    tracing?: boolean;
  };
  security?: {
    authentication?: boolean;
    authorization?: boolean;
    encryption?: boolean;
  };
  metadata?: ObjectMetadata;
}

/** Composition-level capability reference (lightweight). */
export interface CompositionCapabilityRef extends Reference {
  type?: string;
}

/** Composition-level provider reference (lightweight). */
export interface CompositionProviderRef extends Reference {
  type?: string;
}

/** Composition-level artifact reference (lightweight). */
export interface CompositionArtifactRef extends Reference {
  type?: string;
}

/** Top-level MMOS Composition — matches `schemas/composition.schema.json`. */
export interface Composition {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  version: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  runtime?: CompositionRuntime;
  workflows: CompositionWorkflow[];
  capabilities?: CompositionCapabilityRef[];
  providers?: CompositionProviderRef[];
  memory?: Reference;
  artifacts?: CompositionArtifactRef[];
  tags?: string[];
  labels?: Record<string, string>;
}

/** Workflow slot inside a composition — see `schemas/workflow.schema.json`. */
export interface CompositionWorkflow {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  version: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  tasks?: CompositionTask[];
  memory?: Reference;
  capabilities?: CompositionCapabilityRef[];
  artifacts?: CompositionArtifactRef[];
  timeout?: number;
  retryPolicy?: {
    maxAttempts?: number;
    backoff?: BackoffStrategy;
  };
  tags?: string[];
  labels?: Record<string, string>;
}

/** Task slot inside a workflow — see `schemas/task.schema.json`. */
export interface CompositionTask {
  id: string;
  name: string;
  type: "action" | "decision" | "parallel" | "sequential" | "condition" | "loop" | "human" | "system";
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  agent?: Reference;
  capability?: Reference;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  conditions?: string[];
  dependsOn?: string[];
  timeout?: number;
  retryPolicy?: {
    maxAttempts?: number;
    backoff?: BackoffStrategy;
  };
  memory?: Reference;
  artifacts?: CompositionArtifactRef[];
  events?: string[];
  tags?: string[];
  labels?: Record<string, string>;
}
