# Planner

**Document ID:** planner
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the Planner component of the MMOS Runtime.

The Planner is responsible for transforming an Execution Plan produced by the Orchestrator into an executable Runtime Plan. It analyzes workflow structure, validates execution requirements, resolves dependencies, and produces a set of executable tasks for the Runtime.

The Planner determines **what** should be executed. It does **not** decide **when**, **where**, or **how** execution occurs.

---

# Responsibilities

The Planner is responsible for:

* Receiving Execution Plans
* Validating execution plans
* Resolving workflow dependencies
* Expanding workflows into executable tasks
* Determining execution order constraints
* Preparing Runtime Plans
* Publishing planning events

The Planner never schedules, dispatches, or executes work.

---

# Position in Runtime

The Planner is the first component of the Runtime.

```text
Orchestrator
      │
      ▼
Execution Plan
      │
      ▼
Planner
      │
      ▼
Runtime Plan
      │
      ▼
Scheduler
      │
      ▼
Queue
      │
      ▼
Dispatcher
      │
      ▼
Executor
```

The Planner converts orchestration output into execution-ready structures.

---

# Planning Lifecycle

Every execution request follows the same planning lifecycle.

```text
Execution Plan Received
            │
            ▼
Validation
            │
            ▼
Dependency Resolution
            │
            ▼
Task Expansion
            │
            ▼
Runtime Plan Generation
            │
            ▼
Plan Published
```

A Runtime Plan is produced only if all validation checks succeed.

---

# Planning Model

The Planner performs the following sequence:

1. Receive an Execution Plan.
2. Validate the plan structure.
3. Resolve task dependencies.
4. Expand workflow steps into executable tasks.
5. Build the Runtime Plan.
6. Publish the Runtime Plan to the Scheduler.

Planning should be deterministic for identical inputs.

---

# Execution Plan

The Planner receives an Execution Plan from the Orchestrator.

A typical Execution Plan contains:

* Composition reference
* Workflow definition
* Task definitions
* Agent assignments
* Capability requirements
* Execution parameters
* Metadata

The Planner treats the Execution Plan as immutable input.

---

# Runtime Plan

The primary output of the Planner is the Runtime Plan.

A Runtime Plan includes:

* Executable task list
* Dependency graph
* Execution metadata
* Initial execution state
* Scheduling hints
* Retry configuration references
* Timeout configuration references

The Runtime Plan becomes the input for the Scheduler.

---

# Dependency Resolution

The Planner analyzes relationships between tasks.

Supported dependency patterns include:

* Sequential execution
* Parallel execution
* Fan-out
* Fan-in
* Conditional branches
* Join points

Dependency validation must detect invalid execution graphs before scheduling.

---

# Validation

Before generating a Runtime Plan, the Planner validates:

* Workflow integrity
* Task definitions
* Capability references
* Dependency graph
* Required inputs
* Configuration consistency

Invalid plans are rejected before entering the Runtime.

---

# Planning States

| State      | Description                      |
| ---------- | -------------------------------- |
| Received   | Execution Plan accepted          |
| Validating | Performing structural validation |
| Resolving  | Resolving dependencies           |
| Expanding  | Building executable tasks        |
| Planned    | Runtime Plan generated           |
| Failed     | Planning failed                  |

Each transition should be observable and deterministic.

---

# Error Handling

Planning may fail because of:

* Invalid workflow structure
* Missing capability definitions
* Circular dependencies
* Invalid task configuration
* Missing required inputs
* Unsupported execution model

Planning failures should prevent execution from continuing.

---

# Events

The Planner publishes events including:

* Plan Received
* Validation Started
* Validation Completed
* Runtime Plan Created
* Planning Failed

Events provide visibility into the planning process and support observability.

---

# Observability

The Planner should expose metrics such as:

* Plans processed
* Planning latency
* Validation failures
* Dependency resolution time
* Runtime Plans generated
* Planning error rate

These metrics help monitor Runtime health and planning performance.

---

# Scalability

The Planner is designed to support horizontal scaling.

Recommended characteristics include:

* Stateless processing
* Deterministic planning
* Independent planning instances
* Parallel plan generation
* High throughput

Scaling the Planner should not affect the behavior of downstream Runtime components.

---

# Design Constraints

The Planner must never:

* Execute tasks
* Schedule execution
* Dispatch work
* Invoke providers
* Modify execution results
* Make orchestration decisions

Its responsibility is limited to preparing executable Runtime Plans.

---

# Relationship with Other Components

| Component    | Relationship                 |
| ------------ | ---------------------------- |
| Orchestrator | Produces Execution Plans     |
| Planner      | Produces Runtime Plans       |
| Scheduler    | Consumes Runtime Plans       |
| Queue        | Receives scheduled tasks     |
| Dispatcher   | Assigns scheduled work       |
| Executor     | Executes dispatched tasks    |
| Capability   | Referenced during validation |
| Event Bus    | Receives planning events     |

Each component performs a distinct responsibility within the Runtime pipeline.

---

# Future Enhancements

Future Planner capabilities may include:

* Workflow optimization
* Dynamic task expansion
* Conditional plan generation
* Cost-aware planning
* Resource-aware planning
* Incremental planning
* Cached Runtime Plans
* Predictive planning

These enhancements should not alter the Planner's core responsibility of producing deterministic Runtime Plans.

---

# Summary

The Planner is responsible for determining **what** the Runtime should execute.

It transforms an Execution Plan from the Orchestrator into a validated Runtime Plan by resolving dependencies, expanding workflow definitions into executable tasks, and preparing execution metadata.

By isolating planning logic within its own component, MMOS preserves a clear separation between orchestration, planning, scheduling, dispatching, and execution, resulting in a modular and maintainable Runtime architecture.
