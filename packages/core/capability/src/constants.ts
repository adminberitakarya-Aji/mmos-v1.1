/**
 * MMOS Capability — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const CAPABILITY_KIND = "Capability" as const;

export const CAPABILITY_STATUS = MMOS_STATUS;

export const CAPABILITY_CATEGORIES = {
  LANGUAGE: "language",
  VISION: "vision",
  AUDIO: "audio",
  VIDEO: "video",
  IMAGE: "image",
  CODE: "code",
  REASONING: "reasoning",
  SEARCH: "search",
  MEMORY: "memory",
  TOOL: "tool",
  WORKFLOW: "workflow",
  DATA: "data",
  TRANSFORMATION: "transformation",
  VALIDATION: "validation",
  CUSTOM: "custom",
} as const;

export type CapabilityCategoryValue =
  (typeof CAPABILITY_CATEGORIES)[keyof typeof CAPABILITY_CATEGORIES];

export const CAPABILITY_IMPLEMENTATION_TYPES = {
  AGENT: "agent",
  TOOL: "tool",
  SERVICE: "service",
  FUNCTION: "function",
  PIPELINE: "pipeline",
  EXTERNAL: "external",
} as const;

export const DEFAULT_CAPABILITY_TIMEOUT_MS = 60_000;
export const DEFAULT_CAPABILITY_MAX_ATTEMPTS = 3;

export function isTerminalCapabilityStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted";
}
