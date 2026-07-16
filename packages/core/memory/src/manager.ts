/**
 * MMOS Memory — in-memory manager.
 *
 * Production-grade backends (Redis, Postgres, vector stores) live in the
 * SDK / services layer. This in-memory implementation is the canonical
 * reference for tests and development.
 */

import type {
  Memory,
  MemoryEntry,
  MemoryQuery,
  MemoryWriteRequest,
  MemoryReadResult,
} from "./types";
import type { MemoryManager } from "./contracts";
import { MemoryEntryNotFoundError, MemoryNotFoundError } from "./errors";

export class InMemoryMemoryManager implements MemoryManager {
  private readonly memories = new Map<string, Memory>();
  private readonly entries = new Map<string, Map<string, MemoryEntry>>();

  register(memory: Memory): void {
    this.memories.set(memory.id, memory);
    if (!this.entries.has(memory.id)) {
      this.entries.set(memory.id, new Map());
    }
  }

  async write(request: MemoryWriteRequest): Promise<MemoryEntry> {
    this.assertMemory(request.memoryId);
    const now = new Date().toISOString();
    const entry: MemoryEntry = {
      id: this.generateId(),
      key: request.key,
      value: request.value,
      ...(request.embedding !== undefined ? { embedding: request.embedding } : {}),
      ...(request.metadata !== undefined ? { metadata: request.metadata } : {}),
      ...(request.references !== undefined ? { references: request.references } : {}),
      ...(request.tags !== undefined ? { tags: request.tags } : {}),
      ...(request.ttl !== undefined
        ? { expiresAt: new Date(Date.now() + request.ttl).toISOString() }
        : {}),
      createdAt: now,
    };
    const bucket = this.entries.get(request.memoryId);
    if (bucket) bucket.set(request.key, entry);
    return entry;
  }

  async read(memoryId: string, key: string): Promise<MemoryEntry | null> {
    this.assertMemory(memoryId);
    return this.entries.get(memoryId)?.get(key) ?? null;
  }

  async query(memoryId: string, query: MemoryQuery): Promise<MemoryReadResult> {
    this.assertMemory(memoryId);
    const bucket = this.entries.get(memoryId);
    if (!bucket) {
      return { entry: this.placeholder() };
    }
    let hits = Array.from(bucket.values());

    if (query.key) {
      const key = query.key;
      hits = hits.filter((e) => e.key === key);
    }
    if (query.pattern) {
      const re = new RegExp(query.pattern);
      hits = hits.filter((e) => re.test(e.key));
    }
    if (query.tags && query.tags.length > 0) {
      const wanted = new Set(query.tags);
      hits = hits.filter((e) => e.tags?.some((t) => wanted.has(t)) ?? false);
    }
    if (query.embeddingOptions?.topK) {
      hits = hits.slice(0, query.embeddingOptions.topK);
    }
    if (query.limit !== undefined) hits = hits.slice(0, query.limit);

    const first = hits[0];
    return {
      entry: first ?? this.placeholder(),
      hits: hits.map((e) => ({ entry: e })),
    };
  }

  async delete(memoryId: string, key: string): Promise<void> {
    this.assertMemory(memoryId);
    const bucket = this.entries.get(memoryId);
    if (!bucket || !bucket.delete(key)) {
      throw new MemoryEntryNotFoundError(memoryId, key);
    }
  }

  async clear(memoryId: string): Promise<void> {
    this.assertMemory(memoryId);
    this.entries.get(memoryId)?.clear();
  }

  async size(memoryId: string): Promise<number> {
    this.assertMemory(memoryId);
    return this.entries.get(memoryId)?.size ?? 0;
  }

  private assertMemory(memoryId: string): void {
    if (!this.memories.has(memoryId)) {
      throw new MemoryNotFoundError(memoryId);
    }
  }

  private placeholder(): MemoryEntry {
    return {
      id: "",
      key: "",
      value: null,
      createdAt: new Date(0).toISOString(),
    };
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `entry-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
