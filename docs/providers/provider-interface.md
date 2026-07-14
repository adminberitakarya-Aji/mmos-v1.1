# Provider Interface

**Location**

`docs/providers/provider-interface.md`

---

# Overview

MMOS is designed to be **provider-agnostic**.

Every Large Language Model (LLM), Vision Model, Audio Model, Embedding Model, or future AI service is integrated through a standardized Provider Interface.

The Runtime, Orchestrator, Workflow Engine, Agent Engine, and Capability Engine never communicate directly with provider SDKs or HTTP APIs. Instead, they depend exclusively on the Provider Interface contract.

```
Runtime
     │
     ▼
Capability Engine
     │
     ▼
Provider Interface
     │
 ┌───┼───────────────┐
 │   │               │
 ▼   ▼               ▼
OpenAI Gemini Anthropic ...
```

This abstraction enables MMOS to support multiple providers without affecting higher-level components.

---

# Design Principles

The Provider Interface follows these principles:

- Provider agnostic
- Stateless adapter
- Standardized request/response
- Extensible capability model
- Consistent error handling
- Streaming support
- Tool calling support
- Multi-modal support
- Secure credential isolation

Providers never implement business logic.

Providers only translate MMOS requests into provider-specific API calls and normalize the responses.

---

# Responsibilities

Every Provider Adapter is responsible for:

- authentication
- request transformation
- response normalization
- streaming adaptation
- usage reporting
- error translation
- model discovery
- capability discovery

Providers are NOT responsible for:

- workflow execution
- planning
- orchestration
- scheduling
- retries
- memory management
- event routing

Those responsibilities belong to Runtime and Orchestrator.

---

# High-Level Architecture

```
Workflow

     │

Task

     │

Capability

     │

Provider Interface

     │

Provider Adapter

     │

External AI Provider
```

---

# Provider Lifecycle

A provider executes the following lifecycle.

```
Initialize

↓

Validate Configuration

↓

Authenticate

↓

Receive Request

↓

Translate Request

↓

Execute API Call

↓

Receive Response

↓

Normalize Response

↓

Return Result

↓

Dispose Resources
```

---

# Core Provider Contract

Every provider implements the same logical interface.

Core responsibilities include:

- initialization
- shutdown
- model listing
- inference
- embeddings
- streaming
- tool calling
- health checking

Example:

```
Provider

├── Initialize()
├── Shutdown()
├── Health()
├── Models()
├── Capabilities()
├── Generate()
├── Stream()
├── Embed()
├── InvokeTool()
└── Usage()
```

Actual implementation may vary depending on the programming language.

---

# Provider Registration

Providers register themselves during system startup.

```
Provider Registry

├── OpenAI
├── Gemini
├── Anthropic
├── Qwen
├── DeepSeek
```

Runtime resolves providers through the registry instead of directly instantiating implementations.

---

# Provider Metadata

Each provider exposes metadata describing its capabilities.

Example:

```
Provider Metadata

Name

Version

Vendor

Supported Models

Supported Modalities

Supported Features

Rate Limits

Maximum Context Window

Maximum Output Tokens
```

---

# Supported Modalities

Providers may support one or more modalities.

- Text
- Vision
- Audio
- Video
- Embedding
- Image Generation
- Speech
- Structured Output

Not every provider supports every modality.

Capabilities determine compatibility before execution.

---

# Capability Declaration

Each provider advertises supported capabilities.

Examples:

```
Chat Completion

Embedding

Image Generation

Vision Analysis

Speech To Text

Text To Speech

Function Calling

Streaming

JSON Mode

Reasoning Models
```

The Capability Engine uses these declarations when selecting providers.

---

# Model Discovery

Providers expose available models dynamically.

Example metadata:

```
Model ID

Display Name

Context Length

Max Output

Supported Modalities

Pricing

Availability

Status
```

The Runtime should avoid hardcoding model information whenever possible.

---

# Request Normalization

MMOS defines a unified request format internally.

Providers convert this canonical request into provider-specific payloads.

```
MMOS Request

↓

Provider Mapping

↓

Provider API Request
```

---

# Response Normalization

Similarly, providers normalize responses into MMOS standard objects.

```
Provider Response

↓

Normalization

↓

MMOS Response
```

This ensures upper layers never depend on vendor-specific formats.

---

# Streaming Support

Providers supporting streaming emit incremental output through a unified streaming interface.

Streaming events include:

- stream started
- token received
- partial response
- completed
- cancelled
- failed

Runtime consumes these events identically across providers.

---

# Tool Calling

Providers supporting function/tool calling expose a common interface.

Workflow:

```
LLM

↓

Tool Request

↓

Capability Engine

↓

Tool Execution

↓

Tool Result

↓

LLM Continuation
```

Provider adapters only translate tool invocation formats.

---

# Embedding Support

Embedding providers expose vector generation.

Common metadata includes:

- model
- dimensions
- usage
- latency

Returned vectors use a standardized MMOS structure.

---

# Usage Reporting

Each provider reports normalized usage metrics.

Examples:

- input tokens
- output tokens
- cached tokens
- requests
- latency
- execution time
- estimated cost

This enables provider-independent monitoring.

---

# Error Translation

Providers normalize provider-specific errors.

Examples:

```
Authentication Error

Rate Limit

Quota Exceeded

Timeout

Model Not Found

Invalid Request

Network Error

Internal Error
```

Runtime only handles normalized MMOS errors.

---

# Retry Strategy

Providers do not perform orchestration retries.

They only classify retryable errors.

Runtime decides whether retries should occur.

---

# Authentication

Authentication is provider-specific but hidden behind the adapter.

Examples:

- API Key
- OAuth
- Service Account
- Local Runtime
- Self-hosted Endpoint

Credentials never propagate beyond the provider layer.

---

# Security

Provider adapters must:

- protect credentials
- sanitize logs
- avoid leaking prompts
- isolate provider configuration
- support secret rotation

---

# Provider Configuration

Each provider has its own configuration.

Example:

```
Provider

Name

Endpoint

API Key

Default Model

Timeout

Retry Limit

Region

Proxy

Headers
```

Configuration remains external to Runtime logic.

---

# Health Check

Providers expose health information.

Health states include:

- Healthy
- Degraded
- Unavailable
- Disabled

Runtime uses health status during provider selection.

---

# Observability

Provider adapters emit standardized telemetry.

Examples:

- Request Started
- Request Completed
- Request Failed
- Stream Started
- Stream Finished
- Authentication Failed
- Rate Limited

These events integrate with MMOS Event Bus.

---

# Provider Independence

A core architectural goal is complete provider independence.

Replacing:

- OpenAI
- Gemini
- Anthropic
- DeepSeek
- Qwen

must not require modifications to:

- Runtime
- Workflow
- Agent
- Memory
- Capability
- Orchestrator

Only the Provider Adapter changes.

---

# Future Extensibility

The Provider Interface is intentionally extensible.

Future providers may include:

- Local LLM runtimes
- Enterprise AI gateways
- Private inference clusters
- Custom company models
- Edge AI devices
- On-premise deployments

No architectural changes should be required to integrate additional providers.

---

# Summary

The Provider Interface is the abstraction layer that isolates MMOS from provider-specific implementations.

By enforcing a standardized contract for requests, responses, capabilities, streaming, usage reporting, and error handling, MMOS achieves true provider independence while allowing Runtime and Orchestrator to remain focused solely on execution and coordination.