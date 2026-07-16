/**
 * MMOS Runtime Planner — Resolver Implementation
 *
 * Resolves dependencies, agents, capabilities, and other references in execution plans.
 */

import type {
  Resolver,
  ResolutionResult,
  ResolvedNode,
  ResolutionConflict,
  PlanningContext,
  ExecutionNode,
  AgentInfo,
  CapabilityInfo,
  MemoryInfo,
} from "./contracts";

// import { DependencyResolutionError, AgentResolutionError, CapabilityResolutionError } from "./errors";

export class ResolverImpl implements Resolver {
  async resolveDependencies(context: PlanningContext): Promise<ResolutionResult> {
    const resolved = new Map<string, ResolvedNode>();
    const unresolved: string[] = [];
    const conflicts: ResolutionConflict[] = [];
    const warnings: string[] = [];

    // Resolve agent dependencies
    const agentResult = await this.resolveAgents(
      Array.from(context.availableAgents.values()).map((a) => ({
        id: `agent-${a.id}`,
        name: a.name,
        type: "agent" as const,
        agentId: a.id,
        inputs: {},
        outputs: {},
        configuration: a.metadata,
        dependencies: [],
        dependents: [],
        metadata: { agent: a },
      })),
      context.availableAgents,
    );

    for (const [nodeId, resolvedNode] of agentResult.nodes) {
      resolved.set(nodeId, resolvedNode);
    }
    unresolved.push(...agentResult.unresolved);
    conflicts.push(...agentResult.conflicts);
    warnings.push(...agentResult.warnings);

    // Resolve capability dependencies
    const capabilityResult = await this.resolveCapabilities(
      Array.from(context.availableCapabilities.values()).map((c) => ({
        id: `capability-${c.id}`,
        name: c.name,
        type: "capability" as const,
        capabilityId: c.id,
        inputs: {},
        outputs: {},
        configuration: c.configuration || {},
        dependencies: [],
        dependents: [],
        metadata: { capability: c },
      })),
      context.availableCapabilities,
    );

    for (const [nodeId, resolvedNode] of capabilityResult.nodes) {
      resolved.set(nodeId, resolvedNode);
    }
    unresolved.push(...capabilityResult.unresolved);
    conflicts.push(...capabilityResult.conflicts);
    warnings.push(...capabilityResult.warnings);

    // Resolve memory dependencies
    const memoryResult = await this.resolveMemory(
      context.availableMemory.map((m) => ({
        id: `memory-${m.id}`,
        name: m.id,
        type: "custom" as const,
        inputs: {},
        outputs: {},
        configuration: { memoryType: m.type, scope: m.scope },
        dependencies: [],
        dependents: [],
        metadata: { memory: m },
      })),
      context.availableMemory,
    );

    for (const [nodeId, resolvedNode] of memoryResult.nodes) {
      resolved.set(nodeId, resolvedNode);
    }
    unresolved.push(...memoryResult.unresolved);
    conflicts.push(...memoryResult.conflicts);
    warnings.push(...memoryResult.warnings);

    return {
      resolved: unresolved.length === 0 && conflicts.filter((c) => c.severity === "error").length === 0,
      nodes: resolved,
      unresolved,
      conflicts,
      warnings,
    };
  }

  async resolveAgents(
    nodes: ExecutionNode[],
    availableAgents: Map<string, AgentInfo>,
  ): Promise<ResolutionResult> {
    const resolved = new Map<string, ResolvedNode>();
    const unresolved: string[] = [];
    const conflicts: ResolutionConflict[] = [];
    const warnings: string[] = [];

    for (const node of nodes) {
      if (node.type !== "agent" || !node.agentId) {
        continue;
      }

      const agent = availableAgents.get(node.agentId);
      if (!agent) {
        // Try fuzzy match by name
        const fuzzyMatch = this.findFuzzyMatch(node.agentId, Array.from(availableAgents.keys()));
        if (fuzzyMatch) {
          conflicts.push({
            nodeId: node.id,
            candidates: [fuzzyMatch],
            reason: `Agent "${node.agentId}" not found exactly, found similar: "${fuzzyMatch}"`,
            severity: "warning",
          });
          const matchedAgent = availableAgents.get(fuzzyMatch)!;
          resolved.set(node.id, {
            nodeId: node.id,
            targetId: matchedAgent.id,
            targetType: "agent",
            confidence: 0.8,
            alternatives: [],
          });
        } else {
          unresolved.push(node.id);
          conflicts.push({
            nodeId: node.id,
            candidates: Array.from(availableAgents.keys()),
            reason: `Agent "${node.agentId}" not found`,
            severity: "error",
          });
        }
        continue;
      }

      // Check agent status
      if (agent.status !== "active" && agent.status !== "ready") {
        warnings.push(`Agent "${agent.id}" is not active (status: ${agent.status})`);
      }

      resolved.set(node.id, {
        nodeId: node.id,
        targetId: agent.id,
        targetType: "agent",
        confidence: 1.0,
        alternatives: [],
      });
    }

    return { resolved: unresolved.length === 0, nodes: resolved, unresolved, conflicts, warnings };
  }

  async resolveCapabilities(
    nodes: ExecutionNode[],
    availableCapabilities: Map<string, CapabilityInfo>,
  ): Promise<ResolutionResult> {
    const resolved = new Map<string, ResolvedNode>();
    const unresolved: string[] = [];
    const conflicts: ResolutionConflict[] = [];
    const warnings: string[] = [];

    for (const node of nodes) {
      if (node.type !== "capability" || !node.capabilityId) {
        continue;
      }

      const capability = availableCapabilities.get(node.capabilityId);
      if (!capability) {
        // Try capability-based resolution
        const capabilityMatch = this.findCapabilityMatch(node, availableCapabilities);
        if (capabilityMatch) {
          conflicts.push({
            nodeId: node.id,
            candidates: [capabilityMatch.id],
            reason: `Capability "${node.capabilityId}" not found exactly, matched by category: "${capabilityMatch.category}"`,
            severity: "warning",
          });
          resolved.set(node.id, {
            nodeId: node.id,
            targetId: capabilityMatch.id,
            targetType: "capability",
            confidence: 0.7,
            alternatives: [],
          });
        } else {
          unresolved.push(node.id);
          conflicts.push({
            nodeId: node.id,
            candidates: Array.from(availableCapabilities.keys()),
            reason: `Capability "${node.capabilityId}" not found`,
            severity: "error",
          });
        }
        continue;
      }

      resolved.set(node.id, {
        nodeId: node.id,
        targetId: capability.id,
        targetType: "capability",
        confidence: 1.0,
        alternatives: [],
      });
    }

    return { resolved: unresolved.length === 0, nodes: resolved, unresolved, conflicts, warnings };
  }

  async resolveArtifacts(nodes: ExecutionNode[]): Promise<ResolutionResult> {
    // Artifact resolution would check for required artifacts/inputs
    const resolved = new Map<string, ResolvedNode>();
    const unresolved: string[] = [];
    const conflicts: ResolutionConflict[] = [];
    const warnings: string[] = [];

    for (const node of nodes) {
      // Check if node has required artifact inputs
      for (const [key, value] of Object.entries(node.inputs)) {
        if (typeof value === "string" && value.startsWith("artifact:")) {
          // Would resolve artifact reference here
          resolved.set(`${node.id}-${key}`, {
            nodeId: node.id,
            targetId: value,
            targetType: "custom",
            confidence: 0.9,
            alternatives: [],
          });
        }
      }
    }

    return { resolved: true, nodes: resolved, unresolved, conflicts, warnings };
  }

  async resolveMemory(
    nodes: ExecutionNode[],
    availableMemory: MemoryInfo[],
  ): Promise<ResolutionResult> {
    const resolved = new Map<string, ResolvedNode>();
    const unresolved: string[] = [];
    const conflicts: ResolutionConflict[] = [];
    const warnings: string[] = [];

    for (const node of nodes) {
      if (node.type !== "custom" || !node.metadata.memory) {
        continue;
      }

      const memoryInfo = node.metadata.memory as MemoryInfo;
      const match = availableMemory.find((m) => m.id === memoryInfo.id);

      if (!match) {
        // Try scope-based match
        const scopeMatch = availableMemory.find((m) => m.scope === memoryInfo.scope);
        if (scopeMatch) {
          conflicts.push({
            nodeId: node.id,
            candidates: [scopeMatch.id],
            reason: `Memory "${memoryInfo.id}" not found, using scope match: "${scopeMatch.id}"`,
            severity: "warning",
          });
          resolved.set(node.id, {
            nodeId: node.id,
            targetId: scopeMatch.id,
            targetType: "memory",
            confidence: 0.6,
            alternatives: [],
          });
        } else {
          unresolved.push(node.id);
          conflicts.push({
            nodeId: node.id,
            candidates: availableMemory.map((m) => m.id),
            reason: `Memory "${memoryInfo.id}" not found`,
            severity: "error",
          });
        }
        continue;
      }

      resolved.set(node.id, {
        nodeId: node.id,
        targetId: match.id,
        targetType: "memory",
        confidence: 1.0,
        alternatives: [],
      });
    }

    return { resolved: unresolved.length === 0, nodes: resolved, unresolved, conflicts, warnings };
  }

  private findFuzzyMatch(target: string, candidates: string[]): string | null {
    // Simple fuzzy matching: check for partial matches
    const lowerTarget = target.toLowerCase();
    for (const candidate of candidates) {
      if (candidate.toLowerCase().includes(lowerTarget) || lowerTarget.includes(candidate.toLowerCase())) {
        return candidate;
      }
    }
    return null;
  }

  private findCapabilityMatch(
    node: ExecutionNode,
    availableCapabilities: Map<string, CapabilityInfo>,
  ): CapabilityInfo | null {
    // Match by category if specified in configuration
    const category = node.configuration.category as string | undefined;
    if (category) {
      for (const capability of availableCapabilities.values()) {
        if (capability.category === category) {
          return capability;
        }
      }
    }
    return null;
  }
}