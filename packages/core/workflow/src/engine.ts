export class DefaultWorkflowEngine
implements WorkflowEngine {

    constructor(

        private readonly builder: WorkflowBuilder,

        private readonly validator: WorkflowValidator

    ) {}

    async compile(
        workflow: Workflow
    ): Promise<WorkflowGraph> {

        await this.validator.validate(workflow);

        return this.builder.build(workflow);

    }

}