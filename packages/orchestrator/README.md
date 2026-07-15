# Orchestrator

## Overview

Orchestrator adalah komponen yang mengoordinasikan seluruh Runtime Engine MMOS.

Orchestrator menerima sebuah **Composition**, membangun sebuah **Execution**, kemudian mengarahkan seluruh proses eksekusi melalui Runtime hingga workflow selesai.

Orchestrator **tidak membangun Execution Plan**.

Orchestrator **tidak menjadwalkan task**.

Orchestrator **tidak menjalankan task**.

Seluruh pekerjaan tersebut didelegasikan kepada Runtime Engine.

```
Composition
      │
      ▼
Orchestrator
      │
      ├────────► Planner
      ├────────► Scheduler
      ├────────► Queue
      ├────────► Dispatcher
      └────────► Executor
      │
      ▼
Execution Completed
```

---

# Responsibilities

Orchestrator bertanggung jawab untuk:

- Execution Lifecycle Management
- Runtime Coordination
- Runtime Initialization
- Runtime Shutdown
- Pause Execution
- Resume Execution
- Cancel Execution
- Recovery Coordination
- Runtime Monitoring
- Execution Supervision
- State Synchronization
- Error Propagation

Orchestrator merupakan entry point seluruh Runtime Engine.

---

# Scope

Orchestrator bekerja menggunakan:

- Composition
- Execution
- Runtime Configuration

Orchestrator menghasilkan:

- Execution Lifecycle
- Runtime Coordination
- Execution Supervision

Orchestrator tidak:

- Build Execution Plan
- Resolve Dependency
- Schedule Task
- Route Worker
- Execute Task
- Invoke Provider

---

# Runtime Flow

```
Composition
      │
      ▼
Create Execution
      │
      ▼
Planner
      │
      ▼
Scheduler
      │
      ▼
Queue
      │
      ▼
Dispatcher
      │
      ▼
Executor
      │
      ▼
Execution Completed
```

---

# Orchestration Stages

Orchestrator terdiri dari beberapa tahap utama.

## 1. Initialization

Mempersiapkan Runtime.

Contoh:

- Load Configuration
- Initialize Runtime
- Create Execution
- Allocate Resources

---

## 2. Planning

Orchestrator meminta Runtime Planner membangun Execution Plan.

```
Planner

↓

Execution Plan
```

---

## 3. Scheduling

Execution Plan diteruskan ke Scheduler.

Scheduler menentukan task yang siap dijalankan.

---

## 4. Dispatching

Task bergerak melalui Queue kemudian Dispatcher.

Dispatcher memilih worker terbaik.

---

## 5. Execution

Executor menjalankan task.

Executor menghasilkan:

- Artifact
- Memory Update
- Event
- Execution Update

---

## 6. Completion

Apabila seluruh task selesai:

- update Execution
- release resource
- publish completion event

---

# Lifecycle Management

Orchestrator mengelola lifecycle Execution.

```
Created

↓

Planning

↓

Scheduled

↓

Running

↓

Paused

↓

Resumed

↓

Completed

↓

Cancelled

↓

Failed
```

Seluruh perubahan state dilakukan melalui Orchestrator.

---

# Recovery

Apabila Runtime mengalami kegagalan, Orchestrator melakukan recovery.

Contoh:

- Resume Execution
- Restart Execution
- Retry Coordination
- Recover Runtime State

Recovery mengikuti policy Runtime.

---

# Monitoring

Orchestrator memonitor seluruh Runtime.

Contoh:

- Runtime Health
- Active Execution
- Queue Size
- Running Task
- Failed Task
- Execution Progress
- Runtime Metrics

Monitoring tidak mengubah proses Runtime.

---

# Coordination

Orchestrator mengoordinasikan seluruh Runtime Engine.

```
Planner

↓

Scheduler

↓

Queue

↓

Dispatcher

↓

Executor
```

Orchestrator memastikan setiap komponen bekerja dalam urutan yang benar.

---

# Execution Control

Orchestrator menyediakan kontrol terhadap Execution.

Contoh:

- Start
- Pause
- Resume
- Cancel
- Stop
- Restart

Seluruh kontrol dilakukan tanpa mengubah implementasi Runtime.

---

# Interaction

Orchestrator berinteraksi dengan:

Runtime

- Planner
- Scheduler
- Queue
- Dispatcher
- Executor

Core

- Composition
- Execution

Orchestrator tidak berinteraksi langsung dengan:

- Agent
- Capability
- Provider
- Artifact
- Memory
- Event

Seluruh interaksi tersebut dilakukan melalui Executor.

---

# Package Structure

```
orchestrator/

README.md
package.json
tsconfig.json
index.ts

test/

src/
│
├── index.ts
├── types.ts
├── contracts.ts
├── constants.ts
├── orchestrator.ts
├── coordinator.ts
├── lifecycle.ts
├── recovery.ts
└── errors.ts
```

---

# Design Principles

Orchestrator mengikuti prinsip berikut:

- Coordination Only
- Lifecycle Driven
- Runtime Agnostic
- Stateless Coordination
- Fault Tolerant
- Observable
- Extensible
- Provider Agnostic

Orchestrator tidak mengimplementasikan Planner, Scheduler, Queue, Dispatcher, maupun Executor. Orchestrator hanya mengoordinasikan seluruh Runtime Engine sehingga setiap komponen dapat menjalankan tanggung jawabnya masing-masing sesuai urutan eksekusi MMOS.