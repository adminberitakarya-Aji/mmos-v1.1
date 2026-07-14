# Debugging Guide

**Document ID:** debugging
**Version:** 1.1
**Status:** Draft
**Audience:** Developers, Platform Engineers, Maintainers

---

# Purpose

This document defines the debugging strategy for MMOS v1.1.

Its purpose is to provide a consistent approach for diagnosing, isolating, and resolving issues across the platform.

Debugging should focus on identifying root causes rather than treating symptoms.

---

# Debugging Philosophy

MMOS follows a structured debugging process.

Issues should be investigated systematically using observable evidence rather than assumptions.

The debugging process should be:

* Reproducible
* Observable
* Deterministic
* Incremental
* Evidence-based

---

# Debugging Workflow

Every investigation should follow the same workflow.

```text
Issue Report
      │
      ▼
Reproduce
      │
      ▼
Collect Evidence
      │
      ▼
Identify Component
      │
      ▼
Locate Root Cause
      │
      ▼
Implement Fix
      │
      ▼
Regression Test
      │
      ▼
Verify Resolution
```

Each step should be completed before moving to the next.

---

# Debugging Principles

When debugging MMOS:

* Reproduce the issue before changing code.
* Change one variable at a time.
* Preserve evidence.
* Avoid speculative fixes.
* Validate assumptions with logs, metrics, or tests.
* Confirm the root cause before implementing a solution.

---

# Common Failure Categories

Most issues fall into one of the following categories:

* Configuration errors
* Dependency issues
* Runtime failures
* Orchestrator coordination issues
* Provider integration failures
* Memory or state inconsistencies
* Event processing errors
* Network failures
* Timeout or retry behavior
* Concurrency issues

Correct classification helps narrow the investigation.

---

# Component-Oriented Debugging

Investigations should begin by identifying the affected architectural layer.

| Component    | Typical Issues                                 |
| ------------ | ---------------------------------------------- |
| Apps         | UI, request handling, user interaction         |
| Services     | API routing, scheduling, background processing |
| Orchestrator | Planning, routing, coordination                |
| Runtime      | Execution lifecycle, scheduling, dispatching   |
| Core         | Domain rules, validation, contracts            |
| Providers    | External AI APIs, authentication, rate limits  |
| Memory       | Context persistence, retrieval                 |
| Event Bus    | Event publication and consumption              |

---

# Logging Strategy

Logs should provide enough context to reconstruct an execution.

Recommended log fields include:

* Timestamp
* Correlation ID
* Execution ID
* Workflow ID
* Task ID
* Component
* Log level
* Message
* Error details

Sensitive information must never be written to logs.

---

# Correlation IDs

Every execution should carry a unique correlation identifier.

The same identifier should propagate across:

* Gateway
* Services
* Orchestrator
* Runtime
* Providers
* Event Bus

This enables end-to-end traceability.

---

# Event Tracing

Because MMOS is event-driven, debugging often requires reconstructing the event sequence.

Typical event flow:

```text
Composition Created
        │
        ▼
Workflow Planned
        │
        ▼
Execution Started
        │
        ▼
Task Scheduled
        │
        ▼
Task Executed
        │
        ▼
Artifact Produced
        │
        ▼
Execution Completed
```

Missing or out-of-order events can indicate processing failures.

---

# Provider Debugging

When investigating provider-related issues, verify:

* Capability resolution
* Provider configuration
* Authentication
* Request payload
* Response normalization
* Retry behavior
* Timeout handling

Provider-specific failures should remain isolated and must not affect the platform contracts.

---

# Runtime Debugging

Common Runtime investigation points include:

* Scheduler decisions
* Queue state
* Dispatcher routing
* Executor status
* Execution lifecycle
* Retry count
* Timeout conditions

Runtime debugging should focus on execution flow rather than provider behavior.

---

# Performance Investigation

Performance issues should be analyzed using measurable data.

Typical indicators include:

* Execution latency
* Queue depth
* Worker utilization
* CPU usage
* Memory usage
* Provider response time

Performance optimizations should only be made after identifying the actual bottleneck.

---

# Debugging Checklist

Before closing an issue, verify:

* The issue is reproducible.
* The root cause has been identified.
* The fix resolves the problem.
* No new regressions have been introduced.
* Automated tests have been added or updated.
* Documentation is updated if behavior changes.

---

# Tools

Typical debugging tools may include:

* Structured logs
* Metrics dashboards
* Distributed tracing
* Profilers
* Test suites
* Local development environment
* CI build logs

The specific tool may vary by language or deployment environment.

---

# Anti-Patterns

Avoid the following practices:

* Fixing code without reproducing the issue.
* Ignoring warnings or failed assertions.
* Removing logs without replacement.
* Mixing multiple fixes in one change.
* Guessing the root cause.
* Disabling tests to make builds pass.

These practices make future debugging significantly more difficult.

---

# Summary

Effective debugging in MMOS relies on reproducible investigations, structured observability, and architectural awareness.

By following a consistent debugging process, contributors can identify root causes efficiently, preserve platform stability, and ensure that fixes are verified through testing before being merged.
