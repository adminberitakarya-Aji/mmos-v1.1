# Repository Organization

**Document ID:** 030-repository
**Version:** 1.1
**Status:** Draft
**Audience:** Developers, Contributors, Architects

---

# Purpose

This document defines the organization, structure, and governance of the MMOS v1.1 repository.

The repository is organized as a monorepo where all platform components are developed together while remaining modular and independently maintainable.

Every package, application, provider, and service should follow the conventions described in this document.

---

# Repository Philosophy

The MMOS repository follows several guiding principles.

* Single Source of Truth
* Monorepo Architecture
* Modular Design
* Clear Package Boundaries
* Contract-First Development
* Specification-First Implementation
* Provider Agnostic
* Testable by Design

The repository structure should support long-term maintainability rather than short-term convenience.

---

# Repository Layout

```text
mmos-v1.1/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── NOTICE
├── SUPPORT.md
├── .gitignore
│
├── docs/
├── schemas/
├── examples/
│
├── apps/
├── packages/
├── providers/
├── services/
├── deployments/
├── configs/
├── scripts/
├── tools/
└── tests/
```

---

# Root Directories

## docs/

Contains implementation documentation for MMOS v1.1.

This directory explains how the platform is implemented.

Architecture specifications remain part of MMOS v1.0.

---

## schemas/

Contains JSON Schemas shared across the platform.

Schemas define data contracts between components.

---

## examples/

Contains reference implementations demonstrating:

* Composition
* Workflow
* Agent
* Capability
* Provider integration
* SDK usage

Examples should be executable whenever practical.

---

## apps/

Contains executable applications built on top of MMOS.

Typical applications include:

* Dashboard
* Studio
* Playground
* Gateway

Applications should contain presentation and application logic only.

Core platform functionality belongs in `packages/`.

---

## packages/

Contains reusable platform libraries.

Packages implement the core architecture of MMOS and are shared by applications and services.

Packages should remain independent of application-specific concerns.

---

## providers/

Contains AI provider implementations.

Each provider translates MMOS capability contracts into provider-specific API calls.

Providers should never change the platform contracts defined by MMOS.

---

## services/

Contains long-running platform services supporting runtime execution.

Typical services include:

* Scheduler
* Worker
* Gateway API
* Dashboard API

Services compose packages rather than implementing domain logic directly.

---

## deployments/

Contains deployment resources.

Examples include:

* Docker
* Kubernetes
* Docker Compose
* Helm Charts

Deployment artifacts should not contain application logic.

---

## configs/

Contains shared configuration templates and default configuration files.

Configuration should remain environment-independent whenever possible.

Secrets must never be committed to the repository.

---

## scripts/

Contains automation scripts.

Typical scripts include:

* bootstrap
* build
* test
* lint
* release
* generate

Scripts should be idempotent whenever practical.

---

## tools/

Contains development utilities used during implementation.

These tools support development but are not part of the runtime platform.

---

## tests/

Contains platform-level test suites.

Testing may include:

* Unit Tests
* Integration Tests
* End-to-End Tests
* Performance Tests
* Provider Compatibility Tests

---

# Dependency Rules

The repository follows strict dependency boundaries.

```text
Applications
        │
        ▼
Packages
        │
        ▼
Providers
```

Rules:

* Applications may depend on packages.
* Services may depend on packages.
* Providers implement package contracts.
* Packages must not depend on applications.
* Packages must not depend on specific providers.
* Cross-package dependencies should be minimized.

These rules help preserve modularity and prevent architectural erosion.

---

# Repository Governance

The repository is governed by the following principles.

* New top-level directories require architectural review.
* Breaking public APIs require versioning consideration.
* Architectural changes require an ADR.
* Documentation must evolve together with implementation.
* Tests are required for production-ready functionality.

The repository structure should remain stable over time.

---

# Future Growth

The repository is expected to evolve as MMOS matures.

New packages, providers, services, and applications may be added without changing the overall repository organization.

Growth should occur within the established structure rather than by introducing new top-level directories.

---

# Summary

The MMOS repository is organized as a modular monorepo.

Its structure is designed to support long-term evolution, maintainability, and scalability while remaining faithful to the architectural principles established in MMOS v1.0.
