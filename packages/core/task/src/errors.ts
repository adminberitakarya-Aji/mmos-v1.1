/**
 * MMOS Task — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "task" as const;

export class TaskError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "TASK_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "TaskError";
  }
}

export class TaskValidationError extends TaskError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "TASK_VALIDATION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "TaskValidationError";
  }
}

export class TaskNotFoundError extends TaskError {
  constructor(id: string) {
    super(`Task not found: ${id}`, {
      code: "TASK_NOT_FOUND",
      metadata: { id },
    });
    this.name = "TaskNotFoundError";
  }
}

export class TaskExecutionError extends TaskError {
  constructor(message: string, options?: { cause?: unknown; metadata?: Record<string, unknown> }) {
    super(message, {
      code: "TASK_EXECUTION_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "TaskExecutionError";
  }
}

export class TaskDependencyError extends TaskError {
  constructor(taskId: string, dependency: string) {
    super(`Task ${taskId} has unsatisfied dependency: ${dependency}`, {
      code: "TASK_DEPENDENCY_ERROR",
      metadata: { taskId, dependency },
    });
    this.name = "TaskDependencyError";
  }
}
