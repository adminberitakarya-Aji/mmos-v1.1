/**
 * Generic API response envelopes.
 */

import type { PaginationResponse } from "./pagination";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  metadata?: Record<string, unknown>;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface PagedResponse<T> {
  items: T[];
  pagination: PaginationResponse;
}
