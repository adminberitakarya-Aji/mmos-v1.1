# Video Production Composition

**Location**

`examples/compositions/video-production/README.md`

---

# Overview

This example demonstrates a complete AI-powered video production workflow built using the MMOS platform.

The composition transforms structured content into a complete short-form video by orchestrating script generation, storyboard creation, narration, visual generation, scene composition, rendering, quality review, and artifact publishing.

The workflow illustrates how MMOS coordinates multiple AI agents, media generators, and runtime services into a unified production pipeline.

---

# Objective

Generate a publish-ready short video from a content idea.

The workflow performs:

- topic analysis
- script generation
- storyboard creation
- scene generation
- narration generation
- subtitle generation
- video rendering
- quality review
- artifact publishing

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

Script Writer

↓

Storyboard Agent

↓

Image Generator

↓

Voice Generator

↓

Video Composer

↓

Reviewer

↓

Publisher

↓

Generated Video
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Coordinates the workflow |
| Workflow | Video production pipeline |
| Planner | Plans the video |
| Script Writer | Generates narration |
| Storyboard Agent | Creates scenes |
| Image Generator | Produces scene visuals |
| Voice Generator | Produces narration |
| Video Composer | Renders the final video |
| Reviewer | Validates quality |
| Publisher | Publishes artifacts |
| Runtime | Executes the workflow |
| Memory | Stores execution context |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following stages.

```
Receive Topic

↓

Analyze Topic

↓

Generate Script

↓

Generate Storyboard

↓

Generate Scene Images

↓

Generate Narration

↓

Generate Subtitles

↓

Compose Video

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
video-production/

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
  "topic": "What is Artificial Intelligence?",
  "duration": 60,
  "format": "9:16"
}
```

---

# Output

The composition produces:

- video
- narration
- storyboard
- subtitles
- thumbnails
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

Video rendering engines can also be integrated through MMOS providers.

---

# Memory

The composition uses:

- Working Memory
- Semantic Memory

Stored information includes:

- topic
- script
- storyboard
- generated scenes
- narration
- subtitles
- rendering metadata
- publishing status

---

# Expected Execution

```
User

↓

Planner

↓

Writer

↓

Storyboard

↓

Image Generator

↓

Voice Generator

↓

Video Composer

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
| input.json | Example production request |
| expected-output.md | Example generated video artifacts |

---

# Learning Objectives

This example demonstrates:

- multimodal orchestration
- script generation
- storyboard generation
- AI image generation
- AI voice generation
- video composition
- artifact generation
- provider abstraction
- end-to-end multimedia production

---

# Summary

The Video Production example demonstrates how MMOS orchestrates a complete multimedia production pipeline. Starting from a simple topic, the platform coordinates multiple AI capabilities to generate scripts, visuals, narration, subtitles, and a final rendered video while remaining provider-independent and fully aligned with the MMOS architecture.