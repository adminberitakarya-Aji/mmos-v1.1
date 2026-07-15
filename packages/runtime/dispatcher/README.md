# Dispatcher

## Overview

Dispatcher adalah komponen keempat pada Runtime Engine yang bertanggung jawab menentukan **siapa** yang akan menjalankan sebuah task.

Dispatcher menerima task dari Queue, memilih worker yang paling sesuai berdasarkan routing dan load balancing, kemudian meneruskan task tersebut ke Executor.

Dispatcher **tidak menjalankan task**.

Dispatcher juga **tidak menentukan kapan task dijalankan**.

```
Queue
   │
   ▼
Dispatcher
   │
   ▼
Executor
```

---

# Responsibilities

Dispatcher bertanggung jawab untuk:

- Worker Selection
- Worker Discovery
- Agent Routing
- Capability Routing
- Queue Routing
- Load Balancing
- Worker Scoring
- Worker Affinity
- Health Check Evaluation
- Dispatch Decision
- Failover Routing
- Dispatch Metrics

Dispatcher menghasilkan keputusan routing menuju Executor.

---

# Scope

Dispatcher bekerja menggunakan:

- Queued Tasks
- Worker Registry
- Runtime State
- Routing Policy

Dispatcher menghasilkan:

- Dispatch Decision
- Assigned Worker
- Routed Task

Dispatcher tidak:

- Menjalankan Task
- Mengatur Dependency
- Menjadwalkan Task
- Mengakses Provider
- Mengubah Workflow

---

# Runtime Flow

```
Queued Task
      │
      ▼
Worker Discovery
      │
      ▼
Routing
      │
      ▼
Load Balancing
      │
      ▼
Worker Selection
      │
      ▼
Dispatch
      │
      ▼
Executor
```

---

# Dispatch Stages

Dispatcher terdiri dari beberapa tahap utama.

## 1. Worker Discovery

Dispatcher menemukan seluruh worker yang tersedia.

Contoh:

- Local Worker
- Remote Worker
- Dedicated Worker
- Shared Worker

Worker yang tidak sehat tidak akan dipilih.

---

## 2. Routing

Dispatcher menentukan tujuan task.

Routing dapat berdasarkan:

- Agent
- Capability
- Tenant
- Queue
- Region
- Deployment

Routing menghasilkan daftar kandidat worker.

---

## 3. Worker Scoring

Setiap worker diberikan skor.

Contoh parameter:

- Current Load
- CPU Usage
- Memory Usage
- Queue Length
- Average Latency
- Health Status

Worker dengan skor terbaik dipilih.

---

## 4. Load Balancing

Dispatcher mendistribusikan task secara merata.

Strategi yang didukung:

- Round Robin
- Least Loaded
- Weighted
- Random
- Resource Aware
- Affinity Based

---

## 5. Dispatch

Dispatcher mengirim task ke Executor.

Task kemudian keluar dari Queue dan memasuki tahap eksekusi.

---

# Routing Strategy

Dispatcher mendukung berbagai strategi routing.

Contoh:

- Agent Routing
- Capability Routing
- Tenant Routing
- Workflow Routing
- Region Routing
- Local First
- Remote First

Routing bersifat pluggable.

---

# Worker Selection

Worker dipilih berdasarkan:

- Health
- Availability
- Capacity
- Capability
- Priority
- Affinity
- Policy

Dispatcher tidak memilih worker yang sedang offline.

---

# Load Balancing

Dispatcher mendukung beberapa algoritma.

- Round Robin
- Least Connections
- Least Loaded
- Weighted Round Robin
- Random
- Resource Aware

Pemilihan algoritma dapat dikonfigurasi.

---

# Failover

Apabila worker gagal menerima task:

```
Worker A

↓

Failed

↓

Worker B

↓

Success
```

Dispatcher dapat melakukan rerouting sesuai policy.

---

# Health Check

Dispatcher mempertimbangkan status worker.

Contoh:

- Healthy
- Busy
- Degraded
- Offline
- Maintenance

Worker yang tidak memenuhi syarat tidak akan menerima task.

---

# Metrics

Dispatcher menyediakan metrik operasional.

Contoh:

- Dispatch Count
- Success Rate
- Failed Dispatch
- Average Dispatch Time
- Worker Utilization
- Routing Distribution
- Failover Count

---

# Interaction

Dispatcher berinteraksi dengan:

Runtime

- Queue
- Executor

Dispatcher membaca:

- Queued Tasks
- Worker Registry
- Runtime State

Dispatcher tidak berinteraksi langsung dengan:

- Planner
- Scheduler
- Agent
- Capability
- Provider

---

# Package Structure

```
dispatcher/

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
├── dispatcher.ts
├── router.ts
├── balancer.ts
└── errors.ts
```

---

# Design Principles

Dispatcher mengikuti prinsip berikut:

- Stateless Dispatching
- Policy Driven
- Pluggable Routing
- Health Aware
- Load Aware
- Provider Agnostic
- Horizontally Scalable
- Fault Tolerant

Dispatcher hanya bertanggung jawab menentukan **siapa** yang menjalankan sebuah task dan meneruskannya ke Executor. Seluruh proses eksekusi tetap menjadi tanggung jawab Executor.