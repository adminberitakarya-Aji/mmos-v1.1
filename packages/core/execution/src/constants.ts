/**
 * MMOS Execution — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const EXECUTION_KIND = "Execution" as const;

export const EXECUTION_STATUS = MMOS_STATUS;

export const EXECUTION_TRIGGERS = {
  MANUAL: "manual",
  API: "api",
  EVENT: "event",
  SCHEDULE: "schedule",
  SYSTEM: "system",
  RETRY: "retry",
} as const;

export type ExecutionTriggerValue = (typeof EXECUTION_TRIGGERS)[keyof typeof EXECUTION_TRIGGERS];

export const EXECUTION_VERSION = "1.0.0";

export const DEFAULT_EXECUTION_TIMEOUT_MS = 30 * 60 * 1000;
export const DEFAULT_EXECUTION_MAX_ATTEMPTS = 3;

export function isTerminalExecutionStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted";
}
