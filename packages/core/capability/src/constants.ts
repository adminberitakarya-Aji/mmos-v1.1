export const API_VERSION = "mmos/v1";

export const CAPABILITY_KIND = "Capability";

export const DEFAULT_TIMEOUT = 30000;

export const DEFAULT_RETRYABLE = false;

export const CAPABILITY_CATEGORIES = {

    LLM: "llm",

    TOOL: "tool",

    API: "api",

    DATABASE: "database",

    MEMORY: "memory",

    WORKFLOW: "workflow",

    EVENT: "event",

    HUMAN: "human",

    SYSTEM: "system",

    PLUGIN: "plugin"

} as const;