/**
 * Common TypeScript utility types.
 *
 * `Json*` types describe the values that survive a JSON round-trip and are
 * used throughout the platform to keep configuration, payloads, and storage
 * shapes predictable.
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Dictionary<T> = Record<string, T>;

export type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type JsonObject = Record<string, JsonValue>;

export type JsonArray = JsonValue[];

export interface KeyValue<T = string> {
  key: string;
  value: T;
}
