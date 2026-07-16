/**
 * MMOS Shared Types
 * 
 * Canonical TypeScript types derived from JSON Schemas in schemas/common/
 * Source of truth: JSON Schema files (not these types)
 */

// ============================================
// Identifier
// Schema: schemas/common/identifier.schema.json
// ============================================

/**
 * MMOS Identifier - reusable identifier for all domain objects
 * Pattern: ^[a-zA-Z0-9][a-zA-Z0-9._:-]*$
 * Length: 1-128 characters
 */
export type Identifier = string & { readonly __brand: unique symbol };

/**
 * Type guard for Identifier
 */
export function isIdentifier(value: unknown): value is Identifier {
  if (typeof value !== 'string') return false;
  if (value.length < 1 || value.length > 128) return false;
  return /^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/.test(value);
}

/**
 * Create an Identifier (validates at runtime)
 */
export function createIdentifier(value: string): Identifier {
  if (!isIdentifier(value)) {
    throw new Error(`Invalid identifier: ${value}. Must match ^[a-zA-Z0-9][a-zA-Z0-9._:-]*$ and be 1-128 chars`);
  }
  return value as Identifier;
}

// ============================================
// Timestamp
// Schema: schemas/common/timestamp.schema.json
// ============================================

/**
 * ISO 8601 date-time string
 */
export type Timestamp = string & { readonly __brand: unique symbol };

export function isTimestamp(value: unknown): value is Timestamp {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
}

export function createTimestamp(value: string): Timestamp {
  if (!isTimestamp(value)) {
    throw new Error(`Invalid timestamp (must be ISO 8601): ${value}`);
  }
  return value as Timestamp;
}

// ============================================
// Status
// Schema: schemas/common/status.schema.json
// ============================================

/**
 * MMOS lifecycle status - shared enum for all domain objects
 */
export type MmosStatus =
  | 'draft'
  | 'active'
  | 'inactive'
  | 'pending'
  | 'queued'
  | 'running'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'timeout'
  | 'archived'
  | 'deleted';

export const MmosStatusValues: readonly MmosStatus[] = [
  'draft',
  'active',
  'inactive',
  'pending',
  'queued',
  'running',
  'paused',
  'completed',
  'failed',
  'cancelled',
  'timeout',
  'archived',
  'deleted',
] as const;

export function isMmosStatus(value: unknown): value is MmosStatus {
  return typeof value === 'string' && MmosStatusValues.includes(value as MmosStatus);
}

// ============================================
// Reference
// Schema: schemas/common/reference.schema.json
// ============================================

/**
 * Referenced MMOS object type
 */
export type ReferenceType =
  | 'composition'
  | 'workflow'
  | 'task'
  | 'agent'
  | 'execution'
  | 'runtime'
  | 'capability'
  | 'provider'
  | 'memory'
  | 'artifact'
  | 'event'
  | 'tenant'
  | 'user'
  | 'custom';

export const ReferenceTypeValues: readonly ReferenceType[] = [
  'composition',
  'workflow',
  'task',
  'agent',
  'execution',
  'runtime',
  'capability',
  'provider',
  'memory',
  'artifact',
  'event',
  'tenant',
  'user',
  'custom',
] as const;

/**
 * Lightweight reference to another MMOS object
 * Used for linking without embedding full objects
 */
export interface Reference {
  id: Identifier;
  type?: ReferenceType;
  name?: string;
  version?: string;
  uri?: string;
}

export function isReference(value: unknown): value is Reference {
  if (typeof value !== 'object' || value === null) return false;
  const ref = value as Record<string, unknown>;
  return isIdentifier(ref.id) &&
    (ref.type === undefined || ReferenceTypeValues.includes(ref.type as ReferenceType)) &&
    (ref.name === undefined || typeof ref.name === 'string') &&
    (ref.version === undefined || typeof ref.version === 'string') &&
    (ref.uri === undefined || typeof ref.uri === 'string');
}

// ============================================
// Metadata
// Schema: schemas/common/metadata.schema.json
// ============================================

export interface Metadata {
  name?: string;
  description?: string;
  version?: string;
  owner?: Reference;
  createdBy?: Reference;
  updatedBy?: Reference;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  tags?: string[];
  attributes?: Record<string, unknown>;
}

export function isMetadata(value: unknown): value is Metadata {
  if (typeof value !== 'object' || value === null) return false;
  const m = value as Record<string, unknown>;
  
  return (
    (m.name === undefined || typeof m.name === 'string') &&
    (m.description === undefined || typeof m.description === 'string') &&
    (m.version === undefined || typeof m.version === 'string') &&
    (m.owner === undefined || isReference(m.owner)) &&
    (m.createdBy === undefined || isReference(m.createdBy)) &&
    (m.updatedBy === undefined || isReference(m.updatedBy)) &&
    (m.createdAt === undefined || isTimestamp(m.createdAt)) &&
    (m.updatedAt === undefined || isTimestamp(m.updatedAt)) &&
    (m.labels === undefined || (typeof m.labels === 'object' && m.labels !== null && Object.values(m.labels).every(v => typeof v === 'string'))) &&
    (m.annotations === undefined || (typeof m.annotations === 'object' && m.annotations !== null && Object.values(m.annotations).every(v => typeof v === 'string'))) &&
    (m.tags === undefined || (Array.isArray(m.tags) && m.tags.every(t => typeof t === 'string'))) &&
    (m.attributes === undefined || (typeof m.attributes === 'object' && m.attributes !== null))
  );
}

// ============================================
// Error
// Schema: schemas/common/error.schema.json
// ============================================

export interface MmosError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export function isMmosError(value: unknown): value is MmosError {
  if (typeof value !== 'object' || value === null) return false;
  const e = value as Record<string, unknown>;
  return typeof e.code === 'string' && typeof e.message === 'string';
}

// ============================================
// Pagination
// Schema: schemas/common/pagination.schema.json
// ============================================

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems?: number;
  totalPages?: number;
  hasPrevious?: boolean;
  hasNext?: boolean;
  nextCursor?: string | null;
  previousCursor?: string | null;
}

export function isPagination(value: unknown): value is Pagination {
  if (typeof value !== 'object' || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.page === 'number' && p.page >= 1 &&
    typeof p.pageSize === 'number' && p.pageSize >= 1 && p.pageSize <= 1000 &&
    (p.totalItems === undefined || (typeof p.totalItems === 'number' && p.totalItems >= 0)) &&
    (p.totalPages === undefined || (typeof p.totalPages === 'number' && p.totalPages >= 0)) &&
    (p.hasPrevious === undefined || typeof p.hasPrevious === 'boolean') &&
    (p.hasNext === undefined || typeof p.hasNext === 'boolean') &&
    (p.nextCursor === undefined || p.nextCursor === null || typeof p.nextCursor === 'string') &&
    (p.previousCursor === undefined || p.previousCursor === null || typeof p.previousCursor === 'string')
  );
}

// ============================================
// Response
// Schema: schemas/common/response.schema.json
// ============================================

export interface Response<T = unknown> {
  success: boolean;
  data?: T;
  error?: MmosError;
  pagination?: Pagination;
  metadata?: Metadata;
  requestId?: Identifier;
  timestamp?: Timestamp;
}

export function isResponse(value: unknown): value is Response {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.success === 'boolean' &&
    (r.data === undefined || (typeof r.data === 'object' && r.data !== null) || Array.isArray(r.data) || typeof r.data === 'string' || typeof r.data === 'number' || typeof r.data === 'boolean' || r.data === null) &&
    (r.error === undefined || isMmosError(r.error)) &&
    (r.pagination === undefined || isPagination(r.pagination)) &&
    (r.metadata === undefined || isMetadata(r.metadata)) &&
    (r.requestId === undefined || isIdentifier(r.requestId)) &&
    (r.timestamp === undefined || isTimestamp(r.timestamp))
  );
}
