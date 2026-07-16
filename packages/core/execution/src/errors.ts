/**
 * MMOS Execution — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "execution" as const;

export class ExecutionError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "EXECUTION_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "ExecutionError";
  }
}

export class InvalidExecutionStateError extends ExecutionError {
  constructor(executionId: string, from: string, to: string) {
    super(`Invalid state transition for execution ${executionId}: ${from} -> ${to}`, {
      code: "INVALID_EXECUTION_STATE",
      metadata: { executionId, from, to },
    });
    this.name = "InvalidExecutionStateError";
  }
}

export class ExecutionCancelledError extends ExecutionError {
  constructor(executionId: string) {
    super(`Execution cancelled: ${executionId}`, {
      code: "EXECUTION_CANCELLED",
      metadata: { executionId },
    });
    this.name = "ExecutionCancelledError";
  }
}

export class ExecutionTimeoutError extends ExecutionError {
  constructor(executionId: string, timeoutMs: number) {
    super(`Execution ${executionId} timed out after ${timeoutMs}ms`, {
      code: "EXECUTION_TIMEOUT",
      metadata: { executionId, timeoutMs },
    });
    this.name = "ExecutionTimeoutError";
  }
}

export class TaskRunError extends ExecutionError {
  constructor(executionId: string, taskId: string, message: string) {
    super(`Task run ${taskId} failed in execution ${executionId}: ${message}`, {
      code: "TASK_RUN_ERROR",
      metadata: { executionId, taskId },
    });
    this.name = "TaskRunError";
  }
}
