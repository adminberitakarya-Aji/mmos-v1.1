/**
 * Canonical MMOS lifecycle status — mirrored from `schemas/common/status.schema.json`.
 * Shared by every domain object (composition, workflow, task, agent, etc).
 */

export const MMOS_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  QUEUED: "queued",
  RUNNING: "running",
  PAUSED: "paused",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  TIMEOUT: "timeout",
  ARCHIVED: "archived",
  DELETED: "deleted",
} as const;

export type MmosStatus = (typeof MMOS_STATUS)[keyof typeof MMOS_STATUS];

export const MMOS_STATUS_VALUES: readonly MmosStatus[] = Object.values(MMOS_STATUS);
