# Runtime

**Document ID:** runtime
**Version:** 1.1
**Status:** Draft
**Audience:** Platform Engineers, Runtime Developers, Contributors

---

# Purpose

This document provides an overview of the MMOS Runtime.

The Runtime is the execution engine of MMOS. It receives execution plans from the Orchestrator and manages their execution through a set of specialized runtime components.

This document serves as the entry point for all Runtime-related documentation.

---

# What is the Runtime?

The Runtime is responsible for executing workflows defined by the MMOS platform.

It transforms execution plans into executable tasks, coordinates their lifecycle, invokes capabilities through provider implementations, and publishes execution results.

The Runtime does **not** make orchestration decisions.

Those responsibilities belong to the Orchestrator.

---

# Responsibilities

The Runtime is responsible for:

* Executing workflows
* Managing execution lifecycle
* Scheduling tasks
* Dispatching work
* Executing capabilities
* Managing execution state
* Coordinating queues
* Publishing execution events
* Handling retries
* Managing timeouts

The Runtime focuses solely on execution.

---

# Runtime Architecture

The Runtime is implemented as a collection of cooperating components.

```text
Runtime
│
├── Planner
├── Scheduler
├── Queue
├── Dispatcher
└── Executor
```

Each component performs a single responsibility and communicates through well-defined interfaces.

Detailed architecture is described in:

* `docs/architecture/runtime-architecture.md`

---

# Runtime Execution Flow

A simplified execution flow is shown below.

```text
Composition
      │
      ▼
Workflow
      │
      ▼
Execution Plan
      │
      ▼
Planner
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
      │
      ▼
Capability
      │
      ▼
Provider
      │
      ▼
Execution Result
```

This sequence represents the normal execution lifecycle.

---

# Runtime Components

The Runtime is divided into several specialized components.

| Component       | Responsibility                |
| --------------- | ----------------------------- |
| Planner         | Prepare executable tasks      |
| Scheduler       | Decide execution order        |
| Queue           | Buffer pending work           |
| Dispatcher      | Assign work to executors      |
| Executor        | Execute tasks                 |
| Execution State | Track execution progress      |
| Lifecycle       | Manage execution phases       |
| Retry Policy    | Handle recoverable failures   |
| Timeout         | Detect stalled executions     |
| Concurrency     | Coordinate parallel execution |

Each component is documented independently.

---

# Runtime Principles

The Runtime follows these principles:

* Stateless whenever practical.
* Deterministic execution.
* Provider independent.
* Event driven.
* Observable.
* Horizontally scalable.
* Replaceable through interfaces.

These principles apply across all Runtime components.

---

# Runtime and Other Components

The Runtime collaborates with other platform modules.

```text
Applications
      │
      ▼
Services
      │
      ▼
Orchestrator
      │
      ▼
Runtime
      │
      ▼
Core
      │
      ▼
Providers
```

The Runtime executes plans but never performs orchestration or business decision-making.

---

# Runtime Documentation

The Runtime documentation is organized into the following documents.

| Document           | Description           |
| ------------------ | --------------------- |
| runtime.md         | Runtime overview      |
| scheduler.md       | Task scheduling       |
| dispatcher.md      | Work dispatching      |
| executor.md        | Task execution        |
| planner.md         | Execution planning    |
| queue.md           | Queue management      |
| execution-state.md | Execution state model |
| lifecycle.md       | Runtime lifecycle     |
| retry-policy.md    | Retry strategy        |
| timeout.md         | Timeout management    |
| concurrency.md     | Parallel execution    |

Together, these documents describe the complete Runtime implementation.

---

# Relationship to Architecture

This document provides the Runtime overview.

The architectural design is documented separately in:

* `docs/architecture/runtime-architecture.md`

Implementation details belong to the individual Runtime component documents.

---

# Summary

The MMOS Runtime is the execution engine of the platform.

It converts execution plans into reliable, observable, and scalable execution while remaining provider-agnostic and aligned with the architectural principles of MMOS.

This document serves as the starting point for understanding the Runtime subsystem and its related documentation.
