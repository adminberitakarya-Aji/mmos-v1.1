# Social Media Composition

**Location**

`examples/compositions/social-media/README.md`

---

# Overview

This example demonstrates a complete AI-powered social media content production workflow built on the MMOS platform.

The composition transforms a single content idea into multiple platform-specific social media posts while preserving a consistent brand voice and optimizing content for engagement.

The workflow illustrates how MMOS orchestrates multiple AI agents to generate captions, hashtags, visual prompts, publishing metadata, and scheduling information.

---

# Objective

Generate optimized social media content for multiple platforms from a single topic.

The workflow performs:

- topic analysis
- audience analysis
- caption generation
- hashtag optimization
- image prompt generation
- platform adaptation
- publication preparation

---

# Architecture

```
User Request

↓

Composition

↓

Workflow

↓

Planner Agent

↓

Content Writer

↓

Social Media Specialist

↓

SEO & Hashtag Agent

↓

Creative Agent

↓

Publisher

↓

Multi-platform Content
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Coordinates the workflow |
| Workflow | Executes the publishing pipeline |
| Planner Agent | Plans the content strategy |
| Writer Agent | Generates captions |
| Social Agent | Adapts content for each platform |
| SEO Agent | Generates hashtags |
| Creative Agent | Produces image prompts |
| Publisher | Produces publish-ready assets |
| Runtime | Executes the workflow |
| Memory | Stores campaign context |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following stages.

```
Receive Topic

↓

Analyze Audience

↓

Generate Caption

↓

Optimize For Platform

↓

Generate Hashtags

↓

Generate Image Prompt

↓

Prepare Publishing Assets

↓

Completed
```

---

# Directory Contents

```
social-media/

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
  "topic": "Launching a new AI assistant",
  "platforms": [
    "instagram",
    "facebook",
    "linkedin",
    "x"
  ]
}
```

---

# Output

The composition produces:

- platform-specific captions
- hashtags
- image prompts
- publication metadata
- publishing artifacts
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

No workflow modifications are required when switching providers.

---

# Memory

The composition uses:

- Working Memory
- Semantic Memory

Stored information includes:

- campaign information
- target audience
- generated captions
- hashtags
- visual prompts
- publishing metadata

---

# Expected Execution

```
User

↓

Planner

↓

Writer

↓

Social Agent

↓

SEO Agent

↓

Creative Agent

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
| input.json | Example campaign input |
| expected-output.md | Example generated social media assets |

---

# Learning Objectives

This example demonstrates:

- multi-platform content generation
- AI orchestration
- platform-specific adaptation
- hashtag optimization
- prompt generation
- artifact generation
- execution orchestration
- end-to-end workflow execution

---

# Summary

The Social Media example demonstrates how MMOS orchestrates an end-to-end content marketing workflow that transforms a single campaign idea into publish-ready assets for multiple social media platforms. It showcases provider-independent execution, multi-agent collaboration, reusable workflows, and automated content production aligned with the MMOS architecture.