# @mmos/core-artifact

Artifact merupakan **hasil (output) yang dihasilkan selama proses eksekusi MMOS**.

Artifact dapat berupa teks, gambar, video, audio, dokumen, dataset, metadata, maupun object lainnya yang dihasilkan oleh Agent, Capability, ataupun Workflow.

Artifact adalah **domain object** yang merepresentasikan aset digital, sedangkan penyimpanan fisik (filesystem, object storage, CDN, database) merupakan tanggung jawab Storage Provider.

Package ini menyediakan:

- Artifact domain model
- Artifact metadata
- Artifact type definition
- Artifact registry contract
- Error definitions

Package ini **tidak menyimpan file secara langsung**. Penyimpanan dilakukan oleh Storage Provider.

---

# Architecture

```
Composition
      │
      ▼
Workflow
      │
      ▼
Task
      │
      ▼
Execution
      │
      ▼
Artifact
      │
      ▼
Storage Provider
```

Artifact menjadi media pertukaran data antar Task, Workflow, maupun Composition.

Sesuai ADR MMOS:

- Task Produces Artifact
- Execution Owns Artifact
- Artifact Stored by Provider
- Workflow Consumes Artifact

---

# Features

- Artifact domain model
- Metadata definition
- MIME type definition
- Content reference
- Versioning
- Checksum
- Registry abstraction
- Storage agnostic

---

# Installation

```bash
pnpm add @mmos/core-artifact
```

---

# Package Structure

```
artifact/

README.md
package.json
tsconfig.json
index.ts

schemas/
    artifact.schema.json

src/
    index.ts
    types.ts
    contracts.ts
    constants.ts
    registry.ts
    errors.ts

test/
```

---

# Artifact Lifecycle

Artifact merupakan domain definition.

```
Created
    │
    ▼
Registered
    │
    ▼
Available
    │
    ▼
Archived
    │
    ▼
Deleted
```

Lifecycle storage bukan bagian dari package ini.

---

# Usage

## Create Artifact

```ts
const artifact = {

    apiVersion: "mmos/v1",

    kind: "Artifact",

    metadata: {

        name: "generated-article",

        version: "1.0.0"

    },

    spec: {

        type: "text",

        mimeType: "text/markdown",

        uri: "artifact://generated/article.md"

    }

};
```

---

## Register Artifact

```ts
await registry.register(artifact);
```

---

## Resolve Artifact

```ts
const artifact =
    await registry.get("generated-article");
```

---

# Supported Artifact Types

MMOS mendukung berbagai jenis Artifact.

- text
- image
- audio
- video
- document
- dataset
- json
- binary
- archive

Jenis baru dapat ditambahkan melalui plugin.

---

# URI

Artifact menggunakan URI agar tidak bergantung pada storage tertentu.

Contoh:

```
artifact://workspace/news.md

file:///tmp/output.txt

s3://bucket/video.mp4

gs://bucket/image.png

https://cdn.example.com/image.jpg
```

Runtime akan menerjemahkan URI melalui Storage Provider.

---

# Registry

Package hanya mendefinisikan kontrak Registry.

Implementasi dapat berupa:

- Memory Registry
- File Registry
- Database Registry
- Object Storage Registry
- Remote Registry

---

# Errors

Package menyediakan error bawaan.

- ArtifactError
- ArtifactNotFoundError
- ArtifactAlreadyExistsError
- InvalidArtifactTypeError
- InvalidArtifactUriError

Seluruh error merupakan turunan dari `ArtifactError`.

---

# Design Principles

Package mengikuti prinsip MMOS.

- Artifact adalah domain object.
- Artifact immutable.
- Artifact tidak menyimpan isi file.
- Artifact hanya menyimpan metadata.
- Storage dikelola Provider.
- URI bersifat provider-agnostic.
- Registry hanya menyimpan metadata.

---

# Dependencies

- TypeScript

Package tidak bergantung pada filesystem maupun cloud provider tertentu.

---

# Testing

Menjalankan unit test:

```bash
pnpm test
```

Coverage:

```bash
pnpm test:coverage
```

---

# Related Packages

- @mmos/core-task
- @mmos/core-execution
- @mmos/core-workflow
- @mmos/core-memory
- @mmos/providers-storage

---

# License

Apache-2.0