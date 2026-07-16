/**
 * Generic options shapes used across the platform.
 */

export interface RetryOptions {
  maxAttempts: number;
  backoff: "fixed" | "linear" | "exponential";
  initialDelayMs?: number;
  maxDelayMs?: number;
}

export interface TimeoutOptions {
  timeoutMs: number;
}

export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  timeoutMs?: number;
}
