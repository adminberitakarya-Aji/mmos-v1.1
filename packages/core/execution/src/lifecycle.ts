/**
 * MMOS Execution — lifecycle.
 *
 * Concrete state-machine implementation. Transitions update both the
 * internal `phase` and the canonical MMOS `status` (from
 * `schemas/common/status.schema.json`).
 */

import { type Execution } from "./types";
import type { ExecutionLifecycle } from "./contracts";
import { executionStateToStatus, type ExecutionState } from "./state";

export class DefaultExecutionLifecycle implements ExecutionLifecycle {
  async start(execution: Execution): Promise<Execution> {
    this.transition(execution, "running");
    return execution;
  }

  async pause(execution: Execution): Promise<Execution> {
    this.transition(execution, "paused");
    return execution;
  }

  async resume(execution: Execution): Promise<Execution> {
    this.transition(execution, "running");
    return execution;
  }

  async cancel(execution: Execution): Promise<Execution> {
    this.transition(execution, "cancelled");
    return execution;
  }

  async complete(execution: Execution): Promise<Execution> {
    this.transition(execution, "completed");
    return execution;
  }

  async fail(execution: Execution, error: { code: string; message: string; details?: Record<string, unknown> }): Promise<Execution> {
    this.transition(execution, "failed");
    execution.error = error;
    return execution;
  }

  private transition(execution: Execution, to: ExecutionState): void {
    const now = new Date().toISOString();
    execution.phase = to;
    execution.status = executionStateToStatus(to);
    if (to === "completed" || to === "failed" || to === "cancelled" || to === "timeout") {
      execution.finishedAt = now;
      const started = Date.parse(execution.startedAt);
      if (!Number.isNaN(started)) {
        execution.durationMs = Date.now() - started;
      }
    }
  }
}
