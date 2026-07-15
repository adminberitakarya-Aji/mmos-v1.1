# CLAUDE.md — MMOS v1.1

Panduan kerja untuk Claude (Claude Code atau sesi chat manapun) saat membangun kode di repo ini. Baca file ini di awal sesi sebelum menyentuh kode apapun. Baca juga `docs/implementation-plan.md` — itu peta jalan eksekusi konkretnya, file ini cuma aturan main & hal yang jangan sampai diulang.

## Konteks proyek

MMOS (Media & Multimedia Orchestration System) adalah runtime orkestrasi AI provider-agnostic. `mmos-v1.1` adalah **penerus resmi** dari repo `mmos` (v1.0) — tapi **dibangun dari nol di repo ini**, bukan hasil pindahan kode. Yang dibawa dari v1.0 cuma dua hal: (1) pelajaran dari bug nyata yang pernah ditemukan (lihat bagian bawah), dan (2) semangat arsitekturnya. Jangan pernah asumsikan ada kode lama yang bisa disalin — repo ini genuinely dimulai kosong di `packages/`.

Repo ini **sudah punya spesifikasi lengkap** sebelum satu baris kode pun ditulis: `docs/` (arsitektur, runtime, SDK, provider, deployment) dan `schemas/` (JSON Schema Draft 2020-12 untuk semua domain object). Ini beda dari kebiasaan biasa "kode dulu, dokumentasi menyusul" — di sini **schema dan docs adalah source of truth**, kode mengikuti keduanya, bukan sebaliknya. Kalau menulis tipe domain object, cek dulu `schemas/*.schema.json` yang relevan — jangan menebak bentuknya sendiri.

## Struktur direktori (sudah ada, jangan diubah tanpa ADR)

```
mmos-v1.1/
├── docs/                 # Spesifikasi implementasi (SUDAH ADA, lengkap)
├── schemas/              # JSON Schema — source of truth domain model (SUDAH ADA, lengkap)
├── examples/             # Contoh executable
├── apps/                 # dashboard/ studio/ playground/ gateway/
├── packages/
│   ├── core/             # composition/ workflow/ task/ execution/ agent/
│   │                     #   capability/ artifact/ memory/ event/
│   ├── runtime/          # scheduler/ dispatcher/ executor/ planner/ queue/
│   ├── orchestrator/     # planner/ coordinator/ resolver/ router/
│   ├── sdk/              # go/ typescript/ python/
│   ├── cli/
│   └── shared/
├── providers/            # openai/ anthropic/ gemini/ qwen/ deepseek/ — DI LUAR packages/
├── services/
├── deployments/
├── configs/
├── scripts/
├── tools/
└── tests/
```

Semua ini didefinisikan di `docs/overview/030-repository.md` dan `docs/architecture/package-architecture.md` — baca situ untuk detail tanggung jawab tiap folder, jangan cuma tebak dari nama.

## Aturan dependensi (mutlak, dari `docs/architecture/dependency-graph.md`)

```
Apps → Services → SDK/CLI → Orchestrator → Runtime → Core
Providers → Core, Shared   (independen dari Runtime & Orchestrator)
```

**Dilarang keras** (langsung dari dokumen arsitektur, bukan interpretasi saya):
- Core → Runtime/Orchestrator/Providers/Services/Apps (Core tidak boleh bergantung ke apapun kecuali Shared)
- Runtime → Apps/Services/SDK
- Orchestrator → Apps/Providers (langsung)
- Providers → Runtime/Orchestrator/Services
- Shared → Core/Runtime/Orchestrator
- Circular dependency dalam bentuk apapun

Karena arah dependensinya cuma satu arah, **urutan pembangunan kode harus dimulai dari Core** (paling tidak bergantung ke apapun), baru naik ke Runtime, Orchestrator, dst. Detail urutan topological di dalam `packages/core/*` sendiri (9 sub-package saling bergantung) ada di `docs/implementation-plan.md` bagian 2b — ikuti itu, jangan bangun sub-package Core dalam urutan sembarangan.

## Model identitas & metadata (SUDAH DIDEFINISIKAN — jangan bikin sistem baru)

**PENTING — koreksi dari draf sebelumnya:** identitas di sini **bukan** `Uoid` gaya `mmos` v1.0 (3-huruf tipe + hash acak, divalidasi ketat sebagai class). Cek `schemas/common/identifier.schema.json` — identifier di sini cuma string bebas `1-128` karakter, pola `^[a-zA-Z0-9][a-zA-Z0-9._:-]*$` (boleh titik/titik-dua/strip). Semua contoh nyata di `examples/compositions/*/` pakai konvensi `tipe.nama` (`task.analyze-topic`, `agent.planner`, `capability.chat`, `composition.blog-generation`) — ikuti konvensi ini secara konsisten, tapi jangan implementasikan validasi seketat Uoid lama.

Primitif dasar **sudah didefinisikan penuh** di `schemas/common/`, jangan dibuat ulang:
- `identifier.schema.json` — bentuk id (lihat di atas)
- `metadata.schema.json` — objek terpisah dari id (`name`, `description`, `version` semver, `owner`/`createdBy`/`updatedBy` sebagai Reference, `createdAt`/`updatedAt` timestamp, `labels`, `annotations`, `tags`, `attributes`)
- `status.schema.json` — satu enum status lifecycle dipakai bersama semua domain object (`draft`, `active`, `inactive`, `pending`, `queued`, `running`, `paused`, `completed`, `failed`, `cancelled`, `timeout`, `archived`, `deleted`) — bukan union status sempit per-domain seperti di `mmos` lama
- `reference.schema.json` — bentuk "pointer" ke object lain (`id` wajib, plus `type`/`name`/`version`/`uri` opsional)

Jawaban untuk pertanyaan terbuka #1 di draf sebelumnya (ke mana Identity/Metadata tinggal): **`packages/core/shared` mengimplementasikan TS type + validator untuk keempat schema di atas** — bukan mendesain ulang dari nol. Cek schema dulu, jangan menebak bentuknya.

### Pertanyaan terbuka baru (ditemukan dari cross-check schema vs examples nyata)

**`task.schema.json` mewajibkan field `agent`/`capability` berupa objek PENUH** (`agent.schema.json` butuh `id`+`name`+`type`; `capability.schema.json` butuh `id`+`name`+`type`+`version`) — **tapi semua 7 contoh composition nyata di `examples/compositions/*/workflow.json` cuma pernah kasih `{"id": "agent.xxx"}`**, tidak pernah field lain. Ini konsisten di semua contoh, bukan kebetulan satu file. Kemungkinan besar `task.schema.json` seharusnya pakai `$ref: ./common/reference.schema.json` untuk field `agent`/`capability` (referensi ringan, resolve penuh belakangan di runtime), bukan schema objek penuh. **Konfirmasi ke user/pemilik schema sebelum `packages/core/task` diimplementasikan** — jangan asumsikan salah satu yang benar sepihak, karena ini menentukan bentuk tipe TypeScript-nya.
## STATUS SEKARANG

Repo baru mulai dari `docs/implementation-plan.md` (baru dibuat). Belum ada kode di `packages/`. Kerja pertama yang sudah dipetakan: `packages/core/shared` (identity/metadata primitif — bentuknya sudah jelas dari `schemas/common/*`, lihat bagian di atas) → `core/event` → urutan topological lengkap di implementation-plan.md bagian 2b.

**Pertanyaan terbuka yang belum terjawab** (jangan diputuskan sepihak, konfirmasi ke user dulu):
1. ~~Ke mana Identity/Metadata primitif tinggal?~~ **Sudah terjawab** — lihat bagian "Model identitas & metadata" di atas, bentuknya sudah didefinisikan penuh di `schemas/common/*`.
2. **`task.schema.json` field `agent`/`capability`: objek penuh atau referensi ringan?** Lihat bagian "Model identitas & metadata" di atas — semua contoh nyata pakai `{"id": "..."}` saja, tapi schema mewajibkan objek lengkap. Perlu konfirmasi sebelum `packages/core/task` ditulis.
3. Runtime punya `planner/` (per `docs/runtime/runtime.md`, level rendah: "prepare executable tasks") dan Orchestrator juga punya `planner/` (level tinggi: workflow planning). Kemungkinan disengaja (dua level abstraksi beda), tapi perlu didokumentasikan eksplisit biar tidak rancu saat ditulis kodenya.

## Tooling

- **Package manager: pnpm** (bukan npm) — sesuai `docs/development/getting-started.md`. Kemungkinan + Turborepo untuk task orchestration lintas package, konsisten dengan project lain (Klip, Hagumi, BerKa-Vid semua pakai pola ini).
- **Build**: `tsup` per package TypeScript, format ESM, **`dts: true` wajib** (lihat gotcha #5).
- **Test**: `vitest`.
- **TypeScript**: `strict: true`, `exactOptionalPropertyTypes: true`, `noUncheckedIndexedAccess: true` di `tsconfig.base.json` root.
- **Go SDK / Python SDK**: tooling native masing-masing (di luar pnpm workspace, tapi tetap satu monorepo).
- **CI**: dipasang sejak `packages/core/shared` pertama kali ditulis, BUKAN ditunda ke akhir (lihat "Production-readiness berjalan paralel" di implementation-plan.md bagian 4).

## Gotcha & bug yang SUDAH ditemukan di reference implementation sebelumnya — jangan reintroduksi ini

Ditemukan lewat audit nyata (clone, build, jalankan, test) pada `mmos` v1.0. Struktur repo ini JAUH lebih granular (9 sub-package Core saja, belum termasuk Runtime/Orchestrator) — artinya **risiko kelas bug ini lebih tinggi di sini**, bukan lebih rendah, karena makin banyak batas antar-package = makin banyak titik yang bisa salah urutan/salah wiring.

1. **Command injection.** Kalau ada capability/provider yang menjalankan proses eksternal, JANGAN gabungkan input jadi satu command string lalu `exec(shell:true)`. Default: `execFile()` dengan argumen array terpisah. Mode shell cuma opt-in eksplisit + escaping per-argumen.
2. **Scheduler harus mengecualikan task/execution yang sudah `completed`** dari daftar "ready" — bukan cuma cek dependensinya selesai, cek objeknya sendiri juga.
3. **Tie-breaker fairness/round-robin harus berbasis "kapan terakhir dilayani" (serve-order), bukan "kapan pertama dibuat" (creation-order).** Timestamp wall-clock 1ms tidak cukup presisi untuk tie-break di eksekusi cepat/sinkron.
4. **Package yang meng-`import` package lain via nama (bukan path relatif) butuh dependency-nya sudah ter-*build* (dist), bukan cuma ter-*typecheck*, sebelum package pengimpornya sendiri di-typecheck/test.** Dengan struktur sedalam ini, tambahkan step build eksplisit di CI untuk **setiap** layer package baru yang jadi dependency package lain — jangan asumsikan tooling monorepo otomatis mengurus urutan ini.
5. **Package dengan subpath `exports` di `package.json` WAJIB punya entry build yang sesuai + `dts: true`.** Janji di `package.json` yang tidak pernah benar-benar dibangun baru ketahuan saat ada consumer pertama yang benar-benar pakai — bisa lama tidak ketahuan.
6. **Komponen yang menerima dependency observability opsional (event bus, dsb.) akan diam-diam membuat instance sendiri kalau tidak diberi eksplisit.** Selalu oper instance yang sama secara eksplisit ke semua konstruktor yang perlu dengar event yang sama — kalau tidak, event hilang tanpa error apapun.
7. **Proses long-running (`services/`, `apps/gateway`, dst.) jangan busy-loop tanpa interval saat idle.** Pastikan ada interval minimum wajar, jangan cuma `setImmediate`/`process.nextTick` murni berulang.
8. **Jangan tulis script `lint` yang memanggil tool yang belum benar-benar di-install/dikonfigurasi.** Pastikan CI benar-benar MENJALANKAN lint, bukan cuma ada scriptnya di `package.json`.
9. **Setiap package butuh test yang benar-benar menjalankan kode**, terutama untuk apapun yang menjalankan proses eksternal/HTTP/shell command — bukan cuma typecheck atau baca kode. Bug #1 di atas baru ketahuan setelah ada test yang benar-benar mengeksekusi.

## Contoh nyata untuk validasi (SUDAH ADA — pakai ini, jangan bikin fixture sendiri dari nol)

`examples/compositions/` punya **7 composition lengkap** (blog-generation, image-generation, multimodal-content, news-production, podcast-production, social-media, video-production), masing-masing dengan `composition.json`, `workflow.json`, `provider.json`, `runtime.json`, `memory.json`, `input.json`, `expected-output.md`. Plus `examples/workflows/` (10 pola: conditional, event-driven, human-in-the-loop, long-running, loop, multi-agent, parallel, pipeline, scheduled, sequential), `examples/providers/`, `examples/memory/`, `examples/runtime/`, `examples/api/` (contoh HTTP request), dan `examples/sdk/{go,python,typescript}/`.

**Pakai file-file ini sebagai test fixture nyata** saat menulis `packages/core/*` — parse & validasi tiap package terhadap contoh yang relevan, bukan cuma unit test sintetis buatan sendiri. Kalau implementasi tidak bisa mem-parse salah satu contoh ini, itu sinyal ada yang salah (di implementasi ATAU di contohnya — lihat pertanyaan terbuka #2 di atas, ditemukan justru dari cross-check semacam ini).



Cek dulu `docs/implementation-plan.md` untuk urutan kerja, dan `docs/architecture/*` untuk aturan dependensi, sebelum membuat keputusan struktural. Kalau masih ragu atau keputusan menyimpang dari yang sudah dipetakan (terutama 2 pertanyaan terbuka di atas), tanya user dulu — progres kecil yang benar lebih baik daripada progres besar yang harus dirombak ulang.
