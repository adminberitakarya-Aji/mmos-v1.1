# Examples

**Location**

`examples/README.md`

---

# Overview

The `examples` directory contains reference implementations that demonstrate how to build, configure, deploy, and execute applications using the MMOS platform.

Unlike the architectural documentation in `docs/` and the machine-readable specifications in `schemas/`, the examples are intended to provide practical, executable references for developers.

Each example illustrates recommended usage patterns and best practices for real-world scenarios.

---

# Goals

The examples are designed to:

- demonstrate platform capabilities
- provide implementation references
- accelerate onboarding
- illustrate recommended architecture
- validate platform specifications
- serve as integration examples
- support learning and experimentation

---

# Relationship with the Repository

The repository is organized into three complementary layers.

```
docs/

Architecture

↓

Design

↓

Concepts
```

```
schemas/

Contracts

↓

Validation

↓

Object Definitions
```

```
examples/

Implementation

↓

Configuration

↓

Execution
```

Together these layers provide complete documentation of the MMOS platform.

---

# Directory Structure

```
examples/
│
├── README.md
│
├── compositions/
│   ├── blog-generation/
│   ├── news-production/
│   ├── social-media/
│   ├── image-generation/
│   ├── video-production/
│   ├── podcast-production/
│   └── multimodal-content/
│
├── workflows/
│   ├── sequential-workflow.json
│   ├── parallel-workflow.json
│   ├── conditional-workflow.json
│   ├── human-in-the-loop.json
│   ├── event-driven-workflow.json
│   └── retry-workflow.json
│
├── providers/
│   ├── openai.json
│   ├── anthropic.json
│   ├── gemini.json
│   ├── qwen.json
│   └── deepseek.json
│
├── memory/
│   ├── semantic-memory.json
│   ├── episodic-memory.json
│   ├── vector-memory.json
│   └── cache-memory.json
│
├── runtime/
│   ├── single-node.json
│   ├── distributed.json
│   ├── high-availability.json
│   └── production.json
│
├── api/
│   ├── create-composition.http
│   ├── execute-workflow.http
│   ├── upload-artifact.http
│   ├── websocket-stream.http
│   └── authentication.http
│
├── sdk/
│   ├── go/
│   ├── typescript/
│   └── python/
│
└── deployment/
    ├── docker-compose.yml
    ├── kubernetes.yaml
    └── production.env.example
```

---

# Composition Examples

The `compositions` directory contains complete application examples.

Each composition demonstrates how multiple workflows, agents, capabilities, providers, memory, and runtime configuration work together.

Typical examples include:

- Blog Generation
- News Production
- Social Media Automation
- Image Generation
- Video Production
- Podcast Production
- Multimodal Content Pipeline

These examples represent end-to-end business scenarios.

---

# Workflow Examples

Workflow examples demonstrate common orchestration patterns.

Examples include:

- Sequential execution
- Parallel execution
- Conditional branching
- Human approval
- Event-driven execution
- Retry handling

These examples focus on execution logic rather than complete applications.

---

# Provider Examples

Provider examples demonstrate provider configuration.

Examples include:

- OpenAI
- Anthropic
- Gemini
- Qwen
- DeepSeek

These configurations illustrate provider-independent integration using the MMOS Provider Interface.

---

# Memory Examples

Memory examples illustrate different memory models.

Examples include:

- Semantic Memory
- Episodic Memory
- Vector Memory
- Cache Memory

These examples demonstrate how memory is represented and configured.

---

# Runtime Examples

Runtime examples demonstrate deployment configurations.

Examples include:

- Single-node Runtime
- Distributed Runtime
- High Availability
- Production Configuration

These examples illustrate operational deployment patterns.

---

# API Examples

The `api` directory contains sample HTTP requests.

Examples include:

- Create Composition
- Execute Workflow
- Upload Artifact
- WebSocket Streaming
- Authentication

The examples are intended to work with REST clients and API testing tools.

---

# SDK Examples

SDK examples demonstrate how to use the official MMOS SDKs.

Supported languages include:

- Go
- TypeScript
- Python

Examples cover common developer workflows such as:

- client initialization
- authentication
- workflow execution
- streaming
- artifact management

---

# Deployment Examples

Deployment examples demonstrate recommended deployment configurations.

Examples include:

- Docker Compose
- Kubernetes
- Production Environment

These examples provide a starting point for local development and production deployments.

---

# Example Philosophy

Every example should satisfy the following principles:

- complete
- executable
- minimal
- production-inspired
- provider-independent
- well documented

Examples should avoid unnecessary complexity while remaining representative of real-world usage.

---

# Naming Conventions

Examples should use descriptive names.

Examples:

```
blog-generation

news-production

parallel-workflow

single-node

production
```

Names should clearly communicate the example's purpose.

---

# Best Practices

Example implementations should:

- follow MMOS architecture
- use official schemas
- avoid provider-specific assumptions
- use reusable configurations
- include documentation
- remain easy to understand
- demonstrate recommended patterns

---

# Future Examples

Future examples may include:

- multi-agent collaboration
- enterprise workflows
- Retrieval-Augmented Generation (RAG)
- document processing
- AI-powered customer support
- multimedia publishing
- scheduled automation
- event-driven orchestration
- multi-tenant deployment
- hybrid provider execution

These examples will expand as the platform evolves.

---

# Summary

The `examples` directory provides practical reference implementations for the MMOS platform. By complementing the architectural documentation and machine-readable schemas, these examples demonstrate how to design, configure, deploy, and execute AI orchestration solutions using recommended patterns and best practices, enabling developers to move quickly from specification to working applications.