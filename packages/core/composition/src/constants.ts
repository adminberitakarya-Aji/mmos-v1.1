/**
 * MMOS Composition — constants.
 *
 * The `status` values come from `schemas/common/status.schema.json` and are
 * shared across all MMOS domain objects. Do not invent additional values
 * here without updating the canonical schema.
 */

export const COMPOSITION_KIND = "Composition" as const;

export const API_VERSION = "mmos/v1" as const;

/** Canonical lifecycle status, mirrored from `schemas/common/status.schema.json`. */
export const COMPOSITION_STATUS = {
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

export type CompositionStatusValue = (typeof COMPOSITION_STATUS)[keyof typeof COMPOSITION_STATUS];

/** Convenience aliases for the most-used status values. */
export const COMPOSITION_PUBLISHABLE_STATUS: readonly CompositionStatusValue[] = [
  COMPOSITION_STATUS.DRAFT,
  COMPOSITION_STATUS.ACTIVE,
  COMPOSITION_STATUS.INACTIVE,
] as const;
