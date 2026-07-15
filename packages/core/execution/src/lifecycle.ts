export class DefaultExecutionLifecycle
implements ExecutionLifecycle {

    async start(
        execution: Execution
    ) {

        execution.status.state = "running";

        return execution;

    }

    async pause(
        execution: Execution
    ) {

        execution.status.state = "paused";

        return execution;

    }

    async resume(
        execution: Execution
    ) {

        execution.status.state = "running";

        return execution;

    }

    async complete(
        execution: Execution
    ) {

        execution.status.state = "completed";

        return execution;

    }

    async cancel(
        execution: Execution
    ) {

        execution.status.state = "cancelled";

        return execution;

    }

    async fail(
        execution: Execution
    ) {

        execution.status.state = "failed";

        return execution;

    }

}