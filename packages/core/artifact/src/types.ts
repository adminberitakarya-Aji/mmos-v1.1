/**
 * MMOS Artifact — type definitions.
 *
 * Shape derived from `schemas/artifact.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type ArtifactKind =
  | "text"
  | "document"
  | "image"
  | "audio"
  | "video"
  | "code"
  | "data"
  | "model"
  | "config"
  | "log"
  | "report"
  | "embedding"
  | "binary"
  | "archive"
  | "custom";

export type ArtifactStorageClass = "hot" | "warm" | "cold" | "archive";

export interface ArtifactProvenance {
  source: "system" | "agent" | "user" | "external" | "internal";
  producerId?: string;
  producerType?: string;
  producedAt?: string;
  references?: Reference[];
  transformations?: {
    type: string;
    appliedAt: string;
    by: string;
    parameters?: Record<string, unknown>;
  }[];
  trace?: {
    correlationId?: string;
    causationId?: string;
  };
}

export interface ArtifactMetadata {
  mimeType?: string;
  encoding?: string;
  size?: number;
  checksum?: {
    algorithm: "md5" | "sha1" | "sha256" | "sha512" | "crc32";
    value: string;
  };
  dimensions?: { width?: number; height?: number; depth?: number };
  duration?: number;
  pages?: number;
  rows?: number;
  columns?: string[];
  language?: string;
  compression?: { algorithm: string; ratio?: number };
  [key: string]: unknown;
}

export interface ArtifactAccessControl {
  visibility: "public" | "private" | "internal" | "restricted";
  owners?: Reference[];
  readers?: Reference[];
  writers?: Reference[];
  groups?: string[];
  policies?: string[];
  expiresAt?: string;
}

export interface Artifact {
  id: string;
  name: string;
  version: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  kind: ArtifactKind;
  format?: string;
  contentType?: string;
  uri?: string;
  externalUrl?: string;
  content?: string;
  size?: number;
  storage?: {
    backend: "local" | "s3" | "gcs" | "azure-blob" | "ipfs" | "memory" | "custom";
    location: string;
    class?: ArtifactStorageClass;
    encryption?: {
      enabled: boolean;
      algorithm?: string;
      keyId?: string;
    };
  };
  artifactMetadata?: ArtifactMetadata;
  provenance?: ArtifactProvenance;
  accessControl?: ArtifactAccessControl;
  relationships?: {
    parent?: Reference;
    children?: Reference[];
    derivedFrom?: Reference[];
    relatedTo?: Reference[];
  };
  retention?: {
    policy: "retain" | "auto-delete" | "archive" | "manual";
    until?: string;
    duration?: number;
  };
  tags?: string[];
  labels?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: Reference;
  updatedBy?: Reference;
}

export interface ArtifactWriteRequest {
  artifact: Omit<Artifact, "id" | "createdAt" | "updatedAt"> & { id?: string };
  content?: Uint8Array | string | ReadableStream<Uint8Array>;
  encoding?: "utf-8" | "base64" | "binary" | "gzip";
}

export interface ArtifactReadResult {
  artifact: Artifact;
  content?: Uint8Array | string | ReadableStream<Uint8Array>;
  encoding?: "utf-8" | "base64" | "binary" | "gzip";
}
