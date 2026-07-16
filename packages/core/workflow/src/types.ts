/**
 * MMOS Workflow — type definitions.
 *
 * Shape derived from `schemas/workflow.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type WorkflowTrigger = "manual" | "api" | "event" | "schedule" | "system";

export type WorkflowActionType = "action" | "decision" | "parallel" | "sequential" | "condition" | "loop" | "human" | "system";

export interface WorkflowRetryPolicy {
  maxAttempts?: number;
  backoff?: "fixed" | "linear" | "exponential";
}

export interface WorkflowVariable {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array" | "secret";
  default?: unknown;
  required?: boolean;
  description?: string;
}

export interface WorkflowInput extends WorkflowVariable {}

export interface WorkflowOutput extends WorkflowVariable {}

export interface WorkflowAction {
  id: string;
  name: string;
  type: WorkflowActionType;
  description?: string;
  agent?: Reference;
  capability?: Reference;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  conditions?: string[];
  dependsOn?: string[];
  timeout?: number;
  retryPolicy?: WorkflowRetryPolicy;
  memory?: Reference;
  artifacts?: Reference[];
  events?: string[];
  tags?: string[];
  labels?: Record<string, string>;
}

export interface WorkflowTransition {
  from: string;
  to: string;
  condition?: string;
  priority?: number;
  metadata?: Record<string, unknown>;
}

export interface Workflow {
  id: string;
  name: string;
  version: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  compositionId?: string;
  inputs?: WorkflowInput[];
  outputs?: WorkflowOutput[];
  variables?: WorkflowVariable[];
  actions: WorkflowAction[];
  transitions?: WorkflowTransition[];
  triggers?: WorkflowTrigger[];
  timeout?: number;
  retryPolicy?: WorkflowRetryPolicy;
  memory?: Reference;
  capabilities?: Reference[];
  artifacts?: Reference[];
  tags?: string[];
  labels?: Record<string, string>;
}

export interface WorkflowExecutionRequest {
  workflowId: string;
  compositionId?: string;
  inputs?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  trigger?: WorkflowTrigger;
  metadata?: Record<string, unknown>;
  trace?: {
    correlationId?: string;
    causationId?: string;
  };
}

export interface WorkflowExecutionResult {
  executionId: string;
  workflowId: string;
  compositionId?: string;
  status: MmosStatus;
  startedAt: string;
  finishedAt?: string;
  outputs?: Record<string, unknown>;
  state?: Record<string, unknown>;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
