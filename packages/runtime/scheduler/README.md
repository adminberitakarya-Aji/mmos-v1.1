# Scheduler

## Overview

Scheduler adalah komponen kedua pada Runtime Engine yang bertanggung jawab menentukan **kapan** sebuah node pada **Execution Plan** boleh dijalankan.

Scheduler menerima **Execution Plan** dari Planner dan mengevaluasi seluruh kondisi eksekusi seperti dependency, waktu, retry, timeout, concurrency, serta prioritas sebelum node dikirim ke Queue.

Scheduler **tidak menjalankan task**.

Scheduler juga **tidak memilih worker**.

```
Execution Plan
       │
       ▼
   Scheduler
       │
       ▼
 Ready Tasks
       │
       ▼
     Queue
```

---

# Responsibilities

Scheduler bertanggung jawab untuk:

- Dependency Scheduling
- Ready State Evaluation
- Execution Window
- Delay Scheduling
- Scheduled Execution
- Cron Scheduling
- Retry Scheduling
- Timeout Scheduling
- Priority Scheduling
- Concurrency Control
- Rate Limiting
- Resource Awareness
- Task Release

Scheduler menghasilkan daftar task yang siap dijalankan.

---

# Scope

Scheduler bekerja menggunakan:

- Execution Plan
- Execution State
- Runtime Policy
- Scheduler Configuration

Scheduler menghasilkan:

- Ready Tasks
- Scheduled Tasks
- Delayed Tasks

Scheduler tidak:

- Menjalankan Task
- Memanggil Agent
- Memanggil Capability
- Memanggil Provider
- Memilih Worker
- Mengelola Queue

---

# Runtime Flow

```
Execution Plan
       │
       ▼
Dependency Check
       │
       ▼
Policy Evaluation
       │
       ▼
Concurrency Check
       │
       ▼
Retry Evaluation
       │
       ▼
Timeout Evaluation
       │
       ▼
Priority Evaluation
       │
       ▼
Ready Queue
```

---

# Scheduling Stages

Scheduler terdiri dari beberapa tahap utama.

## 1. Dependency Evaluation

Scheduler memastikan seluruh dependency telah selesai.

Contoh:

```
A

↓

B

↓

C
```

Task B tidak dapat dijalankan sebelum A selesai.

---

## 2. State Evaluation

Scheduler mengevaluasi status node.

Contoh status:

- Pending
- Waiting
- Ready
- Running
- Completed
- Failed
- Cancelled

Hanya node dengan status **Ready** yang dapat diteruskan ke Queue.

---

## 3. Time Evaluation

Scheduler memeriksa aturan waktu.

Contoh:

- Delay
- Execute At
- Schedule At
- Cron
- Backoff

Task belum dilepas apabila waktu eksekusi belum tercapai.

---

## 4. Retry Evaluation

Scheduler menentukan apakah task boleh dijalankan kembali.

Contoh kebijakan:

- Maximum Retry
- Retry Delay
- Exponential Backoff
- Linear Backoff
- Fixed Delay

---

## 5. Timeout Evaluation

Scheduler memeriksa timeout.

Contoh:

- Execution Timeout
- Queue Timeout
- Retry Timeout
- Global Timeout

Task yang melewati batas timeout tidak akan dijadwalkan ulang tanpa kebijakan retry yang sesuai.

---

## 6. Priority Evaluation

Scheduler menentukan urutan task berdasarkan prioritas.

Contoh prioritas:

- Critical
- High
- Normal
- Low
- Background

Priority menentukan urutan pelepasan task ke Queue.

---

## 7. Concurrency Control

Scheduler memastikan batas paralelisme dipatuhi.

Contoh:

```
Maximum Workers : 8

Running : 8

Ready : 15
```

Scheduler menahan task tambahan hingga slot tersedia.

---

# Scheduling Policies

Scheduler mendukung berbagai kebijakan:

- FIFO
- Priority
- Fair Scheduling
- Deadline First
- Earliest Ready
- Resource Aware
- Tenant Aware

Policy dapat dikonfigurasi sesuai kebutuhan deployment.

---

# Retry Strategy

Scheduler mendukung beberapa strategi retry.

Contoh:

- Never Retry
- Fixed Retry
- Linear Retry
- Exponential Backoff
- Immediate Retry

Retry hanya menjadwalkan ulang task.

Eksekusi tetap dilakukan oleh Executor.

---

# Concurrency

Scheduler mengontrol jumlah task yang dapat berjalan secara bersamaan.

Contoh batas:

- Global Concurrency
- Workflow Concurrency
- Agent Concurrency
- Capability Concurrency
- Tenant Concurrency

Scheduler tidak melakukan load balancing.

---

# Execution Windows

Scheduler dapat membatasi waktu eksekusi.

Contoh:

- Office Hours
- Night Batch
- Weekend Only
- Maintenance Window

Task hanya dilepas apabila berada dalam execution window yang valid.

---

# Interaction

Scheduler berinteraksi dengan:

Runtime

- Planner
- Queue

Scheduler membaca:

- Execution Plan
- Runtime State

Scheduler tidak berinteraksi langsung dengan:

- Dispatcher
- Executor
- Agent
- Capability
- Provider

---

# Package Structure

```
scheduler/

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
├── scheduler.ts
├── trigger.ts
├── policy.ts
└── errors.ts
```

---

# Design Principles

Scheduler mengikuti prinsip berikut:

- Deterministic Scheduling
- Policy Driven
- Dependency Aware
- Time Aware
- Resource Aware
- Provider Agnostic
- Runtime Independent
- Scalable
- Stateless Processing

Scheduler hanya bertanggung jawab menentukan **kapan** sebuah task boleh dijalankan dan meneruskannya ke Queue. Seluruh proses eksekusi tetap menjadi tanggung jawab Executor.