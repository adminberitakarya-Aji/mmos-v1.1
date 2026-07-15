export interface ExecutionLifecycle {

    start(
        execution: Execution
    ): Promise<Execution>;

    pause(
        execution: Execution
    ): Promise<Execution>;

    resume(
        execution: Execution
    ): Promise<Execution>;

    cancel(
        execution: Execution
    ): Promise<Execution>;

    complete(
        execution: Execution
    ): Promise<Execution>;

    fail(
        execution: Execution,
        error: Error
    ): Promise<Execution>;

}