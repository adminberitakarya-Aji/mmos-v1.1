# ------------------------------------------------------------------------------
# MMOS v1.1 — top-level Makefile
# Mirrors the scripts in the root `package.json` for environments that prefer
# `make`. See `docs/development/getting-started.md` for details.
# ------------------------------------------------------------------------------

.PHONY: help install build build-shared build-core build-runtime build-orchestrator build-sdk build-cli build-ordered clean test test-watch typecheck lint format format-check ci

help:
	@echo "MMOS v1.1 — available targets:"
	@echo "  make install         - install workspace dependencies (pnpm)"
	@echo "  make build           - build all packages (ordered by dependency)"
	@echo "  make build-shared    - build only @mmos/shared (leaf dependency)"
	@echo "  make build-core      - build all @mmos/core-* packages"
	@echo "  make build-runtime   - build all @mmos/runtime-* packages"
	@echo "  make build-orchestrator - build @mmos/orchestrator"
	@echo "  make build-sdk       - build @mmos/sdk"
	@echo "  make build-cli       - build @mmos/cli"
	@echo "  make clean           - remove all dist/ folders"
	@echo "  make test            - run all tests"
	@echo "  make typecheck       - run tsc --noEmit across packages"
	@echo "  make lint            - run eslint across packages"
	@echo "  make format          - format with prettier"
	@echo "  make ci              - install + typecheck + lint + test + build"

install:
	pnpm install

build:
	pnpm build:ordered

build-shared:
	pnpm build:shared

build-core:
	pnpm build:core

build-runtime:
	pnpm build:runtime

build-orchestrator:
	pnpm build:orchestrator

build-sdk:
	pnpm build:sdk

build-cli:
	pnpm build:cli

build-ordered:
	pnpm build:ordered

clean:
	pnpm clean

test:
	pnpm test

typecheck:
	pnpm typecheck

lint:
	pnpm lint

format:
	pnpm format

format-check:
	pnpm format:check

ci: install typecheck lint test build
