# Dependency Graph

**Document ID:** dependency-graph
**Version:** 1.1
**Status:** Draft
**Audience:** Platform Engineers, Contributors, Architects

---

# Purpose

This document defines the allowed dependency relationships between major components of the MMOS v1.1 monorepo.

The dependency graph preserves architectural integrity by ensuring that dependencies always flow in a single direction and that platform layers remain loosely coupled.

This document complements `package-architecture.md` by specifying dependency rules at the repository level.

---

# Dependency Principles

The MMOS dependency model is based on the following principles:

* One-way dependencies
* Dependency inversion
* Stable contracts
* Low coupling
* High cohesion
* Provider independence
* Layer isolation

Dependencies should always point toward more stable and reusable modules.

---

# Repository Dependency Graph

```text
                         +----------------+
                         |     apps       |
                         +----------------+
                                 |
                                 v
                         +----------------+
                         |  services      |
                         +----------------+
                                 |
                                 v
                         +----------------+
                         | sdk / cli      |
                         +----------------+
                                 |
                                 v
                         +----------------+
                         | orchestrator   |
                         +----------------+
                                 |
                                 v
                         +----------------+
                         | runtime        |
                         +----------------+
                                 |
                                 v
                         +----------------+
                         | core           |
                         +----------------+
                           ^           ^
                           |           |
                  +----------------+   |
                  | providers      |---+
                  +----------------+
                           |
                           v
                  External AI Providers
```

The graph illustrates logical dependencies rather than deployment topology.

---

# Layer Responsibilities

| Layer        | Responsibility                 |
| ------------ | ------------------------------ |
| Apps         | User-facing applications       |
| Services     | Long-running platform services |
| SDK / CLI    | Developer interfaces           |
| Orchestrator | Planning and coordination      |
| Runtime      | Workflow execution             |
| Core         | Domain model and contracts     |
| Providers    | AI provider adapters           |

Each layer owns a single architectural responsibility.

---

# Allowed Dependencies

The following dependency relationships are permitted.

| From         | May Depend On                       |
| ------------ | ----------------------------------- |
| Apps         | Services, SDK                       |
| Services     | Orchestrator, Runtime, Core, Shared |
| SDK          | Public APIs                         |
| CLI          | Public APIs                         |
| Orchestrator | Runtime, Core, Shared               |
| Runtime      | Core, Shared                        |
| Providers    | Core, Shared                        |
| Core         | Shared                              |
| Shared       | Standard libraries only             |

---

# Forbidden Dependencies

The following dependencies are prohibited.

* Core → Runtime

* Core → Orchestrator

* Core → Providers

* Core → Services

* Core → Apps

* Runtime → Apps

* Runtime → Services

* Orchestrator → Apps

* Providers → Runtime

* Providers → Orchestrator

* Providers → Services

* Shared → Core

* Shared → Runtime

* Shared → Orchestrator

* Any circular dependency

Violating these rules creates architectural coupling and should be avoided.

---

# Dependency Inversion

Whenever interaction with an implementation is required, dependencies should target abstractions rather than concrete implementations.

Example:

```text
Runtime
     │
     ▼
Capability Interface
     ▲
     │
OpenAI Provider
```

The Runtime depends on the interface.

The provider implements the interface.

---

# Communication Model

Dependencies define compile-time relationships.

Runtime communication may additionally occur through:

* Events
* Messages
* APIs
* Interfaces

Communication paths do not imply direct package dependencies.

---

# External Dependencies

External libraries should remain isolated whenever practical.

Guidelines:

* Wrap third-party SDKs behind provider adapters.
* Avoid exposing third-party types in public APIs.
* Minimize direct dependencies on external frameworks.
* Keep vendor-specific logic isolated.

This reduces coupling and simplifies future replacements.

---

# Dependency Validation

Dependency rules should be verified continuously through tooling.

Recommended validation includes:

* Static dependency analysis
* Import cycle detection
* Architecture tests
* CI validation
* Code review

Architectural violations should be treated as build failures whenever feasible.

---

# Evolution

New packages and modules must integrate into the existing dependency graph without introducing new dependency directions.

If a change requires a new dependency relationship, it should be reviewed through the Architecture Decision Record (ADR) process before implementation.

---

# Summary

The MMOS dependency graph defines the architectural boundaries of the platform.

By enforcing one-way dependencies, stable contracts, and provider isolation, the repository remains modular, maintainable, and scalable as it evolves.
