/**
 * MMOS Memory — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "memory" as const;

export class MemoryError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "MEMORY_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "MemoryError";
  }
}

export class MemoryNotFoundError extends MemoryError {
  constructor(id: string) {
    super(`Memory not found: ${id}`, {
      code: "MEMORY_NOT_FOUND",
      metadata: { id },
    });
    this.name = "MemoryNotFoundError";
  }
}

export class MemoryEntryNotFoundError extends MemoryError {
  constructor(memoryId: string, key: string) {
    super(`Memory entry not found: ${memoryId}/${key}`, {
      code: "MEMORY_ENTRY_NOT_FOUND",
      metadata: { memoryId, key },
    });
    this.name = "MemoryEntryNotFoundError";
  }
}

export class MemoryBackendError extends MemoryError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "MEMORY_BACKEND_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "MemoryBackendError";
  }
}
