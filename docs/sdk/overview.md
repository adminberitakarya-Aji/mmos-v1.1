# SDK Overview

**Location**

`docs/sdk/overview.md`

---

# Overview

The MMOS Software Development Kit (SDK) provides a standardized programming interface for building applications, services, plugins, workflows, and integrations on top of the MMOS platform.

The SDK abstracts the underlying Runtime, Orchestrator, Event Bus, Memory, Capability Engine, and Provider layer into a consistent developer experience.

Applications built using the SDK remain independent of specific providers and runtime implementations.

---

# Goals

The SDK is designed to achieve the following goals:

- Simplify MMOS application development
- Hide internal implementation complexity
- Provide consistent APIs across languages
- Enable provider-independent development
- Encourage reusable workflows
- Support extensibility
- Maintain compatibility across MMOS versions

---

# Design Principles

The SDK follows several core principles.

## Language Consistency

Every SDK should expose similar concepts regardless of programming language.

For example:

- Composition
- Workflow
- Task
- Agent
- Capability
- Runtime
- Memory
- Event

Developers should recognize identical concepts whether using Go, TypeScript, or Python.

---

## Provider Independence

SDK users never interact directly with provider SDKs.

Instead, applications invoke MMOS capabilities.

```
Application

↓

MMOS SDK

↓

MMOS Gateway

↓

Runtime

↓

Capability

↓

Provider
```

Changing providers does not require application changes.

---

## Runtime Abstraction

The SDK hides internal Runtime implementation.

Developers do not need to know about:

- Scheduler
- Dispatcher
- Queue
- Executor
- Planner

Applications simply submit work.

---

## Event-Driven

The SDK supports both synchronous and asynchronous programming.

Operations may:

- return immediate results
- stream results
- publish events
- subscribe to events

---

## Strong Typing

Whenever supported by the programming language, the SDK exposes strongly typed models.

Examples include:

- Composition
- Workflow
- Task
- Execution
- Memory
- Artifact
- Capability
- Event

---

# SDK Architecture

```
Application

↓

MMOS SDK

↓

REST / WebSocket API

↓

Gateway

↓

Runtime

↓

Core Packages
```

The SDK communicates exclusively through the public MMOS APIs.

It never accesses internal packages directly.

---

# SDK Components

Every SDK exposes similar logical modules.

```
SDK

├── Client
├── Authentication
├── Composition
├── Workflow
├── Task
├── Agent
├── Runtime
├── Capability
├── Memory
├── Artifact
├── Event
├── Provider
└── Utilities
```

Implementation details vary by language while maintaining conceptual consistency.

---

# Client Lifecycle

Typical client lifecycle:

```
Create Client

↓

Authenticate

↓

Connect

↓

Execute Request

↓

Receive Response

↓

Close Client
```

Clients should be lightweight and reusable.

---

# Authentication

The SDK supports multiple authentication mechanisms depending on deployment.

Possible methods include:

- API Key
- Bearer Token
- OAuth
- Service Account
- Enterprise Identity Provider

Authentication details are abstracted behind the SDK.

---

# Configuration

Typical client configuration includes:

```
Endpoint

Authentication

Timeout

Retry Policy

Default Workspace

Logging

TLS Settings
```

Configuration is externalized and environment-specific.

---

# Core Resources

The SDK provides access to the core MMOS domain objects.

## Composition

Applications can:

- create
- retrieve
- update
- delete
- execute

Compositions.

---

## Workflow

Applications can:

- create workflows
- execute workflows
- inspect workflow state
- monitor progress

---

## Task

Applications can:

- submit tasks
- monitor tasks
- cancel tasks
- inspect results

---

## Agent

Applications can:

- invoke agents
- configure agents
- monitor execution
- inspect outputs

---

## Runtime

Applications can:

- start executions
- stop executions
- inspect runtime state
- retrieve execution history

---

## Capability

Applications invoke capabilities instead of providers.

Examples include:

- Chat
- Vision
- Embedding
- OCR
- Image Generation
- Speech
- Search

The Runtime selects an appropriate provider automatically.

---

## Memory

Applications can:

- store knowledge
- retrieve knowledge
- search memories
- manage memory collections

---

## Artifact

Applications can manage generated artifacts such as:

- images
- videos
- audio
- documents
- embeddings
- structured data

---

## Event

Applications may:

- publish events
- subscribe to events
- filter events
- replay event streams

---

# Execution Models

The SDK supports multiple execution styles.

## Synchronous

```
Request

↓

Response
```

---

## Asynchronous

```
Request

↓

Execution ID

↓

Background Processing

↓

Completion Event
```

---

## Streaming

```
Request

↓

Live Stream

↓

Incremental Output

↓

Completion
```

---

# Error Handling

The SDK exposes standardized MMOS error types.

Examples include:

- Validation Error
- Authentication Error
- Authorization Error
- Not Found
- Conflict
- Timeout
- Rate Limited
- Provider Error
- Internal Error

Applications should never process provider-specific errors directly.

---

# Observability

The SDK supports:

- logging
- metrics
- tracing
- execution monitoring
- event subscriptions

Applications may integrate with external monitoring platforms.

---

# Versioning

The SDK follows the MMOS platform version.

Compatibility rules:

- Patch releases remain backward compatible.
- Minor releases may introduce new features.
- Major releases may introduce breaking changes.

Applications should declare supported SDK versions explicitly.

---

# Language Support

Official SDKs are provided for:

- Go
- TypeScript
- Python

Additional SDKs may be added in future releases.

---

# Extensibility

The SDK is designed to support:

- custom middleware
- plugins
- interceptors
- custom authentication
- custom serialization
- custom logging

Extensions should not require modifications to the SDK core.

---

# Best Practices

Developers should:

- reuse client instances
- avoid provider-specific assumptions
- rely on capabilities rather than providers
- handle asynchronous operations properly
- monitor execution events
- use strongly typed models where available
- keep SDK versions aligned with the MMOS platform

---

# Relationship with the Platform

The SDK is not a replacement for the Runtime or Orchestrator.

Responsibilities remain clearly separated.

| Component | Responsibility |
|-----------|----------------|
| SDK | Developer interface |
| Gateway | Public API endpoint |
| Runtime | Execution |
| Orchestrator | Coordination |
| Capability Engine | Capability resolution |
| Provider | AI service integration |

---

# Future Evolution

Future SDK enhancements may include:

- additional programming languages
- code generation from API specifications
- offline execution support
- plugin development toolkit
- workflow builders
- interactive debugging tools

These enhancements will preserve the core SDK architecture and programming model.

---

# Summary

The MMOS SDK provides a unified, provider-independent development interface for building applications on the MMOS platform. By abstracting Runtime, Orchestrator, Capabilities, and Providers behind a consistent API, the SDK enables developers to create portable, scalable, and maintainable AI-powered applications without depending on provider-specific implementations or internal platform details.