/**
 * MMOS Artifact — constants.
 */

import { MMOS_STATUS, type MmosStatus } from "@mmos/shared/types";

export const ARTIFACT_KIND = "Artifact" as const;

export const ARTIFACT_STATUS = MMOS_STATUS;

export const ARTIFACT_KINDS = {
  TEXT: "text",
  DOCUMENT: "document",
  IMAGE: "image",
  AUDIO: "audio",
  VIDEO: "video",
  CODE: "code",
  DATA: "data",
  MODEL: "model",
  CONFIG: "config",
  LOG: "log",
  REPORT: "report",
  EMBEDDING: "embedding",
  BINARY: "binary",
  ARCHIVE: "archive",
  CUSTOM: "custom",
} as const;

export type ArtifactKindValue = (typeof ARTIFACT_KINDS)[keyof typeof ARTIFACT_KINDS];

export const ARTIFACT_STORAGE_BACKENDS = {
  LOCAL: "local",
  S3: "s3",
  GCS: "gcs",
  AZURE_BLOB: "azure-blob",
  IPFS: "ipfs",
  MEMORY: "memory",
  CUSTOM: "custom",
} as const;

export const ARTIFACT_STORAGE_CLASSES = {
  HOT: "hot",
  WARM: "warm",
  COLD: "cold",
  ARCHIVE: "archive",
} as const;

export const ARTIFACT_RETENTION_POLICIES = {
  RETAIN: "retain",
  AUTO_DELETE: "auto-delete",
  ARCHIVE: "archive",
  MANUAL: "manual",
} as const;

export function isTerminalArtifactStatus(status: MmosStatus): boolean {
  return status === "completed" || status === "failed" || status === "cancelled" || status === "timeout" || status === "deleted" || status === "archived";
}
