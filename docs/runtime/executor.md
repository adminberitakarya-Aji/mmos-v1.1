# Executor

**Document ID:** executor
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the Executor component of the MMOS Runtime.

The Executor is responsible for performing the actual execution of runtime tasks. It receives dispatched tasks, invokes the required capabilities, manages execution progress, collects results, and reports execution status back to the Runtime.

The Executor determines **how** a task is executed. It does **not** decide **when** or **where** a task should execute.

---

# Responsibilities

The Executor is responsible for:

* Receiving dispatched tasks
* Preparing execution context
* Resolving required capabilities
* Invoking capability implementations
* Managing execution lifecycle
* Collecting execution outputs
* Reporting execution status
* Publishing execution events

The Executor never performs orchestration or scheduling.

---

# Position in Runtime

The Executor is the final execution stage of the Runtime.

```text id="nzk4p8"
Orchestrator
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
```

Once a task reaches the Executor, it is ready for execution.

---

# Execution Lifecycle

Every task processed by the Executor follows a predictable lifecycle.

```text id="bx2kqt"
Task Received
      │
      ▼
Context Prepared
      │
      ▼
Capability Resolved
      │
      ▼
Execution Started
      │
      ▼
Executing
      │
      ▼
Result Collected
      │
      ▼
Execution Completed
```

If execution cannot complete successfully, the task transitions to a failure state according to the Runtime lifecycle.

---

# Execution Model

The Executor performs execution through the following steps.

1. Receive a dispatched task.
2. Validate execution context.
3. Resolve required capabilities.
4. Invoke capability implementations.
5. Monitor execution progress.
6. Collect outputs.
7. Report completion status.

Execution must be deterministic whenever possible.

---

# Capability Invocation

The Executor does not communicate directly with AI providers.

Instead, it invokes standardized capability interfaces.

```text id="2gpk5m"
Executor
     │
     ▼
Capability Interface
     │
     ▼
Provider Adapter
     │
     ▼
External AI Service
```

This separation preserves the provider-agnostic architecture of MMOS.

---

# Execution States

| State     | Description                     |
| --------- | ------------------------------- |
| Pending   | Waiting for execution           |
| Preparing | Building execution context      |
| Running   | Task is executing               |
| Waiting   | Awaiting external response      |
| Completed | Execution finished successfully |
| Failed    | Execution ended with an error   |
| Cancelled | Execution cancelled             |
| Timed Out | Execution exceeded allowed time |

State transitions should be explicit, deterministic, and observable.

---

# Execution Context

Before execution begins, the Executor prepares an execution context.

The context may include:

* Composition
* Workflow
* Task definition
* Agent configuration
* Memory context
* Input artifacts
* Runtime configuration
* Execution metadata

The execution context should remain immutable during execution whenever practical.

---

# Result Collection

Upon completion, the Executor collects execution outputs.

Outputs may include:

* Generated artifacts
* Structured responses
* Execution metadata
* Performance metrics
* Error information

Collected results are forwarded to the Runtime for further processing.

---

# Error Handling

Execution failures may include:

* Validation errors
* Capability resolution failures
* Provider failures
* Execution exceptions
* Timeout conditions
* Cancellation requests

The Executor should classify errors consistently and report them through structured error models.

---

# Retry Interaction

The Executor reports execution failures but does not decide whether a task should be retried.

Retry decisions belong to the Scheduler in accordance with the Runtime retry policy.

---

# Timeout Handling

The Executor monitors execution duration.

If execution exceeds the configured timeout:

* Execution is terminated if supported.
* Task state becomes **Timed Out**.
* The Runtime is notified.
* Appropriate events are published.

Timeout policy is documented separately in `timeout.md`.

---

# Events

The Executor publishes runtime events including:

* Execution Started
* Capability Invoked
* Execution Progress
* Execution Completed
* Execution Failed
* Execution Timed Out
* Execution Cancelled

Events should be immutable and suitable for tracing execution.

---

# Observability

The Executor should expose operational metrics such as:

* Execution count
* Execution duration
* Success rate
* Failure rate
* Timeout count
* Active executions
* Capability latency
* Provider latency

These metrics support monitoring, troubleshooting, and capacity planning.

---

# Scalability

The Executor is designed for horizontal scalability.

Recommended characteristics include:

* Stateless workers
* Independent execution units
* Parallel task execution
* Configurable concurrency limits
* Distributed deployment support

Scaling the Executor should increase execution capacity without requiring architectural changes.

---

# Design Constraints

The Executor must never:

* Perform orchestration
* Schedule tasks
* Dispatch work
* Modify execution plans
* Make provider selection decisions
* Bypass capability contracts

Its responsibility is limited to executing assigned tasks.

---

# Relationship with Other Components

| Component  | Relationship                   |
| ---------- | ------------------------------ |
| Planner    | Produces executable tasks      |
| Scheduler  | Determines execution readiness |
| Queue      | Buffers executable work        |
| Dispatcher | Assigns work to Executors      |
| Executor   | Executes assigned tasks        |
| Capability | Defines executable contracts   |
| Provider   | Implements capabilities        |
| Memory     | Supplies execution context     |
| Event Bus  | Receives execution events      |

Each component performs a single, clearly defined responsibility.

---

# Future Enhancements

Future Executor capabilities may include:

* Streaming execution
* Checkpoint and resume
* Sandboxed execution
* Distributed execution
* Adaptive resource allocation
* GPU-aware execution
* Execution replay
* Intelligent cancellation

These enhancements should preserve the Executor's responsibility as the Runtime execution engine.

---

# Summary

The Executor is responsible for determining **how** a dispatched task is executed.

It prepares the execution context, invokes standardized capabilities, interacts with provider implementations through platform contracts, collects execution results, and reports execution status to the Runtime.

By isolating execution logic within a dedicated component, MMOS maintains a provider-agnostic, observable, scalable, and maintainable Runtime architecture.
