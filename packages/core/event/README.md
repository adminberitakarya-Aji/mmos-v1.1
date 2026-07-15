# @mmos/core-event

Event merupakan **mekanisme komunikasi asynchronous** dalam MMOS (Multimedia Management Orchestration System).

Event digunakan untuk menghubungkan Composition, Workflow, Runtime, Agent, Memory, Capability, dan komponen lainnya tanpa menciptakan ketergantungan langsung (tight coupling).

Package ini menyediakan:

- Event domain model
- Event metadata
- Event payload definition
- Event Bus contract
- Publish / Subscribe contract
- Error definitions

Package ini **tidak mengimplementasikan message broker**. Implementasi Event Bus berada pada layer Runtime atau Infrastructure.

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
Runtime
      │
      ▼
Event Bus
      │
 ┌────┴─────┐
 ▼          ▼
Agent    Capability
 │          │
 ▼          ▼
Memory   Provider
```

Event menjadi mekanisme komunikasi utama antar komponen MMOS.

Sesuai ADR MMOS:

- Runtime Publishes Events
- Components Subscribe Events
- Event Bus Routes Events
- Event Processing is Asynchronous
- Event Bus is Provider Agnostic

---

# Features

- Event domain model
- Event metadata
- Event payload
- Publish / Subscribe contract
- Topic support
- Event versioning
- Event filtering
- Provider abstraction

---

# Installation

```bash
pnpm add @mmos/core-event
```

---

# Package Structure

```
event/

README.md
package.json
tsconfig.json
index.ts

schemas/
    event.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    bus.ts
    errors.ts

test/
```

---

# Event Lifecycle

Event merupakan immutable domain object.

```
Created
    │
    ▼
Published
    │
    ▼
Delivered
    │
    ▼
Processed
    │
    ▼
Archived
```

Lifecycle delivery dikelola oleh Event Bus.

---

# Usage

## Create Event

```ts
const event = {

    apiVersion: "mmos/v1",

    kind: "Event",

    metadata: {

        id: "evt-001",

        topic: "workflow.completed",

        version: "1.0.0"

    },

    spec: {

        source: "runtime",

        type: "workflow.completed",

        payload: {

            workflowId: "wf-001",

            executionId: "exec-001"

        }

    }

};
```

---

## Publish Event

```ts
await bus.publish(event);
```

---

## Subscribe Event

```ts
await bus.subscribe(
    "workflow.completed",
    handler
);
```

---

# Event Topics

Contoh topic bawaan MMOS:

- composition.created
- workflow.started
- workflow.completed
- task.started
- task.completed
- execution.started
- execution.completed
- execution.failed
- memory.updated
- capability.executed
- artifact.created
- runtime.started
- runtime.stopped
- system.error

Framework maupun plugin dapat menambahkan topic baru.

---

# Event Bus

Package hanya mendefinisikan kontrak Event Bus.

Implementasi dapat berupa:

- In Memory Bus
- Redis Pub/Sub
- RabbitMQ
- Kafka
- NATS
- MQTT
- Azure Service Bus
- Google Pub/Sub

---

# Errors

Package menyediakan error bawaan.

- EventError
- EventPublishError
- EventSubscribeError
- InvalidEventError
- InvalidTopicError

Seluruh error merupakan turunan dari `EventError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Event adalah immutable domain object.
- Event bersifat asynchronous.
- Event tidak mengetahui subscriber.
- Event Bus bersifat provider-agnostic.
- Runtime mengelola publishing.
- Komponen melakukan subscribe melalui Event Bus.
- Package tidak bergantung pada broker tertentu.

---

# Dependencies

- TypeScript

Package tidak bergantung pada Kafka, RabbitMQ, Redis, NATS, MQTT, maupun message broker lainnya.

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

- @mmos/core-execution
- @mmos/core-runtime
- @mmos/core-agent
- @mmos/core-memory
- @mmos/core-capability
- @mmos/providers-event

---

# License

Apache-2.0