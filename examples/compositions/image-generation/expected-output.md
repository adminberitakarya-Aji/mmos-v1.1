# Expected Output

**Location**

`examples/compositions/image-generation/expected-output.md`

---

# Overview

This document illustrates the expected output produced by the Image Generation composition.

Although the visual appearance of generated images may vary depending on the selected provider and model, the execution flow, generated artifacts, metadata, and orchestration behavior should remain consistent.

---

# Optimized Prompt

```text
A futuristic AI orchestration platform control center with multiple intelligent AI agents collaborating through interconnected workflow nodes, holographic dashboards, cloud-native infrastructure, glowing neural data streams, modern software engineering environment, cinematic lighting, ultra realistic, highly detailed, clean blue and white color palette, 16:9 composition, professional technology illustration.
```

---

# Generated Images

```
artifacts/

image-001.png

image-002.png
```

---

# Image Metadata

```json
{
  "provider": "openai",
  "model": "gpt-image-1",
  "style": "photorealistic",
  "resolution": "1792x1024",
  "aspectRatio": "16:9",
  "numberOfImages": 2,
  "format": "png"
}
```

---

# Prompt Artifact

```text
optimized-prompt.txt
```

Contains the optimized prompt used by the image generation model.

---

# Workflow Result

```json
{
  "status": "completed",
  "executionId": "exec-image-000001",
  "workflow": "workflow.image-generation",
  "provider": "openai",
  "model": "gpt-image-1",
  "duration": 9652,
  "artifacts": [
    "image-001.png",
    "image-002.png",
    "metadata.json",
    "optimized-prompt.txt"
  ]
}
```

---

# Generated Events

```
composition.started

↓

workflow.started

↓

task.analyze-prompt.completed

↓

task.optimize-prompt.completed

↓

task.generate-image.completed

↓

task.review-image.completed

↓

task.publish-artifacts.completed

↓

artifact.created

↓

workflow.completed

↓

composition.completed
```

---

# Generated Memory

```json
{
  "originalPrompt": "A futuristic AI orchestration platform dashboard...",
  "optimizedPrompt": "A futuristic AI orchestration platform control center...",
  "generatedImages": [
    "image-001.png",
    "image-002.png"
  ],
  "qualityReview": {
    "approved": true,
    "score": 98,
    "comments": [
      "Prompt optimized successfully",
      "Image quality verified",
      "Artifacts published"
    ]
  },
  "execution": {
    "status": "completed",
    "provider": "openai",
    "model": "gpt-image-1"
  }
}
```

---

# Generated Artifacts

```
artifacts/

image-001.png

image-002.png

metadata.json

optimized-prompt.txt
```

---

# Generated Metadata

```json
{
  "provider": "openai",
  "model": "gpt-image-1",
  "language": "en",
  "executionTime": 9652,
  "artifactType": "image-generation",
  "imageCount": 2,
  "resolution": "1792x1024",
  "format": "png"
}
```

---

# Expected Result

A successful execution should produce:

- Optimized generation prompt
- One or more generated images
- Image generation metadata
- Prompt artifact
- Workflow execution metadata
- Execution events
- Updated working memory
- Published image artifacts
- Final execution status of `completed`

The visual output may differ between providers due to differences in image generation models. However, the workflow orchestration, execution lifecycle, generated metadata, produced artifacts, and overall behavior should remain consistent with the MMOS architecture.