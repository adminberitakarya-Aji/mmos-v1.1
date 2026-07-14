# Dispatcher

**Document ID:** dispatcher
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the Dispatcher component of the MMOS Runtime.

The Dispatcher is responsible for assigning scheduled work to available Executors.

It acts as the bridge between the Runtime Queue and the Executor layer, ensuring that executable tasks are delivered to the appropriate execution resources efficiently and reliably.

The Dispatcher determines **where** work should execute. It does **not** determine **when** work executes or perform the execution itself.

---

# Responsibilities

The Dispatcher is responsible for:

* Retrieving executable tasks from the Queue
* Selecting an appropriate Executor
* Assigning work to Executors
* Balancing workload across Executors
* Detecting unavailable Executors
* Handling dispatch failures
* Publishing dispatch events

The Dispatcher never executes tasks and never performs orchestration.

---

# Position in Runtime

The Dispatcher operates after scheduling and queue management.

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

The Dispatcher only processes tasks that have already been scheduled.

---

# Dispatcher Lifecycle

Each dispatchable task follows this lifecycle.

```text
Queued
   │
   ▼
Dequeued
   │
   ▼
Executor Selected
   │
   ▼
Dispatched
   │
   ▼
Accepted
```

If dispatch fails, the task returns to the Queue or enters an error state according to Runtime policy.

---

# Dispatching Model

The Dispatcher performs four primary steps.

1. Retrieve the next executable task.
2. Select an appropriate Executor.
3. Deliver the task.
4. Confirm task acceptance.

Only after successful acceptance is a task considered dispatched.

---

# Executor Selection

Executor selection may consider:

* Executor availability
* Current workload
* Queue length
* Resource utilization
* Execution capability
* Health status
* Execution affinity (if applicable)

Selection algorithms may evolve without changing the Dispatcher contract.

---

# Dispatch States

| State       | Description            |
| ----------- | ---------------------- |
| Pending     | Waiting for dispatch   |
| Selecting   | Choosing an Executor   |
| Dispatching | Sending task           |
| Accepted    | Executor accepted task |
| Rejected    | Executor rejected task |
| Failed      | Dispatch failed        |
| Requeued    | Returned to Queue      |

State transitions should be deterministic and observable.

---

# Load Balancing

The Dispatcher distributes work fairly across available Executors.

Possible balancing strategies include:

* Round Robin
* Least Loaded
* Priority-Based
* Resource-Aware
* Affinity-Based

The balancing strategy should be configurable and replaceable.

---

# Executor Availability

Before assigning work, the Dispatcher should verify that the target Executor is:

* Healthy
* Reachable
* Ready to accept work
* Within configured capacity

Unavailable Executors should not receive new assignments.

---

# Queue Integration

The Dispatcher consumes tasks from the Runtime Queue.

```text
Queue
   │
   ▼
Dispatcher
   │
   ▼
Executor
```

Once a task is accepted by an Executor, it is removed from the Queue.

---

# Failure Handling

Dispatch may fail because of:

* No available Executor
* Executor rejection
* Communication failure
* Capacity exceeded
* Timeout
* Internal runtime error

Recoverable failures should follow the Runtime retry policy.

---

# Retry Behavior

The Dispatcher may retry dispatch when failures are temporary.

Examples include:

* Temporary Executor unavailability
* Network interruption
* Queue contention

Retry scheduling is coordinated with the Scheduler and Retry Policy.

---

# Events

The Dispatcher publishes runtime events including:

* Task Dequeued
* Executor Selected
* Task Dispatched
* Dispatch Failed
* Task Requeued
* Executor Unavailable

Events should be immutable and traceable.

---

# Observability

The Dispatcher should expose operational metrics such as:

* Dispatch rate
* Dispatch latency
* Queue consumption rate
* Dispatch failures
* Executor utilization
* Requeue count
* Executor availability

These metrics support operational monitoring and performance tuning.

---

# Scalability

The Dispatcher is designed for horizontal scalability.

Recommended characteristics include:

* Stateless processing
* Parallel dispatch
* Distributed queue support
* Independent Dispatcher instances
* High throughput

Scaling the Dispatcher should not require changes to the Runtime architecture.

---

# Design Constraints

The Dispatcher must never:

* Execute tasks
* Invoke providers
* Modify execution plans
* Perform orchestration decisions
* Change task results

Its sole responsibility is task assignment.

---

# Relationship with Other Components

| Component    | Relationship                   |
| ------------ | ------------------------------ |
| Planner      | Produces executable tasks      |
| Scheduler    | Determines execution readiness |
| Queue        | Supplies queued tasks          |
| Dispatcher   | Assigns tasks to Executors     |
| Executor     | Performs execution             |
| Retry Policy | Defines retry behavior         |
| Event Bus    | Receives dispatch events       |

Each Runtime component owns a single responsibility and communicates through stable contracts.

---

# Future Enhancements

Future Dispatcher capabilities may include:

* Intelligent workload prediction
* Dynamic Executor discovery
* Geo-aware dispatching
* Cost-aware routing
* Priority preemption
* Adaptive balancing
* Distributed dispatch coordination

Future enhancements should not change the Dispatcher's core responsibility.

---

# Summary

The Dispatcher is responsible for deciding **where** scheduled work should execute.

It retrieves tasks from the Runtime Queue, selects the most appropriate Executor, assigns work, and ensures reliable delivery while remaining independent of orchestration, scheduling decisions, and task execution.

By isolating dispatch logic within a dedicated component, MMOS maintains a modular, scalable, and observable Runtime architecture.
