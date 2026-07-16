/**
 * MMOS Shared — Validation errors.
 */

import { BaseError } from "./base-error";

export class ValidationError extends BaseError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "VALIDATION_ERROR",
      category: "validation",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "ValidationError";
  }
}

export class SchemaValidationError extends ValidationError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "SchemaValidationError";
  }
}
