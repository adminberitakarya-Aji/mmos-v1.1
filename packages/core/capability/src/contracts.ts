/**
 * MMOS Capability — public contracts.
 */

import type {
  Capability,
  CapabilityInvocationRequest,
  CapabilityInvocationResult,
} from "./types";

export interface CapabilityRepository {
  save(capability: Capability): Promise<void>;
  update(capability: Capability): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Capability | null>;
  findByName(name: string): Promise<Capability | null>;
  list(filter?: { category?: Capability["category"]; tag?: string }): Promise<Capability[]>;
}

export interface CapabilityValidator {
  validate(capability: Capability): void;
}

export interface CapabilityRegistry {
  register(capability: Capability): Promise<void>;
  unregister(id: string): Promise<void>;
  get(id: string): Promise<Capability | null>;
  findByName(name: string): Promise<Capability | null>;
  list(filter?: { category?: Capability["category"]; tag?: string }): Promise<Capability[]>;
}

export interface CapabilityInvoker {
  invoke(request: CapabilityInvocationRequest): Promise<CapabilityInvocationResult>;
  cancel(invocationId: string): Promise<void>;
}
