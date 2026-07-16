/**
 * Pagination request/response shape — mirrors `schemas/common/pagination.schema.json`.
 */

export interface PaginationRequest {
  page?: number;
  pageSize?: number;
  cursor?: string;
}

export interface PaginationResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextCursor?: string;
  previousCursor?: string;
}
