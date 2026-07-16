/**
 * MMOS Task — type definitions.
 *
 * Shape derived from `schemas/task.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type TaskType =
  | "action"
  | "decision"
  | "parallel"
  | "sequential"
  | "condition"
  | "loop"
  | "human"
  | "system";

export type TaskExecutionMode = "sync" | "async" | "background";

export interface TaskRetryPolicy {
  maxAttempts?: number;
  backoff?: "fixed" | "linear" | "exponential";
  initialDelayMs?: number;
  maxDelayMs?: number;
  retryOn?: string[];
}

export interface TaskDependency {
  taskId: string;
  type: "success" | "failure" | "completion" | "always";
  condition?: string;
}

export interface TaskInput {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  required?: boolean;
  default?: unknown;
  description?: string;
}

export type TaskOutput = TaskInput;

export interface TaskResourceRequirements {
  cpu?: string;
  memory?: string;
  gpu?: string;
  storage?: string;
  network?: string;
}

export interface Task {
  id: string;
  name: string;
  version: string;
  type: TaskType;
  description?: string;
  displayName?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  workflowId?: string;
  compositionId?: string;
  agent?: Reference;
  capability?: Reference;
  inputs?: TaskInput[];
  outputs?: TaskOutput[];
  parameters?: Record<string, unknown>;
  configuration?: Record<string, unknown>;
  conditions?: string[];
  dependencies?: TaskDependency[];
  timeout?: number;
  retryPolicy?: TaskRetryPolicy;
  executionMode?: TaskExecutionMode;
  priority?: number;
  resources?: TaskResourceRequirements;
  memory?: Reference;
  artifacts?: Reference[];
  events?: string[];
  tags?: string[];
  labels?: Record<string, string>;
}

export interface TaskExecutionRequest {
  taskId: string;
  workflowId?: string;
  compositionId?: string;
  executionId?: string;
  inputs?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  trace?: {
    correlationId?: string;
    causationId?: string;
  };
}

export interface TaskExecutionResult {
  taskRunId: string;
  taskId: string;
  executionId?: string;
  status: MmosStatus;
  startedAt: string;
  finishedAt?: string;
  attempt: number;
  outputs?: Record<string, unknown>;
  state?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
