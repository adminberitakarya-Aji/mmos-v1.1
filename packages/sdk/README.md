# MMOS SDK

## Overview

SDK merupakan **official Software Development Kit** untuk MMOS yang menyediakan API tingkat tinggi (high-level API) bagi aplikasi untuk berinteraksi dengan platform MMOS.

SDK menyembunyikan kompleksitas Core, Runtime, dan Orchestrator sehingga developer cukup menggunakan API yang sederhana dan konsisten.

SDK menjadi **entry point utama** bagi aplikasi yang ingin:

- Menjalankan Composition
- Mengelola Workflow
- Mengontrol Execution
- Mengelola Artifact
- Mengakses Runtime
- Melakukan Streaming Event

---

# Position in Architecture

```
                 Applications
                       │
                       ▼
                 MMOS SDK
                       │
                       ▼
               Orchestrator
                       │
                       ▼
                  Runtime
                       │
                       ▼
                    Core
                       │
                       ▼
                    Shared
```

SDK **tidak berinteraksi langsung dengan Runtime**, melainkan selalu melalui Orchestrator.

---

# Responsibilities

SDK bertanggung jawab untuk menyediakan:

- High-Level Client API
- Fluent Builder API
- Workflow Management API
- Execution API
- Artifact API
- Streaming API
- Error Handling
- Developer Friendly Interface

---

# Scope

SDK menyediakan:

- MMOS Client
- Workflow Operations
- Execution Operations
- Artifact Operations
- Streaming Operations
- Request Builder
- Response Model
- SDK Error Handling

SDK tidak:

- Menjalankan Runtime
- Menjadwalkan Workflow
- Melakukan Dispatch Task
- Mengeksekusi Task
- Mengelola Memory
- Mengelola Event Bus

Seluruh proses tersebut merupakan tanggung jawab Orchestrator dan Runtime.

---

# Modules

## Client

Entry point SDK.

Contoh:

- MMOSClient
- Client Configuration
- Authentication
- Connection Management

---

## Builder

Menyediakan Fluent API.

Contoh:

- Composition Builder
- Execution Builder
- Request Builder

---

## Execution

Mengelola lifecycle execution.

Contoh:

- Run
- Resume
- Pause
- Cancel
- Retry
- Status
- Result

---

## Workflow

Mengelola workflow dan composition.

Contoh:

- Load Workflow
- Validate Workflow
- Execute Workflow
- Inspect Workflow

---

## Artifact

Mengelola artifact.

Contoh:

- Upload
- Download
- Delete
- Metadata
- Version

---

## Streaming

Mendukung komunikasi real-time.

Contoh:

- Execution Events
- Runtime Events
- Progress
- Logs
- Output Stream

---

## Errors

Error khusus SDK.

Semua SDK Error mewarisi:

- BaseError

---

# Package Structure

```
sdk/

README.md
package.json
tsconfig.json
index.ts

examples/

src/
├── index.ts
├── types.ts
├── contracts.ts
├── constants.ts
│
├── client.ts
├── builder.ts
├── execution.ts
├── workflow.ts
├── artifact.ts
├── streaming.ts
└── errors.ts
```

---

# Example

## Create Client

```ts
import { MMOSClient } from "@mmos/sdk";

const client = new MMOSClient();
```

---

## Execute Composition

```ts
const execution = await client.run(composition);
```

---

## Wait for Completion

```ts
await execution.wait();

console.log(execution.status);
```

---

## Stream Events

```ts
for await (const event of execution.stream()) {
    console.log(event);
}
```

---

# Dependency Rules

SDK memiliki dependency berikut:

```
Applications
      │
      ▼
SDK
      │
      ▼
Orchestrator
      │
      ▼
Runtime
      │
      ▼
Core
      │
      ▼
Shared
```

SDK:

- Boleh menggunakan Core melalui Orchestrator.
- Boleh menggunakan Shared.
- Tidak boleh mengakses Runtime secara langsung.
- Tidak boleh menggantikan fungsi Orchestrator.

---

# Design Principles

SDK mengikuti prinsip berikut:

- Simple API
- High-Level Abstraction
- Fluent Interface
- Type Safe
- Asynchronous First
- Framework Agnostic
- Stable Public API
- Extensible
- Backward Compatible

SDK dirancang sebagai antarmuka resmi MMOS untuk developer sehingga penggunaan platform tetap sederhana, konsisten, dan terlepas dari kompleksitas internal Orchestrator maupun Runtime.