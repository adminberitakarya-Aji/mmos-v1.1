export class WorkflowError extends Error {}

export class WorkflowValidationError
extends WorkflowError {}

export class WorkflowCompileError
extends WorkflowError {}

export class CircularDependencyError
extends WorkflowError {}

export class DuplicateTaskError
extends WorkflowError {}

export class InvalidEntrypointError
extends WorkflowError {}