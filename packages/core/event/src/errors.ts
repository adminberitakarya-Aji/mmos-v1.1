/**
 * MMOS Event — error types.
 */

import { BaseError } from "@mmos/shared/errors";

const CATEGORY = "event" as const;

export class EventError extends BaseError {
  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: options?.code ?? "EVENT_ERROR",
      category: CATEGORY,
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "EventError";
  }
}

export class EventPublishError extends EventError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "EVENT_PUBLISH_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "EventPublishError";
  }
}

export class EventSubscribeError extends EventError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "EVENT_SUBSCRIBE_ERROR",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "EventSubscribeError";
  }
}

export class InvalidEventError extends EventError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "INVALID_EVENT",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "InvalidEventError";
  }
}

export class InvalidTopicError extends EventError {
  constructor(topic: string) {
    super(`Invalid event topic: ${topic}`, {
      code: "INVALID_TOPIC",
      metadata: { topic },
    });
    this.name = "InvalidTopicError";
  }
}
