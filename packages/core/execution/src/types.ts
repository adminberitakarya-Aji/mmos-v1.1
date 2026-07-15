export interface Execution {

    apiVersion: string;

    kind: "Execution";

    metadata: ExecutionMetadata;

    spec: ExecutionSpec;

    status: ExecutionStatus;

}

export interface ExecutionMetadata {

    id: string;

    workflowId: string;

    compositionId: string;

    trigger:
        | "manual"
        | "api"
        | "event"
        | "schedule"
        | "system";

    createdAt: string;

    updatedAt?: string;

}

export interface ExecutionSpec {

    inputs?: Record<string, unknown>;

    variables?: Record<string, unknown>;

    context?: Record<string, unknown>;

}

export interface ExecutionStatus {

    state: ExecutionState;

    progress: number;

    taskRuns: TaskRun[];

}

export interface TaskRun {

    taskId: string;

    state: TaskRunState;

    attempt: number;

    startedAt?: string;

    finishedAt?: string;

    input?: Record<string, unknown>;

    output?: Record<string, unknown>;

    error?: unknown;

}