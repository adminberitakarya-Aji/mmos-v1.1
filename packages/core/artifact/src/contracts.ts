/**
 * MMOS Artifact — public contracts.
 */

import type {
  Artifact,
  ArtifactWriteRequest,
  ArtifactReadResult,
} from "./types";

export interface ArtifactRepository {
  save(artifact: Artifact): Promise<void>;
  update(artifact: Artifact): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Artifact | null>;
  list(filter?: { kind?: Artifact["kind"]; tag?: string }): Promise<Artifact[]>;
}

export interface ArtifactStorage {
  write(request: ArtifactWriteRequest): Promise<Artifact>;
  read(id: string): Promise<ArtifactReadResult | null>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  getMetadata(id: string): Promise<Artifact | null>;
}
