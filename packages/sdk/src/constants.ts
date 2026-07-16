/**
 * MMOS SDK Constants
 *
 * Constants and enums used across the SDK.
 */

export const MMOS_VERSION = "1.0.0";

export enum WorkflowStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum ArtifactType {
  FILE = "file",
  DATA = "data",
  MODEL = "model",
  DOCUMENT = "document",
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video",
  OTHER = "other",
}

export enum ExecutionMode {
  SYNC = "sync",
  ASYNC = "async",
  STREAM = "stream",
}

export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_RETRY_ATTEMPTS = 3;
export const MAX_PAYLOAD_SIZE = 10 * 1024 * 1024; // 10MB

export const API_VERSION = "v1";
export const API_BASE_PATH = `/api/${API_VERSION}`;

export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  TIMEOUT: "TIMEOUT",
  RATE_LIMITED: "RATE_LIMITED",
  WORKFLOW_NOT_FOUND: "WORKFLOW_NOT_FOUND",
  EXECUTION_NOT_FOUND: "EXECUTION_NOT_FOUND",
  ARTIFACT_NOT_FOUND: "ARTIFACT_NOT_FOUND",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];