# @mmos/core-execution

Execution merupakan **runtime instance** dari sebuah Workflow.

Jika Workflow adalah blueprint proses, maka Execution adalah objek yang merepresentasikan satu kali proses berjalan. Seluruh state runtime, progress, hasil eksekusi, retry, timeout, log, dan lifecycle disimpan di dalam Execution.

Execution dibuat oleh Orchestrator ketika sebuah Workflow dijalankan dan dikelola oleh Runtime hingga selesai.

Package ini menyediakan:

- Execution domain model
- Execution lifecycle
- Execution state model
- TaskRun model
- Validation
- Service contracts
- Error definitions

Package ini **tidak menjalankan workflow secara langsung**. Eksekusi dilakukan oleh Runtime Engine.

---

# Architecture

```
Composition
      │
      ▼
Workflow
      │
      ▼
Execution
      │
      ▼
TaskRun
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

Execution merupakan bagian dari runtime MMOS sesuai ADR:

- Composition Owns Workflow
- Workflow Creates Execution
- Execution Owns TaskRun
- Runtime Executes TaskRun

---

# Features

- Execution domain model
- TaskRun model
- Runtime state management
- Retry state
- Timeout state
- Cancellation support
- Pause / Resume support
- Execution metadata
- Validation menggunakan JSON Schema
- Repository abstraction
- Service abstraction

---

# Installation

```bash
pnpm add @mmos/core-execution
```

---

# Package Structure

```
execution/

README.md
package.json
tsconfig.json
index.ts

schemas/
    execution.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    service.ts
    repository.ts
    validator.ts
    errors.ts

test/
```

---

# Execution Lifecycle

```
Created
    │
    ▼
Queued
    │
    ▼
Running
    │
 ┌──┴───────────────┐
 ▼                  ▼
Paused           Completed
 │                  ▲
 ▼                  │
Running          Cancelled
 │
 ▼
Failed
```

Execution menyimpan seluruh perubahan state selama runtime berlangsung.

---

# TaskRun Lifecycle

Setiap Task di dalam Workflow akan menghasilkan sebuah **TaskRun**.

```
Pending
    │
    ▼
Running
    │
 ┌──┴─────────────┐
 ▼                ▼
Succeeded      Failed
 │                │
 └──────┬─────────┘
        ▼
     Retrying
```

Task tetap immutable, sedangkan TaskRun menyimpan state runtime.

---

# Usage

## Create Repository

```ts
class MemoryExecutionRepository
implements ExecutionRepository {

    async save(execution) {}

    async update(execution) {}

    async delete(id) {}

    async findById(id) {}

    async list() {
        return [];
    }

}
```

---

## Create Validator

```ts
const validator =
    new DefaultExecutionValidator();
```

---

## Create Service

```ts
const repository =
    new MemoryExecutionRepository();

const validator =
    new DefaultExecutionValidator();

const service =
    new DefaultExecutionService(
        repository,
        validator
    );
```

---

## Create Execution

```ts
await service.create({

    apiVersion: "mmos/v1",

    kind: "Execution",

    metadata: {

        workflow: "news-production",

        executionId: "exec-001"

    },

    spec: {

        workflowId: "news-production",

        input: {

            topic: "Artificial Intelligence"

        }

    }

});
```

---

# Execution States

MMOS mendukung beberapa state runtime.

- created
- queued
- running
- paused
- completed
- failed
- cancelled
- timeout

Seluruh perubahan state terjadi selama runtime.

---

# Validation

Execution divalidasi menggunakan JSON Schema.

```ts
await validator.validate(execution);
```

Jika validasi gagal akan menghasilkan:

```ts
ExecutionValidationError
```

---

# Repository

Package hanya mendefinisikan kontrak repository.

Implementasi dapat berupa:

- In-memory
- PostgreSQL
- MySQL
- MongoDB
- Redis
- Cloud Storage

Contoh:

```ts
class PostgreSQLExecutionRepository
implements ExecutionRepository {}
```

---

# Service

Default service menyediakan operasi:

- create()
- update()
- cancel()
- pause()
- resume()
- delete()
- get()
- list()

Seluruh operasi melakukan validasi sebelum perubahan state disimpan.

---

# Errors

Package menyediakan error bawaan.

- ExecutionError
- ExecutionValidationError
- ExecutionNotFoundError
- InvalidExecutionStateError
- ExecutionCancelledError
- ExecutionTimeoutError

Seluruh error merupakan turunan dari `ExecutionError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Execution adalah instance runtime dari Workflow.
- Execution memiliki banyak TaskRun.
- Task tetap immutable.
- TaskRun menyimpan runtime state.
- Runtime mengubah Execution, bukan Workflow.
- Repository bersifat provider-agnostic.
- Validasi menggunakan JSON Schema.

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
- @mmos/core-task
- @mmos/core-agent
- @mmos/core-capability
- @mmos/core-memory
- @mmos/core-event

---

# License

Apache-2.0