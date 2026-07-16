/**
 * MMOS SDK Errors
 *
 * Error classes for the SDK.
 */

export class MMOSError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "MMOSError";
    Object.setPrototypeOf(this, MMOSError.prototype);
  }
}

export class ValidationError extends MMOSError {
  constructor(
    message: string,
    public readonly errors: Array<{ field: string; message: string; code: string }>,
    public override readonly details?: Record<string, unknown>
  ) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends MMOSError {
  constructor(
    message: string,
    public readonly resourceId: string,
    public readonly resourceType: string,
    public override readonly details?: Record<string, unknown>
  ) {
    super(message, "NOT_FOUND", 404, { ...details, resourceId, resourceType });
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends MMOSError {
  constructor(message: string = "Unauthorized", public override readonly details?: Record<string, unknown>) {
    super(message, "UNAUTHORIZED", 401, details);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends MMOSError {
  constructor(message: string = "Forbidden", public override readonly details?: Record<string, unknown>) {
    super(message, "FORBIDDEN", 403, details);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class TimeoutError extends MMOSError {
  constructor(
    message: string = "Request timeout",
    public readonly timeout: number,
    public override readonly details?: Record<string, unknown>
  ) {
    super(message, "TIMEOUT", 408, { ...details, timeout });
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export class RateLimitedError extends MMOSError {
  constructor(
    message: string = "Rate limited",
    public readonly retryAfter: number,
    public override readonly details?: Record<string, unknown>
  ) {
    super(message, "RATE_LIMITED", 429, { ...details, retryAfter });
    this.name = "RateLimitedError";
    Object.setPrototypeOf(this, RateLimitedError.prototype);
  }
}

export class InternalError extends MMOSError {
  constructor(message: string = "Internal server error", public override readonly details?: Record<string, unknown>) {
    super(message, "INTERNAL_ERROR", 500, details);
    this.name = "InternalError";
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

export class WorkflowNotFoundError extends NotFoundError {
  constructor(workflowId: string, details?: Record<string, unknown>) {
    super(`Workflow not found: ${workflowId}`, workflowId, "workflow", details);
    this.name = "WorkflowNotFoundError";
    Object.setPrototypeOf(this, WorkflowNotFoundError.prototype);
  }
}

export class ExecutionNotFoundError extends NotFoundError {
  constructor(executionId: string, details?: Record<string, unknown>) {
    super(`Execution not found: ${executionId}`, executionId, "execution", details);
    this.name = "ExecutionNotFoundError";
    Object.setPrototypeOf(this, ExecutionNotFoundError.prototype);
  }
}

export class ArtifactNotFoundError extends NotFoundError {
  constructor(artifactId: string, details?: Record<string, unknown>) {
    super(`Artifact not found: ${artifactId}`, artifactId, "artifact", details);
    this.name = "ArtifactNotFoundError";
    Object.setPrototypeOf(this, ArtifactNotFoundError.prototype);
  }
}

export function isMMOSError(error: unknown): error is MMOSError {
  return error instanceof MMOSError;
}

export function getErrorCode(error: unknown): string {
  if (isMMOSError(error)) {
    return error.code;
  }
  return "UNKNOWN_ERROR";
}