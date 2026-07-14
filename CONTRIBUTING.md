# Contributing to MMOS

First of all, thank you for your interest in contributing to MMOS.

MMOS (Media & Multimedia Orchestration System) is an open, provider-agnostic AI orchestration platform designed for building intelligent multimedia applications.

This document describes how to contribute while preserving the architecture, quality, and long-term vision of the project.

---

# Our Philosophy

MMOS is developed using a **Specification-First** approach.

Architecture is designed before implementation.

Implementation must follow the specification.

If implementation requires changing the architecture, the architecture must be updated through an Architecture Decision Record (ADR) before the implementation is merged.

---

# Core Principles

Every contribution must respect the following principles.

## Composition First

Composition is the center of the platform.

All execution begins from a Composition.

---

## Orchestrator Coordinates Only

The Orchestrator is responsible for planning and coordination.

It must never:

* execute AI requests,
* call providers directly,
* perform business logic,
* generate content.

---

## Runtime is Stateless

Runtime should remain stateless.

Persistent information belongs to Memory, Execution, or other storage components.

---

## Capability is a Contract

Capabilities define **what** can be executed.

Providers define **how** the capability is executed.

---

## Provider Agnostic

MMOS must never depend on a single AI provider.

Every provider implementation must conform to the same capability contract.

---

## Event Driven

System communication should use immutable events whenever appropriate.

---

## Backward Compatibility

Public contracts should remain backward compatible whenever possible.

Breaking changes require careful review and documentation.

---

# Repository Structure

Contributors should place new code in the appropriate directory.

```text
apps/
packages/
providers/
services/
configs/
deployments/
tools/
tests/
```

Avoid creating new top-level directories unless there is an approved architectural decision.

---

# Development Workflow

1. Create a feature branch.
2. Implement the feature.
3. Add or update tests.
4. Update documentation when necessary.
5. Ensure all validations pass.
6. Submit a Pull Request.

---

# Coding Guidelines

Contributors should:

* write clean and readable code,
* keep functions focused,
* avoid unnecessary complexity,
* minimize coupling,
* maximize cohesion,
* follow existing project conventions.

---

# Documentation

Documentation is part of the implementation.

Whenever architecture, APIs, schemas, or behaviors change, the relevant documentation must also be updated.

Documentation should never lag behind implementation.

---

# Testing

Every contribution should include appropriate tests.

Testing may include:

* Unit Tests
* Integration Tests
* Runtime Tests
* Provider Tests
* End-to-End Tests

Pull requests without sufficient testing may be requested to add additional coverage.

---

# Pull Requests

A pull request should:

* solve one clear problem,
* include meaningful commit history,
* pass all tests,
* update documentation if required,
* maintain backward compatibility whenever possible.

Large architectural changes should be discussed before implementation.

---

# Architecture Changes

Architectural modifications should not be introduced directly into code.

Instead:

1. Propose the change.
2. Discuss the impact.
3. Create or update an ADR.
4. Obtain approval.
5. Implement the change.

This process keeps the architecture stable and understandable.

---

# Reporting Issues

When reporting issues, please include:

* clear description,
* expected behavior,
* actual behavior,
* reproduction steps,
* environment information,
* logs if available.

---

# Community

Please be respectful and constructive.

We welcome contributors from different backgrounds and experience levels.

Healthy discussions and thoughtful feedback help improve MMOS.

---

# License

By contributing to MMOS, you agree that your contributions will be licensed under the Apache License 2.0.
