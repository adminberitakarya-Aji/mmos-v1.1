export const API_VERSION = "mmos/v1";

export const MEMORY_KIND = "Memory";

export const DEFAULT_NAMESPACE = "workspace";

export const DEFAULT_TTL = 86400;

export const MEMORY_TYPES = {

    WORKING: "working",

    SEMANTIC: "semantic",

    EPISODIC: "episodic",

    VECTOR: "vector",

    CACHE: "cache",

    SESSION: "session"

} as const;