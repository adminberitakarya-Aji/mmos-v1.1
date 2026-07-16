/**
 * MMOS Runtime Planner — Execution Plan Builder
 *
 * Builds execution plans from planning context.
 */

import type {
  ExecutionPlanBuilder,
  ExecutionPlan,
  ExecutionNode,
  ExecutionEdge,
  DependencyGraph,
  PlanningContext,
  PlanningOptions,
  PlanningMetadata,
  PlanningStatistics,
  NodeType,
  ParallelGroup,
  ParallelStrategy,
} from "./contracts";

import { PlannerStage } from "./constants";
import { randomUUID } from "crypto";

export class ExecutionPlanBuilderImpl implements ExecutionPlanBuilder {
  private nodes: Map<string, ExecutionNode> = new Map();
  private edges: ExecutionEdge[] = [];
  private metadata: PlanningMetadata | undefined;
  private statistics: PlanningStatistics | undefined;
  private planId: string;
  private planName: string;
  private planVersion: string;

  constructor() {
    this.planId = randomUUID();
    this.planName = "execution-plan";
    this.planVersion = "1.0.0";
  }

  build(context: PlanningContext, options?: PlanningOptions): Promise<ExecutionPlan> {
    this.reset();
    this.planId = randomUUID();
    this.planName = `plan-${context.compositionId}`;
    this.planVersion = context.workflowId ? `workflow-${context.workflowId}` : "1.0.0";

    // Build nodes from context
    this.buildNodes(context);

    // Build edges from dependencies
    this.buildEdges(context);

    // Calculate graph topology
    const graph = this.buildGraph();

    // Generate metadata and statistics
    this.generateMetadata(options);
    this.generateStatistics(graph);

    const plan: ExecutionPlan = {
      id: this.planId,
      name: this.planName,
      version: this.planVersion,
      graph,
      metadata: this.metadata!,
      statistics: this.statistics!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return Promise.resolve(plan);
  }

  addNode(node: ExecutionNode): this {
    this.nodes.set(node.id, node);
    return this;
  }

  addEdge(edge: ExecutionEdge): this {
    this.edges.push(edge);
    return this;
  }

  setMetadata(metadata: PlanningMetadata): this {
    this.metadata = metadata;
    return this;
  }

  setStatistics(statistics: PlanningStatistics): this {
    this.statistics = statistics;
    return this;
  }

  private reset(): void {
    this.nodes.clear();
    this.edges = [];
    this.metadata = undefined;
    this.statistics = undefined;
  }

  private buildNodes(context: PlanningContext): void {
    // Add agent nodes
    for (const [id, agent] of context.availableAgents) {
      const node: ExecutionNode = {
        id: `agent-${id}`,
        name: agent.name,
        type: "agent",
        agentId: id,
        inputs: {},
        outputs: {},
        configuration: agent.metadata,
        dependencies: [],
        dependents: [],
        metadata: { agent },
      };
      this.nodes.set(node.id, node);
    }

    // Add capability nodes
    for (const [id, capability] of context.availableCapabilities) {
      const node: ExecutionNode = {
        id: `capability-${id}`,
        name: capability.name,
        type: "capability",
        capabilityId: id,
        inputs: {},
        outputs: {},
        configuration: capability.configuration || {},
        dependencies: [],
        dependents: [],
        metadata: { capability },
      };
      this.nodes.set(node.id, node);
    }

    // Add workflow nodes if workflowId provided
    if (context.workflowId && context.availableWorkflows.has(context.workflowId)) {
      const workflow = context.availableWorkflows.get(context.workflowId)!;
      const node: ExecutionNode = {
        id: `workflow-${context.workflowId}`,
        name: workflow.name,
        type: "workflow",
        workflowId: context.workflowId,
        inputs: {},
        outputs: {},
        configuration: workflow.metadata,
        dependencies: [],
        dependents: [],
        metadata: { workflow },
      };
      this.nodes.set(node.id, node);
    }

    // Add memory nodes
    for (const memory of context.availableMemory) {
      const node: ExecutionNode = {
        id: `memory-${memory.id}`,
        name: memory.id,
        type: "custom",
        inputs: {},
        outputs: {},
        configuration: { memoryType: memory.type, scope: memory.scope },
        dependencies: [],
        dependents: [],
        metadata: { memory },
      };
      this.nodes.set(node.id, node);
    }
  }

  private buildEdges(context: PlanningContext): void {
    // Build edges based on constraints and preferences
    const nodeArray = Array.from(this.nodes.values());

    // Simple sequential chain for now - in reality this would be based on workflow definition
    for (let i = 0; i < nodeArray.length - 1; i++) {
      const from = nodeArray[i];
      const to = nodeArray[i + 1];

      // Ensure nodes exist (TypeScript safety)
      if (!from || !to) continue;

      // Only connect if types are compatible
      if (this.canConnect(from, to)) {
        this.edges.push({
          from: from.id,
          to: to.id,
          type: "sequence",
          metadata: {},
        });

        // Update dependencies
        from.dependents.push(to.id);
        to.dependencies.push(from.id);
      }
    }

    // Add parallel edges based on preferences
    if (context.preferences.preferParallelism) {
      this.addParallelEdges(nodeArray);
    }
  }

  private canConnect(from: ExecutionNode, to: ExecutionNode): boolean {
    // Allow agent -> capability, capability -> agent, etc.
    const validTransitions: Record<NodeType, NodeType[]> = {
      agent: ["capability", "workflow", "task", "custom"],
      capability: ["agent", "workflow", "task", "custom"],
      workflow: ["agent", "capability", "task", "custom"],
      task: ["agent", "capability", "workflow", "custom"],
      parallel: ["agent", "capability", "workflow", "task", "custom"],
      conditional: ["agent", "capability", "workflow", "task", "custom"],
      custom: ["agent", "capability", "workflow", "task", "parallel", "conditional", "custom"],
    };

    return validTransitions[from.type]?.includes(to.type) ?? false;
  }

  private addParallelEdges(nodes: ExecutionNode[]): void {
    // Group nodes by type for parallel execution
    const byType = new Map<NodeType, ExecutionNode[]>();
    for (const node of nodes) {
      const group = byType.get(node.type) || [];
      group.push(node);
      byType.set(node.type, group);
    }

    // Add parallel edges within each type group
    for (const [, group] of byType) {
      if (group.length > 1) {
        const parallelId = `parallel-${randomUUID()}`;
        // In a real implementation, we'd create a parallel group node
        // For now, just mark them as parallelizable
        for (const node of group) {
          node.parallelGroup = parallelId;
        }
      }
    }
  }

  private buildGraph(): DependencyGraph {
    const cycles = this.detectCycles();
    const topologicalOrder = this.topologicalSort();
    const roots = this.findRoots();
    const leaves = this.findLeaves();

    return {
      nodes: this.nodes,
      edges: this.edges,
      roots,
      leaves,
      cycles,
      topologicalOrder,
    };
  }

  private detectCycles(): string[][] {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const cycles: string[][] = [];

    const dfs = (nodeId: string, path: string[]): void => {
      visited.add(nodeId);
      recStack.add(nodeId);
      path.push(nodeId);

      const node = this.nodes.get(nodeId);
      if (node) {
        for (const depId of node.dependents) {
          if (!visited.has(depId)) {
            dfs(depId, [...path]);
          } else if (recStack.has(depId)) {
            // Found a cycle
            const cycleStart = path.indexOf(depId);
            cycles.push(path.slice(cycleStart));
          }
        }
      }

      recStack.delete(nodeId);
    };

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        dfs(nodeId, []);
      }
    }

    return cycles;
  }

  private topologicalSort(): string[] {
    const inDegree = new Map<string, number>();
    const result: string[] = [];
    const queue: string[] = [];

    // Initialize in-degrees
    for (const [nodeId, node] of this.nodes) {
      inDegree.set(nodeId, node.dependencies.length);
      if (node.dependencies.length === 0) {
        queue.push(nodeId);
      }
    }

    // Kahn's algorithm
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      result.push(nodeId);

      const node = this.nodes.get(nodeId);
      if (node) {
        for (const depId of node.dependents) {
          const newDegree = (inDegree.get(depId) || 0) - 1;
          inDegree.set(depId, newDegree);
          if (newDegree === 0) {
            queue.push(depId);
          }
        }
      }
    }

    return result;
  }

  private findRoots(): string[] {
    const roots: string[] = [];
    for (const [nodeId, node] of this.nodes) {
      if (node.dependencies.length === 0) {
        roots.push(nodeId);
      }
    }
    return roots;
  }

  private findLeaves(): string[] {
    const leaves: string[] = [];
    for (const [nodeId, node] of this.nodes) {
      if (node.dependents.length === 0) {
        leaves.push(nodeId);
      }
    }
    return leaves;
  }

  private generateMetadata(options?: PlanningOptions): void {
    this.metadata = {
      plannerVersion: "1.0.0",
      plannerStage: PlannerStage.COMPLETED,
      planningDurationMs: 0,
      nodesPlanned: this.nodes.size,
      edgesPlanned: this.edges.length,
      optimizationApplied: [],
      options: options || {} as any,
    };
  }

  private generateStatistics(graph: DependencyGraph): void {
    const parallelGroups = this.findParallelGroups(graph);

    this.statistics = {
      totalNodes: this.nodes.size,
      parallelGroups: parallelGroups.length,
      sequentialChains: this.findSequentialChains(graph),
      maxDepth: this.calculateMaxDepth(graph),
      estimatedDurationMs: this.estimateDuration(graph, parallelGroups),
      estimatedCost: this.estimateCost(graph),
      riskScore: this.calculateRiskScore(graph),
    };
  }

  private findParallelGroups(graph: DependencyGraph): ParallelGroup[] {
    const groups: Map<string, ParallelGroup> = new Map();

    for (const node of graph.nodes.values()) {
      if (node.parallelGroup) {
        const group = groups.get(node.parallelGroup) || {
          id: node.parallelGroup,
          nodes: [],
          strategy: "all" as ParallelStrategy,
          estimatedDurationMs: 0,
        };
        group.nodes.push(node.id);
        groups.set(node.parallelGroup, group);
      }
    }

    // Calculate estimated duration for each group
    for (const group of groups.values()) {
      group.estimatedDurationMs = Math.max(
        ...group.nodes.map((nodeId) => {
          const node = graph.nodes.get(nodeId);
          return node?.timeout || 1000;
        }),
      );
    }

    return Array.from(groups.values());
  }

  private findSequentialChains(graph: DependencyGraph): number {
    let chains = 0;
    for (const root of graph.roots) {
      chains += this.countChainsFromNode(root, graph);
    }
    return chains;
  }

  private countChainsFromNode(nodeId: string, graph: DependencyGraph): number {
    const node = graph.nodes.get(nodeId);
    if (!node || node.dependents.length === 0) return 1;
    if (node.dependents.length > 1) {
      // Branch point - each branch is a new chain
      return node.dependents.reduce(
        (sum: number, depId: string) => sum + this.countChainsFromNode(depId, graph),
        0,
      );
    }
    const nextDepId = node.dependents[0];
    if (!nextDepId) return 1;
    return this.countChainsFromNode(nextDepId, graph);
  }

  private calculateMaxDepth(graph: DependencyGraph): number {
    const depths = new Map<string, number>();

    const dfs = (nodeId: string): number => {
      if (depths.has(nodeId)) return depths.get(nodeId)!;

      const node = graph.nodes.get(nodeId);
      if (!node || node.dependencies.length === 0) {
        depths.set(nodeId, 1);
        return 1;
      }

      const maxDepDepth = Math.max(...node.dependencies.map((depId) => dfs(depId)));
      const depth = maxDepDepth + 1;
      depths.set(nodeId, depth);
      return depth;
    };

    let maxDepth = 0;
    for (const nodeId of graph.nodes.keys()) {
      maxDepth = Math.max(maxDepth, dfs(nodeId));
    }
    return maxDepth;
  }

  private estimateDuration(graph: DependencyGraph, parallelGroups: ParallelGroup[]): number {
    // Sum of sequential chains + max of parallel groups
    let total = 0;
    for (const group of parallelGroups) {
      total += group.estimatedDurationMs;
    }
    // Add sequential nodes not in parallel groups
    for (const node of graph.nodes.values()) {
      if (!node.parallelGroup) {
        total += node.timeout || 1000;
      }
    }
    return total;
  }

  private estimateCost(graph: DependencyGraph): number {
    let cost = 0;
    for (const node of graph.nodes.values()) {
      // Base cost per node type
      const baseCost: Record<NodeType, number> = {
        agent: 100,
        capability: 50,
        workflow: 200,
        task: 75,
        parallel: 10,
        conditional: 20,
        custom: 30,
      };
      cost += baseCost[node.type] || 50;
    }
    return cost;
  }

  private calculateRiskScore(graph: DependencyGraph): number {
    // Risk based on cycles, depth, and complexity
    let risk = 0;
    risk += graph.cycles.length * 10; // Cycles are risky
    risk += this.calculateMaxDepth(graph) * 0.5; // Deep graphs are riskier
    risk += graph.edges.length * 0.1; // More edges = more complexity
    return Math.min(100, Math.round(risk));
  }
}