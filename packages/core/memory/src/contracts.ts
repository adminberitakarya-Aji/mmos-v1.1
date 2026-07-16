/**
 * MMOS Memory — public contracts.
 */

import type {
  Memory,
  MemoryEntry,
  MemoryQuery,
  MemoryWriteRequest,
  MemoryReadResult,
} from "./types";

export interface MemoryRepository {
  save(memory: Memory): Promise<void>;
  update(memory: Memory): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Memory | null>;
  list(): Promise<Memory[]>;
}

export interface MemoryManager {
  write(request: MemoryWriteRequest): Promise<MemoryEntry>;
  read(memoryId: string, key: string): Promise<MemoryEntry | null>;
  query(memoryId: string, query: MemoryQuery): Promise<MemoryReadResult>;
  delete(memoryId: string, key: string): Promise<void>;
  clear(memoryId: string): Promise<void>;
  size(memoryId: string): Promise<number>;
}
