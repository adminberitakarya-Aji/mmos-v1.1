export type ExecutionState =

    | "created"

    | "queued"

    | "running"

    | "paused"

    | "completed"

    | "failed"

    | "cancelled"

    | "timeout";

export type TaskRunState =

    | "pending"

    | "queued"

    | "running"

    | "completed"

    | "failed"

    | "cancelled"

    | "timeout"

    | "skipped";