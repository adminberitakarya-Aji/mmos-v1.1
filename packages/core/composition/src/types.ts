export interface CompositionMetadata {
  version: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
}

export interface CompositionSpec {
  workflow: string;
  inputs?: Record<string, unknown>;
  variables?: Record<string, unknown>;
}

export interface CompositionStatus {
  state:
    | "draft"
    | "published"
    | "deprecated";

  publishedAt?: string;
}

export interface Composition {
  apiVersion: string;
  kind: "Composition";

  metadata: CompositionMetadata;

  spec: CompositionSpec;

  status?: CompositionStatus;
}