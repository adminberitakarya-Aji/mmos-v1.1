# Go SDK

**Location**

`docs/sdk/go.md`

---

# Overview

The Go SDK provides a native Go interface for building applications, services, workers, plugins, and automation on top of the MMOS platform.

It exposes a strongly typed, idiomatic Go API while abstracting the underlying MMOS Runtime, Orchestrator, Event Bus, Capability Engine, Memory Engine, and Provider layer.

Applications built with the Go SDK remain completely provider-independent.

---

# Design Goals

The Go SDK is designed to:

- follow idiomatic Go practices
- provide strong typing
- support concurrent execution
- simplify MMOS integration
- minimize external dependencies
- support high-performance applications
- remain compatible with the MMOS platform

---

# Architecture

```
Go Application

↓

MMOS Go SDK

↓

REST / WebSocket Client

↓

MMOS Gateway

↓

Runtime

↓

MMOS Platform
```

Applications never communicate directly with Runtime internals.

---

# Package Structure

Recommended package organization:

```
sdk/go

├── client
├── auth
├── composition
├── workflow
├── task
├── execution
├── runtime
├── capability
├── memory
├── artifact
├── event
├── provider
├── transport
├── config
├── errors
└── internal
```

Only public packages should be imported by applications.

---

# Client

The Client is the primary entry point.

```
Client

├── Composition()
├── Workflow()
├── Task()
├── Runtime()
├── Capability()
├── Memory()
├── Artifact()
├── Event()
└── Close()
```

The client manages communication with MMOS Gateway.

---

# Client Lifecycle

```
Create Client

↓

Authenticate

↓

Connect

↓

Execute Operations

↓

Receive Responses

↓

Close Client
```

Client instances should be reused whenever possible.

---

# Configuration

Typical client configuration includes:

```
Endpoint

Authentication

Timeout

TLS

Retry Policy

Workspace

Logging
```

Configuration is independent of application logic.

---

# Authentication

Supported authentication mechanisms include:

- API Key
- Bearer Token
- OAuth
- Service Account

Authentication is handled internally by the SDK.

---

# Composition API

Supports:

- Create
- Update
- Delete
- Execute
- List
- Retrieve

Compositions.

---

# Workflow API

Supports:

- Create Workflow
- Execute Workflow
- Pause Workflow
- Resume Workflow
- Cancel Workflow
- Retrieve Workflow State

---

# Task API

Supports:

- Submit Task
- Monitor Progress
- Cancel Task
- Retrieve Result

---

# Runtime API

Supports:

- Start Execution
- Stop Execution
- Inspect Runtime
- Retrieve Execution History

Applications never communicate directly with Scheduler or Executor.

---

# Capability API

Applications invoke capabilities rather than providers.

Examples:

- Chat
- Vision
- OCR
- Embedding
- Image Generation
- Speech
- Search

The Runtime automatically selects the appropriate provider.

---

# Memory API

Supports:

- Store
- Retrieve
- Search
- Delete
- Update

Memory objects.

---

# Artifact API

Supports management of:

- Images
- Audio
- Video
- Documents
- Embeddings
- Generated Files

Artifacts are returned as strongly typed objects.

---

# Event API

Supports:

- Publish
- Subscribe
- Filter
- Replay

Events.

Streaming subscriptions are fully supported.

---

# Execution Models

The Go SDK supports multiple execution patterns.

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

Background Execution

↓

Completion Event
```

---

## Streaming

```
Request

↓

Stream

↓

Incremental Results

↓

Completed
```

Streaming integrates naturally with Go channels and contexts.

---

# Context Support

All long-running operations should support Go Context.

Benefits include:

- cancellation
- timeout
- deadline propagation
- request scoping

The SDK should propagate Context across all requests.

---

# Concurrency

The SDK is designed for concurrent use.

Clients should be safe for multiple goroutines.

Applications may execute multiple workflows simultaneously without creating additional clients.

---

# Error Handling

The SDK exposes standardized MMOS errors.

Examples:

- ValidationError
- AuthenticationError
- AuthorizationError
- TimeoutError
- RateLimitError
- ProviderError
- InternalError

Provider-specific errors are never exposed.

---

# Logging

The SDK supports configurable logging.

Typical log categories:

- Client
- Transport
- Authentication
- Request
- Response
- Streaming
- Retry

Logging implementation remains configurable by the application.

---

# Retry Behavior

The SDK may retry transient transport failures.

Retry decisions should respect:

- timeout
- idempotency
- retry policy
- cancellation context

Business retries remain the responsibility of the Runtime.

---

# Transport

The SDK communicates through supported MMOS transports.

Supported transports include:

- REST
- WebSocket

Future transports may include:

- gRPC
- HTTP/3

Applications remain transport-independent.

---

# Security

The SDK should:

- securely store credentials in memory
- support TLS
- sanitize logs
- avoid leaking secrets
- validate server certificates

Sensitive information must never appear in logs.

---

# Performance

The SDK should:

- reuse HTTP connections
- minimize allocations
- support connection pooling
- optimize serialization
- efficiently process streaming responses

The SDK should be suitable for high-throughput server applications.

---

# Version Compatibility

The Go SDK follows MMOS semantic versioning.

Compatibility guidelines:

- Patch releases are backward compatible.
- Minor releases introduce new functionality.
- Major releases may introduce breaking changes.

Applications should pin compatible SDK versions.

---

# Best Practices

Developers should:

- reuse Client instances
- use Context for all operations
- avoid provider-specific assumptions
- use asynchronous execution where appropriate
- subscribe to execution events
- rely on Capabilities instead of Providers

---

# Future Enhancements

Future Go SDK enhancements may include:

- code generation from OpenAPI specifications
- middleware support
- automatic retries
- distributed tracing integration
- metrics exporters
- plugin SDK
- workflow builder APIs

These enhancements will preserve backward compatibility whenever possible.

---

# Summary

The Go SDK provides a strongly typed, idiomatic Go interface for interacting with the MMOS platform. It abstracts Runtime, Orchestrator, Capabilities, and Providers behind a unified client API, enabling developers to build scalable, concurrent, and provider-independent applications while leveraging Go's performance and concurrency model.