/**
 * Branded identifier types. The `Brand` is purely structural — at runtime
 * the value is a plain string. The brand exists at compile time so we can
 * distinguish an `ExecutionId` from a `WorkflowId` even though they share
 * the same string shape.
 */

export type Brand<T, B extends string> = T & { readonly __brand: B };

export type Identifier = Brand<string, "Identifier">;
export type UUID = Brand<string, "UUID">;

export type ExecutionId = Brand<string, "ExecutionId">;
export type WorkflowId = Brand<string, "WorkflowId">;
export type TaskId = Brand<string, "TaskId">;
export type AgentId = Brand<string, "AgentId">;
export type CapabilityId = Brand<string, "CapabilityId">;
export type MemoryId = Brand<string, "MemoryId">;
export type ArtifactId = Brand<string, "ArtifactId">;
export type ProviderId = Brand<string, "ProviderId">;
export type CompositionId = Brand<string, "CompositionId">;
export type TenantId = Brand<string, "TenantId">;
export type UserId = Brand<string, "UserId">;

/** Loose runtime check that a string looks like a valid MMOS identifier
 *  (matches `schemas/common/identifier.schema.json`). */
export function isValidIdentifier(value: string): boolean {
  if (typeof value !== "string" || value.length < 1 || value.length > 128) return false;
  return /^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/.test(value);
}
