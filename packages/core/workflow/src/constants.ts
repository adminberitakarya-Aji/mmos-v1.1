/**
 * MMOS Workflow — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const WORKFLOW_KIND = "Workflow" as const;

export const WORKFLOW_STATUS = MMOS_STATUS;

export const WORKFLOW_TRIGGERS = {
  MANUAL: "manual",
  API: "api",
  EVENT: "event",
  SCHEDULE: "schedule",
  SYSTEM: "system",
} as const;

export type WorkflowTriggerValue = (typeof WORKFLOW_TRIGGERS)[keyof typeof WORKFLOW_TRIGGERS];

export const WORKFLOW_ACTION_TYPES = {
  ACTION: "action",
  DECISION: "decision",
  PARALLEL: "parallel",
  SEQUENTIAL: "sequential",
  CONDITION: "condition",
  LOOP: "loop",
  HUMAN: "human",
  SYSTEM: "system",
} as const;

export type WorkflowActionTypeValue = (typeof WORKFLOW_ACTION_TYPES)[keyof typeof WORKFLOW_ACTION_TYPES];

export const DEFAULT_WORKFLOW_VERSION = "1.0.0";

export function isTerminalWorkflowStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted";
}
