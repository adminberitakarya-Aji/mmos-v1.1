# Shared

## Overview

Shared merupakan package yang menyediakan **komponen umum (cross-cutting concerns)** yang digunakan oleh seluruh package di dalam MMOS.

Shared **tidak mengandung business logic** dan **tidak memiliki dependency terhadap Core, Runtime, maupun Orchestrator**.

Package ini menjadi fondasi bersama yang menyediakan konfigurasi, logging, validasi, serialisasi, telemetry, utilitas, tipe data umum, dan error dasar.

```
                Shared
                   ▲
                   │
      ┌────────────┼────────────┐
      │            │            │
    Core        Runtime    Orchestrator
      │            │            │
      └────────────┼────────────┘
                   │
                  SDK
                   │
                  CLI
```

---

# Responsibilities

Shared bertanggung jawab menyediakan:

- Configuration
- Logging
- Validation
- Serialization
- Telemetry
- Common Utilities
- Common Types
- Base Errors

Shared digunakan oleh seluruh package MMOS.

---

# Scope

Shared menyediakan:

- Configuration Management
- Logger
- Validator
- Serializer
- Telemetry
- Utility Functions
- Common Types
- Base Exceptions

Shared tidak:

- Menjalankan Workflow
- Menjalankan Runtime
- Mengelola Execution
- Mengelola Agent
- Mengelola Capability
- Mengelola Memory
- Mengelola Event

---

# Modules

## Config

Mengelola konfigurasi bersama.

Contoh:

- Environment
- Configuration Loader
- Default Configuration
- Configuration Schema

Digunakan oleh:

- Runtime
- SDK
- CLI
- Services

---

## Errors

Menyediakan base error untuk seluruh MMOS.

Contoh:

- BaseError
- ValidationError
- RuntimeError
- ConfigurationError
- TimeoutError

Seluruh package mewarisi error dari modul ini.

---

## Logger

Logging universal.

Fitur:

- Structured Logging
- Log Levels
- Context Logging
- Transport
- Formatter

Contoh level:

- TRACE
- DEBUG
- INFO
- WARN
- ERROR
- FATAL

---

## Utils

Berisi helper umum.

Contoh:

- UUID
- Hash
- Retry
- Sleep
- Merge
- Clone
- Crypto
- Date
- Async Utilities

Tidak berisi business logic MMOS.

---

## Validation

Validasi universal.

Fitur:

- JSON Schema Validation
- Object Validation
- Rule Validation
- Validation Result

Digunakan oleh:

- Core
- Runtime
- SDK
- CLI

---

## Serialization

Konversi data.

Format yang didukung:

- JSON
- YAML
- Binary

Digunakan untuk:

- Configuration
- API
- Storage
- Runtime

---

## Telemetry

Observability.

Fitur:

- Metrics
- Tracing
- Span
- Event
- Collector

Digunakan untuk monitoring Runtime.

---

## Types

Tipe data bersama.

Contoh:

- Identifier
- Metadata
- Timestamp
- Status
- Pagination
- Response
- Options

Menghindari duplikasi type di seluruh package.

---

# Dependency Rules

Shared merupakan package paling bawah pada dependency graph.

```
Applications
      │
      ▼
CLI
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

Aturan utama:

- Shared **boleh digunakan** oleh seluruh package.
- Shared **tidak boleh bergantung** pada package MMOS lainnya.

---

# Package Structure

```
shared/

README.md
package.json
tsconfig.json
index.ts

test/

config/
├── index.ts
├── config.ts
├── loader.ts
├── environment.ts
├── defaults.ts
└── schema.ts

errors/
├── index.ts
├── base-error.ts
├── validation-error.ts
├── configuration-error.ts
├── runtime-error.ts
├── timeout-error.ts
└── error-codes.ts

logger/
├── index.ts
├── logger.ts
├── formatter.ts
├── transport.ts
├── levels.ts
└── context.ts

utils/
├── index.ts
├── object.ts
├── string.ts
├── array.ts
├── number.ts
├── async.ts
├── promise.ts
├── crypto.ts
├── uuid.ts
├── hash.ts
├── date.ts
└── retry.ts

validation/
├── index.ts
├── validator.ts
├── json-schema.ts
├── rules.ts
├── result.ts
└── errors.ts

serialization/
├── index.ts
├── serializer.ts
├── deserializer.ts
├── json.ts
├── yaml.ts
└── binary.ts

telemetry/
├── index.ts
├── metrics.ts
├── tracing.ts
├── spans.ts
├── events.ts
└── collector.ts

types/
├── index.ts
├── common.ts
├── identifiers.ts
├── metadata.ts
├── pagination.ts
├── status.ts
├── timestamp.ts
├── response.ts
└── options.ts
```

---

# Design Principles

Shared mengikuti prinsip berikut:

- Reusable
- Lightweight
- Stateless
- Dependency Free
- Framework Agnostic
- Runtime Agnostic
- Provider Agnostic
- Consistent
- Extensible

Seluruh modul di dalam Shared harus bersifat generik dan dapat digunakan kembali oleh package lain tanpa mengetahui detail domain MMOS. Dengan demikian, Shared menjadi fondasi teknis yang stabil dan bebas dari business logic platform.