export interface WorkflowBuilder {

    build(
        workflow: Workflow
    ): Promise<WorkflowGraph>;
}

export interface WorkflowValidator {

    validate(
        workflow: Workflow
    ): Promise<void>;
}

export interface WorkflowEngine {

    compile(
        workflow: Workflow
    ): Promise<WorkflowGraph>;
}