# OpenAI Provider

**Location**

`docs/providers/openai.md`

---

# Overview

The OpenAI Provider integrates MMOS with OpenAI's AI platform through the standardized Provider Interface.

The provider acts solely as an adapter that translates MMOS requests into OpenAI API calls and normalizes the responses back into MMOS domain objects.

OpenAI-specific APIs are never exposed outside the Provider layer.

---

# Purpose

The OpenAI Provider enables MMOS to access OpenAI foundation models for:

- Chat Completion
- Reasoning
- Structured Output
- Vision
- Embeddings
- Image Generation
- Speech-to-Text
- Text-to-Speech
- Streaming
- Function Calling

The Runtime communicates only with the Provider Interface.

---

# Architecture

```
Workflow

↓

Capability

↓

Provider Interface

↓

OpenAI Provider

↓

OpenAI API
```

The OpenAI Provider never communicates directly with Runtime, Workflow, or Orchestrator outside the Provider Interface contract.

---

# Responsibilities

The provider is responsible for:

- authentication
- request mapping
- response normalization
- model discovery
- capability discovery
- streaming adaptation
- usage reporting
- error normalization
- health monitoring

The provider is NOT responsible for:

- workflow execution
- orchestration
- planning
- scheduling
- retries
- memory
- event routing

---

# Supported Capabilities

The OpenAI Provider may expose the following capabilities depending on account access and model availability.

## Language Models

- Chat Completion
- Reasoning
- Instruction Following
- Structured Output
- JSON Mode

---

## Vision

Supported operations include:

- image understanding
- OCR
- scene analysis
- document analysis
- chart interpretation

---

## Embeddings

Supported for:

- semantic search
- retrieval
- memory indexing
- similarity matching

---

## Image Generation

Supported operations include:

- text-to-image
- image editing
- image variation

---

## Speech

Supported operations include:

- speech recognition
- speech synthesis

---

## Streaming

Supports incremental generation.

Streaming events are normalized into MMOS streaming events.

---

## Function Calling

Supports external tool invocation through the Capability Engine.

OpenAI tool calls are translated into MMOS Capability Requests.

---

# Supported Modalities

The provider may expose:

- Text
- Image
- Audio
- Embedding
- Structured Data

Availability depends on the selected model.

---

# Model Discovery

The provider dynamically discovers available models.

Example metadata:

```
Model ID

Display Name

Context Window

Maximum Output Tokens

Supported Modalities

Reasoning Support

Streaming Support

Availability
```

Runtime should avoid hardcoding model names.

---

# Request Flow

```
MMOS Request

↓

OpenAI Provider

↓

OpenAI Request

↓

OpenAI Response

↓

Normalization

↓

MMOS Response
```

---

# Request Mapping

The provider converts MMOS request objects into OpenAI-compatible payloads.

Typical mapping includes:

MMOS

↓

messages

↓

model

↓

tools

↓

response format

↓

stream options

↓

OpenAI Request

The mapping remains internal to the provider.

---

# Response Normalization

OpenAI responses are converted into standardized MMOS objects.

Normalized fields include:

- generated content
- tool calls
- finish reason
- usage
- latency
- metadata

Upper layers never depend on OpenAI response formats.

---

# Streaming

Streaming follows a unified MMOS interface.

Lifecycle:

```
Request

↓

Stream Started

↓

Token Received

↓

Partial Result

↓

Completed
```

Streaming implementation details remain hidden inside the provider.

---

# Tool Calling

When an OpenAI model requests a tool:

```
OpenAI Model

↓

Tool Request

↓

Capability Engine

↓

Tool Execution

↓

Tool Result

↓

OpenAI Continuation
```

The provider only translates tool request formats.

Execution is handled by the Capability Engine.

---

# Structured Output

The provider supports structured output generation.

Examples include:

- JSON
- typed objects
- validated schema responses

Validation occurs within MMOS after normalization.

---

# Embedding Workflow

```
Input

↓

OpenAI Embedding API

↓

Embedding Vector

↓

MMOS Embedding Object
```

Embedding dimensions are treated as provider metadata rather than fixed assumptions.

---

# Image Generation Workflow

```
Prompt

↓

OpenAI Image API

↓

Generated Image

↓

MMOS Artifact
```

Generated images become MMOS Artifacts.

---

# Speech Workflow

Speech recognition:

```
Audio

↓

OpenAI Speech API

↓

Text

↓

MMOS Response
```

Speech synthesis:

```
Text

↓

OpenAI Speech API

↓

Audio

↓

MMOS Artifact
```

---

# Authentication

Authentication is isolated inside the provider.

Possible mechanisms include:

- API Key
- Organization configuration
- Project configuration

Credentials are never exposed outside the Provider layer.

---

# Configuration

Example provider configuration:

```
Provider

Name

Endpoint

API Key

Default Model

Organization

Project

Timeout

Retry Limit

Proxy

Headers
```

Configuration is externalized and environment-dependent.

---

# Error Handling

OpenAI-specific errors are translated into standardized MMOS errors.

Examples include:

- Authentication Failed
- Invalid Request
- Model Not Found
- Rate Limited
- Quota Exceeded
- Timeout
- Network Failure
- Internal Error

Upper layers never process vendor-specific error formats.

---

# Usage Reporting

The provider reports normalized usage metrics.

Examples:

- input tokens
- output tokens
- cached tokens
- total tokens
- execution latency
- estimated cost
- request duration

These metrics are consumed by Runtime monitoring.

---

# Health Check

Health information includes:

- connectivity
- authentication
- API availability
- model availability

Possible states:

- Healthy
- Degraded
- Unavailable
- Disabled

---

# Observability

The provider emits standardized telemetry events.

Examples:

- Request Started
- Request Completed
- Request Failed
- Stream Started
- Stream Completed
- Tool Requested
- Tool Completed
- Authentication Failed
- Rate Limited

Events are published to the MMOS Event Bus.

---

# Security

The provider must:

- protect API credentials
- avoid logging sensitive prompts
- sanitize provider responses
- isolate secrets
- support credential rotation

Sensitive information must never leave the Provider layer.

---

# Performance Considerations

The provider should:

- reuse HTTP connections
- minimize serialization overhead
- support request streaming
- avoid unnecessary buffering
- efficiently normalize responses

Performance optimizations must remain transparent to Runtime.

---

# Provider Independence

The OpenAI Provider fully implements the Provider Interface.

Replacing OpenAI with another provider must not require changes to:

- Runtime
- Workflow
- Agent
- Capability
- Memory
- Event
- Orchestrator

Only the Provider Adapter implementation changes.

---

# Future Compatibility

The provider is designed to accommodate future OpenAI capabilities, including:

- new reasoning models
- larger context windows
- multimodal enhancements
- new structured output features
- additional tool invocation capabilities

These enhancements should integrate without affecting the higher-level MMOS architecture.

---

# Summary

The OpenAI Provider is a concrete implementation of the MMOS Provider Interface for OpenAI services.

It encapsulates authentication, request transformation, response normalization, streaming, tool calling, usage reporting, and health monitoring while preserving complete isolation between MMOS Runtime and OpenAI-specific APIs. This design ensures provider independence, maintainability, and future extensibility across the MMOS platform.