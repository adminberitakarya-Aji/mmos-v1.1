export interface Workflow {
    apiVersion: string;
    kind: "Workflow";

    metadata: WorkflowMetadata;

    spec: WorkflowSpec;

    status?: WorkflowStatus;
}

export interface WorkflowSpec {

    entrypoint: string;

    tasks: WorkflowTask[];

    variables?: Record<string, unknown>;

    outputs?: Record<string, unknown>;
}

export interface WorkflowTask {

    id: string;

    type: string;

    dependsOn?: string[];

    config?: Record<string, unknown>;
}