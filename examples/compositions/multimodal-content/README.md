# Multimodal Content Composition

**Location**

`examples/compositions/multimodal-content/README.md`

---

# Overview

This example demonstrates a complete AI-powered multimodal content production workflow using the MMOS platform.

Unlike the previous examples that focus on a single media type (blog, news, social media, image, video, or podcast), this composition orchestrates multiple AI capabilities to generate a complete multimedia content package from a single request.

The workflow coordinates planning, writing, image generation, audio generation, video production, metadata creation, and publishing through a unified orchestration pipeline.

---

# Objective

Generate a complete multimedia content package consisting of:

- Article
- Social media posts
- Images
- Short video
- Podcast narration
- Thumbnail
- Metadata
- Publishing artifacts

---

# Architecture

```
User Request

↓

Composition

↓

Workflow

↓

Planner

↓

Content Writer

↓

Image Generator

↓

Video Generator

↓

Voice Generator

↓

Metadata Generator

↓

Reviewer

↓

Publisher

↓

Multimedia Package
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Coordinates the workflow |
| Workflow | Multimedia production pipeline |
| Planner | Plans content strategy |
| Writer | Generates written content |
| Image Generator | Produces images |
| Video Generator | Produces short videos |
| Voice Generator | Produces narration |
| Metadata Generator | Generates SEO metadata |
| Reviewer | Validates quality |
| Publisher | Publishes artifacts |
| Runtime | Executes workflow |
| Memory | Stores execution state |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following stages.

```
Receive Request

↓

Analyze Topic

↓

Generate Article

↓

Generate Images

↓

Generate Social Posts

↓

Generate Video

↓

Generate Podcast Audio

↓

Generate Metadata

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
multimodal-content/

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
  "topic": "Artificial Intelligence",
  "language": "en",
  "outputs": [
    "article",
    "image",
    "video",
    "podcast",
    "social"
  ]
}
```

---

# Output

The composition produces:

- article
- social media posts
- generated images
- short-form video
- podcast narration
- thumbnail
- metadata
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
- Anthropic
- Qwen
- DeepSeek

Each capability may use different providers while remaining fully orchestrated by MMOS.

---

# Memory

The composition uses:

- Working Memory
- Semantic Memory

Stored information includes:

- topic
- article
- images
- social posts
- video
- narration
- metadata
- publishing state

---

# Expected Execution

```
User

↓

Planner

↓

Writer

↓

Image Generator

↓

Video Generator

↓

Voice Generator

↓

Metadata Generator

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
| input.json | Example multimedia request |
| expected-output.md | Example generated multimedia package |

---

# Learning Objectives

This example demonstrates:

- multimodal orchestration
- multi-agent collaboration
- text generation
- image generation
- video generation
- audio generation
- metadata generation
- artifact management
- provider abstraction
- end-to-end AI orchestration

---

# Summary

The Multimodal Content example represents one of the most comprehensive MMOS compositions. Starting from a single topic, the platform orchestrates multiple AI capabilities to produce a complete multimedia content package—including written content, images, videos, podcasts, metadata, and publishing artifacts—while maintaining a provider-independent architecture and a unified execution model.