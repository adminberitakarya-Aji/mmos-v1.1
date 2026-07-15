export class DefaultWorkflowBuilder
implements WorkflowBuilder {

    async build(
        workflow: Workflow
    ): Promise<WorkflowGraph> {

        // Build DAG

        return {

            nodes: [],

            edges: []

        };

    }

}