# REST API

**Location**

`docs/api/rest.md`

---

# Overview

The MMOS REST API provides the primary synchronous interface for applications, SDKs, gateways, automation platforms, and external services to interact with the MMOS platform.

The REST API exposes platform capabilities through stable, versioned HTTP endpoints while hiding the internal Runtime, Orchestrator, Event Bus, Memory Engine, and Provider implementations.

All clients communicate exclusively with the Gateway.

```
Application

↓

REST API

↓

Gateway

↓

Runtime

↓

MMOS Platform
```

---

# Design Goals

The REST API is designed to:

- provide a stable public interface
- remain provider-independent
- expose core MMOS resources
- support synchronous operations
- support asynchronous execution
- follow RESTful principles
- maintain backward compatibility

---

# Design Principles

The REST API follows several architectural principles.

## Resource-Oriented

Every API endpoint represents a platform resource.

Examples:

- Compositions
- Workflows
- Tasks
- Executions
- Agents
- Memory
- Artifacts
- Events

---

## Stateless

Every request contains all information required for execution.

The server does not maintain HTTP session state.

---

## Versioned

All endpoints are versioned.

Example:

```
/api/v1/
```

Future major versions may introduce:

```
/api/v2/
/api/v3/
```

Versioning prevents breaking existing clients.

---

## Provider Independent

The REST API never exposes provider-specific concepts.

Applications request Capabilities rather than providers.

Example:

```
Capability

↓

Chat

↓

Runtime

↓

Provider Selection
```

Applications never select providers directly.

---

# Base URL

Example:

```
https://gateway.example.com/api/v1
```

The actual deployment endpoint depends on the environment.

---

# Authentication

Authentication is required for protected endpoints.

Supported mechanisms include:

- API Key
- Bearer Token
- OAuth
- Service Account

Authentication is validated by the Gateway before requests reach the Runtime.

---

# Request Lifecycle

```
HTTP Request

↓

Authentication

↓

Authorization

↓

Validation

↓

Gateway

↓

Runtime

↓

Execution

↓

Response
```

---

# API Resources

The REST API exposes the following resource groups.

```
/compositions

/workflows

/tasks

/executions

/agents

/capabilities

/memory

/artifacts

/events

/providers

/runtime

/system
```

Each resource has its own lifecycle and operations.

---

# Composition API

Typical operations include:

- Create
- Retrieve
- Update
- Delete
- Execute
- List

---

# Workflow API

Typical operations include:

- Create
- Execute
- Pause
- Resume
- Cancel
- Retrieve Status

---

# Task API

Typical operations include:

- Submit
- Retrieve
- Cancel
- Retry
- List

---

# Execution API

Typical operations include:

- Start
- Retrieve
- Cancel
- Inspect
- Monitor

Execution resources expose Runtime state.

---

# Agent API

Typical operations include:

- Invoke
- Configure
- Inspect
- List

---

# Capability API

Applications invoke capabilities such as:

- Chat
- Vision
- OCR
- Embedding
- Image Generation
- Speech
- Search

The Runtime determines the appropriate provider.

---

# Memory API

Typical operations include:

- Store
- Retrieve
- Search
- Update
- Delete

Memory remains independent of any provider.

---

# Artifact API

Artifacts include:

- Images
- Videos
- Audio
- Documents
- Embeddings
- Structured Data

Artifacts are represented as MMOS resources.

---

# Event API

Supports:

- Retrieve Events
- Query Events
- Replay Events

Real-time subscriptions are provided through the WebSocket API.

---

# Runtime API

Runtime endpoints expose operational information.

Examples:

- Runtime Status
- Active Executions
- Queue Statistics
- Scheduler State
- Health Information

---

# System API

Administrative endpoints may include:

- Health
- Version
- Metrics
- Configuration
- Diagnostics

Availability depends on deployment configuration.

---

# HTTP Methods

The REST API follows standard HTTP semantics.

| Method | Purpose |
|---------|----------|
| GET | Retrieve resources |
| POST | Create resources or start execution |
| PUT | Replace resources |
| PATCH | Partial update |
| DELETE | Remove resources |

---

# Request Format

Request bodies use JSON.

Typical request structure:

```
Headers

↓

Authentication

↓

Metadata

↓

Payload
```

Binary content should be transferred using supported upload mechanisms.

---

# Response Format

Successful responses contain:

```
Status

Metadata

Data

Links (optional)
```

Responses are returned in JSON format unless otherwise specified.

---

# Pagination

Collection resources support pagination.

Typical metadata includes:

- page
- page size
- total items
- total pages
- next page
- previous page

Pagination behavior is consistent across resources.

---

# Filtering

Resources may support filtering.

Examples:

- status
- owner
- type
- created time
- updated time
- tags

Filtering syntax remains consistent across APIs.

---

# Sorting

Collection resources may support sorting.

Examples:

- created time
- updated time
- name
- priority
- status

---

# Search

Search operations are resource-specific.

Examples:

- workflow search
- artifact search
- memory search
- event search

Search behavior remains provider-independent.

---

# Idempotency

Operations that may be retried safely should support idempotency.

Examples include:

- resource creation
- execution submission

Clients may provide idempotency identifiers.

---

# Long-Running Operations

Some operations execute asynchronously.

Typical workflow:

```
Submit Request

↓

Execution ID

↓

Background Execution

↓

Status Polling

↓

Completed
```

Applications may alternatively subscribe through the WebSocket API.

---

# Error Handling

Errors follow a standardized MMOS format.

Examples:

- Validation Error
- Authentication Error
- Authorization Error
- Resource Not Found
- Conflict
- Timeout
- Rate Limited
- Internal Error

Provider-specific errors are normalized before reaching clients.

---

# Rate Limiting

Deployments may enforce request limits.

Examples:

- requests per minute
- concurrent requests
- payload size
- upload size

Rate limiting policies are deployment-specific.

---

# Security

The REST API should:

- require HTTPS
- validate authentication
- validate authorization
- sanitize input
- protect sensitive information
- prevent injection attacks

Security policies are enforced by the Gateway.

---

# Observability

Every request generates standardized telemetry.

Examples:

- request received
- request completed
- request failed
- execution started
- execution completed

Telemetry is published through the Event Bus.

---

# Compatibility

The REST API follows semantic versioning.

Compatibility rules:

- Patch releases remain backward compatible.
- Minor releases may introduce new endpoints.
- Major releases may introduce breaking changes.

Deprecated endpoints should remain available during the defined deprecation period.

---

# Relationship with Other APIs

The REST API is optimized for request-response interactions.

| API | Primary Use |
|------|-------------|
| REST | Synchronous operations |
| WebSocket | Real-time events and streaming |
| Internal Runtime API | Internal platform communication |

Applications should use the appropriate interface based on execution requirements.

---

# Future Enhancements

Future REST API capabilities may include:

- batch operations
- bulk resource management
- server-side filtering improvements
- advanced query language
- API extensions
- OpenAPI-generated clients
- API federation

These enhancements will preserve compatibility with the existing API architecture.

---

# Summary

The MMOS REST API provides a stable, versioned, and provider-independent interface for interacting with the platform. It exposes core MMOS resources through RESTful endpoints while abstracting the internal Runtime, Orchestrator, Capability Engine, Memory, and Provider implementations. This design enables applications and SDKs to build against a consistent public contract that remains stable as the platform evolves.