# MMOS v1.1 — Implementation Plan

**Document ID:** implementation-plan
**Version:** 1.1
**Status:** Draft
**Audience:** Developers, Contributors, Architects

---

## Purpose

Dokumen ini menerjemahkan `docs/overview/020-roadmap.md` (fase-fase besar) dan `docs/architecture/*` (aturan dependensi) menjadi **urutan kerja konkret**: package apa dibangun duluan, dalam urutan apa, dan kenapa. Dokumen ini tidak mendefinisikan ulang arsitektur — itu tetap tanggung jawab `docs/architecture/`. Ini murni peta jalan eksekusi.

Repo ini dimulai dari nol (tidak memindahkan kode dari repo `mmos` v1.0/lama) — tapi tetap membawa **pelajaran dari bug nyata** yang ditemukan saat membangun reference implementation sebelumnya. Lihat bagian "Pelajaran yang wajib dibawa" di bawah — ini bukan teori, ini bug yang benar-benar terjadi.

---

## 0. Keputusan tooling (perlu dikonfirmasi, bukan final)

`docs/development/getting-started.md` menyebut **pnpm** sebagai package manager. Rekomendasi:

- **Package manager:** pnpm workspaces (+ Turborepo untuk task orchestration & caching lintas package — pola yang sudah dipakai konsisten di project lain)
- **Build:** `tsup` per package TypeScript (ESM only, `dts: true` wajib — lihat pelajaran #5)
- **Test:** `vitest`
- **TypeScript:** `strict: true`, `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true` di `tsconfig.base.json` root — semua package TypeScript extends ini
- **Go SDK & Python SDK:** tooling native masing-masing bahasa (go modules, poetry/uv) — di luar scope pnpm workspace, tapi tetap satu monorepo

Ini asumsi kerja, bukan keputusan terkunci — sesuaikan kalau ada preferensi lain.

---

## 1. Urutan besar mengikuti dependency graph, bukan nomor fase

`docs/architecture/dependency-graph.md` sudah menetapkan arah dependensi:

```
Apps → Services → SDK/CLI → Orchestrator → Runtime → Core
Providers → Core, Shared (independen dari Runtime/Orchestrator)
```

Karena dependensi cuma satu arah, urutan pembangunan **harus** ikut arah ini terbalik — mulai dari yang paling tidak bergantung ke apapun:

1. **Shared** (Phase 2 prasyarat, tidak disebut eksplisit di roadmap tapi wajib ada duluan — logging, config, error handling, validation, serialization dasar)
2. **Core** (Phase 2) — bisa dibangun begitu Shared ada
3. **Providers** (bisa paralel dengan Runtime — Providers cuma butuh Core+Shared, TIDAK butuh Runtime/Orchestrator)
4. **Runtime** (Phase 3) — butuh Core
5. **Orchestrator** (Phase 4) — butuh Runtime+Core
6. **SDK & CLI** (Phase 6) — bicara ke platform lewat Public API, bukan import internal
7. **Services** (Phase 7, termasuk Gateway/Dashboard API)
8. **Apps** (Phase 8)
9. **Production readiness** (Phase 9) — CI/CD, Docker, K8s, observability — **berjalan paralel sejak Phase 2**, bukan ditunda sampai akhir (lihat pelajaran #4 & #9)

---

## 2. Milestone langsung: Phase 2 — Core

Ini kerja pertama yang bisa langsung dimulai. `docs/architecture/package-architecture.md` menetapkan 9 sub-package di `packages/core/`. Tapi 9 sub-package ini **tidak independen satu sama lain** — begitu masing-masing jadi package npm terpisah (bukan satu package besar), urutan build internal antar mereka jadi penting (lihat pelajaran #4).

### 2a. Yang sudah terjawab, dan yang masih terbuka

**Identity/Metadata — sudah terjawab, bukan pertanyaan terbuka lagi.** `schemas/common/` sudah mendefinisikan penuh: `identifier.schema.json` (string bebas 1-128 karakter, pola `^[a-zA-Z0-9][a-zA-Z0-9._:-]*$` — **bukan** `Uoid` gaya `mmos` v1.0 yang divalidasi ketat sebagai class 3-huruf-tipe), `metadata.schema.json` (objek terpisah dari id: name/description/version/owner/timestamps/labels/tags/attributes), `status.schema.json` (satu enum lifecycle dipakai bersama semua domain object, 13 state), `reference.schema.json` (bentuk pointer ke object lain). `packages/core/shared` tinggal mengimplementasikan TS type + validator untuk keempat ini — jangan didesain ulang.

**Baru ditemukan — field `agent`/`capability` di `task.schema.json`: objek penuh atau referensi ringan?** `task.schema.json` mewajibkan `agent` berupa objek `agent.schema.json` penuh (butuh `id`+`name`+`type`) dan `capability` berupa objek `capability.schema.json` penuh (butuh `id`+`name`+`type`+`version`). Tapi **ke-7 contoh composition nyata di `examples/compositions/*/workflow.json` konsisten cuma memberi `{"id": "agent.xxx"}`** — tidak pernah field lain. Ini bukan kebetulan satu file, ini pola di semua contoh. Kemungkinan besar `task.schema.json` seharusnya mengacu ke `common/reference.schema.json` (referensi ringan, resolusi penuh terjadi di runtime saat eksekusi), bukan schema objek penuh — tapi ini keputusan pemilik schema, bukan sesuatu yang boleh diasumsikan sepihak saat menulis `packages/core/task`. **Konfirmasi dulu sebelum core/task ditulis.**

**Runtime punya `planner/` sendiri, Orchestrator juga.** (Tetap terbuka — lihat draf sebelumnya.) `docs/runtime/runtime.md` menyebut Planner sebagai komponen Runtime level rendah ("prepare executable tasks"), sementara Orchestrator's planner beroperasi di level lebih tinggi (workflow planning). Kemungkinan disengaja, tapi perlu didokumentasikan eksplisit perbedaannya saat masing-masing ditulis.

### 2b. Urutan internal sub-package Core (topological, berdasar `schemas/README.md` + semantik domain)

```
1. core/shared        (Identity/Uoid, Metadata, Specification, Status, Relationships — lihat 2a)
2. core/event          (tidak bergantung ke domain object lain — dipakai semua sebagai observability)
3. core/artifact
4. core/capability     (schemas/capability.schema.json)
5. core/agent
6. core/task           (bergantung ke capability + agent — task punya capabilityUoid & agentUoid)
7. core/workflow       (bergantung ke task — workflow = graf task + transitions)
8. core/composition    (bergantung ke workflow — composition = kumpulan workflow jadi satu rencana)
9. core/execution      (bergantung ke workflow + task — melacak instance eksekusi)
10. core/memory        (bergantung ke execution — memory = konteks eksekusi)
```

Urutan ini mengikuti rantai yang sudah tersirat di `schemas/README.md`: `Composition → Workflow → Task → Capability → Provider`, diperluas dengan Agent/Execution/Memory/Event/Artifact sesuai ketergantungan semantik masing-masing.

**Setiap sub-package harus:**
- Divalidasi terhadap schema JSON yang sudah ada di `schemas/*.schema.json` (schema adalah source of truth, bukan tipe TypeScript yang ditulis manual dulu baru schema menyusul)
- Dibangun (`tsup` build, `dts: true`) sebelum sub-package berikutnya di urutan atas mulai mengimpornya sebagai dependency
- Publish subpath export yang jelas (`@mmos/core-task`, dst. atau workspace equivalent) — **jangan janjikan subpath di `package.json` yang tidak benar-benar dibangun** (pelajaran #5)

---

## 3. Pelajaran yang wajib dibawa (dari bug nyata, bukan teori)

Ditemukan lewat proses audit-bangun-uji nyata pada reference implementation sebelumnya. Karena struktur repo ini jauh lebih granular (9 sub-package Core saja, belum termasuk Runtime/Orchestrator yang juga dipecah), **risiko kelas bug ini justru lebih tinggi di sini**, bukan lebih rendah.

1. **Command injection**: kalau ada capability/provider yang menjalankan proses eksternal (shell command), JANGAN gabungkan input task ke satu string lalu `exec(shell:true)`. Default harus `execFile()` dengan argumen array terpisah; mode shell hanya opt-in eksplisit + escaping per-argumen.
2. **Scheduler harus mengecualikan yang sudah selesai**: cek dependency-evaluator/scheduler manapun — task/execution yang sudah `completed` tidak boleh terus dianggap "ready".
3. **Tie-breaker fairness harus berbasis "kapan terakhir dilayani" (serve-order), bukan "kapan pertama dibuat"**: timestamp wall-clock 1ms tidak cukup presisi untuk round-robin saat eksekusi cepat.
4. **Setiap package yang meng-`import` package lain via nama (bukan path relatif) butuh dependency-nya sudah ter-*build* (dist), bukan cuma ter-*typecheck*, sebelum dirinya sendiri di-typecheck/test.** Dengan 9 sub-package Core + beberapa sub-package Runtime/Orchestrator, ini akan terjadi berlapis-lapis — **buat urutan build eksplisit di CI untuk SETIAP layer**, jangan andalkan asumsi "workspace tool pasti ngurus ini otomatis".
5. **Setiap package yang punya subpath `exports` di `package.json` harus punya entry build yang sesuai + `dts: true`.** Janji di `package.json` yang tidak pernah benar-benar dibangun baru ketahuan saat ada consumer pertama yang pakai — bisa lama tidak disadari.
6. **Komponen yang menerima `eventBus`/dependency observability opsional akan diam-diam membuat instance sendiri kalau tidak diberi eksplisit** — pastikan satu instance yang sama dioper ke semua konstruktor yang butuh dengar event yang sama, atau event akan hilang tanpa error apapun.
7. **Proses long-running (server/service apapun di `services/` atau `apps/`) jangan pakai busy-loop tanpa interval** untuk mode idle — pastikan ada interval minimum yang wajar, jangan cuma `setImmediate`/`process.nextTick` murni.
8. **Jangan tulis script `lint` yang memanggil tool yang belum benar-benar di-install/dikonfigurasi.** Ini baru ketahuan kalau ada yang benar-benar menjalankannya di CI — pastikan CI benar-benar menjalankan lint, bukan cuma ada scriptnya.
9. **Setiap package butuh test nyata yang benar-benar menjalankan kode** (bukan cuma baca/typecheck) — terutama untuk apapun yang menjalankan proses eksternal, HTTP call, atau perintah shell. Bug command injection di atas baru ketahuan setelah ada test yang benar-benar mengeksekusi, bukan cuma dibaca kodenya.

---

## 4. Production-readiness berjalan paralel, bukan di akhir

Roadmap menempatkan "Phase 9 — Production Readiness" (CI/CD, Docker, K8s, observability) di akhir daftar. **Rekomendasi: jangan tunda CI/CD sampai akhir.** Setup CI dasar (typecheck + test + build, dengan urutan build eksplisit per pelajaran #4) sejak `packages/core/shared` pertama kali ditulis — supaya urutan build yang benar terpasang sejak awal, bukan ditambal belakangan setelah lusinan package sudah saling bergantung secara tidak konsisten.

---

## 5. Contoh nyata sudah tersedia — pakai sebagai test fixture, bukan cuma dokumentasi

`examples/compositions/` sudah berisi **7 composition lengkap dan siap pakai** (blog-generation, image-generation, multimodal-content, news-production, podcast-production, social-media, video-production) — masing-masing dengan `composition.json`, `workflow.json`, `provider.json`, `runtime.json`, `memory.json`, `input.json`, `expected-output.md`. Ditambah `examples/workflows/` (10 pola workflow), `examples/providers/`, `examples/memory/`, `examples/runtime/`, `examples/api/`, dan `examples/sdk/{go,python,typescript}/`.

Ini sumber daya besar yang belum dimanfaatkan: setiap sub-package Core yang ditulis (bagian 2b) harus divalidasi terhadap contoh-contoh ini, bukan cuma terhadap JSON Schema secara abstrak dan unit test sintetis. Cross-check semacam ini yang menemukan ketidakcocokan `agent`/`capability` di atas — kemungkinan besar ada ketidakcocokan lain yang belum ketahuan sampai benar-benar dicoba parse.

**Rekomendasi konkret:** begitu `packages/core/task` (atau workflow, composition) selesai ditulis, langkah validasi terakhir sebelum dianggap "selesai" adalah: parse ke-7 `workflow.json`/`composition.json` di `examples/compositions/` dengan implementasi yang baru ditulis. Kalau ada yang gagal parse, itu sinyal — investigasi apakah bug di implementasi atau ketidakcocokan di contoh/schema (jangan asumsikan otomatis salah satu).

---

## 6. Ringkasan langkah selanjutnya

1. Konfirmasi 2 pertanyaan terbuka yang masih tersisa di bagian 2a (bentuk field `agent`/`capability` di `task.schema.json`; hubungan dua "planner") — lokasi Identity/Metadata sudah terjawab, tidak perlu dikonfirmasi lagi
2. Setup monorepo tooling dasar (pnpm workspace + Turborepo + tsconfig.base.json + CI skeleton) — sebelum kode domain pertama ditulis
3. Bangun `packages/core/shared` → validasi terhadap `schemas/common/*`
4. Lanjut ke `core/event`, lalu urutan topological di bagian 2b, masing-masing divalidasi terhadap schema JSON yang sudah ada
5. Setiap sub-package selesai → tambah step build eksplisit di CI sebelum lanjut ke sub-package berikutnya yang bergantung padanya
6. Setiap sub-package selesai → validasi juga terhadap contoh nyata relevan di `examples/compositions/` (bagian 5), bukan cuma unit test sintetis
