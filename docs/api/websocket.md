# WebSocket API

**Location**

`docs/api/websocket.md`

---

# Overview

The MMOS WebSocket API provides a persistent, bidirectional communication channel between client applications and the MMOS platform.

Unlike the REST API, which is optimized for request-response interactions, the WebSocket API is designed for real-time communication, event delivery, execution monitoring, and streaming AI responses.

Applications establish a persistent connection to the Gateway, which brokers communication with the Runtime and Event Bus.

```
Application

↓

WebSocket

↓

Gateway

↓

Runtime

↓

Event Bus
```

---

# Design Goals

The WebSocket API is designed to:

- support real-time communication
- deliver execution events
- enable streaming responses
- reduce polling
- provide low-latency updates
- support scalable event distribution
- remain provider-independent

---

# Design Principles

The WebSocket API follows several architectural principles.

## Persistent Connection

Clients establish a long-lived connection.

```
Connect

↓

Authenticate

↓

Subscribe

↓

Receive Events

↓

Disconnect
```

The connection remains active until closed by either client or server.

---

## Bidirectional Communication

Both client and server may send messages independently.

```
Client

⇄

Gateway

⇄

Runtime
```

This enables interactive workflows and live execution updates.

---

## Event-Driven

Communication is based on events rather than polling.

Examples include:

- execution started
- execution updated
- execution completed
- execution failed
- workflow changed
- artifact created
- memory updated

---

## Provider Independence

Streaming messages never expose provider-specific protocols.

Applications receive normalized MMOS events regardless of whether the underlying provider is:

- OpenAI
- Anthropic
- Gemini
- Qwen
- DeepSeek

---

# Connection Lifecycle

Typical lifecycle:

```
Open Connection

↓

Authenticate

↓

Authorize

↓

Subscribe

↓

Receive Events

↓

Unsubscribe

↓

Disconnect
```

---

# Authentication

Authentication occurs immediately after connection establishment.

Supported mechanisms include:

- API Key
- Bearer Token
- OAuth
- Service Account

Unauthenticated connections should be rejected.

---

# Session Management

The Gateway manages WebSocket sessions.

Session information may include:

- Client ID
- User ID
- Workspace
- Connection Time
- Subscription Set
- Authentication Status

The Runtime does not manage client sessions directly.

---

# Message Model

Every message follows a standardized MMOS envelope.

Typical structure:

```
Message

↓

Metadata

↓

Type

↓

Payload

↓

Timestamp
```

Provider-specific message formats are never exposed.

---

# Message Categories

The WebSocket API supports multiple message categories.

## Command

Client requests an operation.

Examples:

- start execution
- cancel execution
- subscribe
- unsubscribe

---

## Event

Server publishes platform events.

Examples:

- execution completed
- task failed
- artifact created
- memory updated

---

## Stream

Incremental output generated during execution.

Examples:

- token generated
- partial response
- progress update

---

## Response

Acknowledgement or result of a client request.

Examples:

- subscription accepted
- execution started
- request completed

---

## Error

Reports failures or invalid operations.

Examples:

- authentication failed
- unauthorized
- invalid message
- subscription rejected

---

# Subscription Model

Clients explicitly subscribe to event streams.

Typical subscriptions include:

- Execution Events
- Workflow Events
- Task Events
- Memory Events
- Artifact Events
- Runtime Events
- System Events

Subscriptions remain active until cancelled or disconnected.

---

# Execution Monitoring

Applications can monitor long-running executions in real time.

Typical flow:

```
Execution Started

↓

Progress Updates

↓

Intermediate Results

↓

Execution Completed
```

This removes the need for repeated REST polling.

---

# Streaming Responses

Streaming supports incremental AI output.

Example lifecycle:

```
Request

↓

Stream Started

↓

Partial Output

↓

Token Stream

↓

Completed
```

Streaming remains independent of provider-specific implementations.

---

# Event Delivery

The Gateway delivers events originating from the MMOS Event Bus.

Examples:

```
Runtime

↓

Event Bus

↓

Gateway

↓

Subscribed Clients
```

The Gateway filters events according to client subscriptions.

---

# Artifact Notifications

Applications may receive notifications when artifacts are created.

Examples:

- image generated
- document completed
- audio generated
- video completed
- embedding created

Artifacts are retrieved through the REST API when necessary.

---

# Memory Notifications

Memory events include:

- memory stored
- memory updated
- memory deleted
- memory indexed

Applications remain synchronized with platform state.

---

# Runtime Notifications

Runtime events may include:

- execution queued
- scheduler update
- execution started
- execution paused
- execution resumed
- execution completed
- execution failed

These events expose execution state without revealing Runtime internals.

---

# Heartbeat

The WebSocket API supports heartbeat messages.

Purpose:

- detect disconnected clients
- maintain active connections
- identify stale sessions

Heartbeat intervals are deployment configurable.

---

# Reconnection

Clients should support automatic reconnection.

Typical workflow:

```
Connection Lost

↓

Reconnect

↓

Authenticate

↓

Restore Subscriptions

↓

Continue Receiving Events
```

Applications should tolerate temporary network interruptions.

---

# Ordering

Within a single execution, event ordering should be preserved whenever possible.

Across unrelated executions, ordering is not guaranteed.

Applications should rely on timestamps and execution identifiers when processing events.

---

# Flow Control

Deployments may implement flow control mechanisms including:

- message buffering
- backpressure
- rate limiting
- queue management

These mechanisms prevent slow consumers from affecting platform stability.

---

# Error Handling

Errors follow standardized MMOS error categories.

Examples:

- Authentication Error
- Authorization Error
- Validation Error
- Subscription Error
- Timeout
- Connection Closed
- Internal Error

Provider-specific errors are normalized before delivery.

---

# Security

The WebSocket API should:

- require secure connections (WSS)
- authenticate all clients
- authorize subscriptions
- isolate tenant traffic
- validate incoming messages
- prevent unauthorized event access

Security enforcement is handled by the Gateway.

---

# Observability

The Gateway publishes telemetry for WebSocket activity.

Examples:

- connection opened
- connection closed
- authentication succeeded
- authentication failed
- subscription created
- subscription removed
- message received
- message sent

Telemetry integrates with the MMOS Event Bus and monitoring infrastructure.

---

# Scalability

The WebSocket API is designed for horizontal scaling.

Typical deployment architecture:

```
Clients

↓

Load Balancer

↓

Gateway Cluster

↓

Event Bus

↓

Runtime Cluster
```

Persistent connections should remain independent of Runtime instances.

---

# Compatibility

The WebSocket API follows MMOS semantic versioning.

Compatibility rules:

- Patch releases remain backward compatible.
- Minor releases may introduce new event types.
- Major releases may introduce protocol changes.

Deprecated message types should remain supported during the deprecation period.

---

# Relationship with Other APIs

The WebSocket API complements the REST API.

| API | Primary Use |
|------|-------------|
| REST | Resource management and request-response operations |
| WebSocket | Real-time events, streaming, and execution monitoring |

Applications may use both APIs simultaneously depending on their requirements.

---

# Future Enhancements

Future WebSocket capabilities may include:

- multiplexed channels
- binary message support
- compressed streaming
- resumable sessions
- distributed event replay
- selective event filtering
- client acknowledgements

These enhancements will preserve the provider-independent architecture.

---

# Summary

The MMOS WebSocket API provides a persistent, real-time communication interface for applications interacting with the platform. It enables event subscriptions, execution monitoring, streaming AI responses, and bidirectional messaging while abstracting Runtime, Event Bus, and Provider implementations behind a stable, versioned, and provider-independent protocol.