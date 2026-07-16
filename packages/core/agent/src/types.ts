/**
 * MMOS Agent — type definitions.
 *
 * Shape derived from `schemas/agent.schema.json` (canonical).
 */

import type { ObjectMetadata, Reference, MmosStatus } from "@mmos/shared/types";

export type AgentRole = "system" | "user" | "assistant" | "tool" | "orchestrator" | "custom";

export type AgentCapabilityCategory =
  | "language"
  | "vision"
  | "audio"
  | "video"
  | "image"
  | "code"
  | "reasoning"
  | "search"
  | "memory"
  | "tool"
  | "workflow"
  | "data"
  | "custom";

export interface AgentTool {
  id: string;
  name: string;
  type: "function" | "api" | "command" | "integration" | "custom";
  description?: string;
  parameters?: Record<string, unknown>;
  authentication?: Record<string, unknown>;
  endpoint?: string;
  version?: string;
  metadata?: Record<string, unknown>;
}

export interface AgentMemoryConfig {
  type: "short-term" | "long-term" | "episodic" | "semantic" | "procedural" | "custom";
  capacity?: number;
  ttl?: number;
  scope?: "session" | "execution" | "workflow" | "composition" | "global";
  backend?: Reference;
  retention?: {
    policy: "lru" | "fifo" | "ttl" | "manual";
    duration?: number;
  };
}

export interface AgentKnowledgeBase {
  id: string;
  name: string;
  type: "vector" | "graph" | "document" | "sql" | "custom";
  endpoint?: string;
  index?: string;
  embedding?: Reference;
  metadata?: Record<string, unknown>;
}

export interface Agent {
  id: string;
  name: string;
  version: string;
  displayName?: string;
  description?: string;
  status?: MmosStatus;
  metadata?: ObjectMetadata;
  provider?: Reference;
  role?: AgentRole;
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  tools?: AgentTool[];
  capabilities?: {
    id: string;
    name: string;
    category: AgentCapabilityCategory;
    description?: string;
    enabled?: boolean;
    configuration?: Record<string, unknown>;
  }[];
  memory?: AgentMemoryConfig;
  knowledgeBase?: AgentKnowledgeBase[];
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  configuration?: Record<string, unknown>;
  context?: {
    maxContextLength?: number;
    strategy?: "sliding" | "summary" | "selective" | "truncate";
  };
  safety?: {
    contentFilter?: boolean;
    piiRedaction?: boolean;
    maxRetries?: number;
    timeout?: number;
  };
  tags?: string[];
  labels?: Record<string, string>;
}

export interface AgentInvocationRequest {
  agentId: string;
  prompt?: string;
  messages?: { role: AgentRole; content: string }[];
  inputs?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  trace?: {
    correlationId?: string;
    causationId?: string;
  };
}

export interface AgentInvocationResult {
  invocationId: string;
  agentId: string;
  status: MmosStatus;
  startedAt: string;
  finishedAt?: string;
  content?: string;
  outputs?: Record<string, unknown>;
  toolCalls?: { id: string; name: string; arguments: unknown; result?: unknown }[];
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
