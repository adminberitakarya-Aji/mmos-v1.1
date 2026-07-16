/**
 * MMOS Agent — in-memory registry implementation.
 *
 * Production-grade persistence belongs in the SDK / services layer; this
 * in-memory implementation is the canonical reference for tests and
 * development environments.
 */

import type { Agent } from "./types";
import type { AgentRegistry } from "./contracts";
import { AgentNotFoundError } from "./errors";

export class InMemoryAgentRegistry implements AgentRegistry {
  private readonly agents = new Map<string, Agent>();

  async register(agent: Agent): Promise<void> {
    this.agents.set(agent.id, agent);
  }

  async unregister(id: string): Promise<void> {
    this.agents.delete(id);
  }

  async get(id: string): Promise<Agent | null> {
    return this.agents.get(id) ?? null;
  }

  async findByName(name: string): Promise<Agent | null> {
    for (const agent of this.agents.values()) {
      if (agent.name === name) return agent;
    }
    return null;
  }

  async list(filter?: { providerId?: string; tag?: string }): Promise<Agent[]> {
    let result = Array.from(this.agents.values());
    if (filter?.providerId) {
      const wanted = filter.providerId;
      result = result.filter((a) => a.provider?.id === wanted);
    }
    if (filter?.tag) {
      const wanted = filter.tag;
      result = result.filter((a) => a.tags?.includes(wanted) ?? false);
    }
    return result;
  }

  async requireById(id: string): Promise<Agent> {
    const agent = await this.get(id);
    if (!agent) throw new AgentNotFoundError(id);
    return agent;
  }
}
