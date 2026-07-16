/**
 * MMOS Capability — in-memory registry.
 */

import type { Capability } from "./types";
import type { CapabilityRegistry } from "./contracts";
import { CapabilityNotFoundError } from "./errors";

export class InMemoryCapabilityRegistry implements CapabilityRegistry {
  private readonly capabilities = new Map<string, Capability>();

  async register(capability: Capability): Promise<void> {
    this.capabilities.set(capability.id, capability);
  }

  async unregister(id: string): Promise<void> {
    this.capabilities.delete(id);
  }

  async get(id: string): Promise<Capability | null> {
    return this.capabilities.get(id) ?? null;
  }

  async findByName(name: string): Promise<Capability | null> {
    for (const capability of this.capabilities.values()) {
      if (capability.name === name) return capability;
    }
    return null;
  }

  async list(filter?: { category?: Capability["category"]; tag?: string }): Promise<Capability[]> {
    let result = Array.from(this.capabilities.values());
    if (filter?.category) {
      const wanted = filter.category;
      result = result.filter((c) => c.category === wanted);
    }
    if (filter?.tag) {
      const wanted = filter.tag;
      result = result.filter((c) => c.tags?.includes(wanted) ?? false);
    }
    return result;
  }

  async requireById(id: string): Promise<Capability> {
    const capability = await this.get(id);
    if (!capability) throw new CapabilityNotFoundError(id);
    return capability;
  }
}
