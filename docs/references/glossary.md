# Glossary

**Location**

`docs/reference/glossary.md`

---

# Overview

This glossary defines the standardized terminology used throughout the MMOS (Multimedia Management Orchestration System) documentation.

Every document in the MMOS specification should use these terms consistently. Terms defined here are considered authoritative for architecture, implementation, APIs, SDKs, and developer documentation.

---

# A

## Agent

A logical execution entity responsible for performing a specific role within a workflow.

Agents execute Tasks using one or more Capabilities under the coordination of the Runtime.

Agents do not directly communicate with AI providers.

---

## Artifact

A persistent output produced during execution.

Examples include:

- Image
- Video
- Audio
- Document
- JSON
- Embedding
- Transcript
- Generated Code

Artifacts may be stored in the Artifact Store.

---

## Artifact Store

The storage subsystem responsible for managing persistent execution outputs.

---

## Authentication

The process of verifying the identity of a client before granting access to the platform.

Authentication is performed by the Gateway.

---

## Authorization

The process of determining whether an authenticated identity is permitted to perform a requested operation.

---

# C

## Capability

A standardized functional interface exposed by MMOS.

Examples include:

- Chat
- Vision
- OCR
- Embedding
- Image Generation
- Speech
- Search

Capabilities abstract provider-specific implementations.

---

## Capability Engine

The subsystem responsible for resolving and executing Capabilities.

It selects appropriate Providers according to Runtime policies.

---

## Composition

The highest-level executable unit in MMOS.

A Composition defines an orchestrated business process composed of one or more Workflows.

---

## Context

The execution information available to Workflows, Agents, and Tasks during runtime.

Context may include:

- Inputs
- Variables
- Memory
- Configuration
- Execution State

---

# D

## Dashboard

The administrative and monitoring interface for the MMOS platform.

---

## Deployment

The operational environment in which MMOS is executed.

Examples include:

- Docker
- Kubernetes
- Production

---

## Dispatcher

A Runtime component responsible for assigning executable Tasks to Workers.

---

# E

## Event

An immutable record describing something that occurred within the platform.

Examples include:

- Execution Started
- Workflow Completed
- Artifact Created
- Memory Updated

---

## Event Bus

The messaging infrastructure responsible for distributing Events across the platform.

---

## Execution

A runtime instance of a Composition or Workflow.

Each execution has its own lifecycle and execution state.

---

## Executor

The Runtime component responsible for performing actual Task execution.

---

# G

## Gateway

The public entry point for all external communication.

Responsibilities include:

- REST API
- WebSocket API
- Authentication
- Authorization
- Request Routing

---

# H

## Health Check

A mechanism used to determine whether a service is operating correctly.

---

# I

## Identity

The authenticated principal associated with an API request.

Examples include:

- User
- Service Account
- Application

---

## Ingress

The Kubernetes resource responsible for exposing MMOS services externally.

---

# M

## Memory

Persistent knowledge available to Workflows, Agents, and Capabilities.

Memory survives individual executions.

---

## Memory Engine

The subsystem responsible for storing, indexing, retrieving, and searching Memory objects.

---

## Metadata

Descriptive information associated with platform objects.

Examples include:

- timestamps
- owner
- labels
- version
- tags

---

## MMOS

**Multimedia Management Orchestration System**

A provider-independent AI orchestration platform designed to coordinate workflows, agents, capabilities, runtime execution, memory, and multimedia processing.

---

# N

## Namespace

A logical isolation boundary within Kubernetes deployments.

---

# O

## Object Model

The formal definition of all core domain objects and their relationships within MMOS.

---

## Orchestrator

The coordination component responsible for managing execution flow across Workflows and Runtime components.

The Orchestrator coordinates execution but does not perform the work itself.

---

# P

## Platform

The complete MMOS ecosystem, including Runtime, Gateway, SDKs, APIs, Providers, and operational infrastructure.

---

## Provider

An adapter implementing the Provider Interface to integrate external AI services.

Examples include:

- OpenAI
- Anthropic
- Gemini
- Qwen
- DeepSeek

---

## Provider Interface

The standardized contract implemented by every AI provider adapter.

---

# Q

## Queue

A Runtime structure that temporarily stores executable Tasks awaiting processing.

---

# R

## Resource

A managed entity exposed through the MMOS APIs.

Examples include:

- Composition
- Workflow
- Execution
- Memory
- Artifact

---

## Runtime

The execution engine responsible for scheduling, dispatching, coordinating, and executing Workflows and Tasks.

---

# S

## Scheduler

The Runtime component responsible for determining execution order and timing.

---

## SDK

Software Development Kit providing language-specific access to the MMOS platform.

Official SDKs include:

- Go
- TypeScript
- Python

---

## Service

An independently deployable MMOS component.

Examples include:

- Gateway
- Scheduler
- Worker
- Dashboard API

---

## Streaming

Incremental delivery of execution output while processing is still in progress.

---

# T

## Task

The smallest executable unit within a Workflow.

Tasks are assigned to Agents and executed by the Runtime.

---

## Tenant

An isolated organizational boundary within a multi-tenant deployment.

Each tenant owns its own:

- Compositions
- Workflows
- Memory
- Artifacts
- Executions

---

## Trace

A record describing the complete execution path of a request across platform services.

---

# V

## Version

The semantic version assigned to MMOS components, APIs, SDKs, and specifications.

---

# W

## WebSocket

The persistent bidirectional communication protocol used for:

- event delivery
- streaming
- execution monitoring

---

## Worker

A Runtime execution component responsible for performing Tasks assigned by the Dispatcher.

Workers are horizontally scalable.

---

## Workflow

A collection of ordered Tasks representing a business process within a Composition.

Workflows define execution logic but are executed by the Runtime.

---

# X

No standardized MMOS terminology currently begins with the letter X.

---

# Y

No standardized MMOS terminology currently begins with the letter Y.

---

# Z

No standardized MMOS terminology currently begins with the letter Z.

---

# Terminology Guidelines

All MMOS documentation should follow these conventions:

- Use **Composition** instead of "Project" or "Pipeline".
- Use **Workflow** for business execution logic.
- Use **Task** for the smallest executable unit.
- Use **Capability** instead of provider-specific features.
- Use **Provider** only for external AI integrations.
- Use **Runtime** for execution responsibilities.
- Use **Orchestrator** only for coordination responsibilities.
- Use **Artifact** for generated outputs.
- Use **Memory** for persistent knowledge.
- Use **Execution** for runtime instances.

Maintaining consistent terminology across specifications, APIs, SDKs, and implementation documentation ensures clarity, interoperability, and long-term maintainability of the MMOS platform.

---

# Summary

This glossary serves as the canonical vocabulary for the MMOS platform. By standardizing architectural, runtime, deployment, API, and development terminology, it ensures that all specifications, implementations, and documentation share a common language, reducing ambiguity and preserving consistency across the entire MMOS ecosystem.