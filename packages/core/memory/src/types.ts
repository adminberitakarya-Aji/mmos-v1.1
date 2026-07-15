export interface Memory {

    apiVersion: string;

    kind: "Memory";

    metadata: MemoryMetadata;

    spec: MemorySpec;

    status?: MemoryStatus;

}

export interface MemoryMetadata {

    key: string;

    namespace: string;

    version: string;

    description?: string;

    author?: string;

    tags?: string[];

}

export interface MemorySpec {

    type:
        | "working"
        | "semantic"
        | "episodic"
        | "vector"
        | "cache"
        | "session";

    value: unknown;

    contentType?: string;

    embedding?: number[];

    ttl?: number;

    expiresAt?: string;

    metadata?: Record<string, unknown>;

}

export interface MemoryStatus {

    state:
        | "created"
        | "stored"
        | "available"
        | "updated"
        | "expired"
        | "deleted";

}