/**
 * MMOS Capability — type definitions.
 *
 * Shape derived from `schemas/capability.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type CapabilityCategory =
  | "language"
  | "vision"
  | "audio"
  | "video"
  | "image"
  | "code"
  | "reasoning"
  | "search"
  | "memory"
  | "tool"
  | "workflow"
  | "data"
  | "transformation"
  | "validation"
  | "custom";

export interface CapabilityInput {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array" | "file" | "stream";
  required?: boolean;
  default?: unknown;
  description?: string;
  validation?: Record<string, unknown>;
}

export type CapabilityOutput = CapabilityInput;

export interface Capability {
  id: string;
  name: string;
  version: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  category: CapabilityCategory;
  tags?: string[];
  inputs?: CapabilityInput[];
  outputs?: CapabilityOutput[];
  parameters?: Record<string, unknown>;
  configuration?: Record<string, unknown>;
  examples?: {
    name?: string;
    description?: string;
    inputs?: Record<string, unknown>;
    outputs?: Record<string, unknown>;
  }[];
  requirements?: {
    agents?: Reference[];
    tools?: Reference[];
    providers?: Reference[];
    memory?: Reference;
    permissions?: string[];
    resources?: {
      cpu?: string;
      memory?: string;
      gpu?: string;
    };
  };
  implementation?: {
    type: "agent" | "tool" | "service" | "function" | "pipeline" | "external";
    reference: Reference;
    configuration?: Record<string, unknown>;
  };
  timeout?: number;
  retryPolicy?: {
    maxAttempts?: number;
    backoff?: "fixed" | "linear" | "exponential";
  };
  rateLimit?: {
    requestsPerMinute?: number;
    tokensPerMinute?: number;
    concurrent?: number;
  };
  cost?: {
    currency?: string;
    perCall?: number;
    perToken?: number;
    tiers?: { upTo: number; cost: number }[];
  };
  observability?: {
    metrics?: boolean;
    tracing?: boolean;
    logging?: boolean;
  };
  labels?: Record<string, string>;
}

export interface CapabilityInvocationRequest {
  capabilityId: string;
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

export interface CapabilityInvocationResult {
  invocationId: string;
  capabilityId: string;
  status: MmosStatus;
  startedAt: string;
  finishedAt?: string;
  outputs?: Record<string, unknown>;
  cost?: {
    amount: number;
    currency: string;
    tokens?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
