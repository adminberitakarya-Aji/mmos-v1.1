export interface TaskMetadata {
  name: string;
  version: string;
  description?: string;
  author?: string;
  tags?: string[];
}

export interface RetryPolicy {
  maxAttempts: number;
  backoff: "fixed" | "linear" | "exponential";
  delay: number;
}

export interface TaskSpec {
  id: string;

  type:
    | "agent"
    | "capability"
    | "tool"
    | "prompt"
    | "human"
    | "event"
    | "condition"
    | "loop"
    | "parallel"
    | "subworkflow";

  action: string;

  dependsOn?: string[];

  inputs?: Record<string, unknown>;

  outputs?: Record<string, unknown>;

  parameters?: Record<string, unknown>;

  retry?: RetryPolicy;

  timeout?: number;

  condition?: string;

  onSuccess?: string[];

  onFailure?: string[];
}

export interface TaskStatus {
  state:
    | "draft"
    | "validated"
    | "compiled"
    | "ready"
    | "deprecated";
}

export interface Task {
  apiVersion: string;

  kind: "Task";

  metadata: TaskMetadata;

  spec: TaskSpec;

  status?: TaskStatus;
}