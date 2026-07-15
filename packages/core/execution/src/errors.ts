export class ExecutionError
extends Error {}

export class InvalidExecutionStateError
extends ExecutionError {}

export class ExecutionCancelledError
extends ExecutionError {}

export class ExecutionTimeoutError
extends ExecutionError {}

export class TaskRunError
extends ExecutionError {}