# Python SDK

**Location**

`docs/sdk/python.md`

---

# Overview

The Python SDK provides a Pythonic interface for building AI applications, automation workflows, data pipelines, backend services, notebooks, and research environments on top of the MMOS platform.

The SDK abstracts the MMOS Runtime, Orchestrator, Capability Engine, Memory Engine, Event Bus, and Provider layer behind a unified Python API.

Applications remain completely provider-independent and communicate exclusively through the MMOS Gateway.

---

# Design Goals

The Python SDK is designed to:

- follow Python best practices
- provide an intuitive developer experience
- support synchronous and asynchronous execution
- integrate naturally with AI and data science ecosystems
- simplify MMOS integration
- remain provider-independent
- maintain compatibility with the MMOS platform

---

# Architecture

```
Python Application

↓

MMOS Python SDK

↓

REST / WebSocket Client

↓

MMOS Gateway

↓

Runtime

↓

MMOS Platform
```

Applications never access internal Runtime components directly.

---

# Package Structure

Recommended package organization:

```
sdk/python

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

Only public packages should be imported by applications.

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

Configuration remains external to application logic.

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

Applications never communicate directly with Scheduler, Dispatcher, or Executor.

---

# Capability API

Applications invoke Capabilities instead of Providers.

Examples include:

- Chat
- Vision
- OCR
- Embedding
- Image Generation
- Speech
- Search

Provider selection is performed automatically by the Runtime.

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

Artifacts are represented as strongly typed SDK objects.

---

# Event API

Supports:

- Publish Events
- Subscribe to Events
- Filter Events
- Replay Events

Applications can consume events in real time.

---

# Execution Models

The Python SDK supports multiple execution models.

## Synchronous

```
Request

↓

Response
```

Suitable for scripts, CLI tools, and simple services.

---

## Asynchronous

```
Request

↓

asyncio

↓

Response
```

Suitable for high-concurrency applications.

---

## Streaming

```
Request

↓

Streaming Session

↓

Incremental Output

↓

Completed
```

Streaming integrates naturally with Python iterators and asynchronous generators.

---

# AI & Data Science Integration

The SDK is designed to integrate with Python's AI ecosystem.

Typical use cases include:

- Jupyter Notebooks
- Machine Learning Pipelines
- AI Research
- Data Processing
- Batch Automation
- Experimentation

The SDK remains independent of any specific AI framework.

---

# Background Processing

The SDK supports long-running executions.

Typical workflow:

```
Submit Request

↓

Execution ID

↓

Background Processing

↓

Completion Event
```

Applications can monitor execution progress through polling or event subscriptions.

---

# Error Handling

The SDK exposes standardized MMOS exception types.

Examples include:

- ValidationError
- AuthenticationError
- AuthorizationError
- TimeoutError
- RateLimitError
- ProviderError
- InternalError

Provider-specific exceptions are never exposed directly.

---

# Logging

The SDK supports configurable logging.

Typical log categories include:

- Authentication
- Request
- Response
- Transport
- Streaming
- Retry

Applications control logging configuration.

---

# Retry Behavior

The SDK may automatically retry transient transport failures.

Retry behavior respects:

- timeout
- retry policy
- cancellation
- idempotency

Business-level retry decisions remain the responsibility of the Runtime.

---

# Transport

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
- minimize memory usage
- efficiently process streaming responses
- support concurrent asynchronous execution

The SDK should perform efficiently in both scripts and production services.

---

# Version Compatibility

The Python SDK follows MMOS semantic versioning.

Compatibility rules:

- Patch releases remain backward compatible.
- Minor releases introduce new functionality.
- Major releases may introduce breaking changes.

Applications should declare compatible SDK versions explicitly.

---

# Best Practices

Developers should:

- reuse Client instances
- prefer asynchronous APIs for high-concurrency workloads
- subscribe to execution events
- avoid provider-specific assumptions
- invoke Capabilities instead of Providers
- centralize SDK configuration
- handle standardized MMOS exceptions

---

# Future Enhancements

Future Python SDK enhancements may include:

- Jupyter notebook integration
- LangChain interoperability
- LlamaIndex interoperability
- Pandas integration
- workflow builder APIs
- plugin development toolkit
- automatic client generation
- middleware support

These enhancements will preserve the existing programming model and Provider-independent architecture.

---

# Summary

The Python SDK provides a Pythonic, provider-independent interface for interacting with the MMOS platform. It abstracts Runtime, Orchestrator, Capabilities, Memory, Events, and Providers behind a consistent API, enabling developers to build AI applications, automation systems, research tools, and production services while leveraging Python's rich ecosystem and asynchronous programming capabilities.