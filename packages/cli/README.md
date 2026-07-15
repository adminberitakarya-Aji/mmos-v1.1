# MMOS CLI

## Overview

MMOS CLI adalah **official Command Line Interface** untuk MMOS yang menyediakan antarmuka berbasis terminal untuk mengelola Composition, Workflow, Execution, Artifact, dan Runtime.

CLI dibangun di atas **MMOS SDK**, sehingga seluruh operasi menggunakan public API yang sama dengan aplikasi lain. CLI tidak mengakses Core, Runtime, maupun Orchestrator secara langsung.

CLI ditujukan untuk:

- Developer
- DevOps Engineer
- Platform Administrator
- CI/CD Pipeline
- Automation Script

---

# Position in Architecture

```
                 User / Terminal
                        │
                        ▼
                  MMOS CLI
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

CLI merupakan lapisan presentasi (presentation layer) untuk penggunaan MMOS melalui terminal.

---

# Responsibilities

CLI bertanggung jawab untuk menyediakan:

- Command Parsing
- Command Execution
- Interactive Console
- Configuration Loading
- Output Formatting
- Progress Display
- Error Reporting

CLI tidak bertanggung jawab untuk:

- Menjalankan Runtime
- Menjadwalkan Workflow
- Melakukan Dispatch Task
- Mengeksekusi Task
- Mengelola Memory
- Mengelola Event Bus

Seluruh logika bisnis tetap berada di SDK, Orchestrator, dan Runtime.

---

# Features

CLI mendukung:

- Initialize Project
- Validate Composition
- Inspect Workflow
- Execute Composition
- Pause Execution
- Resume Execution
- Cancel Execution
- View Execution Status
- Stream Logs
- Manage Artifact
- Display Runtime Information
- Show Version
- Interactive Help

---

# Package Structure

```
cli/

README.md
package.json
tsconfig.json
index.ts

bin/
└── mmos.ts

src/
├── index.ts
├── types.ts
├── contracts.ts
├── constants.ts
│
├── cli.ts
├── commands.ts
├── parser.ts
├── output.ts
├── configuration.ts
└── errors.ts

examples/
├── init.sh
├── validate.sh
├── run.sh
└── inspect.sh
```

---

# Command Overview

## Initialize Project

```
mmos init
```

Membuat struktur project MMOS baru.

---

## Validate Composition

```
mmos validate composition.json
```

Memvalidasi Composition terhadap schema dan aturan MMOS.

---

## Execute Composition

```
mmos run composition.json
```

Menjalankan Composition melalui MMOS SDK.

---

## Inspect Workflow

```
mmos inspect workflow.json
```

Menampilkan informasi Workflow tanpa menjalankannya.

---

## Show Status

```
mmos status <execution-id>
```

Menampilkan status Execution.

---

## Pause Execution

```
mmos pause <execution-id>
```

Menjeda Execution yang sedang berjalan.

---

## Resume Execution

```
mmos resume <execution-id>
```

Melanjutkan Execution yang dijeda.

---

## Cancel Execution

```
mmos cancel <execution-id>
```

Membatalkan Execution.

---

## Stream Logs

```
mmos logs <execution-id>
```

Menampilkan log secara real-time.

---

## Version

```
mmos version
```

Menampilkan versi MMOS CLI.

---

## Help

```
mmos help
```

Menampilkan seluruh command yang tersedia.

---

# Example Workflow

```
$ mmos validate composition.json

✔ Composition is valid

$ mmos run composition.json

Execution ID : exec-123456

Status       : Running

Progress     : 42%

$ mmos logs exec-123456

[Planner] Planning execution...
[Scheduler] Scheduling tasks...
[Executor] Running task "Generate Image"

$ mmos status exec-123456

Status : Completed
Duration : 18.4s
```

---

# Dependency Rules

CLI memiliki dependency sebagai berikut:

```
User
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

CLI:

- Menggunakan MMOS SDK sebagai satu-satunya API.
- Tidak mengakses Runtime secara langsung.
- Tidak mengakses Orchestrator secara langsung.
- Tidak mengimplementasikan business logic.

---

# Design Principles

MMOS CLI mengikuti prinsip:

- Thin Command Layer
- SDK First
- Consistent User Experience
- Cross Platform
- Script Friendly
- Human Friendly Output
- Extensible Command Architecture
- Type Safe
- Stable Public Interface

CLI dirancang sebagai antarmuka resmi MMOS untuk penggunaan melalui terminal, otomatisasi, dan integrasi CI/CD, dengan tetap menjaga seluruh logika bisnis berada pada SDK, Orchestrator, dan Runtime.