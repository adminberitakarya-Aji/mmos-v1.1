/**
 * MMOS Workflow — public contracts.
 */

import type {
  Workflow,
  WorkflowExecutionRequest,
  WorkflowExecutionResult,
  WorkflowAction,
} from "./types";

export interface WorkflowRepository {
  save(workflow: Workflow): Promise<void>;
  update(workflow: Workflow): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Workflow | null>;
  list(): Promise<Workflow[]>;
}

export interface WorkflowValidator {
  validate(workflow: Workflow): void;
}

export interface WorkflowEngine {
  execute(request: WorkflowExecutionRequest): Promise<WorkflowExecutionResult>;
  cancel(executionId: string): Promise<void>;
  pause(executionId: string): Promise<void>;
  resume(executionId: string): Promise<void>;
  getExecutionStatus(executionId: string): Promise<WorkflowExecutionResult>;
}

export interface WorkflowBuilder {
  reset(): WorkflowBuilder;
  setId(id: string): WorkflowBuilder;
  setName(name: string): WorkflowBuilder;
  setVersion(version: string): WorkflowBuilder;
  addAction(action: WorkflowAction): WorkflowBuilder;
  build(): Workflow;
}
