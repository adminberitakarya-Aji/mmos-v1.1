/**
 * MMOS Memory — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const MEMORY_KIND = "Memory" as const;

export const MEMORY_STATUS = MMOS_STATUS;

export const MEMORY_TYPES = {
  SHORT_TERM: "short-term",
  LONG_TERM: "long-term",
  EPISODIC: "episodic",
  SEMANTIC: "semantic",
  PROCEDURAL: "procedural",
  WORKING: "working",
  SHARED: "shared",
  CONTEXT: "context",
  CACHE: "cache",
  CUSTOM: "custom",
} as const;

export type MemoryTypeValue = (typeof MEMORY_TYPES)[keyof typeof MEMORY_TYPES];

export const MEMORY_BACKENDS = {
  MEMORY: "memory",
  REDIS: "redis",
  POSTGRES: "postgres",
  MONGODB: "mongodb",
  SQLITE: "sqlite",
  VECTOR: "vector",
  WEAVIATE: "weaviate",
  PINECONE: "pinecone",
  QDRANT: "qdrant",
  CUSTOM: "custom",
} as const;

export type MemoryBackendValue = (typeof MEMORY_BACKENDS)[keyof typeof MEMORY_BACKENDS];

export const MEMORY_EVICTION_POLICIES = {
  LRU: "lru",
  LFU: "lfu",
  FIFO: "fifo",
  TTL: "ttl",
  MANUAL: "manual",
} as const;

export const DEFAULT_MEMORY_CAPACITY = 1024;
export const DEFAULT_MEMORY_TTL_MS = 24 * 60 * 60 * 1000;

export function isTerminalMemoryStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted" || status === "archived";
}
