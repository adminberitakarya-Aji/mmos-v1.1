/**
 * MMOS Composition — application service.
 *
 * Orchestrates validation, persistence, and lifecycle transitions for
 * `Composition` objects. Storage is delegated to a `CompositionRepository`;
 * schema checks are delegated to a `CompositionValidator`.
 */

import type { Composition } from "./types";
import { COMPOSITION_STATUS } from "./constants";
import {
  CompositionNotFoundError,
  CompositionPublishError,
  CompositionValidationError,
} from "./errors";
import type { CompositionRepository, CompositionService, CompositionValidator } from "./contracts";

export class DefaultCompositionService implements CompositionService {
  constructor(
    private readonly repository: CompositionRepository,
    private readonly validator: CompositionValidator,
  ) {}

  async create(composition: Composition): Promise<void> {
    this.assertValid(composition);
    const existing = await this.repository.findById(composition.id);
    if (existing) {
      throw new CompositionValidationError(
        `Composition ${composition.id} already exists`,
        { metadata: { id: composition.id } },
      );
    }
    await this.repository.save(composition);
  }

  async update(composition: Composition): Promise<void> {
    this.assertValid(composition);
    await this.assertExists(composition.id);
    await this.repository.update(composition);
  }

  async publish(id: string): Promise<void> {
    const composition = await this.assertExists(id);
    if (composition.status === COMPOSITION_STATUS.ACTIVE) {
      throw new CompositionPublishError(id, "already active");
    }
    const updated: Composition = {
      ...composition,
      status: COMPOSITION_STATUS.ACTIVE,
    };
    await this.repository.update(updated);
  }

  async archive(id: string): Promise<void> {
    const composition = await this.assertExists(id);
    if (composition.status === COMPOSITION_STATUS.ARCHIVED) {
      throw new CompositionPublishError(id, "already archived");
    }
    const updated: Composition = {
      ...composition,
      status: COMPOSITION_STATUS.ARCHIVED,
    };
    await this.repository.update(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async get(id: string): Promise<Composition | null> {
    return this.repository.findById(id);
  }

  async list(): Promise<Composition[]> {
    return this.repository.list();
  }

  private assertValid(composition: Composition): void {
    this.validator.validate(composition);
  }

  private async assertExists(id: string): Promise<Composition> {
    const composition = await this.repository.findById(id);
    if (!composition) {
      throw new CompositionNotFoundError(id);
    }
    return composition;
  }
}
