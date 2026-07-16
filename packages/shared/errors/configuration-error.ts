/**
 * MMOS Shared — Configuration errors.
 */

import { BaseError } from "./base-error";

export class ConfigurationError extends BaseError {
  constructor(
    message: string,
    options?: { cause?: unknown; metadata?: Record<string, unknown> | undefined },
  ) {
    super(message, {
      code: "CONFIGURATION_ERROR",
      category: "configuration",
      cause: options?.cause,
      metadata: options?.metadata,
    });
    this.name = "ConfigurationError";
  }
}

export class MissingEnvironmentVariableError extends ConfigurationError {
  constructor(name: string) {
    super(`Missing required environment variable: ${name}`, {
      metadata: { variable: name },
    });
    this.name = "MissingEnvironmentVariableError";
  }
}

export class ConfigurationFileNotFoundError extends ConfigurationError {
  constructor(path: string) {
    super(`Configuration file not found: ${path}`, {
      metadata: { path },
    });
    this.name = "ConfigurationFileNotFoundError";
  }
}
