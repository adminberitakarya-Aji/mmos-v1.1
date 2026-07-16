/**
 * MMOS Task — public contracts.
 */

import type {
  Task,
  TaskExecutionRequest,
  TaskExecutionResult,
} from "./types";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | null>;
  list(filter?: { workflowId?: string; type?: Task["type"] }): Promise<Task[]>;
}

export interface TaskValidator {
  validate(task: Task): void;
}

export interface TaskExecutor {
  execute(request: TaskExecutionRequest): Promise<TaskExecutionResult>;
  cancel(taskRunId: string): Promise<void>;
  getRunStatus(taskRunId: string): Promise<TaskExecutionResult>;
}
