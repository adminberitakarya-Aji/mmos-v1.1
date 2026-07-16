/**
 * MMOS Execution — public contracts.
 */

import type { Execution, TaskRun } from "./types";
import type { TaskRunState } from "./state";

export interface ExecutionRepository {
  save(execution: Execution): Promise<void>;
  update(execution: Execution): Promise<void>;
  findById(id: string): Promise<Execution | null>;
  list(filter?: { workflowId?: string; status?: Execution["status"] }): Promise<Execution[]>;
}

export interface ExecutionLifecycle {
  start(execution: Execution): Promise<Execution>;
  pause(execution: Execution): Promise<Execution>;
  resume(execution: Execution): Promise<Execution>;
  cancel(execution: Execution): Promise<Execution>;
  complete(execution: Execution): Promise<Execution>;
  fail(execution: Execution, error: { code: string; message: string; details?: Record<string, unknown> }): Promise<Execution>;
}

export interface TaskRunTracker {
  recordStart(execution: Execution, taskId: string, input?: Record<string, unknown>): Promise<TaskRun>;
  recordFinish(
    execution: Execution,
    taskId: string,
    state: TaskRunState,
    output?: Record<string, unknown>,
    error?: { code: string; message: string; details?: Record<string, unknown> },
  ): Promise<TaskRun>;
  getRuns(execution: Execution): Promise<TaskRun[]>;
}
