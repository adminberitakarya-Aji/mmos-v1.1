/**
 * MMOS Task — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const TASK_KIND = "Task" as const;

export const TASK_STATUS = MMOS_STATUS;

export const TASK_TYPES = {
  ACTION: "action",
  DECISION: "decision",
  PARALLEL: "parallel",
  SEQUENTIAL: "sequential",
  CONDITION: "condition",
  LOOP: "loop",
  HUMAN: "human",
  SYSTEM: "system",
} as const;

export type TaskTypeValue = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];

export const TASK_EXECUTION_MODES = {
  SYNC: "sync",
  ASYNC: "async",
  BACKGROUND: "background",
} as const;

export type TaskExecutionModeValue = (typeof TASK_EXECUTION_MODES)[keyof typeof TASK_EXECUTION_MODES];

export const TASK_BACKOFF_STRATEGIES = {
  FIXED: "fixed",
  LINEAR: "linear",
  EXPONENTIAL: "exponential",
} as const;

export const DEFAULT_TASK_PRIORITY = 5;

export const DEFAULT_MAX_ATTEMPTS = 3;

export function isTerminalTaskStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted";
}
