# @mmos/core-task

Task adalah **unit kerja terkecil** dalam MMOS (Multimedia Management Orchestration System).

Sebuah Workflow terdiri dari satu atau lebih Task. Setiap Task merepresentasikan satu langkah yang dapat dijalankan oleh Runtime melalui Agent atau Capability.

Task hanya mendeskripsikan **apa yang harus dilakukan**, bukan bagaimana menjalankannya. Proses eksekusi dilakukan oleh package `execution` melalui Runtime dan Orchestrator.

Package ini menyediakan:

- Task domain model
- Task builder
- Task validation
- Task contracts
- Error definitions
- Default task engine

Package ini **tidak melakukan eksekusi task**.

---

# Architecture

```
Composition
      │
      ▼
Workflow
      │
      ▼
Task
      │
      ▼
Execution
      │
      ▼
Runtime
      │
      ▼
Agent
      │
      ▼
Capability
      │
      ▼
Provider
```

Task merupakan bagian dari Workflow sesuai ADR:

- Composition Owns Workflow
- Workflow Owns Task
- Task Creates Execution Unit
- Execution Owns Runtime

---

# Features

- Task domain model
- Dependency definition
- Input / Output definition
- Retry policy
- Timeout policy
- Condition support
- Human task support
- AI task support
- Validation menggunakan JSON Schema
- Builder abstraction
- Engine abstraction

---

# Installation

```bash
pnpm add @mmos/core-task
```

---

# Package Structure

```
task/

README.md
package.json
tsconfig.json
index.ts

schemas/
    task.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    builder.ts
    engine.ts
    validator.ts
    errors.ts

test/
```

---

# Task Lifecycle

```
Defined
    │
    ▼
Validated
    │
    ▼
Compiled
    │
    ▼
Ready
    │
    ▼
Execution
```

Task tidak memiliki runtime state. Status eksekusi dikelola oleh `Execution`.

---

# Usage

## Create Builder

```ts
const builder =
    new DefaultTaskBuilder();
```

---

## Create Validator

```ts
const validator =
    new DefaultTaskValidator();
```

---

## Create Engine

```ts
const engine =
    new DefaultTaskEngine(
        builder,
        validator
    );
```

---

## Create Task

```ts
const task = {

    apiVersion: "mmos/v1",

    kind: "Task",

    metadata: {

        name: "generate-article",

        version: "1.0.0"

    },

    spec: {

        type: "agent",

        agent: "writer",

        inputs: {

            topic: "{{workflow.topic}}"

        }

    }

};
```

---

# Supported Task Types

MMOS mendukung berbagai jenis Task.

- Agent Task
- Capability Task
- Prompt Task
- Tool Task
- Human Task
- Event Task
- Condition Task
- Loop Task
- Parallel Task
- Sub Workflow Task

Semua menggunakan model domain yang sama.

---

# Validation

Task divalidasi menggunakan JSON Schema.

```ts
await validator.validate(task);
```

Jika validasi gagal akan menghasilkan:

```ts
TaskValidationError
```

---

# Builder

Builder bertugas menyusun Task menjadi representasi internal yang siap dikompilasi oleh Workflow Engine.

Builder tidak melakukan eksekusi.

---

# Engine

Task Engine bertugas:

- validasi task
- normalisasi konfigurasi
- resolve input
- resolve dependency
- menghasilkan executable task definition

Task Engine bukan Runtime Engine.

---

# Errors

Package menyediakan error bawaan.

- TaskError
- TaskValidationError
- DuplicateTaskError
- InvalidTaskTypeError
- InvalidDependencyError
- TaskCompileError

Seluruh error merupakan turunan dari `TaskError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Task merupakan unit kerja terkecil.
- Workflow terdiri dari Task.
- Task bersifat immutable.
- Task tidak memiliki runtime state.
- Runtime tidak mengubah definisi Task.
- Validasi menggunakan JSON Schema.
- Engine hanya melakukan kompilasi.

---

# Dependencies

- TypeScript
- AJV

Package tidak bergantung pada database maupun framework tertentu.

---

# Testing

Menjalankan unit test:

```bash
pnpm test
```

Coverage:

```bash
pnpm test:coverage
```

---

# Related Packages

- @mmos/core-composition
- @mmos/core-workflow
- @mmos/core-execution
- @mmos/core-agent
- @mmos/core-capability
- @mmos/core-memory
- @mmos/core-event

---

# License

Apache-2.0