# Queue

## Overview

Queue adalah komponen ketiga pada Runtime Engine yang bertanggung jawab sebagai **transport layer** antara Scheduler dan Dispatcher.

Queue menerima task yang telah dinyatakan **Ready** oleh Scheduler, menyimpannya sementara, mengatur urutan pengambilan, serta memastikan task dikirim secara andal kepada Dispatcher.

Queue **tidak menjalankan task**.

Queue juga **tidak memilih worker**.

```
Execution Plan
       │
       ▼
   Scheduler
       │
       ▼
     Queue
       │
       ▼
  Dispatcher
```

---

# Responsibilities

Queue bertanggung jawab untuk:

- Enqueue Task
- Dequeue Task
- Acknowledge (ACK)
- Negative Acknowledge (NACK)
- Retry Queue
- Dead Letter Queue (DLQ)
- Priority Queue
- Delayed Queue
- Queue Visibility
- Queue Metrics
- Queue Retention
- Queue Ordering

Queue hanya mengelola lifecycle task di dalam antrian.

---

# Scope

Queue bekerja menggunakan:

- Ready Tasks
- Queue Policies
- Retry Policies

Queue menghasilkan:

- Pending Queue
- Retry Queue
- Dead Letter Queue

Queue tidak:

- Menjalankan Task
- Memilih Worker
- Memanggil Agent
- Memanggil Capability
- Memanggil Provider
- Menentukan Dependency

---

# Runtime Flow

```
Ready Task
      │
      ▼
 Enqueue
      │
      ▼
 Pending Queue
      │
      ▼
 Dequeue
      │
      ▼
 Dispatcher
      │
      ├──────── ACK
      │
      └──────── NACK
                 │
                 ▼
           Retry Queue
                 │
                 ▼
          Dead Letter Queue
```

---

# Queue Lifecycle

Setiap task melewati lifecycle berikut.

```
Ready

↓

Enqueued

↓

Dequeued

↓

Dispatched

↓

ACK

atau

NACK

↓

Retry

↓

DLQ
```

---

# Queue Operations

## 1. Enqueue

Menambahkan task ke dalam Queue.

Scheduler hanya dapat melakukan enqueue terhadap task yang berstatus **Ready**.

---

## 2. Dequeue

Mengambil task berikutnya dari Queue.

Dispatcher mengambil task melalui operasi dequeue.

---

## 3. ACK

ACK menandakan task berhasil diterima dan diproses oleh Runtime.

Task kemudian dihapus dari Queue.

---

## 4. NACK

NACK menunjukkan task gagal diproses.

Task dapat:

- dikembalikan ke Queue
- dipindahkan ke Retry Queue
- dipindahkan ke Dead Letter Queue

---

## 5. Retry Queue

Task gagal disimpan sementara sebelum dicoba kembali.

Retry mengikuti kebijakan Scheduler.

Queue hanya menyimpan task.

---

## 6. Dead Letter Queue

Task yang melebihi batas retry dipindahkan ke Dead Letter Queue.

DLQ digunakan untuk:

- investigasi
- audit
- recovery manual

Task pada DLQ tidak diproses otomatis.

---

# Queue Types

Runtime mendukung beberapa jenis Queue.

## FIFO Queue

First In First Out.

```
A

↓

B

↓

C
```

---

## Priority Queue

Task diproses berdasarkan prioritas.

```
Critical

↓

High

↓

Normal

↓

Low
```

---

## Delayed Queue

Task disimpan hingga waktu tertentu.

Digunakan untuk:

- retry
- delay
- scheduled execution

---

## Dead Letter Queue

Queue khusus untuk task gagal permanen.

---

# Ordering

Queue menjaga urutan sesuai kebijakan.

Contoh:

- FIFO
- Priority
- Tenant Isolation
- Workflow Isolation

Ordering tidak mengubah dependency workflow.

---

# Reliability

Queue dirancang untuk menjamin pengiriman task.

Fitur yang didukung:

- At Least Once Delivery
- Visibility Timeout
- ACK/NACK
- Retry Queue
- Dead Letter Queue
- Duplicate Detection

---

# Metrics

Queue menyediakan metrik operasional.

Contoh:

- Queue Length
- Pending Tasks
- Retry Count
- DLQ Count
- Throughput
- Processing Rate
- Average Wait Time

---

# Interaction

Queue berinteraksi dengan:

Runtime

- Scheduler
- Dispatcher

Queue menerima:

- Ready Tasks

Queue mengirim:

- Queued Tasks

Queue tidak berinteraksi langsung dengan:

- Planner
- Executor
- Agent
- Capability
- Provider

---

# Package Structure

```
queue/

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
├── queue.ts
├── priority.ts
├── dlq.ts
└── errors.ts
```

---

# Design Principles

Queue mengikuti prinsip berikut:

- Reliable Delivery
- Decoupled Transport
- FIFO by Default
- Priority Aware
- Retry Friendly
- Durable
- Scalable
- Stateless Interface
- Provider Agnostic

Queue hanya bertanggung jawab mengelola antrian task yang siap dijalankan. Seluruh keputusan scheduling tetap berada pada Scheduler, sedangkan pemilihan worker dilakukan oleh Dispatcher dan eksekusi task dilakukan oleh Executor.