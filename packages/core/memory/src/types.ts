/**
 * MMOS Memory — type definitions.
 *
 * Shape derived from `schemas/memory.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type MemoryType =
  | "short-term"
  | "long-term"
  | "episodic"
  | "semantic"
  | "procedural"
  | "working"
  | "shared"
  | "context"
  | "cache"
  | "custom";

export type MemoryBackend =
  | "memory"
  | "redis"
  | "postgres"
  | "mongodb"
  | "sqlite"
  | "vector"
  | "weaviate"
  | "pinecone"
  | "qdrant"
  | "custom";

export interface MemoryEntry {
  id: string;
  key: string;
  value: unknown;
  embedding?: number[];
  metadata?: Record<string, unknown>;
  score?: number;
  createdAt: string;
  updatedAt?: string;
  expiresAt?: string;
  references?: Reference[];
  tags?: string[];
}

export interface MemoryQuery {
  key?: string;
  pattern?: string;
  value?: unknown;
  embedding?: number[];
  embeddingOptions?: {
    topK?: number;
    minScore?: number;
    algorithm?: "cosine" | "euclidean" | "dot-product";
  };
  filter?: Record<string, unknown>;
  tags?: string[];
  references?: Reference[];
  limit?: number;
  offset?: number;
  sortBy?: "createdAt" | "updatedAt" | "score" | "key";
  sortOrder?: "asc" | "desc";
}

export interface MemoryScope {
  type: "session" | "execution" | "workflow" | "composition" | "global" | "tenant" | "user";
  sessionId?: string;
  executionId?: string;
  workflowId?: string;
  compositionId?: string;
  tenantId?: string;
  userId?: string;
}

export interface MemoryConfig {
  capacity?: number;
  ttl?: number;
  evictionPolicy?: "lru" | "lfu" | "fifo" | "ttl" | "manual";
  persistence?: {
    enabled: boolean;
    backend?: MemoryBackend;
    location?: string;
  };
  encryption?: {
    enabled: boolean;
    algorithm?: string;
    keyId?: string;
  };
  compression?: {
    enabled: boolean;
    algorithm?: string;
  };
  replication?: {
    enabled: boolean;
    factor?: number;
    strategy?: "sync" | "async";
  };
  indexing?: {
    enabled: boolean;
    fields?: string[];
  };
  embedding?: Reference;
  search?: {
    enabled: boolean;
    algorithm?: "cosine" | "euclidean" | "dot-product";
    topK?: number;
    minScore?: number;
  };
}

export interface Memory {
  id: string;
  name: string;
  version: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  type: MemoryType;
  scope: MemoryScope;
  backend: MemoryBackend;
  config?: MemoryConfig;
  schema?: Record<string, unknown>;
  defaults?: Record<string, unknown>;
  tags?: string[];
  labels?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface MemoryWriteRequest {
  memoryId: string;
  key: string;
  value: unknown;
  embedding?: number[];
  metadata?: Record<string, unknown>;
  references?: Reference[];
  tags?: string[];
  ttl?: number;
}

export interface MemoryReadResult {
  entry: MemoryEntry;
  hits?: { entry: MemoryEntry; score?: number }[];
}
