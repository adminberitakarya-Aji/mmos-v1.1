# Planner

## Overview

Planner adalah komponen pertama pada Runtime Engine yang bertanggung jawab mengubah sebuah **Composition** menjadi **Execution Plan** yang siap dijalankan oleh Runtime.

Planner **tidak menjalankan task**.

Planner hanya melakukan analisis, validasi, ekspansi workflow, resolusi dependency, dan optimisasi sehingga Scheduler dapat menjalankan workflow secara efisien.

```
Composition
      │
      ▼
 Workflow
      │
      ▼
   Planner
      │
      ▼
Execution Plan
```

---

# Responsibilities

Planner bertanggung jawab untuk:

- Build Execution Plan
- Workflow Expansion
- Dependency Resolution
- DAG (Directed Acyclic Graph) Generation
- Agent Resolution
- Capability Resolution
- Artifact Dependency Resolution
- Memory Dependency Resolution
- Parallel Planning
- Conditional Branch Expansion
- Loop Expansion
- Execution Optimization
- Validation sebelum runtime

Planner menghasilkan sebuah **Execution Plan** yang immutable selama proses eksekusi.

---

# Scope

Planner bekerja menggunakan object yang telah didefinisikan pada package Core.

Planner membaca:

- Composition
- Workflow
- Task
- Agent
- Capability
- Memory
- Artifact

Planner menghasilkan:

- Execution Plan

Planner tidak:

- Menjalankan Task
- Memanggil Provider
- Mengakses Queue
- Menjadwalkan Task
- Mengupdate Memory
- Membuat Artifact

---

# Execution Flow

```
Composition
      │
      ▼
Workflow
      │
      ▼
Validate
      │
      ▼
Expand Workflow
      │
      ▼
Resolve Dependencies
      │
      ▼
Resolve Agents
      │
      ▼
Resolve Capabilities
      │
      ▼
Generate DAG
      │
      ▼
Optimize
      │
      ▼
Execution Plan
```

---

# Planning Stages

Planner terdiri dari beberapa tahap utama.

## 1. Validation

Melakukan validasi seluruh Composition sebelum proses planning.

Contoh:

- workflow tersedia
- task valid
- dependency valid
- agent tersedia
- capability tersedia
- input valid
- output valid

Apabila ditemukan error maka planning dihentikan.

---

## 2. Workflow Expansion

Planner mengubah workflow menjadi graph runtime.

Contoh:

- Sequential
- Parallel
- Conditional
- Loop
- Nested Workflow
- Sub Workflow

Semua struktur tersebut diubah menjadi node runtime.

---

## 3. Dependency Resolution

Planner menentukan urutan eksekusi berdasarkan dependency.

Misalnya:

```
A

↓

B

↓

C
```

atau

```
      A
     / \
    B   C
     \ /
      D
```

Planner memastikan graph tidak memiliki dependency yang tidak valid.

---

## 4. Agent Resolution

Planner menentukan Agent yang akan digunakan oleh setiap task.

Misalnya:

```
Generate Blog

↓

Writer Agent
```

Jika task sudah menentukan agent secara eksplisit maka Planner menggunakan agent tersebut.

Jika tidak, Planner melakukan pencarian berdasarkan capability.

---

## 5. Capability Resolution

Planner menentukan capability yang dibutuhkan setiap task.

Contoh:

```
Generate Image

↓

image.generate
```

Planner hanya melakukan resolusi.

Capability baru dipanggil oleh Executor.

---

## 6. DAG Generation

Planner menghasilkan Directed Acyclic Graph (DAG).

Contoh:

```
      Start
        │
        ▼
   Collect Data
      /     \
     ▼       ▼
 Analyze   Summarize
      \     /
       ▼   ▼
      Publish
```

Scheduler menggunakan DAG ini untuk menentukan task yang dapat dijalankan secara paralel.

---

## 7. Optimization

Planner melakukan optimisasi terhadap Execution Plan.

Contoh optimisasi:

- menghapus node yang tidak digunakan
- menggabungkan dependency sederhana
- parallel grouping
- dependency flattening
- branch simplification
- capability reuse
- artifact reuse
- memory lookup reuse

Planner tidak mengubah semantik workflow.

---

# Execution Plan

Output Planner adalah Execution Plan.

Secara konseptual Execution Plan berisi:

- Plan ID
- Composition ID
- Workflow ID
- Node List
- Dependency Graph
- Parallel Groups
- Execution Order
- Agent Assignment
- Capability Assignment
- Artifact References
- Memory References
- Metadata

Execution Plan menjadi input utama Scheduler.

---

# Parallel Planning

Planner mengidentifikasi task yang dapat berjalan secara paralel.

Contoh:

```
      A
    / | \
   B  C  D
    \ | /
      E
```

Task B, C, dan D dapat dijalankan secara bersamaan karena tidak saling bergantung.

---

# Validation Rules

Planner melakukan validasi terhadap:

- Circular Dependency
- Missing Task
- Missing Agent
- Missing Capability
- Invalid Workflow
- Invalid Branch
- Invalid Loop
- Duplicate Node
- Invalid Output Mapping
- Invalid Input Mapping

Planning gagal apabila ditemukan pelanggaran aturan.

---

# Optimization Principles

Planner mengoptimalkan performa tanpa mengubah hasil eksekusi.

Prinsip optimisasi:

- Preserve semantics
- Preserve dependency
- Preserve ordering
- Maximize parallelism
- Reduce runtime overhead

---

# Interaction

Planner berinteraksi dengan:

Core Objects

- Composition
- Workflow
- Task
- Agent
- Capability
- Artifact
- Memory

Runtime

- Scheduler

Planner tidak berinteraksi langsung dengan:

- Queue
- Dispatcher
- Executor
- Provider

---

# Package Structure

```
planner/

README.md
package.json
tsconfig.json
index.ts

schemas/
└── execution-plan.schema.json

test/

src/
│
├── index.ts
├── types.ts
├── contracts.ts
├── constants.ts
├── planner.ts
├── optimizer.ts
├── resolver.ts
└── errors.ts
```

---

# Design Principles

Planner mengikuti prinsip berikut:

- Pure planning
- Deterministic
- Immutable output
- No side effects
- Provider agnostic
- Runtime independent
- Optimized for parallel execution
- Single responsibility

Planner hanya bertanggung jawab menghasilkan Execution Plan yang valid, lengkap, dan optimal untuk dieksekusi oleh Runtime.