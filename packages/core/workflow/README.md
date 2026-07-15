# @mmos/core-workflow

Workflow adalah **deskripsi proses bisnis** yang dijalankan oleh MMOS.

Workflow mendefinisikan urutan task, dependency, kondisi, parallel execution, event, retry policy, timeout, dan mekanisme eksekusi lainnya. Workflow **tidak menyimpan state runtime**. State runtime dikelola oleh `Execution`.

Package ini menyediakan:

- Workflow domain model
- Task graph
- Workflow validation
- Service contracts
- Repository contracts
- Error definitions
- Default service implementation

Package ini **tidak mengeksekusi workflow**. Eksekusi dilakukan oleh Execution Engine melalui Orchestrator.

---

# Architecture

```
Composition
      │
      ▼
Workflow
      │
      ▼
Task Graph
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

Workflow merupakan bagian dari Composition sesuai ADR:

- Composition Owns Workflow
- Workflow Owns Task
- Workflow Creates Execution
- Execution Owns Runtime

---

# Features

- Workflow domain model
- Directed Acyclic Graph (DAG) support
- Sequential workflow
- Parallel workflow
- Conditional workflow
- Loop workflow
- Event-driven workflow
- Human-in-the-loop workflow
- Scheduled workflow
- Validation menggunakan JSON Schema
- Repository abstraction
- Service abstraction

---

# Installation

```bash
pnpm add @mmos/core-workflow
```

---

# Package Structure

```
workflow/

README.md
package.json
tsconfig.json
index.ts

schemas/
    workflow.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    errors.ts
    validator.ts
    repository.ts
    service.ts

test/
```

---

# Workflow Lifecycle

```
Draft
   │
   ▼
Validated
   │
   ▼
Published
   │
   ▼
Executed
   │
   ▼
Archived
```

Workflow hanya berubah ketika dilakukan proses publish atau update. Seluruh instance runtime berasal dari `Execution`.

---

# Usage

## Create Repository

```ts
class MemoryWorkflowRepository
implements WorkflowRepository {

    async save(workflow) {}

    async update(workflow) {}

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
    new DefaultWorkflowValidator();
```

---

## Create Service

```ts
const repository =
    new MemoryWorkflowRepository();

const validator =
    new DefaultWorkflowValidator();

const service =
    new DefaultWorkflowService(
        repository,
        validator
    );
```

---

## Create Workflow

```ts
await service.create({

    apiVersion: "mmos/v1",

    kind: "Workflow",

    metadata: {

        name: "news-production",

        version: "1.0.0"

    },

    spec: {

        entrypoint: "collect-news",

        tasks: [

            "collect-news",

            "write-article",

            "review",

            "publish"

        ]

    }

});
```

---

# Workflow Types

MMOS mendukung berbagai pola workflow.

- Sequential
- Parallel
- Conditional
- Loop
- Pipeline
- Fan-out / Fan-in
- Event Driven
- Human in the Loop
- Scheduled
- Multi-Agent

Seluruh tipe workflow menggunakan model domain yang sama.

---

# Task Graph

Workflow direpresentasikan sebagai Directed Acyclic Graph (DAG).

Contoh:

```
Start
  │
  ▼
Collect Data
  │
  ▼
Analyze
  │
  ├─────────────┐
  ▼             ▼
Generate Text   Generate Image
      │             │
      └──────┬──────┘
             ▼
        Publish
             │
             ▼
            End
```

Dependency antar task digunakan oleh Scheduler untuk menentukan urutan eksekusi.

---

# Validation

Workflow divalidasi menggunakan JSON Schema.

```ts
await validator.validate(workflow);
```

Jika validasi gagal akan menghasilkan:

```ts
WorkflowValidationError
```

---

# Repository

Package hanya menyediakan kontrak repository.

Implementasi dapat berupa:

- In-memory
- PostgreSQL
- MySQL
- MongoDB
- Redis
- Cloud Storage

Contoh:

```ts
class PostgreSQLWorkflowRepository
implements WorkflowRepository {}
```

---

# Service

Default service menyediakan operasi:

- create()
- update()
- publish()
- delete()
- get()
- list()

Semua operasi melakukan validasi sebelum data disimpan.

---

# Errors

Package menyediakan error bawaan.

- WorkflowError
- WorkflowValidationError
- WorkflowNotFoundError
- WorkflowAlreadyExistsError
- WorkflowPublishError

Seluruh error merupakan turunan dari `WorkflowError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Workflow dimiliki oleh Composition.
- Workflow hanya mendeskripsikan proses.
- Workflow tidak memiliki runtime state.
- Execution merupakan instance dari Workflow.
- Runtime tidak mengubah definisi Workflow.
- Repository bersifat provider-agnostic.
- Validator menggunakan JSON Schema.
- Domain object bersifat immutable.

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
- @mmos/core-task
- @mmos/core-execution
- @mmos/core-agent
- @mmos/core-capability
- @mmos/core-memory
- @mmos/core-event

---

# License

Apache-2.0