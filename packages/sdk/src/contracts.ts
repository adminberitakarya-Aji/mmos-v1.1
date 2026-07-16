/**
 * MMOS SDK Contracts
 *
 * API contract definitions and schemas.
 */

export interface WorkflowContract {
  id: string;
  name: string;
  version: string;
  description?: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  tasks: TaskContract[];
  metadata?: Record<string, unknown>;
}

export interface TaskContract {
  name: string;
  type: string;
  description?: string;
  configSchema: Record<string, unknown>;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  dependencies?: string[];
}

export interface ArtifactContract {
  id: string;
  name: string;
  mimeType: string;
  schema?: Record<string, unknown>;
}

export interface ExecutionContract {
  workflowId: string;
  input: Record<string, unknown>;
  options?: ExecutionOptionsContract;
}

export interface ExecutionOptionsContract {
  mode?: "sync" | "async" | "stream";
  priority?: number;
  timeout?: number;
  tags?: string[];
}

export interface ValidationContract {
  workflowId: string;
  input: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  warnings?: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

export const CONTRACT_VERSION = "1.0.0";

export function validateContract(_contract: unknown): boolean {
  // TODO: Implement contract validation
  return true;
}
