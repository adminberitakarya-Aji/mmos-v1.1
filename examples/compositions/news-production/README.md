# News Production Composition

**Location**

`examples/compositions/news-production/README.md`

---

# Overview

This example demonstrates a complete AI-powered newsroom workflow implemented using the MMOS platform.

The composition automates the production of a news article from raw information while preserving the editorial workflow commonly used by digital news organizations.

The workflow combines planning, writing, fact validation, editorial review, and publishing preparation into a single orchestrated pipeline.

---

# Objective

Generate a publish-ready news article from incoming information.

The resulting workflow performs:

- source analysis
- headline generation
- article drafting
- editorial review
- fact validation
- SEO optimization
- publication formatting

---

# Architecture

```
Reporter Input

↓

Composition

↓

Workflow

↓

Planner Agent

↓

News Writer

↓

Fact Checker

↓

Editor

↓

SEO Optimizer

↓

Publisher

↓

Published Article
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Coordinates newsroom workflow |
| Workflow | Editorial execution pipeline |
| Planner Agent | Plans article structure |
| Writer Agent | Writes article |
| Fact Checker | Validates information |
| Editor | Improves readability |
| SEO Agent | Optimizes article |
| Publisher | Produces final output |
| Runtime | Executes workflow |
| Memory | Stores editorial context |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following stages.

```
Receive News

↓

Analyze Sources

↓

Generate Headline

↓

Write Draft

↓

Fact Check

↓

Editorial Review

↓

SEO Optimization

↓

Format Article

↓

Ready For Publication
```

---

# Directory Contents

```
news-production/

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
  "headline": "Government launches new digital transformation initiative",
  "facts": [
    "...",
    "...",
    "..."
  ],
  "language": "en"
}
```

---

# Output

The composition produces:

- news article
- headline
- summary
- SEO metadata
- publication artifact
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

The workflow remains provider-independent.

---

# Memory

The composition uses:

- Working Memory
- Semantic Memory

Stored information includes:

- incoming facts
- generated headline
- draft article
- editorial notes
- SEO metadata
- publication status

---

# Expected Execution

```
Reporter

↓

Planner

↓

Writer

↓

Fact Checker

↓

Editor

↓

SEO

↓

Publisher

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
| input.json | Example newsroom input |
| expected-output.md | Example published article |

---

# Learning Objectives

This example demonstrates:

- newsroom orchestration
- multi-agent collaboration
- editorial workflow
- fact validation
- SEO automation
- publication pipeline
- artifact generation
- end-to-end execution

---

# Summary

The News Production example demonstrates how MMOS orchestrates a complete newsroom workflow, transforming raw information into a publication-ready news article through coordinated execution of specialized AI agents while remaining provider-independent and aligned with the MMOS architecture.