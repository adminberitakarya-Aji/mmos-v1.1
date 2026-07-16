/**
 * MMOS Artifact — in-memory storage implementation.
 *
 * Production-grade persistence (S3, GCS, local FS, IPFS) is implemented
 * in the SDK / services layer. This in-memory implementation is the
 * canonical reference for tests and development environments.
 */

import type { Artifact, ArtifactWriteRequest, ArtifactReadResult } from "./types";
import type { ArtifactStorage } from "./contracts";
import { ArtifactNotFoundError, ArtifactStorageError } from "./errors";

export class InMemoryArtifactStorage implements ArtifactStorage {
  private readonly artifacts = new Map<string, Artifact>();
  private readonly contents = new Map<string, ArtifactReadResult["content"]>();

  async write(request: ArtifactWriteRequest): Promise<Artifact> {
    const id = request.artifact.id ?? this.generateId();
    const now = new Date().toISOString();
    const artifact: Artifact = {
      ...request.artifact,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.artifacts.set(id, artifact);
    if (request.content !== undefined) {
      this.contents.set(id, request.content);
    }
    return artifact;
  }

  async read(id: string): Promise<ArtifactReadResult | null> {
    const artifact = this.artifacts.get(id);
    if (!artifact) return null;
    const content = this.contents.get(id);
    return content !== undefined
      ? { artifact, content }
      : { artifact };
  }

  async delete(id: string): Promise<void> {
    if (!this.artifacts.delete(id)) {
      throw new ArtifactNotFoundError(id);
    }
    this.contents.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.artifacts.has(id);
  }

  async getMetadata(id: string): Promise<Artifact | null> {
    return this.artifacts.get(id) ?? null;
  }

  private generateId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return `artifact-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

/** Placeholder remote storage. Real S3 / GCS / IPFS implementations live in services. */
export class RemoteArtifactStorage {
  constructor(_config: Record<string, unknown>) {
    throw new ArtifactStorageError(
      "RemoteArtifactStorage: not implemented. Use InMemoryArtifactStorage or wire a real backend from @mmos/services/*.",
    );
  }
}
