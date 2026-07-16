/**
 * MMOS Agent — public contracts.
 */

import type {
  Agent,
  AgentInvocationRequest,
  AgentInvocationResult,
} from "./types";

export interface AgentRepository {
  save(agent: Agent): Promise<void>;
  update(agent: Agent): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Agent | null>;
  findByName(name: string): Promise<Agent | null>;
  list(): Promise<Agent[]>;
}

export interface AgentValidator {
  validate(agent: Agent): void;
}

export interface AgentRegistry {
  register(agent: Agent): Promise<void>;
  unregister(id: string): Promise<void>;
  get(id: string): Promise<Agent | null>;
  findByName(name: string): Promise<Agent | null>;
  list(filter?: { providerId?: string; tag?: string }): Promise<Agent[]>;
}

export interface AgentInvoker {
  invoke(request: AgentInvocationRequest): Promise<AgentInvocationResult>;
  cancel(invocationId: string): Promise<void>;
  getInvocationStatus(invocationId: string): Promise<AgentInvocationResult>;
}
