/* eslint-disable @typescript-eslint/no-explicit-any */
// API
export interface PaginationParamsInterface {
  limit: number;
  page: number;
}

export interface ApiDataResponse<T> {
  data: T;
  total: number;
  pageSize: number;
  pageNumber: number;
}

export interface ApiDataResponseV2<T> {
  data: T;
  total: number;
  currentPage: number;
  pageSize: number;
}

export interface ApiDataCognitoResponse<T> {
  data: T;
  nextPaginationToken?: string;
}

export interface ApiBaseResponse<T> {
  message: string;
  statusCode: number;
  data: T;
  error?: string;
  details?: string[];
}

// AMPLIFY
export interface AmplifyBaseResponse<T> {
  data: T;
  nextPaginationToken?: string | null;
}
