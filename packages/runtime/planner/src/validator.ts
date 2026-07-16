/**
 * MMOS Runtime Planner — Plan Validator Implementation
 *
 * Validates execution plans for correctness and completeness.
 */

import type {
  PlanValidator,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ExecutionPlan,
  DependencyGraph,
  ExecutionNode,
  ExecutionEdge,
  PlanningContext,
} from "./contracts";

export class PlanValidatorImpl implements PlanValidator {
  async validate(plan: ExecutionPlan): Promise<ValidationResult> {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate graph structure
    const graphResult = this.validateGraph(plan.graph);
    errors.push(...graphResult.errors);
    warnings.push(...graphResult.warnings);

    // Validate nodes
    for (const [nodeId, node] of plan.graph.nodes) {
      const nodeResult = this.validateNode(node, { compositionId: plan.id } as PlanningContext);
      errors.push(...nodeResult.errors.map((e) => ({ ...e, nodeId })));
      warnings.push(...nodeResult.warnings.map((w) => ({ ...w, nodeId })));
    }

    // Validate edges
    for (const edge of plan.graph.edges) {
      const edgeResult = this.validateEdge(edge, plan.graph);
      errors.push(...edgeResult.errors.map((e) => ({ ...e, edgeId: `${edge.from}->${edge.to}` })));
      warnings.push(...edgeResult.warnings.map((w) => ({ ...w, edgeId: `${edge.from}->${edge.to}` })));
    }

    // Validate metadata
    const metadataErrors = this.validateMetadata(plan.metadata);
    errors.push(...metadataErrors);

    // Validate statistics
    const statsWarnings = this.validateStatistics(plan.statistics, plan.graph);
    warnings.push(...statsWarnings);

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  validateGraph(graph: DependencyGraph): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check for cycles
    if (graph.cycles.length > 0) {
      for (const cycle of graph.cycles) {
        errors.push({
          code: "CYCLE_DETECTED",
          message: `Circular dependency detected: ${cycle.join(" -> ")}`,
          severity: "critical",
        });
      }
    }

    // Check for orphaned nodes (no edges at all)
    const connectedNodes = new Set<string>();
    for (const edge of graph.edges) {
      connectedNodes.add(edge.from);
      connectedNodes.add(edge.to);
    }

    for (const nodeId of graph.nodes.keys()) {
      if (!connectedNodes.has(nodeId) && graph.nodes.size > 1) {
        warnings.push({
          code: "ORPHANED_NODE",
          message: `Node "${nodeId}" has no connections`,
          nodeId,
          severity: "low",
        });
      }
    }

    // Check topological order consistency
    const topoSet = new Set(graph.topologicalOrder);
    for (const nodeId of graph.nodes.keys()) {
      if (!topoSet.has(nodeId)) {
        errors.push({
          code: "TOPOLOGICAL_ORDER_INCOMPLETE",
          message: `Node "${nodeId}" missing from topological order`,
          severity: "error",
        });
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  validateNode(node: ExecutionNode, context: PlanningContext): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check required fields
    if (!node.id) {
      errors.push({ code: "MISSING_NODE_ID", message: "Node missing ID", severity: "error" });
    }

    if (!node.name) {
      errors.push({ code: "MISSING_NODE_NAME", message: `Node "${node.id}" missing name`, severity: "error" });
    }

    if (!node.type) {
      errors.push({ code: "MISSING_NODE_TYPE", message: `Node "${node.id}" missing type`, severity: "error" });
    }

    // Validate dependencies exist (would need graph access, but we use context)
    // This is a simplified version

    // Validate type-specific requirements
    switch (node.type) {
      case "agent":
        if (!node.agentId) {
          errors.push({
            code: "MISSING_AGENT_ID",
            message: `Agent node "${node.id}" missing agentId`,
            severity: "error",
          });
        }
        // Check if agent is available in context
        if (node.agentId && !context.availableAgents.has(node.agentId)) {
          warnings.push({
            code: "AGENT_NOT_IN_CONTEXT",
            message: `Agent "${node.agentId}" not found in available agents`,
            nodeId: node.id,
            severity: "medium",
          });
        }
        break;
      case "capability":
        if (!node.capabilityId) {
          errors.push({
            code: "MISSING_CAPABILITY_ID",
            message: `Capability node "${node.id}" missing capabilityId`,
            severity: "error",
          });
        }
        if (node.capabilityId && !context.availableCapabilities.has(node.capabilityId)) {
          warnings.push({
            code: "CAPABILITY_NOT_IN_CONTEXT",
            message: `Capability "${node.capabilityId}" not found in available capabilities`,
            nodeId: node.id,
            severity: "medium",
          });
        }
        break;
      case "workflow":
        if (!node.workflowId) {
          errors.push({
            code: "MISSING_WORKFLOW_ID",
            message: `Workflow node "${node.id}" missing workflowId`,
            severity: "error",
          });
        }
        break;
    }

    // Check for timeout consistency
    if (node.timeout !== undefined && node.timeout < 0) {
      errors.push({
        code: "INVALID_TIMEOUT",
        message: `Node "${node.id}" has negative timeout`,
        severity: "error",
      });
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  validateEdge(edge: ExecutionEdge, graph: DependencyGraph): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check source node exists
    if (!graph.nodes.has(edge.from)) {
      errors.push({
        code: "EDGE_SOURCE_NOT_FOUND",
        message: `Edge from "${edge.from}" to "${edge.to}": source node not found`,
        severity: "error",
      });
    }

    // Check target node exists
    if (!graph.nodes.has(edge.to)) {
      errors.push({
        code: "EDGE_TARGET_NOT_FOUND",
        message: `Edge from "${edge.from}" to "${edge.to}": target node not found`,
        severity: "error",
      });
    }

    // Check for self-loops
    if (edge.from === edge.to) {
      errors.push({
        code: "SELF_LOOP",
        message: `Self-loop detected on node "${edge.from}"`,
        severity: "error",
      });
    }

    // Validate edge type
    const validEdgeTypes = ["sequence", "parallel", "conditional", "data", "control"];
    if (!validEdgeTypes.includes(edge.type)) {
      errors.push({
        code: "INVALID_EDGE_TYPE",
        message: `Edge "${edge.from}->${edge.to}" has invalid type: ${edge.type}`,
        severity: "error",
      });
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  validateMetadata(metadata: any): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!metadata.plannerVersion) {
      errors.push({
        code: "MISSING_PLANNER_VERSION",
        message: "Planner metadata missing version",
        severity: "error",
      });
    }

    if (!metadata.plannerStage) {
      errors.push({
        code: "MISSING_PLANNER_STAGE",
        message: "Planner metadata missing stage",
        severity: "error",
      });
    }

    if (typeof metadata.planningDurationMs !== "number" || metadata.planningDurationMs < 0) {
      errors.push({
        code: "INVALID_PLANNING_DURATION",
        message: "Planner metadata has invalid planning duration",
        severity: "error",
      });
    }

    return errors;
  }

  validateStatistics(statistics: any, graph: DependencyGraph): ValidationWarning[] {
    const warnings: ValidationWarning[] = [];

    if (!statistics) {
      warnings.push({
        code: "MISSING_STATISTICS",
        message: "Plan missing statistics",
        severity: "low",
      });
      return warnings;
    }

    if (statistics.totalNodes !== graph.nodes.size) {
      warnings.push({
        code: "STATISTICS_NODE_COUNT_MISMATCH",
        message: `Statistics node count (${statistics.totalNodes}) doesn't match graph (${graph.nodes.size})`,
        severity: "medium",
      });
    }

    if (statistics.parallelGroups < 0) {
      warnings.push({
        code: "INVALID_PARALLEL_GROUPS",
        message: "Statistics has negative parallel groups count",
        severity: "medium",
      });
    }

    if (statistics.estimatedDurationMs < 0) {
      warnings.push({
        code: "INVALID_ESTIMATED_DURATION",
        message: "Statistics has negative estimated duration",
        severity: "medium",
      });
    }

    if (statistics.riskScore < 0 || statistics.riskScore > 100) {
      warnings.push({
        code: "INVALID_RISK_SCORE",
        message: `Statistics risk score (${statistics.riskScore}) out of range [0, 100]`,
        severity: "medium",
      });
    }

    return warnings;
  }
}
