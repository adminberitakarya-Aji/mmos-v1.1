export class EventError
extends Error {}

export class EventPublishError
extends EventError {}

export class EventSubscribeError
extends EventError {}

export class InvalidEventError
extends EventError {}

export class InvalidTopicError
extends EventError {}