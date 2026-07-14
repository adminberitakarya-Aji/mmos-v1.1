# Schema Reference

**Location**

`schemas/README.md`

---

# Overview

The `schemas` directory contains the machine-readable specifications that define the canonical data model of the MMOS platform.

These schemas serve as the contract between every component in the platform, ensuring consistent validation, serialization, interoperability, and compatibility across Runtime, SDKs, APIs, Providers, and developer tools.

Unlike the documentation under `docs/`, which explains the architecture and concepts, the schemas represent the executable specification of the platform.

---

# Purpose

The schema system exists to:

- define canonical object structures
- validate platform resources
- ensure interoperability
- provide a stable contract between components
- support automatic code generation
- enable runtime validation
- enable API validation
- support future visual tooling

Schemas are considered the single source of truth for MMOS object definitions.

---

# Relationship with Documentation

The repository contains two complementary specifications.

```
docs/

Human-readable specification

↓

Architecture

↓

Design

↓

Behavior
```

```
schemas/

Machine-readable specification

↓

Validation

↓

Serialization

↓

Implementation
```

Every schema should have a corresponding architectural specification in `docs/`.

---

# Directory Structure

```
schemas/
│
├── README.md
│
├── composition.schema.json
├── workflow.schema.json
├── task.schema.json
├── agent.schema.json
├── execution.schema.json
├── runtime.schema.json
├── capability.schema.json
├── provider.schema.json
├── memory.schema.json
├── artifact.schema.json
├── event.schema.json
│
├── common/
│   ├── metadata.schema.json
│   ├── identifier.schema.json
│   ├── reference.schema.json
│   ├── status.schema.json
│   ├── pagination.schema.json
│   ├── timestamp.schema.json
│   ├── error.schema.json
│   └── response.schema.json
│
├── api/
│   ├── request.schema.json
│   ├── response.schema.json
│   ├── authentication.schema.json
│   └── websocket-message.schema.json
│
└── providers/
    ├── provider-config.schema.json
    └── model.schema.json
```

---

# Schema Categories

The schemas are organized into four categories.

## Core Domain Schemas

Define the primary MMOS domain model.

Included schemas:

- Composition
- Workflow
- Task
- Agent
- Execution
- Runtime
- Capability
- Provider
- Memory
- Artifact
- Event

These schemas represent the platform's business objects.

---

## Common Schemas

Common schemas define reusable structures shared by multiple objects.

Examples include:

- Metadata
- Identifier
- Reference
- Status
- Timestamp
- Pagination
- Error
- Response

This avoids duplication across schema definitions.

---

## API Schemas

API schemas define communication contracts.

Examples include:

- REST requests
- REST responses
- Authentication payloads
- WebSocket messages

These schemas standardize communication between clients and the Gateway.

---

## Provider Schemas

Provider schemas define the configuration model for AI providers.

Examples include:

- provider configuration
- model definitions

Provider schemas remain independent from provider implementations.

---

# Schema Relationships

The schema system follows a modular dependency model.

```
Composition

↓

Workflow

↓

Task

↓

Capability

↓

Provider
```

Supporting schemas such as Metadata and Identifier are shared across all domain objects.

---

# JSON Schema Standard

All MMOS schemas follow:

```
JSON Schema Draft 2020-12
```

This version provides modern validation features including:

- `$defs`
- `$ref`
- conditional validation
- reusable definitions
- improved extensibility

Future schema evolution should remain compatible with this standard unless a major platform version requires otherwise.

---

# Validation

Schemas are used to validate:

- API requests
- API responses
- Composition definitions
- Workflow definitions
- Runtime configuration
- Provider configuration
- Memory objects
- Events
- Artifacts

Validation occurs before objects enter the Runtime.

---

# References

Schemas should avoid duplication by referencing shared definitions.

Example:

```
Workflow

↓

Metadata

↓

Identifier

↓

Status
```

Reusable components should reside under the `common` directory.

---

# Versioning

Every schema follows the MMOS versioning strategy.

Compatibility rules:

| Change | Compatibility |
|----------|---------------|
| Patch | Backward compatible |
| Minor | Backward compatible |
| Major | May introduce breaking changes |

Schema versions should align with the platform release whenever practical.

---

# Backward Compatibility

Minor and patch releases should preserve:

- property names
- required fields
- object structure
- validation behavior

Breaking schema changes require a major version.

---

# Code Generation

Schemas are intended to support automated generation of:

- SDK models
- API clients
- validation libraries
- documentation
- IDE integrations
- developer tooling

Generated code should not modify schema definitions.

---

# Runtime Usage

The Runtime uses schemas to validate:

- Composition loading
- Workflow execution
- Task definitions
- Capability invocation
- Provider configuration
- Execution requests

Invalid objects should be rejected before execution begins.

---

# API Usage

REST and WebSocket APIs use schemas for:

- request validation
- response validation
- authentication payloads
- message envelopes
- error responses

This ensures a consistent interface for all clients.

---

# SDK Usage

Official SDKs use schemas to generate:

- strongly typed models
- request objects
- response objects
- validation helpers
- serialization logic

SDK behavior remains synchronized with the platform specification.

---

# Provider Usage

Provider adapters use schemas to validate:

- provider configuration
- model selection
- provider capabilities

Provider-specific implementations should never alter the canonical schema definitions.

---

# Best Practices

Schema authors should:

- reuse common definitions
- avoid duplicate structures
- prefer references over copying
- maintain backward compatibility
- document breaking changes
- validate every schema
- keep schemas implementation-independent

---

# Future Evolution

Future schema capabilities may include:

- automatic OpenAPI generation
- GraphQL schema generation
- SDK generation pipelines
- visual schema editor
- schema compatibility verification
- migration tooling
- policy validation

These enhancements will preserve the modular architecture of the schema system.

---

# Summary

The `schemas` directory contains the canonical machine-readable specification for the MMOS platform. Together with the architectural documentation under `docs/`, these schemas define the structure, validation rules, and interoperability contracts for every core domain object, API, provider, and runtime component. By adopting a modular JSON Schema architecture with reusable common definitions, MMOS ensures consistency, extensibility, and long-term maintainability across the entire platform.