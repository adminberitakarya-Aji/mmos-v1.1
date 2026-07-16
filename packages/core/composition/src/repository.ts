/**
 * MMOS Composition — repository abstraction.
 *
 * Concrete storage backends (in-memory, file-system, SQL, etc.) must
 * implement `CompositionRepository`. The class below provides a
 * well-typed base; concrete implementations override each method.
 */

import type { Composition } from "./types";
import type { CompositionRepository } from "./contracts";

export abstract class BaseCompositionRepository implements CompositionRepository {
  abstract save(composition: Composition): Promise<void>;
  abstract update(composition: Composition): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Composition | null>;
  abstract list(): Promise<Composition[]>;
}
