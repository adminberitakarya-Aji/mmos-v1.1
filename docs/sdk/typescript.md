# TypeScript SDK

**Location**

`docs/sdk/typescript.md`

---

# Overview

The TypeScript SDK provides a modern, type-safe interface for building web applications, backend services, serverless functions, desktop applications, and Node.js integrations on top of the MMOS platform.

The SDK abstracts the MMOS Runtime, Orchestrator, Capability Engine, Memory Engine, Event Bus, and Provider layer behind a consistent TypeScript API.

Applications remain provider-independent and communicate exclusively through the MMOS Gateway.

---

# Design Goals

The TypeScript SDK is designed to:

- provide first-class TypeScript support
- leverage static typing
- support both browser and Node.js environments
- simplify MMOS integration
- support asynchronous programming
- provide an extensible developer experience
- remain fully compatible with MMOS platform APIs

---

# Architecture

```
TypeScript Application

↓

MMOS TypeScript SDK

↓

REST / WebSocket Client

↓

MMOS Gateway

↓

Runtime

↓

MMOS Platform
```

Applications never communicate directly with internal Runtime components.

---

# Package Structure

Recommended package organization:

```
sdk/typescript

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
├── utils
└── internal
```

Only public modules should be imported by applications.

---

# Client

The Client is the primary entry point.

```
Client

├── composition
├── workflow
├── task
├── runtime
├── capability
├── memory
├── artifact
├── event
└── close()
```

The client manages all communication with the MMOS Gateway.

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

Applications should reuse client instances whenever possible.

---

# Configuration

Typical client configuration includes:

```
Endpoint

Authentication

Timeout

Retry Policy

Workspace

Transport

Logging
```

Configuration is environment-specific and independent of business logic.

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

- Create Composition
- Update Composition
- Delete Composition
- Execute Composition
- Retrieve Composition
- List Compositions

---

# Workflow API

Supports:

- Create Workflow
- Execute Workflow
- Pause Workflow
- Resume Workflow
- Cancel Workflow
- Retrieve Workflow Status

---

# Task API

Supports:

- Submit Task
- Retrieve Task
- Cancel Task
- Monitor Progress
- Retrieve Result

---

# Runtime API

Supports:

- Start Execution
- Stop Execution
- Retrieve Runtime Status
- Retrieve Execution History

Applications never communicate directly with Runtime internals.

---

# Capability API

Applications invoke Capabilities rather than Providers.

Examples include:

- Chat
- Vision
- OCR
- Embedding
- Image Generation
- Speech
- Search

Provider selection is handled automatically by the Runtime.

---

# Memory API

Supports:

- Store Memory
- Retrieve Memory
- Search Memory
- Update Memory
- Delete Memory

---

# Artifact API

Supports management of:

- Images
- Audio
- Video
- Documents
- Embeddings
- Generated Files

Artifacts are exposed through strongly typed objects.

---

# Event API

Supports:

- Publish Events
- Subscribe to Events
- Filter Events
- Replay Events

Applications may consume events in real time.

---

# Execution Models

The TypeScript SDK supports multiple execution patterns.

## Promise-based

```
Request

↓

Promise

↓

Response
```

---

## Async/Await

```
Request

↓

await

↓

Response
```

---

## Streaming

```
Request

↓

WebSocket / Stream

↓

Incremental Output

↓

Completed
```

Streaming integrates naturally with JavaScript asynchronous programming.

---

# Event-Driven Programming

The SDK supports event subscriptions.

Examples include:

- execution started
- execution completed
- execution failed
- workflow updated
- memory updated
- artifact created

Applications may subscribe to selected event types.

---

# Browser Support

The SDK is designed to support modern browsers.

Typical use cases include:

- Single Page Applications
- Progressive Web Applications
- Dashboards
- Workflow Designers
- Monitoring Interfaces

Browser-specific authentication mechanisms may be used where appropriate.

---

# Node.js Support

The SDK supports:

- Backend Services
- API Servers
- CLI Tools
- Automation
- Workers
- Scheduled Jobs
- Serverless Functions

Node.js applications use the same programming model as browser applications.

---

# Error Handling

The SDK exposes standardized MMOS error classes.

Examples include:

- ValidationError
- AuthenticationError
- AuthorizationError
- TimeoutError
- RateLimitError
- ProviderError
- InternalError

Provider-native errors are never exposed directly.

---

# Logging

The SDK supports configurable logging.

Typical categories include:

- Authentication
- Request
- Response
- Transport
- Streaming
- Retry

Logging implementation remains configurable by the application.

---

# Retry Behavior

The SDK may automatically retry transient transport failures.

Retry behavior should respect:

- timeout
- retry policy
- cancellation
- request idempotency

Business-level retry logic remains the responsibility of the Runtime.

---

# Transport

Supported transports include:

- REST
- WebSocket

Future transports may include:

- HTTP/3
- gRPC-Web

Applications remain transport-independent.

---

# Security

The SDK should:

- securely manage credentials
- support HTTPS/TLS
- sanitize logs
- prevent credential leakage
- validate server certificates

Sensitive information must never appear in logs.

---

# Performance

The SDK should:

- reuse HTTP connections
- optimize serialization
- minimize memory allocations
- efficiently process streaming responses
- support connection pooling where available

The SDK should perform efficiently in both browser and server environments.

---

# Version Compatibility

The TypeScript SDK follows MMOS semantic versioning.

Compatibility rules:

- Patch releases remain backward compatible.
- Minor releases introduce new features.
- Major releases may introduce breaking changes.

Applications should specify compatible SDK versions.

---

# Best Practices

Developers should:

- reuse Client instances
- use async/await for asynchronous operations
- subscribe to execution events
- avoid provider-specific assumptions
- invoke Capabilities instead of Providers
- centralize SDK configuration
- handle standardized MMOS errors

---

# Future Enhancements

Future TypeScript SDK enhancements may include:

- React integration
- Vue integration
- Angular integration
- Next.js support
- Nuxt support
- workflow builder components
- generated API clients
- middleware support
- plugin development toolkit

These enhancements will preserve the existing programming model.

---

# Summary

The TypeScript SDK provides a modern, strongly typed interface for interacting with the MMOS platform across browser and Node.js environments. It abstracts Runtime, Orchestrator, Capabilities, and Providers behind a consistent asynchronous API, enabling developers to build scalable, event-driven, and provider-independent applications using the TypeScript ecosystem.