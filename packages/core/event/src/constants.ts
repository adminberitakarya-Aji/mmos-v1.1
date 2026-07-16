/**
 * MMOS Event — constants.
 */

import { MMOS_STATUS } from "@mmos/shared/types";

export const EVENT_KIND = "Event" as const;

export const EVENT_STATUS = MMOS_STATUS;

export const EVENT_PRIORITIES = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export type EventPriorityValue = (typeof EVENT_PRIORITIES)[keyof typeof EVENT_PRIORITIES];

export const EVENT_DELIVERY_MODES = {
  AT_MOST_ONCE: "at-most-once",
  AT_LEAST_ONCE: "at-least-once",
  EXACTLY_ONCE: "exactly-once",
} as const;

export const EVENT_LIFECYCLE_STATES = {
  CREATED: "created",
  PUBLISHED: "published",
  DELIVERED: "delivered",
  PROCESSED: "processed",
  FAILED: "failed",
  ARCHIVED: "archived",
} as const;

export type EventLifecycleStateValue =
  (typeof EVENT_LIFECYCLE_STATES)[keyof typeof EVENT_LIFECYCLE_STATES];

export const DEFAULT_EVENT_CONTENT_TYPE = "application/json";
export const DEFAULT_EVENT_PRIORITY: EventPriorityValue = "normal";
