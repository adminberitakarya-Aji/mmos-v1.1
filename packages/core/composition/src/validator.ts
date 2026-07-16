/**
 * MMOS Composition — JSON-Schema validator.
 *
 * Loads the canonical `schemas/composition.schema.json` (the source of
 * truth) and validates `Composition` objects against it. Uses `ajv` with
 * `ajv-formats` so `format: "date-time"`, `format: "uri"`, and other JSON
 * Schema Draft 2020-12 formats work out of the box.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import Ajv, { type ErrorObject, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

import type { Composition } from "./types";
import { CompositionValidationError } from "./errors";

// Resolve canonical schema path. We use `import.meta.url` because the
// package targets ESM (see root `package.json` `type: "module"`).
const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, "..", "..", "..", "..");
const SCHEMA_PATH = resolve(REPO_ROOT, "schemas", "composition.schema.json");

function loadCanonicalCompositionSchema(): Record<string, unknown> {
  return JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as Record<string, unknown>;
}

const ajv = new Ajv({
  allErrors: true,
  strict: false,
  allowUnionTypes: true,
});
addFormats(ajv);

const canonicalSchema = loadCanonicalCompositionSchema();
const validateSchema: ValidateFunction<Composition> = ajv.compile<Composition>(
  canonicalSchema as Parameters<typeof ajv.compile>[0],
);

function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) {
    return "Composition failed validation (no error details available)";
  }
  return errors
    .map((err) => {
      const at = err.instancePath || "/";
      return `${at} ${err.message ?? "is invalid"}${err.params ? ` (${JSON.stringify(err.params)})` : ""}`;
    })
    .join("; ");
}

export class DefaultCompositionValidator {
  validate(composition: Composition): void {
    const ok = validateSchema(composition);
    if (!ok) {
      throw new CompositionValidationError(formatErrors(validateSchema.errors), {
        metadata: {
          compositionId: composition.id,
          errorCount: validateSchema.errors?.length ?? 0,
        },
      });
    }
  }
}
