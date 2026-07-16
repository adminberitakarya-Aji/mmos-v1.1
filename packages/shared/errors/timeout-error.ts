/**
 * MMOS Shared — Timeout errors.
 */

import { BaseError } from "./base-error";

export type TimeoutKind = "request" | "execution" | "provider" | "runtime" | "scheduler";

export class TimeoutError extends BaseError {
  constructor(
    message: string,
    options?: {
      kind?: TimeoutKind;
      metadata?: Record<string, unknown> | undefined;
      cause?: unknown;
    },
  ) {
    super(message, {
      code: "TIMEOUT_ERROR",
      category: "timeout",
      cause: options?.cause,
      metadata: {
        ...(options?.kind ? { kind: options.kind } : {}),
        ...(options?.metadata ?? {}),
      },
    });
    this.name = "TimeoutError";
  }
}
