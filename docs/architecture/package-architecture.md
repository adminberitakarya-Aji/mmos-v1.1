# Package Architecture

**Document ID:** package-architecture
**Version:** 1.1
**Status:** Draft
**Audience:** Platform Engineers, Contributors, Architects

---

# Purpose

This document defines the package organization and dependency architecture of the MMOS v1.1 monorepo.

The goal is to ensure that every package has a clear responsibility, stable boundaries, and predictable dependencies.

A well-defined package architecture helps maintain modularity, prevents architectural erosion, and enables long-term evolution of the platform.

---

# Design Principles

The package architecture follows these principles:

* Single Responsibility
* High Cohesion
* Low Coupling
* Dependency Inversion
* Provider Agnostic
* Contract First
* Testability
* Replaceability

Each package should solve one well-defined problem and expose a stable public interface.

---

# Monorepo Package Layout

```text
packages/
│
├── core/
│   ├── composition/
│   ├── workflow/
│   ├── task/
│   ├── execution/
│   ├── agent/
│   ├── capability/
│   ├── artifact/
│   ├── memory/
│   └── event/
│
├── runtime/
│   ├── scheduler/
│   ├── dispatcher/
│   ├── executor/
│   ├── planner/
│   └── queue/
│
├── orchestrator/
│   ├── planner/
│   ├── coordinator/
│   ├── resolver/
│   └── router/
│
├── sdk/
│   ├── go/
│   ├── typescript/
│   └── python/
│
├── cli/
└── shared/
```

Every directory under `packages/` represents a reusable module of the MMOS platform.

---

# Package Categories

The packages are grouped into five architectural categories.

## Core

The business domain of MMOS.

Core defines the platform concepts and contracts.

Core packages must remain independent of runtime, providers, applications, and services.

---

## Runtime

The execution engine.

Runtime is responsible for scheduling, dispatching, executing, and managing execution lifecycles.

Runtime implements Core contracts.

---

## Orchestrator

The orchestration layer.

The Orchestrator coordinates execution but never performs AI work directly.

It plans execution, resolves capabilities, routes requests, and coordinates Runtime components.

---

## SDK

Language-specific client libraries.

SDKs expose MMOS functionality without duplicating platform logic.

SDKs should communicate through stable public APIs.

---

## Shared

Reusable infrastructure shared across packages.

Examples include:

* Logging
* Configuration
* Utilities
* Error handling
* Validation
* Serialization

Shared must not contain business logic.

---

# Dependency Model

Package dependencies follow a one-way architecture.

```text
Applications
        │
        ▼
SDK / CLI
        │
        ▼
Orchestrator
        │
        ▼
Runtime
        │
        ▼
Core
```

Providers implement Core contracts but remain outside the `packages/` hierarchy.

---

# Dependency Rules

The following rules are mandatory.

## Core

Core packages:

* must not depend on Runtime.
* must not depend on Orchestrator.
* must not depend on Providers.
* must not depend on Applications.
* may depend on Shared.

---

## Runtime

Runtime packages:

* may depend on Core.
* may depend on Shared.
* must not depend on Applications.
* must not depend on SDK.

---

## Orchestrator

Orchestrator packages:

* may depend on Runtime.
* may depend on Core.
* may depend on Shared.
* must not depend on Providers directly.

---

## SDK

SDK packages:

* communicate with MMOS through public APIs.
* must not contain Runtime logic.
* must not duplicate Core models.

---

## Shared

Shared packages:

* provide generic infrastructure.
* must remain independent of business concepts.
* should avoid dependencies on other package categories.

---

# Providers

Provider implementations are located outside `packages/`.

```text
providers/
├── openai/
├── anthropic/
├── gemini/
├── qwen/
└── deepseek/
```

Providers implement platform contracts but never define them.

Providers may depend on:

* Core
* Shared

Providers must not modify Core contracts.

---

# Package Communication

Communication between packages should occur through:

* Interfaces
* Public APIs
* Events
* Data Contracts

Direct access to internal package implementation is prohibited.

---

# Package Lifecycle

Every package should define:

* Purpose
* Public API
* Internal Structure
* Dependencies
* Tests
* Documentation

A package should be independently testable.

---

# Adding New Packages

A new package should be created only when:

* it represents a distinct responsibility,
* it is reusable,
* it cannot naturally belong to an existing package,
* its dependencies remain consistent with the architecture.

Adding new top-level package categories requires an approved ADR.

---

# Architectural Integrity

To preserve the architecture:

* Avoid circular dependencies.
* Keep package APIs stable.
* Prefer composition over inheritance.
* Prefer interfaces over concrete implementations.
* Isolate provider-specific logic.
* Keep business logic inside Core.

---

# Summary

The MMOS package architecture provides a modular foundation for the platform.

Clear package responsibilities and strict dependency rules ensure that the implementation remains maintainable, extensible, provider-agnostic, and aligned with the architectural principles established in MMOS v1.0.
