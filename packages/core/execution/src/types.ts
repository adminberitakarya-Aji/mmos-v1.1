/**
 * MMOS Execution — type definitions.
 *
 * Shape derived from `schemas/execution.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type ExecutionTrigger = "manual" | "api" | "event" | "schedule" | "system" | "retry";

export type ExecutionLifecyclePhase = "init" | "queued" | "running" | "paused" | "completing" | "completed" | "failing" | "failed" | "cancelling" | "cancelled" | "timing-out" | "timeout";

export type TaskRunState = "pending" | "queued" | "running" | "completed" | "failed" | "cancelled" | "timeout" | "skipped";

export interface TaskRun {
  taskId: string;
  state: TaskRunState;
  attempt: number;
  startedAt?: string;
  finishedAt?: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: { code: string; message: string; details?: Record<string, unknown> };
  durationMs?: number;
  metadata?: Record<string, unknown>;
}

export interface ExecutionSpec {
  inputs?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  context?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  configuration?: Record<string, unknown>;
  priority?: number;
  timeout?: number;
  retryPolicy?: {
    maxAttempts?: number;
    backoff?: "fixed" | "linear" | "exponential";
  };
  trace?: {
    correlationId?: string;
    causationId?: string;
    parentExecutionId?: string;
  };
}

export interface Execution {
  id: string;
  name?: string;
  version: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  workflowId: string;
  compositionId?: string;
  trigger: ExecutionTrigger;
  spec: ExecutionSpec;
  phase?: ExecutionLifecyclePhase;
  progress?: number;
  taskRuns?: TaskRun[];
  startedAt: string;
  finishedAt?: string;
  durationMs?: number;
  outputs?: Record<string, unknown>;
  state?: Record<string, unknown>;
  artifacts?: Reference[];
  events?: Reference[];
  tags?: string[];
  labels?: Record<string, string>;
  error?: { code: string; message: string; details?: Record<string, unknown> };
}
