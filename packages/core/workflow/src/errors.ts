/**
 * MMOS Workflow — error types. All extend the shared BaseError so logs
 * and observability see a consistent error shape.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "workflow" as const;

export class WorkflowError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "WORKFLOW_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "WorkflowError";
  }
}

export class WorkflowValidationError extends WorkflowError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "WORKFLOW_VALIDATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "WorkflowValidationError";
  }
}

export class WorkflowNotFoundError extends WorkflowError {
  constructor(id: string) {
    super(`Workflow not found: ${id}`, {
      code: "WORKFLOW_NOT_FOUND",
      metadata: { id },
    });
    this.name = "WorkflowNotFoundError";
  }
}

export class WorkflowExecutionError extends WorkflowError {
  constructor(message: string, options?: { cause?: unknown; metadata?: Record<string, unknown> }) {
    super(message, {
      code: "WORKFLOW_EXECUTION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "WorkflowExecutionError";
  }
}
