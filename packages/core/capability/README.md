# @mmos/core-capability

Capability adalah **kemampuan (ability)** yang dapat digunakan oleh Agent untuk menyelesaikan sebuah Task.

Capability merupakan abstraksi terhadap aksi yang dapat dilakukan oleh sistem, baik melalui AI model, tool eksternal, service internal, workflow lain, maupun operasi sistem.

Capability **tidak mengetahui siapa yang menggunakannya**. Agent memilih Capability, Runtime mengeksekusinya, dan Provider menjalankan implementasinya.

Package ini menyediakan:

- Capability domain model
- Capability definition
- Input / Output contract
- Capability registry contract
- Error definitions

Package ini **tidak mengimplementasikan Capability**. Implementasi berada pada package Runtime, Provider, atau Plugin.

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
Provider / Plugin
```

Capability merupakan abstraction layer antara Agent dan implementasi sebenarnya.

Sesuai ADR MMOS:

- Agent Uses Capability
- Capability Hides Implementation
- Runtime Resolves Capability
- Provider Executes Capability

---

# Features

- Capability domain model
- Input / Output definition
- Parameter definition
- Category definition
- Capability registry
- Versioning
- Provider agnostic
- Plugin ready

---

# Installation

```bash
pnpm add @mmos/core-capability
```

---

# Package Structure

```
capability/

README.md
package.json
tsconfig.json
index.ts

schemas/
    capability.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    registry.ts
    errors.ts

test/
```

---

# Capability Lifecycle

Capability merupakan **domain definition**.

```
Defined
    │
    ▼
Validated
    │
    ▼
Registered
    │
    ▼
Available
    │
    ▼
Deprecated
```

Runtime akan mencari Capability melalui Registry ketika Agent menjalankan Task.

---

# Usage

## Define Capability

```ts
const capability = {

    apiVersion: "mmos/v1",

    kind: "Capability",

    metadata: {

        name: "generate-text",

        version: "1.0.0"

    },

    spec: {

        category: "llm",

        description:
            "Generate text using LLM.",

        inputs: {

            prompt: "string"

        },

        outputs: {

            text: "string"

        }

    }

};
```

---

## Register Capability

```ts
await registry.register(capability);
```

---

## Resolve Capability

```ts
const capability =
    await registry.get("generate-text");
```

---

# Capability Categories

Capability dapat berasal dari berbagai sumber.

- LLM
- Tool
- API
- Database
- Memory
- Event
- Workflow
- Human
- System
- Plugin

MMOS tidak membatasi jumlah kategori.

---

# Input / Output

Capability mendefinisikan kontrak input dan output.

Contoh:

```
Input

prompt
language
style

↓

Capability

↓

Output

text
usage
metadata
```

Runtime bertanggung jawab melakukan binding parameter.

---

# Registry

Package hanya mendefinisikan kontrak Registry.

Implementasi dapat berupa:

- In Memory Registry
- File Registry
- Database Registry
- Plugin Registry
- Remote Registry

---

# Errors

Package menyediakan error bawaan.

- CapabilityError
- CapabilityNotFoundError
- CapabilityAlreadyExistsError
- InvalidCapabilityError
- InvalidCapabilityCategoryError

Seluruh error merupakan turunan dari `CapabilityError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Capability adalah domain object.
- Capability bersifat immutable.
- Capability tidak memiliki runtime state.
- Runtime melakukan resolusi Capability.
- Provider mengimplementasikan Capability.
- Registry hanya menyimpan metadata.
- Package tidak memiliki implementasi Provider.

---

# Dependencies

- TypeScript

Package tidak bergantung pada database, framework, maupun provider AI tertentu.

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
- @mmos/core-task
- @mmos/core-workflow
- @mmos/core-execution
- @mmos/core-memory
- @mmos/core-event
- @mmos/providers

---

# License

Apache-2.0