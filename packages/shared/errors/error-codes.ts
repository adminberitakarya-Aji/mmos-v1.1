/**
 * MMOS Shared — canonical error code categories.
 *
 * Use these category names when constructing `BaseError` so error routing
 * and observability are consistent across the platform.
 */

export const ERROR_CATEGORIES = {
  GENERAL: "general",
  VALIDATION: "validation",
  CONFIGURATION: "configuration",
  RUNTIME: "runtime",
  TIMEOUT: "timeout",
  NETWORK: "network",
  AUTHENTICATION: "authentication",
  AUTHORIZATION: "authorization",
  PROVIDER: "provider",
  STORAGE: "storage",
  MEMORY: "memory",
  EVENT: "event",
  EXECUTION: "execution",
} as const;

export type ErrorCategoryValue = (typeof ERROR_CATEGORIES)[keyof typeof ERROR_CATEGORIES];
