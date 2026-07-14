# Scheduler

**Document ID:** scheduler
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the Scheduler component of the MMOS Runtime.

The Scheduler is responsible for determining **when** executable work should run. It manages execution timing, task prioritization, dependency readiness, retries, delays, and timeout scheduling.

The Scheduler decides *when* work becomes eligible for execution. It does **not** execute work itself.

---

# Responsibilities

The Scheduler is responsible for:

* Determining execution readiness
* Ordering executable tasks
* Managing execution priority
* Scheduling delayed execution
* Managing retries
* Detecting timeout conditions
* Publishing scheduling events

The Scheduler never performs orchestration or task execution.

---

# Position in Runtime

The Scheduler is part of the Runtime.

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

The Scheduler operates after planning and before queueing.

---

# Scheduler Lifecycle

Every schedulable task passes through the following lifecycle.

```text
Task Created
      │
      ▼
Waiting Dependencies
      │
      ▼
Ready
      │
      ▼
Scheduled
      │
      ▼
Queued
      │
      ▼
Dispatched
```

Only tasks in the **Ready** state may be scheduled.

---

# Scheduling Model

The Scheduler evaluates tasks based on scheduling rules.

Typical evaluation criteria include:

* Dependency completion
* Execution priority
* Scheduled execution time
* Retry eligibility
* Resource availability
* Cancellation status
* Timeout status

Only tasks satisfying all scheduling conditions become eligible for execution.

---

# Scheduling States

The Scheduler recognizes the following states.

| State     | Description                         |
| --------- | ----------------------------------- |
| Waiting   | Awaiting dependencies or conditions |
| Ready     | Eligible for scheduling             |
| Scheduled | Assigned for execution              |
| Delayed   | Waiting until scheduled time        |
| Retrying  | Waiting before retry                |
| Blocked   | Execution temporarily prevented     |
| Cancelled | Removed from execution              |
| Expired   | Execution window has elapsed        |

State transitions should be deterministic.

---

# Priority Model

The Scheduler supports execution priorities.

Typical priorities include:

| Priority | Description          |
| -------- | -------------------- |
| Critical | Execute immediately  |
| High     | High importance      |
| Normal   | Default priority     |
| Low      | Background execution |

Priority influences scheduling order but does not override dependency constraints.

---

# Dependency Handling

Tasks may depend on the completion of other tasks.

A task becomes **Ready** only when:

* All required predecessors have completed successfully.
* Required artifacts are available.
* Required execution context exists.

The Scheduler must not violate dependency ordering.

---

# Delayed Execution

Tasks may specify a future execution time.

Until that time is reached, the Scheduler keeps the task in the **Delayed** state.

Delayed tasks should not occupy execution resources.

---

# Retry Scheduling

Recoverable failures may be retried according to the Runtime retry policy.

The Scheduler is responsible for:

* Scheduling retry attempts
* Applying retry delays
* Tracking retry counts
* Respecting retry limits

Retry behavior is defined separately in `retry-policy.md`.

---

# Timeout Awareness

The Scheduler monitors execution deadlines.

If a task exceeds its scheduling window, it may transition to:

* Expired
* Timed Out
* Cancelled

Timeout behavior is documented in `timeout.md`.

---

# Queue Integration

Once a task is scheduled, it is submitted to the Runtime Queue.

```text
Scheduler
      │
      ▼
Queue
      │
      ▼
Dispatcher
```

After submission, queue management becomes responsible for buffering the task.

---

# Events

The Scheduler publishes runtime events including:

* Task Ready
* Task Scheduled
* Task Delayed
* Retry Scheduled
* Task Expired
* Scheduling Failed

Events should be immutable.

---

# Error Handling

The Scheduler may encounter:

* Invalid execution plan
* Missing dependencies
* Circular dependencies
* Invalid scheduling rules
* Retry limit exceeded
* Timeout exceeded

Scheduling failures should be reported through structured errors and runtime events.

---

# Observability

The Scheduler should expose metrics such as:

* Tasks scheduled
* Waiting tasks
* Delayed tasks
* Retry count
* Scheduling latency
* Queue submission rate
* Scheduling failures

These metrics support monitoring and capacity planning.

---

# Scalability

The Scheduler should support horizontal scalability.

Design goals include:

* Stateless scheduling logic
* Distributed scheduling support
* Deterministic scheduling decisions
* High throughput
* Fault tolerance

Scaling the Scheduler should not require changes to other Runtime components.

---

# Design Constraints

The Scheduler must:

* Never execute tasks.
* Never invoke providers.
* Never perform orchestration.
* Never bypass dependency validation.
* Never modify execution results.

Its responsibility is limited to scheduling decisions.

---

# Relationship with Other Components

| Component    | Relationship                              |
| ------------ | ----------------------------------------- |
| Planner      | Produces executable tasks                 |
| Scheduler    | Determines execution readiness and timing |
| Queue        | Buffers scheduled tasks                   |
| Dispatcher   | Assigns queued tasks to executors         |
| Executor     | Executes dispatched tasks                 |
| Retry Policy | Defines retry behavior                    |
| Timeout      | Defines timeout behavior                  |

Each component owns a distinct responsibility.

---

# Future Enhancements

Future Scheduler capabilities may include:

* Priority inheritance
* Adaptive scheduling
* Deadline-aware scheduling
* Resource-aware scheduling
* Distributed scheduling
* Dynamic workload balancing
* Predictive scheduling

These enhancements should preserve the Scheduler's single responsibility.

---

# Summary

The Scheduler is responsible for deciding **when** tasks should execute.

It evaluates execution readiness, dependencies, priorities, delays, retries, and scheduling constraints before forwarding eligible tasks to the Runtime Queue.

The Scheduler never performs orchestration or execution, ensuring a clear separation of responsibilities within the MMOS Runtime.
