# MMOS v1.1 Overview

**Document ID:** 000-overview
**Version:** 1.1
**Status:** Draft
**Audience:** Developers, Contributors, Architects

---

# Purpose

This document provides an overview of the MMOS v1.1 repository.

MMOS v1.1 is the official reference implementation of the MMOS architecture defined in MMOS v1.0.

While MMOS v1.0 defines the architecture, contracts, and specifications, MMOS v1.1 focuses on implementing those specifications as a production-ready AI orchestration platform.

This repository serves as the foundation for building, testing, and evolving the MMOS platform.

---

# Relationship with MMOS v1.0

MMOS consists of two complementary phases.

## MMOS v1.0

Defines **what** the platform is.

It includes:

* Architecture
* Domain Model
* Object Model
* Runtime Model
* Specifications
* Contracts
* ADR (Architecture Decision Records)
* JSON Schemas

MMOS v1.0 is the architectural foundation of the platform.

---

## MMOS v1.1

Defines **how** the platform is implemented.

It includes:

* Runtime implementation
* Orchestrator
* Provider integrations
* SDK
* CLI
* Services
* Applications
* Deployment
* Testing

MMOS v1.1 follows the specifications established in MMOS v1.0.

---

# Repository Goal

The primary goal of MMOS v1.1 is to provide a complete reference implementation of the MMOS platform.

The implementation is designed to be:

* Modular
* Provider Agnostic
* Event Driven
* Scalable
* Extensible
* Production Ready

---

# Repository Structure

The repository is organized into several major areas.

```text
mmos-v1.1/

├── docs/
├── schemas/
├── examples/
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

Each directory has a specific responsibility and follows the architectural principles defined by MMOS.

---

# Development Principles

Implementation within this repository follows several guiding principles.

* Specification First
* Contract First
* Composition Driven
* Provider Agnostic
* Event Driven
* API First
* Backward Compatibility

These principles ensure that implementation remains aligned with the MMOS architecture.

---

# Repository Scope

MMOS v1.1 includes:

* Core platform implementation
* Runtime engine
* Orchestrator
* AI provider integrations
* SDKs
* Command-line tools
* Reference applications
* Deployment resources
* Testing infrastructure

Items outside the scope of this repository include independent third-party providers, external integrations maintained by other organizations, and application-specific business logic.

---

# Documentation Organization

Documentation in this repository focuses on implementation.

It explains how the platform is built, how components interact, and how contributors can extend the system.

Architectural specifications remain part of MMOS v1.0 and are not duplicated here.

---

# Intended Audience

This repository is intended for:

* Platform Engineers
* Backend Engineers
* AI Engineers
* SDK Developers
* Infrastructure Engineers
* Open Source Contributors

---

# Project Status

MMOS v1.1 is under active development.

The implementation evolves continuously while remaining aligned with the architectural contracts established by MMOS v1.0.

---

# Next Documents

The following documents continue the implementation overview:

* 010-vision.md
* 020-roadmap.md
* 030-repository.md
