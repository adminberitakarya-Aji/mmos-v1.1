/**
 * MMOS Workflow — JSON-Schema validator.
 *
 * Loads the canonical `schemas/workflow.schema.json` and validates
 * `Workflow` objects against it.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import Ajv, { type ErrorObject, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

import type { Workflow } from "./types";
import { WorkflowValidationError } from "./errors";

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, "..", "..", "..", "..");
const SCHEMA_PATH = resolve(REPO_ROOT, "schemas", "workflow.schema.json");

function loadCanonicalWorkflowSchema(): Record<string, unknown> {
  return JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as Record<string, unknown>;
}

const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
addFormats(ajv);

const canonicalSchema = loadCanonicalWorkflowSchema();
const validateSchema: ValidateFunction<Workflow> = ajv.compile<Workflow>(
  canonicalSchema as Parameters<typeof ajv.compile>[0],
);

function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) {
    return "Workflow failed validation (no error details available)";
  }
  return errors
    .map((err) => {
      const at = err.instancePath || "/";
      return `${at} ${err.message ?? "is invalid"}${err.params ? ` (${JSON.stringify(err.params)})` : ""}`;
    })
    .join("; ");
}

export class DefaultWorkflowValidator {
  validate(workflow: Workflow): void {
    const ok = validateSchema(workflow) as boolean;
    if (!ok) {
      throw new WorkflowValidationError(formatErrors(validateSchema.errors), {
        metadata: {
          workflowId: workflow.id,
          errorCount: validateSchema.errors?.length ?? 0,
        },
      });
    }
  }
}
