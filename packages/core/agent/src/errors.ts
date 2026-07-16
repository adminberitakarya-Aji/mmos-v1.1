/**
 * MMOS Agent — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "agent" as const;

export class AgentError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "AGENT_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "AgentError";
  }
}

export class AgentValidationError extends AgentError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "AGENT_VALIDATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "AgentValidationError";
  }
}

export class AgentNotFoundError extends AgentError {
  constructor(id: string) {
    super(`Agent not found: ${id}`, {
      code: "AGENT_NOT_FOUND",
      metadata: { id },
    });
    this.name = "AgentNotFoundError";
  }
}

export class AgentInvocationError extends AgentError {
  constructor(message: string, options?: { cause?: unknown; metadata?: Record<string, unknown> }) {
    super(message, {
      code: "AGENT_INVOCATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "AgentInvocationError";
  }
}
