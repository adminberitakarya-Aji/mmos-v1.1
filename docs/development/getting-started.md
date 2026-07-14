# Getting Started

**Document ID:** getting-started
**Version:** 1.1
**Status:** Draft
**Audience:** Developers, Contributors

---

# Purpose

This guide helps developers set up the MMOS development environment and run the platform for the first time.

It provides a quick path from cloning the repository to understanding the overall project structure.

Detailed installation and deployment guides are documented separately.

---

# Prerequisites

Before working with MMOS, ensure the following tools are installed:

* Git
* Go (latest supported version)
* Node.js (LTS)
* pnpm
* Docker (recommended)
* Docker Compose (recommended)

Some components may require additional tools depending on the development task.

---

# Clone the Repository

Clone the official MMOS repository.

```bash
git clone https://github.com/mmos/mmos-v1.1.git
cd mmos-v1.1
```

---

# Explore the Repository

The repository is organized as a modular monorepo.

```text
mmos-v1.1/
│
├── docs/
├── schemas/
├── examples/
├── apps/
├── packages/
├── providers/
├── services/
├── deployments/
├── configs/
├── scripts/
├── tools/
└── tests/
```

Each directory has a dedicated responsibility.

Refer to `docs/overview/030-repository.md` for a detailed explanation of the repository organization.

---

# Install Dependencies

Install the required dependencies.

The exact commands may evolve as the implementation matures.

Typical setup includes:

```bash
pnpm install
```

and for Go modules:

```bash
go mod download
```

---

# Project Configuration

Copy the example environment file.

```bash
cp .env.example .env
```

Adjust configuration values as needed for your local environment.

Never commit secrets or private credentials to the repository.

---

# Build the Project

Build all packages.

```bash
make build
```

If Make is not available, equivalent build scripts are provided in the `scripts/` directory.

---

# Run the Platform

Start the development environment.

```bash
make dev
```

or use Docker Compose.

```bash
docker compose up
```

The exact startup process depends on the selected deployment model.

---

# Verify Installation

A successful setup should allow you to:

* Build the project without errors.
* Run the local development environment.
* Access the example applications.
* Execute the test suite.

---

# Run Tests

Execute all tests.

```bash
make test
```

A successful test run indicates that the local environment has been configured correctly.

---

# Repository Navigation

Developers typically work within one of the following areas:

| Directory  | Purpose                      |
| ---------- | ---------------------------- |
| apps/      | User-facing applications     |
| packages/  | Core platform implementation |
| providers/ | AI provider integrations     |
| services/  | Platform services            |
| tests/     | Test suites                  |
| docs/      | Project documentation        |

Understanding these directories is recommended before contributing.

---

# Recommended Reading

Before making code changes, read the following documents:

1. `docs/overview/000-overview.md`
2. `docs/overview/030-repository.md`
3. `docs/architecture/implementation-architecture.md`
4. `docs/architecture/package-architecture.md`

These documents explain the architectural principles that guide implementation.

---

# Next Steps

Once your environment is ready, you can:

* Explore the Core packages.
* Run example applications.
* Study the Runtime implementation.
* Implement new capabilities.
* Integrate AI providers.
* Contribute improvements through Pull Requests.

---

# Getting Help

If you encounter issues:

* Read the documentation.
* Review existing issues and discussions.
* Consult `SUPPORT.md`.
* Review `CONTRIBUTING.md` before submitting changes.

---

# Summary

You are now ready to explore and contribute to MMOS.

The project is designed as a modular, provider-agnostic AI orchestration platform where implementation follows the architectural specifications defined in MMOS v1.0.
