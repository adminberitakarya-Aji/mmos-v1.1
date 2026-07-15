export interface Artifact {

    apiVersion: string;

    kind: "Artifact";

    metadata: ArtifactMetadata;

    spec: ArtifactSpec;

    status?: ArtifactStatus;

}

export interface ArtifactMetadata {

    name: string;

    version: string;

    description?: string;

    author?: string;

    tags?: string[];

}

export interface ArtifactSpec {

    type:
        | "text"
        | "image"
        | "audio"
        | "video"
        | "document"
        | "dataset"
        | "json"
        | "binary"
        | "archive";

    mimeType: string;

    uri: string;

    size?: number;

    checksum?: Checksum;

    encoding?: string;

    language?: string;

    metadata?: Record<string, unknown>;

}

export interface Checksum {

    algorithm:
        | "md5"
        | "sha1"
        | "sha256"
        | "sha512";

    value: string;

}

export interface ArtifactStatus {

    state:
        | "created"
        | "registered"
        | "available"
        | "archived"
        | "deleted";

}