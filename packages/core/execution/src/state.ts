/**
 * MMOS Execution — runtime state types.
 *
 * `ExecutionState` is the user-facing state set; `TaskRunState` and
 * `ExecutionLifecyclePhase` live in `./types.ts` so all execution-related
 * types are re-exported from a single place via `index.ts`.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

import type { TaskRunState } from "./types";

export type { TaskRunState, ExecutionLifecyclePhase } from "./types";

/** High-level execution state (driven by lifecycle operations). */
export type ExecutionState =
  | "init"
  | "queued"
  | "running"
  | "paused"
  | "completed"
  | "failed"
  | "cancelled"
  | "timeout";

/** Maps an internal `ExecutionState` to a canonical MMOS `MmosStatus` value. */
export function executionStateToStatus(state: ExecutionState): MmosStatus {
  switch (state) {
    case "init":
    case "queued":
      return MMOS_STATUS.QUEUED;
    case "running":
      return MMOS_STATUS.RUNNING;
    case "paused":
      return MMOS_STATUS.PAUSED;
    case "completed":
      return MMOS_STATUS.COMPLETED;
    case "failed":
      return MMOS_STATUS.FAILED;
    case "cancelled":
      return MMOS_STATUS.CANCELLED;
    case "timeout":
      return MMOS_STATUS.TIMEOUT;
  }
}

export function isTerminalExecutionState(state: ExecutionState): boolean {
  return (
    state === "completed" ||
    state === "failed" ||
    state === "cancelled" ||
    state === "timeout"
  );
}

export function isTerminalTaskRunState(state: TaskRunState): boolean {
  return (
    state === "completed" ||
    state === "failed" ||
    state === "cancelled" ||
    state === "timeout" ||
    state === "skipped"
  );
}
