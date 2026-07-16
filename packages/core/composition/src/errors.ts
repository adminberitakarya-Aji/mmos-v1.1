/**
 * MMOS Composition — error types.
 *
 * Inherit from the shared base error so all MMOS errors share a consistent
 * shape (`code`, `category`, `metadata`, `cause`, `timestamp`).
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "composition" as const;

export class CompositionError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "COMPOSITION_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "CompositionError";
  }
}

export class CompositionValidationError extends CompositionError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "COMPOSITION_VALIDATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "CompositionValidationError";
  }
}

export class CompositionNotFoundError extends CompositionError {
  constructor(id: string) {
    super(`Composition not found: ${id}`, {
      code: "COMPOSITION_NOT_FOUND",
      metadata: { id },
    });
    this.name = "CompositionNotFoundError";
  }
}

export class CompositionAlreadyExistsError extends CompositionError {
  constructor(id: string) {
    super(`Composition already exists: ${id}`, {
      code: "COMPOSITION_ALREADY_EXISTS",
      metadata: { id },
    });
    this.name = "CompositionAlreadyExistsError";
  }
}

export class CompositionPublishError extends CompositionError {
  constructor(id: string, reason: string) {
    super(`Cannot publish composition ${id}: ${reason}`, {
      code: "COMPOSITION_PUBLISH_ERROR",
      metadata: { id, reason },
    });
    this.name = "CompositionPublishError";
  }
}
