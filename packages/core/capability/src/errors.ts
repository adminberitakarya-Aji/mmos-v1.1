/**
 * MMOS Capability — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "capability" as const;

export class CapabilityError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "CAPABILITY_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "CapabilityError";
  }
}

export class CapabilityValidationError extends CapabilityError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "CAPABILITY_VALIDATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "CapabilityValidationError";
  }
}

export class CapabilityNotFoundError extends CapabilityError {
  constructor(id: string) {
    super(`Capability not found: ${id}`, {
      code: "CAPABILITY_NOT_FOUND",
      metadata: { id },
    });
    this.name = "CapabilityNotFoundError";
  }
}

export class CapabilityInvocationError extends CapabilityError {
  constructor(message: string, options?: { cause?: unknown; metadata?: Record<string, unknown> }) {
    super(message, {
      code: "CAPABILITY_INVOCATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "CapabilityInvocationError";
  }
}
