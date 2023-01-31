export interface Meta {
  message?: string | undefined;
  info?: string | undefined;
  status?: number | undefined;
  pagination?: { page: number; total: number; count: number; size: number };
}

export interface ResponseData {
  data: unknown;
  meta: Meta;
}
