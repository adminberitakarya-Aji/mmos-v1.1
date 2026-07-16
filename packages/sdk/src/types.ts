/**
 * MMOS SDK Types
 *
 * Shared type definitions used across the SDK.
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface FilterOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, unknown>;
}

export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  version: string;
  uptime: number;
  checks: Array<{
    name: string;
    status: "pass" | "fail" | "warn";
    message?: string;
  }>;
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;