/**
 * MMOS Agent — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const AGENT_KIND = "Agent" as const;

export const AGENT_STATUS = MMOS_STATUS;

export const AGENT_ROLES = {
  SYSTEM: "system",
  USER: "user",
  ASSISTANT: "assistant",
  TOOL: "tool",
  ORCHESTRATOR: "orchestrator",
  CUSTOM: "custom",
} as const;

export type AgentRoleValue = (typeof AGENT_ROLES)[keyof typeof AGENT_ROLES];

export const AGENT_CAPABILITY_CATEGORIES = {
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
  CUSTOM: "custom",
} as const;

export type AgentCapabilityCategoryValue =
  (typeof AGENT_CAPABILITY_CATEGORIES)[keyof typeof AGENT_CAPABILITY_CATEGORIES];

export const DEFAULT_AGENT_TEMPERATURE = 0.7;
export const DEFAULT_AGENT_MAX_TOKENS = 4096;
export const DEFAULT_AGENT_TOP_P = 1.0;

export function isTerminalAgentStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted";
}
