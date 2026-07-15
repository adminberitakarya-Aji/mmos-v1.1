export class CompositionError extends Error {}

export class CompositionValidationError
    extends CompositionError {}

export class CompositionNotFoundError
    extends CompositionError {}

export class CompositionAlreadyExistsError
    extends CompositionError {}

export class CompositionPublishError
    extends CompositionError {}