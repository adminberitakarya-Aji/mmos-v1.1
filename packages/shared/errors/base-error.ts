/**
 * MMOS Shared — Base error class.
 *
 * All MMOS errors share a consistent shape so they can be logged, serialized,
 * and routed through the platform's observability layer uniformly.
 */

export type ErrorCategory =
  | "general"
  | "validation"
  | "configuration"
  | "runtime"
  | "timeout"
  | "network"
  | "authentication"
  | "authorization"
  | "provider"
  | "storage"
  | "memory"
  | "event"
  | "execution"
  | string;

export interface BaseErrorOptions {
  code: string;
  category?: ErrorCategory | undefined;
  cause?: unknown;
  metadata?: Record<string, unknown> | undefined;
}

export class BaseError extends Error {
  public override name: string;
  public readonly code: string;
  public readonly category: ErrorCategory;
  public override readonly cause: unknown;
  public readonly metadata: Readonly<Record<string, unknown>>;
  public readonly timestamp: string;

  constructor(message: string, options: BaseErrorOptions) {
    super(message);
    this.name = "BaseError";
    this.code = options.code;
    this.category = options.category ?? "general";
    this.cause = options.cause;
    this.metadata = Object.freeze({ ...(options.metadata ?? {}) });
    this.timestamp = new Date().toISOString();
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      category: this.category,
      cause: serializeCause(this.cause),
      metadata: this.metadata,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

function serializeCause(cause: unknown): unknown {
  if (cause === undefined || cause === null) return cause;
  if (cause instanceof Error) {
    return {
      name: cause.name,
      message: cause.message,
      stack: cause.stack,
    };
  }
  if (typeof cause === "object") {
    try {
      return JSON.parse(JSON.stringify(cause));
    } catch {
      return String(cause);
    }
  }
  return cause;
}
