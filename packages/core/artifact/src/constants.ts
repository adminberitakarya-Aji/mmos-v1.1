export const API_VERSION = "mmos/v1";

export const ARTIFACT_KIND = "Artifact";

export const DEFAULT_HASH_ALGORITHM = "sha256";

export const SUPPORTED_ARTIFACT_TYPES = {

    TEXT: "text",

    IMAGE: "image",

    AUDIO: "audio",

    VIDEO: "video",

    DOCUMENT: "document",

    DATASET: "dataset",

    JSON: "json",

    BINARY: "binary",

    ARCHIVE: "archive"

} as const;