# Execution State

**Document ID:** execution-state
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the execution state model used throughout the MMOS Runtime.

The Execution State represents the lifecycle of an execution from creation to completion. It provides a consistent state machine for tracking progress, handling failures, coordinating retries, and supporting observability.

All Runtime components use the same execution state model.

---

# Objectives

The Execution State model aims to:

* Track execution progress
* Enable deterministic execution
* Support retries and recovery
* Enable cancellation
* Support execution replay
* Provide observability
* Ensure consistent lifecycle management

The state model should remain independent of specific providers or execution environments.

---

# State Machine

Every execution follows the same state machine.

```text
Created
    │
    ▼
Planned
    │
    ▼
Scheduled
    │
    ▼
Queued
    │
    ▼
Dispatched
    │
    ▼
Running
    │
    ├──────────────┐
    │              │
    ▼              ▼
Completed       Failed
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      Retrying           Cancelled
          │
          ▼
      Scheduled
```

Every transition must be explicit and recorded.

---

# Execution States

| State      | Description                     |
| ---------- | ------------------------------- |
| Created    | Execution has been created      |
| Planned    | Runtime Plan generated          |
| Scheduled  | Eligible for execution          |
| Queued     | Waiting in Runtime Queue        |
| Dispatched | Assigned to an Executor         |
| Running    | Currently executing             |
| Completed  | Successfully finished           |
| Failed     | Execution ended with an error   |
| Retrying   | Waiting for another attempt     |
| Cancelled  | Execution intentionally stopped |
| Timed Out  | Execution exceeded allowed time |
| Paused     | Execution temporarily suspended |
| Resumed    | Execution resumed after pause   |

The state model should remain extensible for future Runtime capabilities.

---

# State Transitions

Allowed transitions include:

| From       | To         |
| ---------- | ---------- |
| Created    | Planned    |
| Planned    | Scheduled  |
| Scheduled  | Queued     |
| Queued     | Dispatched |
| Dispatched | Running    |
| Running    | Completed  |
| Running    | Failed     |
| Running    | Timed Out  |
| Running    | Cancelled  |
| Failed     | Retrying   |
| Retrying   | Scheduled  |
| Running    | Paused     |
| Paused     | Resumed    |
| Resumed    | Running    |

Transitions outside these rules should be rejected.

---

# Terminal States

The following states are terminal.

* Completed
* Cancelled
* Timed Out

Once a terminal state is reached, execution cannot continue.

---

# Retry Flow

Retry is initiated only after a recoverable failure.

```text
Running
    │
    ▼
Failed
    │
    ▼
Retrying
    │
    ▼
Scheduled
    │
    ▼
Running
```

Retry behavior is governed by the Runtime retry policy.

---

# Pause and Resume

Some execution types may support pausing.

```text
Running
    │
    ▼
Paused
    │
    ▼
Resumed
    │
    ▼
Running
```

Paused executions should preserve execution context without losing progress.

---

# Cancellation

Cancellation may be requested by:

* User
* Runtime
* Workflow
* System policy

After cancellation:

* No additional work is scheduled.
* Active execution should terminate when safe.
* Execution enters the **Cancelled** state.

Cancellation should be idempotent.

---

# Timeout

Execution may transition to **Timed Out** when:

* Maximum execution duration is exceeded.
* Provider timeout occurs.
* Runtime timeout policy is triggered.

Timeouts are terminal unless explicitly configured otherwise.

---

# State Persistence

Execution state should be persisted whenever durability is required.

Typical persisted information includes:

* Current state
* Previous state
* Execution identifier
* Workflow identifier
* Task identifier
* Retry count
* Timestamps
* Metadata

Persisted state enables recovery after failures.

---

# State Events

Every state transition should generate a Runtime event.

Examples include:

* Execution Created
* Execution Planned
* Execution Scheduled
* Execution Started
* Execution Completed
* Execution Failed
* Execution Retried
* Execution Paused
* Execution Resumed
* Execution Cancelled
* Execution Timed Out

Events provide complete execution traceability.

---

# Observability

Execution State should expose metrics including:

* Active executions
* Completed executions
* Failed executions
* Retry count
* Timeout count
* Cancellation count
* Average execution duration
* State transition latency

These metrics support monitoring and operational analysis.

---

# Recovery

After an unexpected interruption, the Runtime should recover execution using persisted state.

Recovery may include:

* Reload execution context
* Restore current state
* Resume pending work
* Restart eligible executions
* Mark unrecoverable executions as failed

Recovery behavior should be deterministic.

---

# Design Constraints

The Execution State model must:

* Be deterministic.
* Support replay.
* Support recovery.
* Be provider independent.
* Be observable.
* Prevent invalid transitions.
* Preserve execution history.

The state model must remain stable across Runtime implementations.

---

# Relationship with Other Components

| Component    | Relationship                              |
| ------------ | ----------------------------------------- |
| Planner      | Creates initial execution state           |
| Scheduler    | Updates scheduling states                 |
| Queue        | Updates queue states                      |
| Dispatcher   | Updates dispatch states                   |
| Executor     | Updates execution states                  |
| Retry Policy | Controls retry transitions                |
| Timeout      | Controls timeout transitions              |
| Event Bus    | Publishes state transition events         |
| Memory       | Persists execution context where required |

Execution State acts as the shared lifecycle model for all Runtime components.

---

# Future Enhancements

Future enhancements may include:

* Checkpointing
* Execution snapshots
* Distributed recovery
* Workflow migration
* State replication
* Versioned execution state
* Long-running durable executions
* Human approval states

Future capabilities should extend the state machine without breaking existing state transitions.

---

# Summary

The Execution State model provides the canonical lifecycle for every execution within the MMOS Runtime.

By defining explicit states, controlled transitions, persistence, recovery, and observability, the platform achieves deterministic execution, reliable fault recovery, and consistent behavior across all Runtime components while remaining provider-agnostic and horizontally scalable.
