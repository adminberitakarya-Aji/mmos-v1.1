# Queue

**Document ID:** queue
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the Queue component of the MMOS Runtime.

The Queue is responsible for temporarily storing executable tasks that have been scheduled and are waiting to be dispatched.

It provides buffering between the Scheduler and the Dispatcher, enabling reliable, scalable, and asynchronous execution.

The Queue determines **which tasks are waiting for execution**. It does **not** decide **what**, **when**, **where**, or **how** tasks execute.

---

# Responsibilities

The Queue is responsible for:

* Receiving scheduled tasks
* Buffering executable work
* Preserving task ordering
* Managing task visibility
* Delivering tasks to the Dispatcher
* Supporting retries and requeue operations
* Publishing queue-related events

The Queue never executes tasks and never performs orchestration.

---

# Position in Runtime

The Queue sits between the Scheduler and the Dispatcher.

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

The Queue decouples scheduling from execution.

---

# Queue Lifecycle

Every queued task follows the same lifecycle.

```text
Scheduled
     │
     ▼
Enqueued
     │
     ▼
Waiting
     │
     ▼
Dequeued
     │
     ▼
Dispatched
```

If dispatch fails, the task may return to the Queue according to the Runtime retry policy.

---

# Queue Model

The Queue provides temporary storage for executable tasks.

Typical operations include:

* Enqueue
* Dequeue
* Peek
* Requeue
* Remove
* Expire

All queue operations should be deterministic and observable.

---

# Queue States

| State    | Description                          |
| -------- | ------------------------------------ |
| Enqueued | Task stored in the queue             |
| Waiting  | Awaiting dispatch                    |
| Reserved | Temporarily assigned to a Dispatcher |
| Requeued | Returned after temporary failure     |
| Expired  | Removed due to expiration            |
| Removed  | Successfully consumed                |

Each state transition should be recorded through Runtime events.

---

# Queue Ordering

The Queue should preserve scheduling decisions.

Ordering may consider:

* Scheduling priority
* Execution time
* FIFO ordering
* Retry priority
* Dependency readiness

The Queue must not reorder tasks arbitrarily.

---

# Visibility

When a Dispatcher retrieves a task, the Queue temporarily marks it as reserved.

If the Dispatcher confirms successful delivery:

* the task is permanently removed.

If confirmation is not received:

* the task becomes available again after the visibility timeout.

This prevents task loss during temporary failures.

---

# Requeue

A task may return to the Queue when:

* Dispatch fails
* Executor rejects execution
* Temporary infrastructure failure occurs
* Retry policy allows another attempt

Requeued tasks retain their execution identity.

---

# Expiration

Tasks may expire when:

* Their execution deadline has passed
* Retry limits have been exceeded
* Execution is cancelled
* Workflow is terminated

Expired tasks should not be dispatched.

---

# Queue Capacity

The Queue should support configurable limits.

Typical limits include:

* Maximum queue size
* Maximum waiting time
* Maximum reserved tasks
* Maximum retry attempts

Capacity limits should protect Runtime stability.

---

# Events

The Queue publishes events including:

* Task Enqueued
* Task Reserved
* Task Dequeued
* Task Requeued
* Task Expired
* Queue Overflow

Events provide visibility into queue activity.

---

# Error Handling

Typical queue failures include:

* Queue full
* Invalid task
* Duplicate enqueue
* Reservation timeout
* Storage failure
* Queue corruption

Recoverable failures should be reported through Runtime events and handled according to platform policies.

---

# Observability

The Queue should expose operational metrics such as:

* Queue depth
* Enqueue rate
* Dequeue rate
* Waiting time
* Requeue count
* Expired tasks
* Queue utilization

These metrics support monitoring, alerting, and capacity planning.

---

# Scalability

The Queue is designed for horizontal scalability.

Recommended characteristics include:

* Distributed implementation
* High throughput
* Persistent storage when required
* Fault tolerance
* Concurrent producers and consumers

Scaling the Queue should not require changes to Scheduler, Dispatcher, or Executor.

---

# Reliability

The Queue should provide reliable task delivery.

Key characteristics include:

* No task loss during normal operation
* At-least-once delivery
* Safe recovery after failures
* Consistent task visibility
* Durable storage where configured

The Runtime is responsible for handling duplicate execution when required.

---

# Design Constraints

The Queue must never:

* Execute tasks
* Schedule work
* Select Executors
* Invoke providers
* Modify execution plans
* Change execution results

Its responsibility is limited to buffering executable work.

---

# Relationship with Other Components

| Component    | Relationship                |
| ------------ | --------------------------- |
| Planner      | Produces Runtime Plans      |
| Scheduler    | Enqueues executable tasks   |
| Queue        | Buffers executable work     |
| Dispatcher   | Consumes queued tasks       |
| Executor     | Executes dispatched tasks   |
| Retry Policy | Determines requeue behavior |
| Event Bus    | Receives queue events       |

Each component owns a clearly defined responsibility within the Runtime pipeline.

---

# Future Enhancements

Future Queue capabilities may include:

* Priority queues
* Distributed queue federation
* Dead-letter queues
* Delayed queues
* Persistent replay
* Multi-region replication
* Adaptive queue partitioning
* Intelligent load distribution

These enhancements should preserve the Queue's responsibility as the Runtime buffering layer.

---

# Summary

The Queue is responsible for buffering executable tasks between the Scheduler and the Dispatcher.

It provides reliable, observable, and scalable task storage while preserving scheduling decisions, supporting retries, and ensuring safe task delivery.

By isolating queue management into a dedicated component, MMOS achieves loose coupling between scheduling and execution, enabling a resilient and horizontally scalable Runtime architecture.
