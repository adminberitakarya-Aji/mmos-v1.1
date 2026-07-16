/**
 * Object metadata — mirrors `schemas/common/metadata.schema.json`.
 * Carries descriptive info that's not part of the object's identity.
 */

import type { Reference } from "./reference";

export interface Labels {
  [key: string]: string;
}

export interface Annotations {
  [key: string]: string;
}

export interface Attributes {
  [key: string]: unknown;
}

export interface ObjectMetadata {
  name?: string;
  description?: string;
  version?: string;
  owner?: Reference;
  createdBy?: Reference;
  updatedBy?: Reference;
  createdAt?: string;
  updatedAt?: string;
  labels?: Labels;
  annotations?: Annotations;
  tags?: string[];
  attributes?: Attributes;
}
