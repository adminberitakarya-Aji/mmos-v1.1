/**
 * MMOS Shared — Runtime errors.
 *
 * Runtime failures cover: runtime engine, queue, dispatcher, executor,
 * scheduler, and execution. Concrete failure kinds carry a `subsystem`
 * metadata field so logs can route the error to the right observer.
 */

import { BaseError } from "./base-error";

export type RuntimeSubsystem =
  | "runtime"
  | "execution"
  | "queue"
  | "dispatcher"
  | "executor"
  | "scheduler";

export class RuntimeError extends BaseError {
  constructor(
    message: string,
    options?: {
      code?: string;
      cause?: unknown;
      metadata?: Record<string, unknown> | undefined;
      subsystem?: RuntimeSubsystem;
    },
  ) {
    super(message, {
      code: options?.code ?? "RUNTIME_ERROR",
      category: "runtime",
      cause: options?.cause,
      metadata: {
        ...(options?.subsystem ? { subsystem: options.subsystem } : {}),
        ...(options?.metadata ?? {}),
      },
    });
    this.name = "RuntimeError";
  }
}
