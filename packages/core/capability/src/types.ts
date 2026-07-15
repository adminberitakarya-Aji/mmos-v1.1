export interface Capability {

    apiVersion: string;

    kind: "Capability";

    metadata: CapabilityMetadata;

    spec: CapabilitySpec;

    status?: CapabilityStatus;

}

export interface CapabilityMetadata {

    name: string;

    version: string;

    description?: string;

    author?: string;

    tags?: string[];

}

export interface CapabilitySpec {

    category:
        | "llm"
        | "tool"
        | "api"
        | "database"
        | "memory"
        | "workflow"
        | "event"
        | "human"
        | "system"
        | "plugin";

    description?: string;

    provider?: string;

    version?: string;

    inputs: Record<string, CapabilityParameter>;

    outputs: Record<string, CapabilityParameter>;

    configuration?: Record<string, unknown>;

    permissions?: string[];

    timeout?: number;

    retryable?: boolean;

}

export interface CapabilityParameter {

    type:
        | "string"
        | "number"
        | "integer"
        | "boolean"
        | "object"
        | "array"
        | "file"
        | "image"
        | "audio"
        | "video"
        | "binary"
        | "any";

    description?: string;

    required?: boolean;

    default?: unknown;

    enum?: unknown[];

}

export interface CapabilityStatus {

    state:
        | "draft"
        | "validated"
        | "registered"
        | "available"
        | "deprecated";

}