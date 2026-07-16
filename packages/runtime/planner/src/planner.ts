/**
 * MMOS Runtime Planner — Core Planner Implementation
 *
 * Main entry point for building execution plans from compositions.
 */

import type {
  Planner,
  PlanningContext,
  PlanningOptions,
  PlanningResult,
  ExecutionPlan,
  ValidationResult,
  OptimizationOptions,
  OptimizationResult,
  PlannerStage,
  PlannerStatus,
  ValidationError,
} from "./contracts";

import { PlannerError, PlanningValidationError, ExecutionPlanError } from "./errors";
import { PlannerStage as Stage, PlannerStatus as Status, DefaultPlanningOptions, OptimizationLevel } from "./constants";
import { ExecutionPlanBuilderImpl } from "./builder";
import { OptimizerImpl } from "./optimizer";
import { ResolverImpl } from "./resolver";
import { PlanValidatorImpl } from "./validator";

export class PlannerImpl implements Planner {
  private builder: ExecutionPlanBuilderImpl;
  private optimizer: OptimizerImpl;
  private resolver: ResolverImpl;
  private validator: PlanValidatorImpl;
  private status: PlannerStatus = Status.IDLE;
  private currentStage: PlannerStage = Stage.INITIALIZING;

  constructor() {
    this.builder = new ExecutionPlanBuilderImpl();
    this.optimizer = new OptimizerImpl();
    this.resolver = new ResolverImpl();
    this.validator = new PlanValidatorImpl();
  }

  getStatus(): PlannerStatus {
    return this.status;
  }

  getStage(): PlannerStage {
    return this.currentStage;
  }

  async plan(context: PlanningContext, options?: PlanningOptions): Promise<PlanningResult> {
    this.status = Status.PLANNING;
    this.currentStage = Stage.ANALYZING;

      const mergedOptions: Required<PlanningOptions> = {
        ...DefaultPlanningOptions,
        ...options,
        constraints: { ...DefaultPlanningOptions.constraints, ...options?.constraints },
        preferences: { ...DefaultPlanningOptions.preferences, ...options?.preferences },
      };

      try {
      // Stage 1: Analyze context
      this.currentStage = Stage.ANALYZING;
      await this.analyzeContext(context, mergedOptions);

      // Stage 2: Resolve dependencies
      this.currentStage = Stage.RESOLVING;
      const resolution = await this.resolver.resolveDependencies(context);
      if (!resolution.resolved) {
        throw new ExecutionPlanError(
          "Failed to resolve all dependencies",
          undefined,
          undefined,
          "resolution",
          { unresolved: resolution.unresolved, conflicts: resolution.conflicts },
        );
      }

      // Stage 3: Build execution plan
      this.currentStage = Stage.BUILDING;
      const plan = await this.builder.build(context, mergedOptions);

      // Stage 4: Optimize plan
      this.currentStage = Stage.OPTIMIZING;
      const optimization = await this.optimizer.optimize(plan, {
        level: mergedOptions.preferences.optimizationLevel ?? OptimizationLevel.STANDARD,
        preserveSemantics: true,
      });

      // Stage 5: Validate plan
      this.currentStage = Stage.VALIDATING;
      const validation = await this.validator.validate(optimization.plan);
      if (!validation.valid) {
        throw new PlanningValidationError(
          "Plan validation failed",
          undefined,
          validation.errors.map((e: ValidationError) => ({ code: e.code, message: e.message, path: e.nodeId || "", severity: e.severity })),
          { warnings: validation.warnings },
        );
      }

      this.currentStage = Stage.COMPLETED;
      this.status = Status.COMPLETE;

      return {
        plan: optimization.plan,
        warnings: [
          ...validation.warnings.map((w) => {
            const warning: PlanningResult["warnings"][0] = {
              code: w.code,
              message: w.message,
              severity: w.severity,
            };
            if (w.nodeId !== undefined) warning.nodeId = w.nodeId;
            return warning;
          }),
          ...optimization.improvements.map((i) => ({
            code: "OPTIMIZATION_APPLIED",
            message: i.description,
            severity: "low" as const,
          })),
        ],
        errors: [],
        alternatives: [],
      };
    } catch (error) {
      this.currentStage = Stage.FAILED;
      this.status = Status.ERROR;

      if (error instanceof PlannerError) {
        throw error;
      }

      throw new ExecutionPlanError(
        `Planning failed: ${error instanceof Error ? error.message : String(error)}`,
        undefined,
        undefined,
        this.currentStage.toLowerCase() as "planning" | "resolution" | "optimization" | "validation",
        { originalError: error },
      );
    }
  }

  async validate(plan: ExecutionPlan): Promise<ValidationResult> {
    return this.validator.validate(plan);
  }

  async optimize(plan: ExecutionPlan, options?: OptimizationOptions): Promise<OptimizationResult> {
    this.status = Status.OPTIMIZING;
    this.currentStage = Stage.OPTIMIZING;

    try {
      const result = await this.optimizer.optimize(plan, options);
      this.status = Status.COMPLETE;
      this.currentStage = Stage.COMPLETED;
      return result;
    } catch (error) {
      this.status = Status.ERROR;
      this.currentStage = Stage.FAILED;
      throw new PlannerError(
        `Optimization failed: ${error instanceof Error ? error.message : String(error)}`,
        "OPTIMIZATION_ERROR",
        undefined,
        true,
        { originalError: error },
      );
    }
  }

  private async analyzeContext(
    context: PlanningContext,
    options: Required<PlanningOptions>,
  ): Promise<{ nodeCount: number; complexity: number }> {
    const nodeCount = context.availableAgents.size + context.availableCapabilities.size;
    const maxDepth = context.constraints?.maxDepth ?? options.constraints.maxDepth;
    const complexity = nodeCount * maxDepth;
    return { nodeCount, complexity };
  }
}

export function createPlanner(): Planner {
  return new PlannerImpl();
}