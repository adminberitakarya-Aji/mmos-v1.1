export const API_VERSION = "mmos/v1";

export const EVENT_KIND = "Event";

export const DEFAULT_CONTENT_TYPE =
    "application/json";

export const DEFAULT_PRIORITY =
    "normal";

export const EVENT_PRIORITIES = {

    LOW: "low",

    NORMAL: "normal",

    HIGH: "high",

    CRITICAL: "critical"

} as const;