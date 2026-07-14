# Blog Generation Composition

**Location**

`examples/compositions/blog-generation/README.md`

---

# Overview

This example demonstrates a complete AI-powered blog generation pipeline built using the MMOS platform.

The composition orchestrates multiple agents, capabilities, providers, memory, and runtime components to transform a content request into a publish-ready article.

The example is intentionally simple while showcasing the core orchestration concepts of MMOS.

---

# Objective

Generate a complete blog article from a topic provided by the user.

The resulting workflow performs:

- topic analysis
- outline generation
- article writing
- quality review
- final formatting

---

# Architecture

```
User

↓

Composition

↓

Workflow

↓

Planner Agent

↓

Writer Agent

↓

Reviewer Agent

↓

Formatter Agent

↓

Markdown Article
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Overall orchestration |
| Workflow | Execution pipeline |
| Planner Agent | Creates article outline |
| Writer Agent | Writes content |
| Reviewer Agent | Reviews quality |
| Formatter Agent | Produces final Markdown |
| Runtime | Executes workflow |
| Memory | Stores execution context |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following steps.

```
Receive Topic

↓

Generate Outline

↓

Write Sections

↓

Review

↓

Revise

↓

Format Markdown

↓

Return Result
```

---

# Directory Contents

```
blog-generation/

README.md

composition.json

workflow.json

runtime.json

provider.json

memory.json

input.json

expected-output.md
```

---

# Input

Example input:

```json
{
  "topic": "Introduction to Artificial Intelligence",
  "language": "en",
  "tone": "professional",
  "length": "1200"
}
```

---

# Output

The composition produces:

- Markdown article
- execution metadata
- generated artifacts
- execution events

---

# Runtime

Recommended runtime:

- Scheduler
- Dispatcher
- Executor
- Event Bus
- Memory Manager

---

# Provider

Default provider:

- OpenAI

Alternative providers:

- Anthropic
- Gemini
- Qwen
- DeepSeek

No workflow changes are required when switching providers.

---

# Memory

This composition uses:

- Working Memory
- Semantic Memory

Memory stores:

- topic
- outline
- generated sections
- review comments
- execution state

---

# Expected Execution

```
User Request

↓

Planner

↓

Writer

↓

Reviewer

↓

Formatter

↓

Completed
```

---

# Files

| File | Purpose |
|------|---------|
| composition.json | Composition definition |
| workflow.json | Workflow definition |
| runtime.json | Runtime configuration |
| provider.json | Provider configuration |
| memory.json | Memory configuration |
| input.json | Example input |
| expected-output.md | Example generated article |

---

# Learning Objectives

This example demonstrates:

- Composition definition
- Workflow orchestration
- Multi-agent execution
- Memory usage
- Provider abstraction
- Runtime configuration
- Artifact generation
- End-to-end execution

---

# Summary

The Blog Generation example provides a complete reference implementation of an MMOS composition. It demonstrates how multiple platform components collaborate to transform a simple topic request into a structured, publish-ready blog article while remaining provider-independent and fully aligned with the MMOS architecture.