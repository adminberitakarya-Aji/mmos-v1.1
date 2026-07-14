# Podcast Production Composition

**Location**

`examples/compositions/podcast-production/README.md`

---

# Overview

This example demonstrates a complete AI-powered podcast production workflow built using the MMOS platform.

The composition transforms a topic or knowledge source into a fully produced podcast episode by orchestrating research, script writing, dialogue generation, narration synthesis, audio enhancement, metadata generation, and publishing.

The workflow illustrates how MMOS coordinates multiple AI agents, language models, speech synthesis engines, and runtime services into a unified podcast production pipeline.

---

# Objective

Generate a production-ready podcast episode from a single topic.

The workflow performs:

- topic analysis
- research
- outline generation
- script generation
- dialogue generation
- narration synthesis
- audio enhancement
- metadata generation
- publishing

---

# Architecture

```
User Request

↓

Composition

↓

Workflow

↓

Research Agent

↓

Planner

↓

Script Writer

↓

Narration Generator

↓

Audio Processor

↓

Reviewer

↓

Publisher

↓

Podcast Episode
```

---

# Components

This composition contains:

| Component | Purpose |
|------------|----------|
| Composition | Coordinates the workflow |
| Workflow | Podcast production pipeline |
| Research Agent | Collects knowledge |
| Planner | Creates episode outline |
| Script Writer | Produces podcast script |
| Narration Generator | Generates speech |
| Audio Processor | Enhances audio |
| Reviewer | Reviews quality |
| Publisher | Publishes artifacts |
| Runtime | Executes workflow |
| Memory | Stores execution context |
| Provider | Executes AI models |

---

# Workflow

The workflow executes the following stages.

```
Receive Topic

↓

Research Topic

↓

Generate Outline

↓

Generate Script

↓

Generate Narration

↓

Enhance Audio

↓

Generate Metadata

↓

Publish Artifacts

↓

Completed
```

---

# Directory Contents

```
podcast-production/

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
  "topic": "The Future of Artificial Intelligence",
  "duration": 900,
  "language": "en"
}
```

---

# Output

The composition produces:

- podcast audio
- podcast script
- episode outline
- episode metadata
- cover prompt
- transcript
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
- DeepSeek
- Qwen

Speech providers may also be substituted without changing the workflow.

---

# Memory

The composition uses:

- Working Memory
- Semantic Memory

Stored information includes:

- topic
- research
- outline
- script
- transcript
- narration
- metadata
- publishing state

---

# Expected Execution

```
User

↓

Research Agent

↓

Planner

↓

Writer

↓

Narration Generator

↓

Audio Processor

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
| input.json | Example podcast request |
| expected-output.md | Example generated podcast artifacts |

---

# Learning Objectives

This example demonstrates:

- AI research
- script generation
- speech synthesis
- podcast production
- metadata generation
- artifact generation
- provider abstraction
- end-to-end multimedia orchestration

---

# Summary

The Podcast Production example demonstrates how MMOS orchestrates an end-to-end podcast production workflow. Starting from a single topic, the platform coordinates research, script writing, narration generation, audio processing, metadata generation, and publishing while remaining provider-independent and fully aligned with the MMOS architecture.