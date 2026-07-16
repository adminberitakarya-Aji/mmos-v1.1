/**
 * MMOS Event — type definitions.
 *
 * Shape derived from `schemas/event.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type EventPriority = "low" | "normal" | "high" | "critical";

export type EventDeliveryMode = "at-most-once" | "at-least-once" | "exactly-once";

export type EventLifecycleState = "created" | "published" | "delivered" | "processed" | "failed" | "archived";

export interface Event {
  id: string;
  topic: string;
  version: string;
  type: string;
  source: string;
  subject?: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  payload: unknown;
  contentType?: string;
  priority?: EventPriority;
  headers?: Record<string, string>;
  correlationId?: string;
  causationId?: string;
  timestamp: string;
  ttl?: number;
  deliveryMode?: EventDeliveryMode;
  references?: Reference[];
  routing?: {
    routingKey?: string;
    partitionKey?: string;
    headers?: Record<string, string>;
  };
  retry?: {
    maxAttempts?: number;
    backoff?: "fixed" | "linear" | "exponential";
  };
  tags?: string[];
  labels?: Record<string, string>;
  state?: EventLifecycleState;
  publishedAt?: string;
  deliveredAt?: string;
  processedAt?: string;
  failureCount?: number;
  lastError?: { code: string; message: string; details?: Record<string, unknown> };
}
