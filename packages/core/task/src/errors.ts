export class TaskError
extends Error {}

export class TaskValidationError
extends TaskError {}

export class InvalidTaskTypeError
extends TaskError {}

export class DuplicateTaskError
extends TaskError {}

export class InvalidDependencyError
extends TaskError {}