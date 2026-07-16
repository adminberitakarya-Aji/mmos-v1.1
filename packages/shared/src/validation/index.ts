/**
 * MMOS Shared Validation
 * 
 * AJV-based validators compiled from JSON Schemas in schemas/common/
 * Source of truth: JSON Schema files (not this code)
 */

import Ajv, { type ErrorObject } from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import type { Identifier, Timestamp, MmosStatus, Reference, Metadata, MmosError, Pagination, Response } from '../types';

// Simple error text formatter (avoiding import issues)
function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) return 'Unknown validation error';
  return errors.map(e => `${e.instancePath || e.schemaPath} ${e.message}`).join('; ');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize AJV with strict mode
const ajv = new Ajv({
  strict: true,
  allErrors: true,
  verbose: true,
  validateFormats: true,
});

addFormats(ajv);

// ============================================
// Load and compile schemas
// ============================================

function loadSchema(schemaName: string): object {
  const schemaPath = path.resolve(__dirname, `../../../schemas/common/${schemaName}.schema.json`);
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  return JSON.parse(schemaContent);
}

const identifierSchema = loadSchema('identifier');
const metadataSchema = loadSchema('metadata');
const statusSchema = loadSchema('status');
const referenceSchema = loadSchema('reference');
const timestampSchema = loadSchema('timestamp');
const errorSchema = loadSchema('error');
const paginationSchema = loadSchema('pagination');
const responseSchema = loadSchema('response');

// Add schemas to AJV for $ref resolution
ajv.addSchema(identifierSchema, 'https://schemas.mmos.dev/v1/common/identifier.schema.json');
ajv.addSchema(metadataSchema, 'https://schemas.mmos.dev/v1/common/metadata.schema.json');
ajv.addSchema(statusSchema, 'https://schemas.mmos.dev/v1/common/status.schema.json');
ajv.addSchema(referenceSchema, 'https://schemas.mmos.dev/v1/common/reference.schema.json');
ajv.addSchema(timestampSchema, 'https://schemas.mmos.dev/v1/common/timestamp.schema.json');
ajv.addSchema(errorSchema, 'https://schemas.mmos.dev/v1/common/error.schema.json');
ajv.addSchema(paginationSchema, 'https://schemas.mmos.dev/v1/common/pagination.schema.json');
ajv.addSchema(responseSchema, 'https://schemas.mmos.dev/v1/common/response.schema.json');

// Compile validators
const validateIdentifier = ajv.compile<Identifier>(identifierSchema);
const validateMetadata = ajv.compile<Metadata>(metadataSchema);
const validateStatus = ajv.compile<MmosStatus>(statusSchema);
const validateReference = ajv.compile<Reference>(referenceSchema);
const validateTimestamp = ajv.compile<Timestamp>(timestampSchema);
const validateError = ajv.compile<MmosError>(errorSchema);
const validatePagination = ajv.compile<Pagination>(paginationSchema);
const validateResponse = ajv.compile<Response>(responseSchema);

// ============================================
// Type-safe validation helpers
// ============================================

/**
 * Assert that a value is a valid Identifier
 */
export function assertIdentifier(value: unknown): asserts value is Identifier {
  if (!validateIdentifier(value)) {
    throw new AjvValidationError('identifier', validateIdentifier.errors);
  }
}

/**
 * Assert that a value is a valid Timestamp
 */
export function assertTimestamp(value: unknown): asserts value is Timestamp {
  if (!validateTimestamp(value)) {
    throw new AjvValidationError('timestamp', validateTimestamp.errors);
  }
}

/**
 * Assert that a value is a valid MmosStatus
 */
export function assertStatus(value: unknown): asserts value is MmosStatus {
  if (!validateStatus(value)) {
    throw new AjvValidationError('status', validateStatus.errors);
  }
}

/**
 * Assert that a value is a valid Reference
 */
export function assertReference(value: unknown): asserts value is Reference {
  if (!validateReference(value)) {
    throw new AjvValidationError('reference', validateReference.errors);
  }
}

/**
 * Assert that a value is valid Metadata
 */
export function assertMetadata(value: unknown): asserts value is Metadata {
  if (!validateMetadata(value)) {
    throw new AjvValidationError('metadata', validateMetadata.errors);
  }
}

/**
 * Assert that a value is a valid MmosError
 */
export function assertError(value: unknown): asserts value is MmosError {
  if (!validateError(value)) {
    throw new AjvValidationError('error', validateError.errors);
  }
}

/**
 * Assert that a value is valid Pagination
 */
export function assertPagination(value: unknown): asserts value is Pagination {
  if (!validatePagination(value)) {
    throw new AjvValidationError('pagination', validatePagination.errors);
  }
}

/**
 * Assert that a value is a valid Response
 */
export function assertResponse(value: unknown): asserts value is Response {
  if (!validateResponse(value)) {
    throw new AjvValidationError('response', validateResponse.errors);
  }
}

// ============================================
// Validation result types
// ============================================

/**
 * Result of validation - success with data or failure with errors
 */
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: ErrorObject[] };

/**
 * Validate and return result object (no throwing)
 */
export function validateIdentifierSafe(value: unknown): ValidationResult<Identifier> {
  const valid = validateIdentifier(value);
  return valid
    ? { success: true, data: value as Identifier }
    : { success: false, errors: validateIdentifier.errors ?? [] };
}

export function validateTimestampSafe(value: unknown): ValidationResult<Timestamp> {
  const valid = validateTimestamp(value);
  return valid
    ? { success: true, data: value as Timestamp }
    : { success: false, errors: validateTimestamp.errors ?? [] };
}

export function validateStatusSafe(value: unknown): ValidationResult<MmosStatus> {
  const valid = validateStatus(value);
  return valid
    ? { success: true, data: value as MmosStatus }
    : { success: false, errors: validateStatus.errors ?? [] };
}

export function validateReferenceSafe(value: unknown): ValidationResult<Reference> {
  const valid = validateReference(value);
  return valid
    ? { success: true, data: value as Reference }
    : { success: false, errors: validateReference.errors ?? [] };
}

export function validateMetadataSafe(value: unknown): ValidationResult<Metadata> {
  const valid = validateMetadata(value);
  return valid
    ? { success: true, data: value as Metadata }
    : { success: false, errors: validateMetadata.errors ?? [] };
}

export function validateErrorSafe(value: unknown): ValidationResult<MmosError> {
  const valid = validateError(value);
  return valid
    ? { success: true, data: value as MmosError }
    : { success: false, errors: validateError.errors ?? [] };
}

export function validatePaginationSafe(value: unknown): ValidationResult<Pagination> {
  const valid = validatePagination(value);
  return valid
    ? { success: true, data: value as Pagination }
    : { success: false, errors: validatePagination.errors ?? [] };
}

export function validateResponseSafe(value: unknown): ValidationResult<Response> {
  const valid = validateResponse(value);
  return valid
    ? { success: true, data: value as Response }
    : { success: false, errors: validateResponse.errors ?? [] };
}

// ============================================
// Custom error class
// ============================================

/**
 * Custom error class for AJV validation failures
 */
export class AjvValidationError extends Error {
  public readonly schemaName: string;
  public readonly errors: ErrorObject[] | null | undefined;

  constructor(schemaName: string, errors: ErrorObject[] | null | undefined) {
    const message = `Validation failed for ${schemaName}: ${formatErrors(errors)}`;
    super(message);
    this.name = 'AjvValidationError';
    this.schemaName = schemaName;
    this.errors = errors;
  }
}

// ============================================
// Generic validation by schema name
// ============================================

/**
 * Validate any data against a schema by name
 */
export function validate(schemaName: string, data: unknown): boolean {
  const schemaId = `https://schemas.mmos.dev/v1/common/${schemaName}.schema.json`;
  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    throw new Error(`Schema not found: ${schemaName}`);
  }
  return validate(data) as boolean;
}

/**
 * Get validation errors for a schema by name
 */
export function getErrors(schemaName: string): ErrorObject[] | null | undefined {
  const schemaId = `https://schemas.mmos.dev/v1/common/${schemaName}.schema.json`;
  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    throw new Error(`Schema not found: ${schemaName}`);
  }
  return validate.errors;
}

// Export AJV instance for advanced usage
export { ajv };
export type { ErrorObject } from 'ajv';