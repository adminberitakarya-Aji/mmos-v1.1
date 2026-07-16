/**
 * MMOS Workflow — engine.
 *
 * Concrete `WorkflowEngine` implementations are out of scope for the
 * core package. The runtime layer wires a real engine to the contract
 * defined here.
 */

import type {
  WorkflowExecutionRequest,
  WorkflowExecutionResult,
} from "./types";
import type { WorkflowEngine } from "./contracts";
import { WorkflowError } from "./errors";

export abstract class BaseWorkflowEngine implements WorkflowEngine {
  abstract execute(request: WorkflowExecutionRequest): Promise<WorkflowExecutionResult>;
  abstract cancel(executionId: string): Promise<void>;
  abstract pause(executionId: string): Promise<void>;
  abstract resume(executionId: string): Promise<void>;
  abstract getExecutionStatus(executionId: string): Promise<WorkflowExecutionResult>;
}

/**
 * Default engine simply re-throws. Real engines live in `packages/runtime`
 * (e.g. `runtime/executor` and `runtime/scheduler`).
 */
export class DefaultWorkflowEngine extends BaseWorkflowEngine {
  execute(_request: WorkflowExecutionRequest): Promise<WorkflowExecutionResult> {
    return Promise.reject(
      new WorkflowError("DefaultWorkflowEngine: no engine is configured. Wire a runtime engine from @mmos/runtime/*"),
    );
  }

  cancel(_executionId: string): Promise<void> {
    return Promise.reject(new WorkflowError("DefaultWorkflowEngine: not implemented"));
  }

  pause(_executionId: string): Promise<void> {
    return Promise.reject(new WorkflowError("DefaultWorkflowEngine: not implemented"));
  }

  resume(_executionId: string): Promise<void> {
    return Promise.reject(new WorkflowError("DefaultWorkflowEngine: not implemented"));
  }

  getExecutionStatus(_executionId: string): Promise<WorkflowExecutionResult> {
    return Promise.reject(new WorkflowError("DefaultWorkflowEngine: not implemented"));
  }
}
