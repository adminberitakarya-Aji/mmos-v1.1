# Executor

## Overview

Executor adalah komponen terakhir pada Runtime Engine yang bertanggung jawab menjalankan task yang telah dipilih oleh Dispatcher.

Executor menerima task yang telah di-dispatch, membangun execution context, memanggil Agent, Capability, dan Provider yang sesuai, kemudian memperbarui Execution State, menghasilkan Artifact, memperbarui Memory, serta mempublikasikan Event.

Executor adalah **satu-satunya komponen Runtime yang benar-benar menjalankan pekerjaan**.

```
Dispatcher
      │
      ▼
  Executor
      │
      ├────────► Agent
      ├────────► Capability
      ├────────► Provider
      │
      ▼
Execution Result
      │
      ├────────► Artifact
      ├────────► Memory
      └────────► Event
```

---

# Responsibilities

Executor bertanggung jawab untuk:

- Task Execution
- Execution Context Construction
- Pipeline Execution
- Agent Invocation
- Capability Invocation
- Provider Invocation
- Input Validation
- Output Validation
- Artifact Production
- Memory Update
- Event Publication
- Execution Status Update
- Error Handling
- Execution Metrics

Executor menghasilkan hasil akhir dari sebuah task.

---

# Scope

Executor bekerja menggunakan:

- Dispatched Tasks
- Execution Context
- Runtime Configuration
- Agent Registry
- Capability Registry
- Provider Registry

Executor menghasilkan:

- Execution Result
- Artifact
- Memory Update
- Event
- Execution Status

Executor tidak:

- Membuat Execution Plan
- Menjadwalkan Task
- Mengelola Queue
- Memilih Worker

---

# Runtime Flow

```
Dispatched Task
        │
        ▼
Build Context
        │
        ▼
Validate Input
        │
        ▼
Invoke Agent
        │
        ▼
Invoke Capability
        │
        ▼
Invoke Provider
        │
        ▼
Validate Output
        │
        ▼
Update Execution
        │
        ▼
Produce Artifact
        │
        ▼
Update Memory
        │
        ▼
Publish Event
```

---

# Execution Stages

Executor terdiri dari beberapa tahap utama.

## 1. Context Construction

Executor membangun seluruh Execution Context.

Context dapat berisi:

- Execution
- Workflow
- Task
- Agent
- Capability
- Memory
- Artifact
- Variables
- Runtime Configuration

---

## 2. Input Validation

Executor memvalidasi input sebelum task dijalankan.

Contoh:

- Required Input
- Input Schema
- Variable Resolution
- Memory Reference
- Artifact Reference

Apabila validasi gagal maka task tidak dijalankan.

---

## 3. Agent Invocation

Executor memanggil Agent yang telah dipilih oleh Planner.

Contoh:

```
Writer Agent

↓

Generate Blog
```

---

## 4. Capability Invocation

Executor menjalankan Capability yang diperlukan.

Contoh:

```
image.generate

↓

Image Capability
```

---

## 5. Provider Invocation

Capability dapat menggunakan Provider tertentu.

Contoh:

```
OpenAI

Anthropic

Gemini

Qwen

DeepSeek
```

Executor bersifat provider agnostic.

---

## 6. Output Validation

Executor memvalidasi hasil eksekusi.

Contoh:

- Output Schema
- Required Artifact
- Expected Result
- Validation Rules

---

## 7. Execution Update

Executor memperbarui status Execution.

Contoh status:

- Running
- Completed
- Failed
- Cancelled
- Timeout

---

## 8. Artifact Production

Executor menghasilkan Artifact.

Contoh:

- Text
- Image
- Audio
- Video
- File
- Dataset
- JSON

Artifact disimpan melalui Artifact Service.

---

## 9. Memory Update

Executor memperbarui Memory apabila diperlukan.

Contoh:

- Episodic Memory
- Semantic Memory
- Cache Memory
- Vector Memory

Memory dikelola oleh Memory Service.

---

## 10. Event Publication

Executor mempublikasikan Event.

Contoh:

- Task Started
- Task Completed
- Task Failed
- Artifact Created
- Memory Updated
- Workflow Completed

Event diteruskan ke Event Bus.

---

# Execution Context

Execution Context berisi seluruh informasi yang dibutuhkan selama eksekusi.

Contoh:

- Execution
- Workflow
- Task
- Agent
- Capability
- Provider
- Variables
- Input
- Output
- Metadata

Context bersifat immutable selama proses eksekusi.

---

# Pipeline

Executor menjalankan task menggunakan pipeline.

```
Context

↓

Validation

↓

Agent

↓

Capability

↓

Provider

↓

Output

↓

Artifact

↓

Memory

↓

Event
```

Pipeline memastikan seluruh tahapan dijalankan secara konsisten.

---

# Error Handling

Executor menangani berbagai jenis kesalahan.

Contoh:

- Validation Error
- Provider Error
- Capability Error
- Agent Error
- Timeout
- Execution Error

Status Execution diperbarui sesuai hasil eksekusi.

---

# Metrics

Executor menyediakan metrik operasional.

Contoh:

- Execution Count
- Success Rate
- Failure Rate
- Average Duration
- Provider Latency
- Capability Usage
- Artifact Count

---

# Interaction

Executor berinteraksi dengan:

Runtime

- Dispatcher

Core

- Execution
- Agent
- Capability
- Artifact
- Memory
- Event

Infrastructure

- Providers
- Memory Service
- Artifact Service
- Event Bus

Executor tidak berinteraksi dengan:

- Planner
- Scheduler
- Queue

---

# Package Structure

```
executor/

README.md
package.json
tsconfig.json
index.ts

test/

src/
│
├── index.ts
├── types.ts
├── contracts.ts
├── constants.ts
├── executor.ts
├── pipeline.ts
├── context.ts
└── errors.ts
```

---

# Design Principles

Executor mengikuti prinsip berikut:

- Single Execution Engine
- Context Driven
- Pipeline Based
- Provider Agnostic
- Stateless Execution
- Idempotent
- Observable
- Extensible
- Fault Tolerant

Executor merupakan komponen terakhir pada Runtime Engine dan satu-satunya komponen yang benar-benar menjalankan task. Seluruh hasil eksekusi berupa perubahan Execution, Artifact, Memory, dan Event dihasilkan melalui Executor.