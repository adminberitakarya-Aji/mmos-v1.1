# Image Generation Composition

**Location**

`examples/compositions/image-generation/README.md`

---

# Overview

This example demonstrates a complete AI-powered image generation workflow built using the MMOS platform.

The composition transforms a creative request into one or more production-ready images by orchestrating prompt engineering, style optimization, image generation, quality review, and artifact publishing.

The workflow demonstrates how MMOS coordinates multiple AI agents and providers while remaining provider-independent.

---

# Objective

Generate high-quality images from natural language descriptions.

The workflow performs:

- prompt analysis
- prompt enhancement
- style optimization
- image generation
- quality review
- artifact publishing

---

# Architecture

```
User Prompt

↓

Composition

↓

Workflow

↓

Prompt Engineer

↓

Creative Agent

↓

Image Generator

↓

Quality Reviewer

↓

Publisher

↓

Generated Images
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Coordinates the workflow |
| Workflow | Image generation pipeline |
| Prompt Engineer | Improves prompts |
| Creative Agent | Enhances artistic quality |
| Image Generator | Produces images |
| Reviewer | Performs quality validation |
| Publisher | Creates final artifacts |
| Runtime | Executes workflow |
| Memory | Stores execution context |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following stages.

```
Receive Prompt

↓

Analyze Prompt

↓

Enhance Prompt

↓

Generate Images

↓

Quality Review

↓

Publish Artifacts

↓

Completed
```

---

# Directory Contents

```
image-generation/

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
  "prompt": "A futuristic smart city at sunset",
  "style": "photorealistic",
  "resolution": "1024x1024"
}
```

---

# Output

The composition produces:

- optimized prompt
- generated images
- generation metadata
- image artifacts
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

- Gemini
- Qwen
- DeepSeek
- Anthropic (prompt generation only)

Provider selection does not affect the workflow definition.

---

# Memory

The composition uses:

- Working Memory
- Semantic Memory

Stored information includes:

- original prompt
- optimized prompt
- generation parameters
- generated image references
- execution metadata

---

# Expected Execution

```
User

↓

Prompt Engineer

↓

Creative Agent

↓

Image Generator

↓

Reviewer

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
| input.json | Example image request |
| expected-output.md | Example generated images |

---

# Learning Objectives

This example demonstrates:

- prompt engineering
- AI image generation
- provider abstraction
- artifact generation
- multi-agent orchestration
- runtime execution
- workflow execution
- end-to-end image production

---

# Summary

The Image Generation example demonstrates how MMOS orchestrates a complete AI-powered image creation pipeline. Starting from a natural language prompt, the platform coordinates prompt engineering, creative optimization, image generation, quality assurance, and artifact publishing while remaining provider-independent and fully aligned with the MMOS architecture.