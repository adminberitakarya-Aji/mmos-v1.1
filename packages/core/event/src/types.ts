export interface Event {

    apiVersion: string;

    kind: "Event";

    metadata: EventMetadata;

    spec: EventSpec;

    status?: EventStatus;

}

export interface EventMetadata {

    id: string;

    topic: string;

    version: string;

    correlationId?: string;

    causationId?: string;

    timestamp?: string;

    labels?: Record<string, string>;

    annotations?: Record<string, string>;

}

export interface EventSpec {

    source: string;

    type: string;

    payload: unknown;

    contentType?: string;

    priority?:
        | "low"
        | "normal"
        | "high"
        | "critical";

    headers?: Record<string, string>;

}

export interface EventStatus {

    state:
        | "created"
        | "published"
        | "delivered"
        | "processed"
        | "failed"
        | "archived";

}