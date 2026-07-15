# @mmos/core-agent

Agent adalah **aktor cerdas (intelligent actor)** dalam MMOS (Multimedia Management Orchestration System).

Agent bertanggung jawab untuk mengambil keputusan, merencanakan langkah, menggunakan Capability, berinteraksi dengan Memory, dan menyelesaikan Task yang diberikan oleh Runtime.

Agent **tidak memiliki lifecycle runtime sendiri**. Runtime bertugas membuat AgentRun (execution context) ketika sebuah Task dijalankan.

Package ini menyediakan:

- Agent domain model
- Agent role definition
- Planning model
- Capability binding
- Memory binding
- Validation
- Error definitions

Package ini **tidak menjalankan LLM secara langsung**. Pemanggilan model dilakukan melalui Provider.

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

Agent merupakan komponen AI utama sesuai ADR:

- Workflow Assigns Task
- Runtime Creates AgentRun
- Agent Uses Capability
- Capability Uses Provider
- Agent Reads/Writes Memory

---

# Features

- Agent domain model
- Agent profile
- Goal definition
- Role definition
- Capability binding
- Memory binding
- Planning configuration
- Multi-provider support
- Validation menggunakan JSON Schema

---

# Installation

```bash
pnpm add @mmos/core-agent
```

---

# Package Structure

```
agent/

README.md
package.json
tsconfig.json
index.ts

schemas/
    agent.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    validator.ts
    errors.ts

test/
```

---

# Agent Lifecycle

Agent merupakan **domain definition**, bukan runtime object.

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
```

Ketika Runtime menjalankan sebuah Task, Agent akan memiliki **AgentRun** sebagai execution context.

```
Agent
   │
   ▼
AgentRun
   │
   ▼
Execute Task
```

---

# Usage

## Create Agent

```ts
const agent = {

    apiVersion: "mmos/v1",

    kind: "Agent",

    metadata: {

        name: "writer",

        version: "1.0.0"

    },

    spec: {

        role: "content-writer",

        description:
            "Generate high quality articles.",

        provider: "openai",

        model: "gpt-5",

        capabilities: [

            "generate-text",

            "search"

        ]

    }

};
```

---

# Agent Roles

MMOS tidak membatasi role Agent.

Contoh:

- Writer
- Researcher
- Reviewer
- Editor
- Translator
- Planner
- Analyst
- Designer
- Programmer
- Coordinator

Role hanya merupakan konfigurasi domain.

---

# Planning

Agent dapat memiliki konfigurasi planning.

Contoh:

- reactive
- planning
- reasoning
- reflection
- self-improvement

Strategi planning dipilih oleh Runtime.

---

# Capability Binding

Agent tidak mengimplementasikan tool secara langsung.

Agent hanya mendeklarasikan Capability.

Contoh:

```text
Writer

├── generate-text
├── summarize
├── translate
└── search
```

Capability akan dipanggil oleh Runtime.

---

# Memory Binding

Agent dapat menggunakan beberapa jenis Memory.

- Working Memory
- Semantic Memory
- Episodic Memory
- Vector Memory
- Cache Memory

Memory dikelola oleh package `memory`.

---

# Validation

Agent divalidasi menggunakan JSON Schema.

```ts
await validator.validate(agent);
```

Jika validasi gagal akan menghasilkan:

```ts
AgentValidationError
```

---

# Errors

Package menyediakan error bawaan.

- AgentError
- AgentValidationError
- InvalidAgentRoleError
- InvalidCapabilityError
- InvalidProviderError

Seluruh error merupakan turunan dari `AgentError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Agent adalah domain object.
- Agent tidak memiliki runtime state.
- Runtime membuat AgentRun.
- Agent menggunakan Capability.
- Capability menggunakan Provider.
- Agent membaca dan menulis Memory.
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
- @mmos/core-workflow
- @mmos/core-task
- @mmos/core-execution
- @mmos/core-capability
- @mmos/core-memory
- @mmos/core-event

---

# License

Apache-2.0