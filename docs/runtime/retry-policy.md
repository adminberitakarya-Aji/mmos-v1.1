# Retry Policy

**Document ID:** retry-policy
**Version:** 1.1
**Status:** Draft
**Audience:** Runtime Developers, Platform Engineers, Contributors

---

# Purpose

This document defines the Retry Policy used by the MMOS Runtime.

The Retry Policy determines when failed executions may be attempted again, how retry attempts are scheduled, and when execution should permanently fail.

The policy provides a consistent and deterministic mechanism for recovering from transient failures while preventing unnecessary retries.

---

# Objectives

The Retry Policy aims to:

* Recover from transient failures
* Prevent infinite retry loops
* Standardize retry behavior
* Improve execution reliability
* Support observability
* Preserve deterministic execution

Retry behavior should be independent of specific AI providers or deployment environments.

---

# Retry Principles

The Runtime follows these principles:

* Retry only recoverable failures.
* Never retry successful executions.
* Limit retry attempts.
* Apply configurable retry delays.
* Record every retry attempt.
* Preserve execution history.

Retries should always be explicit and observable.

---

# Retry Lifecycle

A typical retry flow is shown below.

```text id="q7mb4d"
Running
    │
    ▼
Failed
    │
    ▼
Retry Evaluation
    │
    ├──────────────┐
    │              │
    ▼              ▼
Retry         Permanent Failure
    │
    ▼
Scheduled
    │
    ▼
Queued
    │
    ▼
Running
```

The Runtime evaluates every failure before scheduling another attempt.

---

# Retry Eligibility

A failed execution may be retried when:

* The failure is classified as recoverable.
* Maximum retry attempts have not been reached.
* Retry timeout has not expired.
* Execution has not been cancelled.
* Workflow policy permits retries.

All conditions must be satisfied before a retry is scheduled.

---

# Non-Retryable Failures

The following failures should normally **not** be retried:

* Invalid workflow definition
* Invalid execution plan
* Invalid capability configuration
* Missing required input
* Authentication failure
* Authorization failure
* Permanent provider rejection
* Validation failure

These failures require corrective action rather than another execution attempt.

---

# Retryable Failures

Typical retryable failures include:

* Temporary network interruption
* Provider timeout
* Temporary provider unavailability
* Rate limiting
* Infrastructure interruption
* Temporary resource exhaustion

Retryable failures should be classified consistently across providers.

---

# Retry Limits

Each execution should have configurable retry limits.

Typical configuration includes:

* Maximum retry attempts
* Maximum retry duration
* Retry timeout
* Retry delay
* Retry strategy

Once a retry limit is reached, execution transitions to a terminal failure state.

---

# Retry Strategies

The Runtime may support multiple retry strategies.

Examples include:

* Fixed Delay
* Linear Backoff
* Exponential Backoff
* Exponential Backoff with Jitter

The selected strategy should be configurable without changing Runtime behavior.

---

# Retry Delay

A delay is typically applied between retry attempts.

Example:

```text id="ak2x7v"
Attempt 1
    │
 5 seconds
    │
Attempt 2
    │
10 seconds
    │
Attempt 3
```

The delay prevents immediate repeated failures and reduces pressure on dependent systems.

---

# Retry State

Retry behavior interacts with the Execution State model.

Typical transitions include:

```text id="s3pc2r"
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
```

The Retry Policy does not introduce new execution states beyond those defined in `execution-state.md`.

---

# Scheduler Interaction

The Scheduler is responsible for scheduling retry attempts.

The Retry Policy provides:

* Eligibility rules
* Retry timing
* Retry limits
* Retry strategy

The Scheduler applies these rules when determining the next execution attempt.

---

# Queue Interaction

Retryable executions return to the Runtime Queue after being rescheduled.

The Queue treats retried executions as normal scheduled work while preserving execution identity and retry metadata.

---

# Executor Interaction

The Executor reports execution outcomes.

It does not decide whether a retry should occur.

Retry decisions belong to the Runtime policy.

---

# Events

The Retry Policy publishes events including:

* Retry Evaluated
* Retry Scheduled
* Retry Started
* Retry Completed
* Retry Exhausted
* Permanent Failure

These events provide complete visibility into retry behavior.

---

# Observability

The Runtime should expose retry metrics such as:

* Retry count
* Retry success rate
* Retry failure rate
* Average retry delay
* Retry latency
* Retry exhaustion count

These metrics support operational monitoring and tuning.

---

# Configuration

Retry behavior should be configurable.

Typical configuration options include:

* Enabled/disabled
* Maximum attempts
* Delay strategy
* Initial delay
* Maximum delay
* Retry timeout
* Retryable error classes

Configuration should be external to the application.

---

# Design Constraints

The Retry Policy must:

* Never retry completed executions.
* Never retry cancelled executions.
* Never exceed configured retry limits.
* Preserve execution history.
* Remain deterministic.
* Remain provider independent.

The policy should be reusable across all Runtime components.

---

# Relationship with Other Components

| Component       | Relationship                  |
| --------------- | ----------------------------- |
| Execution State | Provides retry-related states |
| Scheduler       | Schedules retry attempts      |
| Queue           | Buffers retried tasks         |
| Dispatcher      | Dispatches retried tasks      |
| Executor        | Reports execution failures    |
| Timeout         | Limits retry duration         |
| Event Bus       | Publishes retry events        |

The Retry Policy coordinates retry behavior without taking ownership of execution.

---

# Future Enhancements

Future retry capabilities may include:

* Adaptive retry strategies
* AI-assisted retry decisions
* Circuit breaker integration
* Provider-specific retry profiles
* Deadline-aware retries
* Retry prioritization
* Workflow-level retry policies
* Distributed retry coordination

These enhancements should preserve the Retry Policy as the single source of truth for retry behavior.

---

# Summary

The Retry Policy defines how the MMOS Runtime recovers from recoverable execution failures.

By separating retry decisions from execution, scheduling, and dispatching, MMOS maintains a modular and deterministic Runtime architecture.

The Retry Policy ensures that retries are controlled, observable, configurable, and provider-agnostic, improving overall platform reliability while preventing unnecessary or unsafe repeated executions.
