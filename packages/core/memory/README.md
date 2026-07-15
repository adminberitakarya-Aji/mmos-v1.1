# @mmos/core-memory

Memory merupakan **knowledge layer** dalam MMOS (Multimedia Management Orchestration System).

Memory memungkinkan Agent, Workflow, dan Runtime menyimpan serta mengambil informasi yang diperlukan selama proses orkestrasi. Memory bukan sekadar cache, tetapi representasi pengetahuan yang dapat digunakan kembali lintas Execution.

Package ini menyediakan:

- Memory domain model
- Memory namespace definition
- Memory entry definition
- Memory provider contract
- Error definitions

Package ini **tidak mengimplementasikan penyimpanan**. Seluruh implementasi berada pada Memory Provider.

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
Agent
      │
      ▼
Memory
      │
      ▼
Memory Provider
```

Memory menjadi pusat knowledge sharing di seluruh platform.

Sesuai ADR MMOS:

- Agent Reads Memory
- Agent Writes Memory
- Workflow Shares Memory
- Runtime Resolves Memory Provider
- Memory Provider Persists Data

---

# Features

- Memory domain model
- Namespace support
- Multiple memory types
- Metadata support
- TTL support
- Versioning
- Provider abstraction
- Storage agnostic

---

# Installation

```bash
pnpm add @mmos/core-memory
```

---

# Package Structure

```
memory/

README.md
package.json
tsconfig.json
index.ts

schemas/
    memory.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    provider.ts
    errors.ts

test/
```

---

# Memory Lifecycle

Memory merupakan domain object.

```
Created
    │
    ▼
Stored
    │
    ▼
Available
    │
    ▼
Updated
    │
    ▼
Expired
    │
    ▼
Deleted
```

Lifecycle penyimpanan dikelola oleh Memory Provider.

---

# Usage

## Create Memory

```ts
const memory = {

    apiVersion: "mmos/v1",

    kind: "Memory",

    metadata: {

        key: "customer-profile",

        namespace: "workspace",

        version: "1.0.0"

    },

    spec: {

        type: "semantic",

        value: {

            name: "John",

            company: "Example Inc."

        }

    }

};
```

---

## Store Memory

```ts
await provider.put(memory);
```

---

## Load Memory

```ts
const memory =
    await provider.get(
        "workspace",
        "customer-profile"
    );
```

---

# Memory Types

MMOS mendukung berbagai tipe Memory.

- Working Memory
- Semantic Memory
- Episodic Memory
- Vector Memory
- Cache Memory
- Session Memory

Provider dapat menambahkan tipe lain melalui plugin.

---

# Namespace

Memory diisolasi menggunakan namespace.

Contoh:

```
workspace

tenant

execution

agent

workflow

system
```

Namespace memungkinkan multi-tenant tanpa konflik key.

---

# Provider

Package hanya mendefinisikan kontrak provider.

Implementasi dapat berupa:

- In Memory
- Redis
- PostgreSQL
- MongoDB
- SQLite
- Vector Database
- Object Storage

---

# Errors

Package menyediakan error bawaan.

- MemoryError
- MemoryNotFoundError
- MemoryAlreadyExistsError
- InvalidMemoryTypeError
- MemoryProviderError

Seluruh error merupakan turunan dari `MemoryError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Memory adalah domain object.
- Memory immutable.
- Memory provider-agnostic.
- Memory tidak mengetahui storage.
- Runtime memilih Provider.
- Agent hanya membaca dan menulis Memory.
- Workflow dapat berbagi Memory.

---

# Dependencies

- TypeScript

Package tidak bergantung pada database maupun vector database tertentu.

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

- @mmos/core-agent
- @mmos/core-workflow
- @mmos/core-execution
- @mmos/core-capability
- @mmos/runtime
- @mmos/providers-memory

---

# License

Apache-2.0