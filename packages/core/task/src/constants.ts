export const API_VERSION = "mmos/v1";

export const TASK_KIND = "Task";

export const TASK_TYPES = {

  AGENT: "agent",

  CAPABILITY: "capability",

  TOOL: "tool",

  PROMPT: "prompt",

  HUMAN: "human",

  EVENT: "event",

  CONDITION: "condition",

  LOOP: "loop",

  PARALLEL: "parallel",

  SUBWORKFLOW: "subworkflow"

} as const;

export const TASK_STATES = {

  DRAFT: "draft",

  VALIDATED: "validated",

  COMPILED: "compiled",

  READY: "ready",

  DEPRECATED: "deprecated"

} as const;