/**
 * MMOS Artifact — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "artifact" as const;

export class ArtifactError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "ARTIFACT_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "ArtifactError";
  }
}

export class ArtifactNotFoundError extends ArtifactError {
  constructor(id: string) {
    super(`Artifact not found: ${id}`, {
      code: "ARTIFACT_NOT_FOUND",
      metadata: { id },
    });
    this.name = "ArtifactNotFoundError";
  }
}

export class ArtifactStorageError extends ArtifactError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "ARTIFACT_STORAGE_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "ArtifactStorageError";
  }
}
