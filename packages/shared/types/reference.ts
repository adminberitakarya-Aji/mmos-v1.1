/**
 * Lightweight Reference — pointer from one MMOS domain object to another.
 * Mirrors `schemas/common/reference.schema.json`.
 */

export type ReferenceType =
  | "composition"
  | "workflow"
  | "task"
  | "agent"
  | "execution"
  | "runtime"
  | "capability"
  | "provider"
  | "memory"
  | "artifact"
  | "event"
  | "tenant"
  | "user"
  | "custom";

export interface Reference {
  id: string;
  type?: ReferenceType | string;
  name?: string;
  version?: string;
  uri?: string;
}
