# @mmos/core-composition

Composition adalah **root object** dalam MMOS (Multimedia Management Orchestration System).

Seluruh workflow, execution, runtime, memory, capability, dan event selalu dimulai dari sebuah Composition.

Package ini menyediakan:

- Domain model Composition
- Type definitions
- Service contracts
- Repository contracts
- Validation
- Error definitions
- Default service implementation

Package ini **tidak memiliki implementasi storage**. Penyimpanan Composition diimplementasikan oleh package lain melalui `CompositionRepository`.

---

# Architecture

```
               Composition
                     │
                     ▼
               Workflow(s)
                     │
                     ▼
               Execution(s)
                     │
                     ▼
               Runtime
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      Agent(s)             Capability(s)
          │                     │
          └──────────┬──────────┘
                     ▼
                 Provider
```

Composition merupakan root object sesuai ADR:

- Composition Owns Workflow
- Workflow Owns Execution
- Execution Owns Runtime

---

# Features

- Composition domain model
- Type-safe interfaces
- JSON Schema validation
- Repository abstraction
- Service abstraction
- Error hierarchy
- Immutable domain contract

---

# Installation

```bash
pnpm add @mmos/core-composition
```

---

# Package Structure

```
composition/

README.md
package.json
tsconfig.json
index.ts

schemas/
    composition.schema.json

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

# Usage

## Create Repository

```ts
class MemoryRepository
implements CompositionRepository {

    async save(composition) {}

    async update(composition) {}

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
    new DefaultCompositionValidator();
```

---

## Create Service

```ts
const repository =
    new MemoryRepository();

const validator =
    new DefaultCompositionValidator();

const service =
    new DefaultCompositionService(
        repository,
        validator
    );
```

---

## Create Composition

```ts
await service.create({

    apiVersion: "mmos/v1",

    kind: "Composition",

    metadata: {

        version: "1.0.0",

        author: "Administrator"

    },

    spec: {

        workflow: "news-production"

    }

});
```

---

# Validation

Package menggunakan JSON Schema sebagai sumber validasi.

Validator dibangun menggunakan AJV.

```ts
await validator.validate(composition);
```

Jika validasi gagal akan menghasilkan:

```ts
CompositionValidationError
```

---

# Repository

Package ini hanya mendefinisikan kontrak repository.

Implementasi dapat berupa:

- In-memory
- File System
- PostgreSQL
- MySQL
- MongoDB
- Redis
- S3
- Cloud Storage

Contoh:

```ts
class PostgreSQLRepository
implements CompositionRepository {}
```

---

# Service

Default service menyediakan operasi dasar.

- create()
- update()
- publish()
- delete()
- get()
- list()

Seluruh operasi akan melakukan validasi sebelum data disimpan.

---

# Errors

Package menyediakan error bawaan.

- CompositionError
- CompositionValidationError
- CompositionNotFoundError
- CompositionAlreadyExistsError
- CompositionPublishError

Seluruh error merupakan turunan dari `CompositionError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Composition adalah root object.
- Workflow dimiliki Composition.
- Execution dimiliki Workflow.
- Runtime tidak mengetahui Composition secara langsung.
- Repository bersifat provider-agnostic.
- Validator menggunakan JSON Schema.
- Domain object bersifat immutable.
- Storage dipisahkan dari domain.

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

Menjalankan coverage:

```bash
pnpm test:coverage
```

---

# Related Packages

- @mmos/core-workflow
- @mmos/core-task
- @mmos/core-execution
- @mmos/core-agent
- @mmos/core-memory
- @mmos/core-capability
- @mmos/core-event

---

# License

Apache-2.0