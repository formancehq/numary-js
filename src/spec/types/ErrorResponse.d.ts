export type ErrorCode = "INTERNAL" | "INSUFFICIENT_FUND" | "VALIDATION" | "CONFLICT";

export interface ErrorResponse {
  error_code: ErrorCode;
  error_message?: string;
  [k: string]: unknown;
}
