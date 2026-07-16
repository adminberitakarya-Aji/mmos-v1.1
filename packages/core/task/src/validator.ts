import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import Ajv, { type ErrorObject, type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

import type { Task } from "./types";
import { TaskValidationError } from "./errors";

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, "..", "..", "..", "..");
const SCHEMA_PATH = resolve(REPO_ROOT, "schemas", "task.schema.json");

function loadCanonicalTaskSchema(): Record<string, unknown> {
  return JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as Record<string, unknown>;
}

const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
addFormats(ajv);

const canonicalSchema = loadCanonicalTaskSchema();
const validateSchema: ValidateFunction<Task> = ajv.compile<Task>(
  canonicalSchema as Parameters<typeof ajv.compile>[0],
);

function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) {
    return "Task failed validation (no error details available)";
  }
  return errors
    .map((err) => {
      const at = err.instancePath || "/";
      return `${at} ${err.message ?? "is invalid"}${err.params ? ` (${JSON.stringify(err.params)})` : ""}`;
    })
    .join("; ");
}

export class DefaultTaskValidator {
  validate(task: Task): void {
    const ok = validateSchema(task) as boolean;
    if (!ok) {
      throw new TaskValidationError(formatErrors(validateSchema.errors), {
        metadata: {
          taskId: task.id,
          errorCount: validateSchema.errors?.length ?? 0,
        },
      });
    }
  }
}
