/**
 * Timestamp helpers — backed by ISO-8601 strings (mirrors
 * `schemas/common/timestamp.schema.json`).
 */

export type Timestamp = string;

export const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export function nowIso(): Timestamp {
  return new Date().toISOString();
}

export function isValidTimestamp(value: unknown): value is Timestamp {
  return typeof value === "string" && TIMESTAMP_PATTERN.test(value);
}
